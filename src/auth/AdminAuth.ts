export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('authToken');
}

export function isAdmin() {
  const token = localStorage.getItem('authToken');
  return !!token; // true si hay token
};

