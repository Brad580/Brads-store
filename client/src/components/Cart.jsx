import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { useCart } from '../contexts/CartContext';

function Cart() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity,  } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

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
                    <li key={`${item.id}-${index}`} className="cart-item">
                        <div>
                            <strong>{item.title}</strong> - Price: ${item.price ? item.price.toFixed(2) : 'N/A'}
                            <p>{item.description}</p>
                        </div>
                        <div>
                            Quantity: 
                            <button onClick={() => decreaseQuantity(item.id)}> - </button>
                            {item.quantity}
                            <button onClick={() => increaseQuantity(item.id)}> + </button>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={handleCheckout} className="checkout-button">Proceed to Checkout</button>
        </div>
    );
}

export default Cart;
