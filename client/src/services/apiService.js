const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Something went wrong with the request');
  }
  return response.json();
};

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    return await handleResponse(response);
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
    throw error; 
  }
}

export async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await handleResponse(response);
    localStorage.setItem('token', data.token);
    return data.token;
  } catch (error) {
    console.error('Login error:', error);
    throw error; 
  }
}

export async function signup(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Signup error:', error);
    throw error; 
  }
}

export async function addToCartApi(userId, product) {
  try {
    const response = await fetch(`${API_BASE_URL}/carts`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
          userId,
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



export async function fetchCartItems(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/carts?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Fetch cart items error:', error);
    throw error;
  }
}


export async function removeFromCart(itemId) {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Remove from cart error:', error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem('token');
}
