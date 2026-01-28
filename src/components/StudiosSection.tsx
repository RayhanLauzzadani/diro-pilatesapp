import Image from "next/image";
import Link from "next/link";
import { daftarStudio, formatRupiah } from "@/data";
import { daftarCourt } from "@/data";
import { ArrowRight } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="font-medium text-gray-900">{rating}</span>
        </div>
    );
}

function getHargaMulai(studioId: string): number {
    const courts = daftarCourt.filter((c) => c.studioId === studioId);
    if (courts.length === 0) return 0;
    return Math.min(...courts.map((c) => c.harga));
}

export default function StudiosSection() {
    return (
        <section id="studios" className="py-10 md:py-16 px-4 md:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Popular Studios</h2>
                        <p className="text-gray-600 mt-1">Discover top-rated Pilates studios near you</p>
                    </div>
                    <Link
                        href="/studios"
                        className="text-blue-600 hover:text-blue-700 font-medium hidden md:flex items-center gap-1 group"
                    >
                        View all studios
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {daftarStudio.map((studio) => (
                        <Link
                            key={studio.id}
                            href={`/studio/${studio.id}`}
                            className="bg-white rounded-2xl overflow-hidden group border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                        >
                            {/* Gambar Studio */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={studio.gambar}
                                    alt={studio.nama}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Info Studio */}
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-heading font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                        {studio.nama}
                                    </h3>
                                    <StarRating rating={studio.rating} />
                                </div>

                                <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {studio.lokasi}
                                </p>

                                {/* Fasilitas/Tags */}
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {studio.fasilitas.slice(0, 2).map((f) => (
                                        <span
                                            key={f}
                                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                        >
                                            {f}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-sm">
                                    <span className="text-gray-500 font-light">Starts from </span>
                                    <span className="font-semibold text-gray-900">
                                        {formatRupiah(getHargaMulai(studio.id))}
                                    </span>
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile View All */}
                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/studios"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        View all studios →
                    </Link>
                </div>
            </div>
        </section>
    );
}
