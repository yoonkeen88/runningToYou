// Utility functions
export function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function encryptEmail(email) {
    return btoa(email); // Base64 encoding
}
