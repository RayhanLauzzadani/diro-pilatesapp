"use client";

import Image from "next/image";
import Link from "next/link";

interface KelasPopuler {
    id: string;
    nama: string;
    level: string;
    gambar: string;
    ukuran: "besar" | "kecil";
}

const daftarKelas: KelasPopuler[] = [
    {
        id: "1",
        nama: "Mat Pilates",
        level: "Beginner",
        gambar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800",
        ukuran: "besar",
    },
    {
        id: "2",
        nama: "Core Foundation",
        level: "Intermediate",
        gambar: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800",
        ukuran: "kecil",
    },
    {
        id: "3",
        nama: "Reformer Flow",
        level: "Advanced",
        gambar: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800",
        ukuran: "kecil",
    },
    {
        id: "4",
        nama: "Expert Training",
        level: "Masterclass",
        gambar: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800",
        ukuran: "besar",
    },
];

const getLevelColor = (level: string) => {
    switch (level) {
        case "Beginner":
            return "bg-green-100 text-green-700";
        case "Intermediate":
            return "bg-blue-100 text-blue-700";
        case "Advanced":
            return "bg-purple-100 text-purple-700";
        case "Masterclass":
            return "bg-amber-100 text-amber-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export default function ClassesSection() {
    return (
        <section className="py-10 md:py-16 px-4 md:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                    Popular Classes
                </h2>

                {/* Grid Layout - 4 Columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {daftarKelas.map((kelas) => (
                        <Link
                            key={kelas.id}
                            href={`/classes/${kelas.id}`}
                            className="block relative h-48 md:h-64 rounded-2xl overflow-hidden group"
                        >
                            <Image
                                src={kelas.gambar}
                                alt={kelas.nama}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getLevelColor(kelas.level)}`}>
                                    {kelas.level}
                                </span>
                                <p className="text-white font-medium text-sm">{kelas.nama}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

