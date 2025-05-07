import { FC, useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import UserButtonItems from "./UserButtonItems";
import { useRouter } from "@tanstack/react-router";

const UserButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsOpen(false);
    router.navigate({ to: "/" });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu}>
        <FaUserCircle size={32} className="text-gray-700 hover:text-black" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
          {!isAuthenticated ? (
            <UserButtonItems label="Iniciar sesión" onClick={handleLogin} />
          ) : (
            <>
              <UserButtonItems label="Vista administrativa" to="/admin" />
              <UserButtonItems label="Configuración" to="/settings" />
              <hr className="my-1" />
              <UserButtonItems label="Cerrar sesión" onClick={handleLogout} isDanger />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserButton;
