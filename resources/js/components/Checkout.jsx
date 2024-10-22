import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchBookDetails = async () => {
            const response = await axios.get(`/api/books/${id}`);
            setBook(response.data);
        };

        fetchBookDetails();
    }, [id]);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div className="container">
            {book ? (
                <>
                    <h1>{book.title}</h1>
                    <p>{book.description}</p>
                    <Button variant="primary" onClick={handleShow}>
                        View More Details
                    </Button>

                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{book.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{book.description}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default BookDetails;
