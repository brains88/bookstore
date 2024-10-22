import React from 'react';
import { Carousel } from 'react-bootstrap';

function BookCarousel() {
  return (
    <Carousel className="custom-carousel">
      <Carousel.Item>
        <img
          src="https://img.freepik.com/free-photo/night-adventure-with-fairy-glowing-object-generative-ai_188544-12605.jpg"
          alt="First slide"
          className="d-block w-100"
        />
        <Carousel.Caption>
          <h1 className="carousel-text">Explore the World of Books</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuouY5d--2Jconh9BN7ItbIfZEZpFjOv3Xc_gpnqYarHcEvTrql2LB-CZcstcNKfW6dk0&usqp=CAUhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDreG9txq8mZy9MAH0bOkeluzYPddJ2l79n1cGibTwgwnYKHbYVMyoE-gnXXNhV2oucIQ&usqp=CAUhttps://t4.ftcdn.net/jpg/06/43/35/51/360_F_643355119_Y74swUFqXwXlUAxEtqu9bGaBV9ttXnvh.jpg"
          alt="Second slide"
          className="d-block w-100"
        />
        <Carousel.Caption>
          <h1 className="carousel-text">Find Your Next Adventure</h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default BookCarousel;
