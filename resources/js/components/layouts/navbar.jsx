import React, { useEffect, useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Navbar({ onFilter, cartItems = [], onRemoveFromCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [authorFilter, setAuthorFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [showCartModal, setShowCartModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNoResultsModal, setShowNoResultsModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    setLoading(true);

    fetch(`/api/search?title=${searchTerm}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.length > 0) {
          navigate('/booklist', { state: { results: data } }); 
        } else {
          setShowNoResultsModal(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const handleFilterChange = () => {
    onFilter(authorFilter, genreFilter);
    setShowFilter(false);
  };

  const handleCartClick = () => {
    setShowCartModal(true);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <>
      <nav className={`navbar p-3 nav-sticky ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="/">
            <h5 className="text-white">DeBookShop</h5>
          </a>

          <div className="d-flex align-items-center">
            <form className="d-flex search" role="search" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by book title"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-light searchbutton" type="submit" onClick={handleSearchSubmit}>
                {loading ? <Spinner animation="border" size="sm" /> : <i className="fas fa-search" style={{ fontSize: '20px' }}></i>}
              </button>
            </form>

            <i
              className="fas fa-filter ms-3"
              style={{ fontSize: '20px', cursor: 'pointer' }}
              onClick={() => setShowFilter(!showFilter)}
            ></i>
          </div>

          <div className="d-flex align-items-center">
            <div className="position-relative" onClick={handleCartClick}>
              <i className="fas fa-shopping-cart mx-3" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
              {cartItems.length > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '12px' }}
                >
                  {cartItems.length}
                </span>
              )}
            </div>
            <i className="fas fa-bars" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
          </div>
        </div>

        {showFilter && (
          <div className="filter-form mx-auto p-3 bg-light mt-3" style={{ maxWidth: '400px', borderRadius: '8px' }}>
            <h6>Filter by:</h6>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Author"
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Genre"
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleFilterChange}>
              Apply
            </button>
          </div>
        )}
      </nav>

      <Modal show={showCartModal} onHide={handleCloseCartModal}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length > 0 ? (
            <>
              <ul className="list-group">
                {cartItems.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.title} - {item.quantity} x ${item.price}
                    <span>${(item.quantity * item.price).toFixed(2)}</span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onRemoveFromCart(item.id)} 
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
              <h5 className="mt-3">Total: ${calculateTotalPrice()}</h5>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCartModal}>
            Close
          </Button>
          {cartItems.length > 0 && (
            <Button className="bookdetailButton">
              Proceed to Payment
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* No Results Modal */}
      <Modal show={showNoResultsModal} onHide={() => setShowNoResultsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>No Results Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Sorry, the book isn`t available. Search another book.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNoResultsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Navbar;
