import { Donante } from "../../../types/donate";
import { DonanteCard } from "./DonanteCard";

interface GridProps {
    donantes: Donante[];
    onLeerMas: (donante: Donante) => void;
}

export const DonantesGrid = ({ donantes, onLeerMas }: GridProps) => (
    <section className="py-12 bg-white">
        <div className="text-center mb-10">
            <h2 className="text-5xl font-serif text-gray-800 mb-4">
                Quienes nos apoyan
            </h2>
            <p className="text-lg text-gray-700">
                Si desea formar parte de este selecto grupo, envíe un correo electrónico a:
            </p>
            <p className="text-lg text-gray-800">
                <a
                    href="mailto:donaciones@bomberosdenosara.org"
                    className="hover:underline"
                >
                    donaciones@bomberosdenosara.org
                </a>
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">
            {donantes.map((donante) => (
                <DonanteCard
                    key={donante.id}
                    donante={donante}
                    onClick={() => onLeerMas(donante)}
                />
            ))}
        </div>
    </section>
);
