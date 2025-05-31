export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('authUser'); 
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

export function isAdmin() {
  return !!localStorage.getItem('token');
}
