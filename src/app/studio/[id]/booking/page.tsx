"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, User, CreditCard, Wallet } from "lucide-react";
import {
    getStudioById,
    getCourtsByStudioId,
    getMentorsByStudioId,
    daftarTimeslot,
    formatRupiah
} from "@/data";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollAnimate from "@/components/ScrollAnimate";

interface PageProps {
    params: { id: string };
}

export default function BookingFormPage({ params }: PageProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);

    const studio = getStudioById(params.id);
    if (!studio) {
        notFound();
    }

    const courts = getCourtsByStudioId(params.id);
    const mentors = getMentorsByStudioId(params.id);

    const tanggal = searchParams.get("date") || "";
    const timeslotId = parseInt(searchParams.get("timeslot") || "0");
    const courtId = parseInt(searchParams.get("court") || "0");
    const mentorId = parseInt(searchParams.get("mentor") || "0");

    const timeslot = daftarTimeslot.find((t) => t.id === timeslotId);
    const court = courts.find((c) => c.id === courtId);
    const mentor = mentors.find((m) => m.id === mentorId);

    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        telepon: "",
        catatan: "",
        metodePembayaran: "online" as "online" | "venue",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        const bookingCode = `DIRO-${Date.now().toString(36).toUpperCase()}`;

        router.push(
            `/studio/${params.id}/success?code=${bookingCode}&date=${tanggal}&timeslot=${timeslotId}&court=${courtId}&mentor=${mentorId}&payment=${formData.metodePembayaran}`
        );
    };

    if (!timeslot || !court || !mentor) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Invalid Booking Data</h1>
                    <p className="text-gray-500 mb-6">Please select your booking details first.</p>
                    <Link 
                        href={`/studio/${params.id}`} 
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                    >
                        Back to Studio
                    </Link>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return <BookingPageSkeleton />;
    }

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="max-w-5xl mx-auto px-4">
                {/* Page Title */}
                <ScrollAnimate animation="fade-up">
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Complete Your Booking</h1>
                        <p className="text-gray-500 mt-1">Fill in your details to confirm your session</p>
                    </div>
                </ScrollAnimate>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <ScrollAnimate animation="fade-up" delay={100}>
                            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Personal Info */}
                                    <div>
                                        <h2 className="font-semibold text-lg mb-5 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <User className="w-4 h-4 text-blue-600" />
                                            </div>
                                            Personal Information
                                        </h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    value={formData.nama}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Email *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                        placeholder="your@email.com"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Phone (WhatsApp) *
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="telepon"
                                                        value={formData.telepon}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                        placeholder="+62 812 3456 7890"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Notes (Optional)
                                                </label>
                                                <textarea
                                                    name="catatan"
                                                    value={formData.catatan}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
                                                    placeholder="Any special requests or notes..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Method */}
                                    <div>
                                        <h2 className="font-semibold text-lg mb-5 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <CreditCard className="w-4 h-4 text-blue-600" />
                                            </div>
                                            Payment Method
                                        </h2>
                                        <div className="space-y-3">
                                            <label
                                                className={`flex items-center gap-4 p-4 bg-white border rounded-xl cursor-pointer transition-all ${formData.metodePembayaran === "online"
                                                        ? "border-blue-500 ring-2 ring-blue-100"
                                                        : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.metodePembayaran === "online" ? "border-blue-600" : "border-gray-300"}`}>
                                                    {formData.metodePembayaran === "online" && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="metodePembayaran"
                                                    value="online"
                                                    checked={formData.metodePembayaran === "online"}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            metodePembayaran: e.target.value as "online" | "venue",
                                                        }))
                                                    }
                                                    className="sr-only"
                                                />
                                                <Wallet className="w-5 h-5 text-gray-400" />
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">Pay Online</div>
                                                    <div className="text-sm text-gray-500">
                                                        Bank Transfer, E-Wallet, or Credit Card
                                                    </div>
                                                </div>
                                            </label>
                                            <label
                                                className={`flex items-center gap-4 p-4 bg-white border rounded-xl cursor-pointer transition-all ${formData.metodePembayaran === "venue"
                                                        ? "border-blue-500 ring-2 ring-blue-100"
                                                        : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.metodePembayaran === "venue" ? "border-blue-600" : "border-gray-300"}`}>
                                                    {formData.metodePembayaran === "venue" && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="metodePembayaran"
                                                    value="venue"
                                                    checked={formData.metodePembayaran === "venue"}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            metodePembayaran: e.target.value as "online" | "venue",
                                                        }))
                                                    }
                                                    className="sr-only"
                                                />
                                                <MapPin className="w-5 h-5 text-gray-400" />
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">Pay at Venue</div>
                                                    <div className="text-sm text-gray-500">
                                                        Pay when you arrive at the studio
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-semibold transition-all hover:shadow-lg disabled:hover:shadow-none"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            `Confirm Booking • ${formatRupiah(court.harga)}`
                                        )}
                                    </button>
                                </form>
                            </div>
                        </ScrollAnimate>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <ScrollAnimate animation="fade-left" delay={200}>
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-24">
                                <h3 className="font-semibold text-lg mb-5">Booking Summary</h3>

                                <div className="space-y-5">
                                    {/* Studio */}
                                    <div className="flex gap-4 items-center">
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={studio.gambar}
                                                alt={studio.nama}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{studio.nama}</h4>
                                            <p className="text-gray-500 text-sm flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {studio.lokasi}
                                            </p>
                                        </div>
                                    </div>

                                    <hr className="border-gray-200" />

                                    {/* Details */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                                <Calendar className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs">Date</p>
                                                <p className="font-medium text-gray-900">
                                                    {new Date(tanggal).toLocaleDateString("en-US", {
                                                        weekday: "short",
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs">Time</p>
                                                <p className="font-medium text-gray-900">{timeslot.label}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs">Class</p>
                                                <p className="font-medium text-gray-900">{court.nama}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                                <User className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs">Instructor</p>
                                                <p className="font-medium text-gray-900">{mentor.nama}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="border-gray-200" />

                                    {/* Total */}
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-900">Total</span>
                                        <span className="text-xl font-bold text-blue-600">
                                            {formatRupiah(court.harga)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimate>
                    </div>
                </div>
            </div>
        </div>
    );
}

{/* Skeleton Component */}
function BookingPageSkeleton() {
    return (
        <div className="min-h-screen bg-white py-8">
            <div className="max-w-5xl mx-auto px-4">
                <div className="mb-8">
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-48" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                            <div className="space-y-8">
                                <div>
                                    <Skeleton className="h-6 w-48 mb-5" />
                                    <div className="space-y-4">
                                        <Skeleton className="h-12 w-full rounded-xl" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Skeleton className="h-12 w-full rounded-xl" />
                                            <Skeleton className="h-12 w-full rounded-xl" />
                                        </div>
                                        <Skeleton className="h-24 w-full rounded-xl" />
                                    </div>
                                </div>
                                <div>
                                    <Skeleton className="h-6 w-40 mb-5" />
                                    <div className="space-y-3">
                                        <Skeleton className="h-20 w-full rounded-xl" />
                                        <Skeleton className="h-20 w-full rounded-xl" />
                                    </div>
                                </div>
                                <Skeleton className="h-14 w-full rounded-xl" />
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <Skeleton className="h-6 w-36 mb-5" />
                            <div className="flex gap-4 items-center mb-5">
                                <Skeleton className="w-16 h-16 rounded-xl" />
                                <div>
                                    <Skeleton className="h-5 w-32 mb-1" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                            <hr className="border-gray-200 mb-5" />
                            <div className="space-y-3">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Skeleton className="w-8 h-8 rounded-lg" />
                                        <div>
                                            <Skeleton className="h-3 w-12 mb-1" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr className="border-gray-200 my-5" />
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-5 w-12" />
                                <Skeleton className="h-7 w-28" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
