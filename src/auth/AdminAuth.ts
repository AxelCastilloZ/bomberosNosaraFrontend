export const ADMIN_USERS = [
    { username: 'Axel', password: '1234' },
    { username: 'Cristhian', password: '1234' },
    { username: 'Admin', password: 'admin' },
  ];
  
  export const authenticateAdmin = (username: string, password: string) => {
    return ADMIN_USERS.some(user => user.username === username && user.password === password);
  };
  