import { useState } from "react";
import { DONANTES } from "../data/donantes";
import { Donante } from "../types/donate";
import { DonanteModal } from "../components/ui/DonanteModal";
import { DonantesGrid } from "../components/ui/DonantesGrid";
import { DonarAhoraSection } from "../components/ui/DonarAhoraSection";

export function DonantesPage() {
    const [selectedDonante, setSelectedDonante] = useState<Donante | null>(null);

    return (
        <section className="bg-white">
            <DonantesGrid donantes={DONANTES} onLeerMas={setSelectedDonante} />
            <DonarAhoraSection />
            <DonanteModal donante={selectedDonante} onClose={() => setSelectedDonante(null)} />
        </section>
    );
}
