import React from 'react';
import './Cart.css';

function Cart({ cartItems, onRemoveFromCart }) {
    if (!cartItems || cartItems.length === 0) {
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
                {cartItems.map((item, index) => (
                    <li key={item.id ? item.id : index} className="cart-item" data-testid="cart-item">
                        <strong>{item.name}</strong> - Quantity: {item.quantity} - Price: ${item.price ? item.price.toFixed(2) : 'N/A'}
                        <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                        <p>{item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cart;
