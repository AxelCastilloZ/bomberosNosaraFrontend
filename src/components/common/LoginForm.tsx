import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAdminAuth } from '../../auth/AdminAuthContext';
import { authenticateAdmin } from '../../auth/AdminAuth';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAdminAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = authenticateAdmin(username, password);

    if (isValid) {
      localStorage.setItem('adminUser', username);
      localStorage.setItem('adminPass', password);
      setUser(username);
      navigate({ to: '/admin' });
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión como Administrador</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 font-medium">
            Usuario
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-medium">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}