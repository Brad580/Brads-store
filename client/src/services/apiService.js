const API_BASE_URL = 'https://fakestoreapi.com';

async function handleResponse(response) {
  if (!response.ok) {
    try {
      const errorText = await response.text();
      const errorBody = errorText ? JSON.parse(errorText) : {};
      throw new Error(errorBody.message || 'Network response was not ok');
    } catch (error) {
      throw new Error(error.message || 'Network response was not ok and could not parse error body');
    }
  }

  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error("Failed to parse JSON response:", text);
    throw new Error('Failed to parse JSON response');
  }
}

export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  return handleResponse(response);
}

export async function fetchProductById(productId) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);
  return handleResponse(response);
}

export async function fetchCartItems(userId) {
  const response = await fetch(`${API_BASE_URL}/carts/user/${userId}`);
  return handleResponse(response);
}

export async function addToCart(userId, product) {
  console.log(`Simulated adding product to user ${userId}'s cart.`, product);
}

export async function removeFromCart(itemId) {
  console.log(`Simulated removing item ${itemId} from cart.`);
}

export async function signup(userData) {
  console.log(`Simulated signup for user`, userData);
}

export async function login(username, password) {
  console.log(`Simulated login for ${username} with password ${password}.`);
  return { token: "mockToken", userId: "mockUserId" };
}

export async function addNewProduct(productData) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
}

export async function updateProduct(productId, productData) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
}

export async function deleteProduct(productId) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}
