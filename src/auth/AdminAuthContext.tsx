import { createContext, useContext, useEffect, useState } from 'react';

interface AdminAuthContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    if (token && storedUser) {
      setUserState(storedUser);
    } else {
      setUserState(null);
    }
  }, []);

  const setUser = (user: string | null) => {
    if (user) {
      setUserState(user);
      localStorage.setItem('authUser', user);
    } else {
      setUserState(null);
      localStorage.removeItem('authUser');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setUserState(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
