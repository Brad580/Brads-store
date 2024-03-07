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
                userId: "507f191e810c19729de860ea",
                product: {
                    productId: product.id,
                    quantity: product.quantity
                }
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Add to cart error:', error);
        throw error;
    }
}

export async function removeFromCartApi(itemId) {
    const userToken = localStorage.getItem('userToken');
    
    try {
        const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${userToken}`,
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

export async function fetchCartItems() {
    const userToken = localStorage.getItem('userToken');

    try {
        const response = await fetch(`${API_BASE_URL}/carts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart items');
        }

        return await response.json();
    } catch (error) {
        console.error("There's been a problem with fetching the cart items:", error);
        throw error;
    }
}
