"use client";

import { format } from "date-fns";

const daftarLokasi = [
    { value: "jakarta-selatan", label: "Jakarta Selatan" },
    { value: "jakarta-pusat", label: "Jakarta Pusat" },
    { value: "bandung", label: "Bandung" },
    { value: "surabaya", label: "Surabaya" },
];

const daftarWaktu = [
    { value: "07:00", label: "07:00" },
    { value: "08:00", label: "08:00" },
    { value: "09:00", label: "09:00" },
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "14:00", label: "14:00" },
    { value: "15:00", label: "15:00" },
    { value: "16:00", label: "16:00" },
    { value: "17:00", label: "17:00" },
    { value: "18:00", label: "18:00" },
];

const daftarPeserta = [
    { value: "1", label: "1 Person" },
    { value: "2", label: "2 People" },
    { value: "3", label: "3 People" },
    { value: "4", label: "4 People" },
    { value: "5", label: "5 People" },
];

interface SearchFormMobileProps {
    lokasi: string;
    setLokasi: (value: string) => void;
    tanggal: Date | undefined;
    setTanggal: (value: Date | undefined) => void;
    waktu: string;
    setWaktu: (value: string) => void;
    peserta: string;
    setPeserta: (value: string) => void;
}

export default function SearchFormMobile({
    lokasi, setLokasi,
    tanggal, setTanggal,
    waktu, setWaktu,
    peserta, setPeserta
}: SearchFormMobileProps) {
    return (
        <div className="md:hidden mt-6">
            <div className="bg-white rounded-3xl p-5" style={{ boxShadow: '0px 1px 12px rgba(3,3,3,0.1)' }}>
                {/* Lokasi */}
                <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Location</label>
                    <select
                        value={lokasi}
                        onChange={(e) => setLokasi(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Choose a studio</option>
                        {daftarLokasi.map((location) => (
                            <option key={location.value} value={location.value}>
                                {location.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tanggal */}
                <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Date</label>
                    <input
                        type="date"
                        value={tanggal ? format(tanggal, "yyyy-MM-dd") : ""}
                        onChange={(e) => setTanggal(e.target.value ? new Date(e.target.value) : undefined)}
                        min={format(new Date(), "yyyy-MM-dd")}
                        className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Waktu & Peserta */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Time</label>
                        <select
                            value={waktu}
                            onChange={(e) => setWaktu(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select time</option>
                            {daftarWaktu.map((time) => (
                                <option key={time.value} value={time.value}>
                                    {time.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">People</label>
                        <select
                            value={peserta}
                            onChange={(e) => setPeserta(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select</option>
                            {daftarPeserta.map((p) => (
                                <option key={p.value} value={p.value}>
                                    {p.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Tombol Cari */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-full font-medium transition-colors">
                    Search Classes
                </button>
            </div>
        </div>
    );
}
