import React from 'react';
import './Cart.css';
import { useCart } from '../contexts/CartContext';

function Cart() {
    const { cart, removeFromCart } = useCart();

    if (!cart || cart.length === 0) {
        return (
            <div className="cart-container">
                <h2 className="cart-title">Your Bag</h2>
                <p>Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Bag</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={`${item.id}-${index}`} className="cart-item" data-testid="cart-item">
                        <strong>{item.title}</strong> - Quantity: {item.quantity} - Price: ${item.price ? item.price.toFixed(2) : 'N/A'}
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        <p>{item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cart;
