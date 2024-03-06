const API_BASE_URL = '/login'; 

export async function login(credentials) {
    return fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('userToken', data.token);
        return data;
    });
}

export async function signup(userInfo) {
    return fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Signup failed');
        }
        return response.json();
    });
}

export function logout() {
    localStorage.removeItem('userToken');
}
