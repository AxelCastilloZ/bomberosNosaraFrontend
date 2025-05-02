import { Link } from '@tanstack/react-router';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-serif font-light text-gray-900 mb-6">
        Bienvenido a Bomberos Nosara
      </h1>

      <p className="text-lg text-gray-700 max-w-xl mb-8 leading-relaxed">
        Nos dedicamos a servir a la comunidad de Nosara con compromiso, integridad y acción. 
        Conocé más sobre nuestros aliados y cómo podés apoyar nuestra labor.
      </p>

      <Link
        to="/donantes"
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all duration-300"
      >
        Ir a Donantes
      </Link>
    </div>
  );
}
