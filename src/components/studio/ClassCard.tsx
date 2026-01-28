import Image from "next/image";
import Link from "next/link";
import { Users, Check } from "lucide-react";
import { Court } from "@/types";
import { formatRupiah } from "@/data";

interface ClassCardProps {
    court: Court;
}

export default function ClassCard({ court }: ClassCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col md:flex-row">
                {/* Gambar */}
                <div className="relative w-full md:w-80 h-56 shrink-0">
                    <Image
                        src={court.gambar || "https://images.unsplash.com/photo-1518611012118-696072aa579a"}
                        alt={court.nama}
                        fill
                        className="object-cover"
                    />
                </div>
                
                {/* Konten */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{court.nama}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                <Users className="w-4 h-4" /> Capacity: {court.kapasitas}
                            </span>
                            <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                <Check className="w-4 h-4" /> Equipment provided
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                            {court.deskripsi}. Perfect for improving core strength and flexibility.
                        </p>
                    </div>
                    
                    {/* Harga & Tombol */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-medium">Price per session</p>
                            <p className="text-lg font-bold text-blue-600">{formatRupiah(court.harga)}</p>
                        </div>
                        <Link
                            href={`/booking/${court.id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors inline-block text-center"
                        >
                            Book Class
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
