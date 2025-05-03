import { useState } from "react";
import { DONANTES } from "../data/donantes";
import { Donante } from "../types/donate";
import { DonanteModal } from "../components/ui/Donante/DonanteModal";
import { DonantesGrid } from "../components/ui/Donante/DonantesGrid";
import { DonarAhoraSection } from "../components/ui/Donante/DonarAhoraSection";
import { DonationDetails } from "../components/ui/Donante/DonationDetails";

export function DonantesPage() {
    const [selectedDonante, setSelectedDonante] = useState<Donante | null>(null);

    return (
        <section className="bg-white">
            <DonantesGrid donantes={DONANTES} onLeerMas={setSelectedDonante} />
            <DonarAhoraSection />
            <DonanteModal donante={selectedDonante} onClose={() => setSelectedDonante(null)} />
            <DonationDetails />
        </section>
    );
}
