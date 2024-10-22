<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        return Cart::with('book')->get();
    }

    public function store(Request $request)
    {
        $cart = Cart::create([
            'book_id' => $request->book_id,
            'quantity' => $request->quantity
        ]);
        return response()->json($cart);
    }

    public function update(Request $request, $id)
    {
        $cart = Cart::find($id);
        $cart->update(['quantity' => $request->quantity]);
        return response()->json($cart);
    }

    public function destroy($id)
    {
        Cart::destroy($id);
        return response()->json(['message' => 'Item removed from cart']);
    }
}
