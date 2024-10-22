import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from './layouts/navbar';
import BookCarousel from './layouts/Carousel';
import Footer from './layouts/Footer';
import { Link } from 'react-router-dom';

function BookCatalog() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const categoryRef = useRef(null);

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get('/api/books');
    setBooks(response.data);
  };

  const fetchCategories = async () => {
    const response = await axios.get('/api/categories');
    setCategories(response.data);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredBooks = books.filter(book =>
    selectedCategory ? book.category === selectedCategory : true
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const scrollLeft = () => {
    categoryRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    categoryRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar/>
      <BookCarousel />
      <div className="container py-3 mb-4">
        <div className="category-scroll mb-4 position-relative">
          <h2 className='text-color'>Available Categories</h2>
          <button className="scroll-button-left" onClick={scrollLeft}>{'<'}</button>
          <div className="category-row d-flex" ref={categoryRef}>
            {categories.map(category => (
              <div key={category.id} className="category-card text-center mx-2">
                <div className="card h-100 mb-4">
                  <div className="card-body text-center">
                    <h5 className="mb-2">{category.name}</h5>
                    <div className="img-placeholder" style={{ height: '100px', background: '#eee' }}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuouY5d--2Jconh9BN7ItbIfZEZpFjOv3Xc_gpnqYarHcEvTrql2LB-CZcstcNKfW6dk0&usqp=CAUhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDreG9txq8mZy9MAH0bOkeluzYPddJ2l79n1cGibTwgwnYKHbYVMyoE-gnXXNhV2oucIQ&usqp=CAUhttps://t4.ftcdn.net/jpg/06/43/35/51/360_F_643355119_Y74swUFqXwXlUAxEtqu9bGaBV9ttXnvh.jpg"
                        alt="Second slide"
                        className="d-block w-100 h-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="scroll-button-right" onClick={scrollRight}>{'>'}</button>
        </div>

        
        <div className="row">
        <h2 className='text-color'>Featured Books</h2>
          {currentBooks.map(book => (
            <div key={book.id} className="col-md-2 mb-4">
              <div className="card h-100">
                <Link to={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
                  <img src={book.image} alt={book.title} className="card-img-top" style={{ height: '150px' }} />
                  <div className="card-body">
                    <h5 className="mb-1">{book.title.length > 15 ? `${book.title.substring(0, 15)}...` : book.title}</h5>
                    <p className="mb-2">{book.description.length > 40 ? `${book.description.substring(0, 40)}...` : book.description}</p>
                    <div className='d-flex justify-content-between'>
                      <p className="text-muted">{book.author}</p>
                      <p className="text-primary">${book.price}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, index) => (
              <li key={index + 1} className="page-item">
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Footer />
    </>
  );
}

export default BookCatalog;
