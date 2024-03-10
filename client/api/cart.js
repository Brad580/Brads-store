const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function addToCartApi(userId, product) {
    try {
        const response = await fetch(`${API_BASE_URL}/carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                userId, // Make sure this is a valid and existing ID
                products: [{
                    productId: product.id, 
                    quantity: product.quantity
                }]
            }),
        });

        if (!response.ok) {
            const errorBody = await response.json(); 
            throw new Error(errorBody.message || 'Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Add to cart error:', error);
        throw error;
    }
}

export async function removeFromCartApi(cartId, productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/carts/${cartId}/product/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to remove item from cart');
        }

        return await response.json();
    } catch (error) {
        console.error("There's been a problem with removing the item:", error);
        throw error;
    }
}

export async function fetchCartItems(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/carts/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            const errorBody = await response.json(); 
            throw new Error(errorBody.message || 'Failed to fetch cart items');
        }

        return await response.json();
    } catch (error) {
        console.error("There's been a problem with fetching the cart items:", error);
        throw error;
    }
}
