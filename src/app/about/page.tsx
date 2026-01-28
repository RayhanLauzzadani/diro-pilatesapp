"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Star,
    Users,
    Calendar,
    Award,
    Heart,
    CheckCircle,
    ArrowRight,
    Target,
    Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimate from "@/components/ScrollAnimate";
import { Skeleton } from "@/components/ui/skeleton";

export default function AboutPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const features = [
        {
            icon: Users,
            title: "Customer First",
            description: "Kepuasan pelanggan adalah prioritas utama dalam setiap keputusan yang kami ambil."
        },
        {
            icon: Target,
            title: "Inovasi Tanpa Henti",
            description: "Kami terus berinovasi untuk memberikan pengalaman booking terbaik."
        },
        {
            icon: Zap,
            title: "Kecepatan & Efisiensi",
            description: "Proses booking yang cepat dan efisien untuk menghemat waktu Anda."
        },
        {
            icon: Heart,
            title: "Kepercayaan",
            description: "Membangun kepercayaan melalui transparansi dan layanan berkualitas."
        }
    ];

    const stats = [
        { number: "10K+", label: "Mitra Aktif" },
        { number: "500K+", label: "Booking/Bulan" },
        { number: "50+", label: "Kota" }
    ];

    const values = [
        {
            title: "Kualitas",
            description: "Kami menjaga standar tinggi pada setiap mitra yang bekerja sama dengan kami."
        },
        {
            title: "Aksesibilitas",
            description: "Membuat layanan berkualitas dapat diakses oleh semua orang."
        },
        {
            title: "Inovasi",
            description: "Terus meningkatkan platform untuk pengalaman booking yang seamless."
        },
        {
            title: "Komunitas",
            description: "Membangun koneksi antara bisnis, profesional, dan pelanggan."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    <div className="text-center max-w-3xl mx-auto">
                        <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                            Tentang Kami
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Tentang
                            <span className="block text-blue-200">DIRO</span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                            DIRO adalah platform booking layanan #1 di Indonesia yang menghubungkan
                            pelanggan dengan ribuan bisnis terpercaya. Kami berkomitmen untuk
                            mempermudah proses booking dan membantu bisnis berkembang.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative -mt-12 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollAnimate animation="fade-up">
                        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {isLoading ? (
                                <>
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="text-center">
                                            <Skeleton className="h-10 w-24 mx-auto mb-2" />
                                            <Skeleton className="h-4 w-20 mx-auto" />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                stats.map((stat, index) => (
                                    <ScrollAnimate 
                                        key={stat.label} 
                                        animation="scale" 
                                        delay={((index + 1) * 100) as 100 | 200 | 300}
                                    >
                                        <div className="text-center">
                                            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">{stat.number}</p>
                                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                        </div>
                                    </ScrollAnimate>
                                ))
                            )}
                        </div>
                    </ScrollAnimate>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <ScrollAnimate animation="fade-right">
                            <div className="relative">
                                {isLoading ? (
                                    <Skeleton className="h-[400px] md:h-[500px] rounded-2xl" />
                                ) : (
                                    <>
                                        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                            <Image
                                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200"
                                                alt="Tim DIRO"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {/* Floating Card */}
                                        <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-lg hidden md:block">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <Award className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">Sejak 2020</p>
                                                    <p className="text-sm text-gray-500">Menghubungkan pelanggan & bisnis</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </ScrollAnimate>

                        <ScrollAnimate animation="fade-left">
                            <div>
                                {isLoading ? (
                                    <>
                                        <Skeleton className="h-6 w-24 rounded-full mb-4" />
                                        <Skeleton className="h-10 w-80 mb-6" />
                                        <Skeleton className="h-4 w-full mb-2" />
                                        <Skeleton className="h-4 w-full mb-2" />
                                        <Skeleton className="h-4 w-3/4 mb-4" />
                                        <Skeleton className="h-4 w-full mb-2" />
                                        <Skeleton className="h-4 w-full mb-2" />
                                        <Skeleton className="h-4 w-2/3" />
                                    </>
                                ) : (
                                    <>
                                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
                                            Misi Kami
                                        </span>
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                            Mempermudah Akses Layanan Berkualitas
                                        </h2>
                                        <div className="space-y-4 text-gray-600 leading-relaxed">
                                            <p>
                                                Mempermudah akses layanan berkualitas untuk semua orang di
                                                Indonesia melalui teknologi yang inovatif dan user-friendly.
                                            </p>
                                            <p>
                                                Kami percaya bahwa setiap orang berhak mendapatkan
                                                pengalaman booking yang mudah, cepat, dan terpercaya.
                                                Dengan DIRO, pelanggan dapat menemukan dan memesan
                                                layanan favorit mereka hanya dalam beberapa klik.
                                            </p>
                                            <p>
                                                Jaringan mitra kami yang terkurasi memastikan bahwa setiap pengalaman
                                                memenuhi standar tinggi dalam kualitas, profesionalisme, dan pelayanan.
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </ScrollAnimate>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollAnimate animation="fade-up">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            {isLoading ? (
                                <>
                                    <Skeleton className="h-6 w-32 mx-auto rounded-full mb-4" />
                                    <Skeleton className="h-10 w-96 mx-auto mb-4" />
                                    <Skeleton className="h-4 w-64 mx-auto" />
                                </>
                            ) : (
                                <>
                                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
                                        Nilai-Nilai Kami
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                        Prinsip yang Menjadi Fondasi Kami
                                    </h2>
                                    <p className="text-gray-600">
                                        Prinsip yang menjadi fondasi dalam setiap langkah kami
                                    </p>
                                </>
                            )}
                        </div>
                    </ScrollAnimate>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {isLoading ? (
                            <>
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                                        <Skeleton className="w-14 h-14 rounded-xl mb-5" />
                                        <Skeleton className="h-6 w-32 mb-2" />
                                        <Skeleton className="h-4 w-full mb-1" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                ))}
                            </>
                        ) : (
                            features.map((feature, index) => (
                                <ScrollAnimate 
                                    key={feature.title} 
                                    animation="scale" 
                                    delay={((index + 1) * 100) as 100 | 200 | 300 | 400}
                                >
                                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group h-full">
                                        <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                                            <feature.icon className="w-7 h-7 text-blue-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                </ScrollAnimate>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <ScrollAnimate animation="fade-right">
                            <div>
                                {isLoading ? (
                                    <>
                                        <Skeleton className="h-6 w-28 rounded-full mb-4" />
                                        <Skeleton className="h-10 w-72 mb-6" />
                                        <Skeleton className="h-4 w-full mb-8" />
                                        <div className="space-y-6">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <Skeleton className="w-6 h-6 rounded-full shrink-0" />
                                                    <div className="flex-1">
                                                        <Skeleton className="h-5 w-24 mb-1" />
                                                        <Skeleton className="h-4 w-full" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
                                            Mengapa DIRO
                                        </span>
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                            Yang Mendorong Kami Setiap Hari
                                        </h2>
                                        <p className="text-gray-600 mb-8">
                                            Nilai-nilai kami memandu semua yang kami lakukan—dari pemilihan mitra
                                            hingga desain setiap fitur di platform kami.
                                        </p>

                                        <div className="space-y-6">
                                            {values.map((value, index) => (
                                                <ScrollAnimate 
                                                    key={value.title} 
                                                    animation="fade-up" 
                                                    delay={((index + 1) * 100) as 100 | 200 | 300 | 400}
                                                >
                                                    <div className="flex gap-4">
                                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-gray-900 mb-1">{value.title}</h3>
                                                            <p className="text-gray-600 text-sm">{value.description}</p>
                                                        </div>
                                                    </div>
                                                </ScrollAnimate>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </ScrollAnimate>

                        <ScrollAnimate animation="fade-left">
                            <div className="relative">
                                {isLoading ? (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <Skeleton className="h-48 rounded-2xl" />
                                            <Skeleton className="h-64 rounded-2xl" />
                                        </div>
                                        <div className="space-y-4 pt-8">
                                            <Skeleton className="h-64 rounded-2xl" />
                                            <Skeleton className="h-48 rounded-2xl" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <div className="relative h-48 rounded-2xl overflow-hidden">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=600"
                                                    alt="Pilates Class"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="relative h-64 rounded-2xl overflow-hidden">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600"
                                                    alt="Pilates Equipment"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4 pt-8">
                                            <div className="relative h-64 rounded-2xl overflow-hidden">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600"
                                                    alt="Pilates Session"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="relative h-48 rounded-2xl overflow-hidden">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600"
                                                    alt="Studio Interior"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollAnimate>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <ScrollAnimate animation="fade-up">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Siap Memulai Perjalanan Anda?
                        </h2>
                        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                            Bergabunglah dengan ribuan pelanggan yang telah menemukan
                            pengalaman booking terbaik melalui platform kami.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/studios"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors"
                            >
                                Jelajahi Studios
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
                            >
                                Kembali ke Beranda
                            </Link>
                        </div>
                    </ScrollAnimate>
                </div>
            </section>

            <Footer />
        </div>
    );
}
