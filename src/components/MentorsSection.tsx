import Image from "next/image";
import Link from "next/link";
import { daftarMentor } from "@/data";
import { ArrowRight } from "lucide-react";

export default function MentorsSection() {
    const mentorsTampil = daftarMentor.slice(0, 4);

    return (
        <section id="mentors" className="py-16 px-4 md:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Judul & Link */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
                            Expert Instructors
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Certified Pilates instructors dedicated to your fitness journey
                        </p>
                    </div>
                    <Link
                        href="/instructors"
                        className="text-blue-600 hover:text-blue-700 font-medium hidden md:flex items-center gap-1 group"
                    >
                        View all instructors
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Daftar Mentor */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {mentorsTampil.map((mentor) => (
                        <div
                            key={mentor.id}
                            className="bg-white rounded-2xl p-6 text-center group border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                        >
                            {/* Foto Mentor */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-full overflow-hidden">
                                <Image
                                    src={mentor.foto}
                                    alt={mentor.nama}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>

                            {/* Info Mentor */}
                            <h3 className="font-heading font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {mentor.nama}
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">
                                {mentor.spesialisasi}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Tombol Lihat Semua (Mobile) */}
                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/instructors"
                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                    >
                        View all instructors
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
