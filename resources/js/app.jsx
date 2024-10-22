import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap';
import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookCatalog from './components/BookCatalog';
import BookDetails from './components/BookDetails';
import Checkout from './components/Checkout';

function Myapp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookCatalog />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}
ReactDom.createRoot(document.getElementById('app')).render(<Myapp/>);

