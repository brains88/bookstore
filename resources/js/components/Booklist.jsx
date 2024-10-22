import React, { useState } from 'react';
import Navbar from './layouts/navbar';

const booksData = [
  { title: "Book One", author: "Author A", genre: "Fiction" },
  { title: "Book Two", author: "Author B", genre: "Non-fiction" },
  { title: "Book Three", author: "Author A", genre: "Science" },
  { title: "Book Four", author: "Author C", genre: "Fiction" },
  
];

function BookList() {
  const [filteredBooks, setFilteredBooks] = useState(booksData);

  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = booksData.filter((book) =>
      book.title.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredBooks(filtered);
  };

  const handleFilter = (authorFilter, genreFilter) => {
    let filtered = booksData;

    if (authorFilter) {
      filtered = filtered.filter((book) =>
        book.author.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    if (genreFilter) {
      filtered = filtered.filter((book) =>
        book.genre.toLowerCase().includes(genreFilter.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} onFilter={handleFilter} />
      <div className="container mt-4">
        <h3 className="mb-4">Book List</h3>
        <div className="row">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div key={index} className="col-md-3 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">Author: {book.author}</p>
                    <p className="card-text">Genre: {book.genre}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookList;
