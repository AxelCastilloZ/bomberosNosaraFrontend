import { createContext, useContext, useState, useEffect } from 'react';
import { authenticateAdmin } from './AdminAuth';

interface AdminAuthContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  logout: () => void;
}

export const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem('adminUser');
    const password = localStorage.getItem('adminPass');
    if (username && password && authenticateAdmin(username, password)) {
      setUserState(username);
    } else {
      setUserState(null);
    }
  }, []);

  const setUser = (user: string | null) => {
    if (user) {
      setUserState(user);
    } else {
      setUserState(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminPass');
    setUserState(null);
  };

  return (
    <AdminAuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
