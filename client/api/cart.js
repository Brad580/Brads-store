const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Correctly set your API base URL

export async function addToCartApi(productDetails) {
    const userToken = localStorage.getItem('userToken');
    
    try {
        const response = await fetch(`${API_BASE_URL}/carts/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`, 
            },
            body: JSON.stringify(productDetails),
        });

        if (!response.ok) {
            throw new Error('Failed to add item to cart');
        }

        return await response.json();
    } catch (error) {
        console.error("There's been a problem with adding the item:", error);
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
        const response = await fetch(`${API_BASE_URL}/carts`, { // Adjusted to match a likely backend route for fetching all cart items
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
