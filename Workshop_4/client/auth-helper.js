// auth-helper.js - Helper functions for authentication

// Get token from sessionStorage
function getAuthToken() {
    return sessionStorage.getItem('token');
}

// Get user info from sessionStorage
function getUser() {
    const userStr = sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Check if user is authenticated
function isAuthenticated() {
    return !!getAuthToken();
}

// Logout user
function logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Make authenticated fetch request
async function authenticatedFetch(url, options = {}) {
    const token = getAuthToken();
    
    if (!token) {
        alert('You must be logged in to perform this action');
        window.location.href = 'login.html';
        throw new Error('No authentication token');
    }

    // Add authorization header
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    const response = await fetch(url, {
        ...options,
        headers
    });

    // If unauthorized, redirect to login
    if (response.status === 401) {
        alert('Session expired. Please login again.');
        logout();
        throw new Error('Unauthorized');
    }

    return response;
}

// Redirect to login if not authenticated
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}
