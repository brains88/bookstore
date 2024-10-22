<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    // Get all the list of books
    public function index()
    {
        return Book::all();
    }

    //Show book detail
    public function show($id)
    {
        return Book::find($id);
    }

    //search for books
    public function search(Request $request)
    {
        $title = $request->input('title');
        $author = $request->input('author');
        $genre = $request->input('genre');

        $books = Book::query();

        if ($title) {
            $books->where('title', 'LIKE', '%' . $title . '%');
        }
        if ($author) {
            $books->where('author', 'LIKE', '%' . $author . '%');
        }

        if ($genre) {
            $books->where('genre', 'LIKE', '%' . $genre . '%');
        }

        $books = $books->get();

        return response()->json($books);
    }

}
