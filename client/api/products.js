const API_BASE_URL = '/products'; 

export async function fetchProducts() {
    return fetch(`${API_BASE_URL}/products`)
    .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
    })
    .catch(error => console.error("There's been a problem with your fetch operation:", error));
}
