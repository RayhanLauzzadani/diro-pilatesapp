"use client";

import { useState } from "react";
import { HeroBanner, SearchFormDesktop, SearchFormMobile } from "./hero";

export default function HeroSection() {
    const [lokasi, setLokasi] = useState("");
    const [lokasiOpen, setLokasiOpen] = useState(false);
    const [tanggal, setTanggal] = useState<Date | undefined>(undefined);
    const [waktu, setWaktu] = useState("");
    const [waktuOpen, setWaktuOpen] = useState(false);
    const [peserta, setPeserta] = useState("");
    const [pesertaOpen, setPesertaOpen] = useState(false);

    return (
        <div className="px-4 md:px-8 pt-4 md:pt-6 pb-8 md:pb-12">
            {/* Banner Utama */}
            <div className="relative max-w-7xl mx-auto">
                <HeroBanner />

                {/* Form Pencarian Desktop */}
                <SearchFormDesktop
                    lokasi={lokasi}
                    setLokasi={setLokasi}
                    lokasiOpen={lokasiOpen}
                    setLokasiOpen={setLokasiOpen}
                    tanggal={tanggal}
                    setTanggal={setTanggal}
                    waktu={waktu}
                    setWaktu={setWaktu}
                    waktuOpen={waktuOpen}
                    setWaktuOpen={setWaktuOpen}
                    peserta={peserta}
                    setPeserta={setPeserta}
                    pesertaOpen={pesertaOpen}
                    setPesertaOpen={setPesertaOpen}
                />

                {/* Form Pencarian Mobile */}
                <SearchFormMobile
                    lokasi={lokasi}
                    setLokasi={setLokasi}
                    tanggal={tanggal}
                    setTanggal={setTanggal}
                    waktu={waktu}
                    setWaktu={setWaktu}
                    peserta={peserta}
                    setPeserta={setPeserta}
                />
            </div>
        </div>
    );
}
