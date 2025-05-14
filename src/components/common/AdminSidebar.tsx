import { Link, useNavigate } from '@tanstack/react-router';
import { useAdminAuth } from '../../auth/AdminAuthContext';
import { useState, useEffect, useRef } from 'react';

export const AdminSidebar = () => {
  const { user, logout } = useAdminAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!user) {
      setIsOpen(false);
    }
  }, [user]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSidebar = () => {
    if (!user) {
      navigate({ to: '/login' });
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate({ to: '/' });
  };

  return (
    <>
      <button
        onClick={handleToggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded-md shadow-md text-gray-800 hover:bg-gray-200 transition"
        aria-label="Abrir panel admin"
      >
        ☰
      </button>

      {user && (
        <aside
          ref={sidebarRef}
          className={`
            w-64 h-screen fixed left-0 top-15 z-40 p-6 
            shadow-md bg-white/30 backdrop-blur-lg border-r border-white/40
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Panel Admin</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-600 text-xl font-bold"
              aria-label="Cerrar panel"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
           <Link
              to="/admin/noticias"
              className="text-red-600 hover:underline"
            >
              Noticias
            </Link>
            
            <Link
              to="/admin/donantes"
              className="text-red-600 hover:underline"
            >
              Donantes
            </Link>

            <button
              onClick={handleLogout}
              className="text-left text-red-600 hover:underline mt-4"
            >
              Cerrar sesión
            </button>
          </nav>
        </aside>
      )}
    </>
  );
};
