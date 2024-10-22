import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from './layouts/navbar';
import Footer from './layouts/Footer';
import { Modal, Button, Form, Card, Row, Col } from "react-bootstrap";

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [bestSellers, setBestSellers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem('cartItems')) || []
    ); 

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`/api/books/${id}`);
                setBook(response.data);
            } catch (err) {
                console.error("Error fetching book details:", err);
                setError("Unable to fetch book details");
            }
        };

        const fetchBestSellers = async () => {
            try {
                const response = await axios.get(`/api/books`);
                setBestSellers(response.data.slice(0, 6));
            } catch (err) {
                console.error("Error fetching best sellers:", err);
            }
        };

        fetchBookDetails();
        fetchBestSellers();
    }, [id]);

    const handleClose = () => setShowModal(false);

    const handleAddToCart = () => {
        const item = { ...book, quantity };
        const updatedCart = [...cartItems, item];
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart)); 
        setShowModal(true);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleRemoveFromCart = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    const handleProceedToCheckout = () => {
        setShowModal(true);
    };

    const handleBack = () => {
        navigate(-1); 
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <Navbar cartItems={cartItems} />
            <div className="container mt-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        {book ? (
                            <Card className="shadow-sm">
                                <Card.Img variant="top" src={book.image} alt={book.title} style={{ height: '350px' }} />
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text>{book.description}</Card.Text>
                                    <p><strong>Price:</strong> ${book.price}</p>

                                    <Form.Group controlId="quantitySelect" className="mb-3">
                                        <Form.Label>Select Quantity:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            min="1"
                                            style={{ width: '100px' }}
                                        />
                                    </Form.Group>

                                    <div className="d-flex justify-content-around button">
                                        <Button className="bookdetailButton" onClick={handleAddToCart}>
                                            Add to Cart
                                        </Button>

                                        <Button variant="secondary" onClick={handleBack} className="ms-2">
                                            Go Back
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ) : (
                            <p>No book details available.</p>
                        )}
                    </Col>
                </Row>

                <div className="mt-5">
                    <h3 style={{ color: '#c81e39', }}>Best Sellers</h3>
                    <Row>
                        {bestSellers.map((bestSeller) => (
                            <Col md={2} key={bestSeller.id}>
                                <Card className="shadow-sm mb-3">
                                    <Card.Img
                                        variant="top"
                                        src={bestSeller.image}
                                        alt={bestSeller.title}
                                        style={{ height: '150px' }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{bestSeller.title}</Card.Title>
                                        <Button
                                            style={{ width: '100%', color: 'white', backgroundColor: '#c81e39', borderColor: 'white' }}
                                            onClick={() => navigate(`/books/${bestSeller.id}`)}
                                        >
                                            View
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cart Summary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <div key={index} className="mb-3">
                                <h5>{item.title}</h5>
                                <p>Quantity: {item.quantity}</p>
                                <p>Total Price: ${(item.quantity * item.price).toFixed(2)}</p>
                                <Button variant="danger" onClick={() => handleRemoveFromCart(index)}>
                                    Remove
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="bookdetailButton" onClick={handleProceedToCheckout}>
                        Proceed to Checkout
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="container-fluid p-0 mt-5">
                <Footer />
            </div>
        </>
    );
}

export default BookDetails;
