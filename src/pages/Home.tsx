import AboutUsPage from "./AboutUsPage";
import { DonantesPage } from "./DonantesPage";

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

            <AboutUsPage />
            <DonantesPage />
        </div>
    );
}

// Este Home es solo temporal, para que la app no esté vacía.
// Cuando se terminen los demas modulos, se eliminará y se reemplazará por el Home real.
// Ya cuando se reemplace se debe de ver como en la pagina oriniginal hacia abajo
