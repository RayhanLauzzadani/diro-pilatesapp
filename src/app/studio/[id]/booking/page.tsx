"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    getStudioById,
    getCourtsByStudioId,
    getMentorsByStudioId,
    daftarTimeslot,
    formatRupiah
} from "@/data";

interface PageProps {
    params: { id: string };
}

export default function BookingFormPage({ params }: PageProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

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
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Invalid Booking Data</h1>
                    <Link href={`/studio/${params.id}`} className="text-blue-600 hover:underline">
                        ← Back to studio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <Link
                    href={`/studio/${params.id}`}
                    className="text-blue-600 hover:underline text-sm mb-6 inline-block"
                >
                    ← Back to {studio.nama}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Info */}
                                <div>
                                    <h2 className="font-semibold mb-4">Personal Information</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="nama"
                                                value={formData.nama}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone Number (WhatsApp) *
                                            </label>
                                            <input
                                                type="tel"
                                                name="telepon"
                                                value={formData.telepon}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder="+62 812 3456 7890"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Notes (Optional)
                                            </label>
                                            <textarea
                                                name="catatan"
                                                value={formData.catatan}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                                placeholder="Any special requests or notes..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div>
                                    <h2 className="font-semibold mb-4">Payment Method</h2>
                                    <div className="space-y-3">
                                        <label
                                            className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${formData.metodePembayaran === "online"
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
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
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <div>
                                                <div className="font-medium">Pay Online</div>
                                                <div className="text-sm text-gray-500">
                                                    Pay now via Bank Transfer, E-Wallet, or Credit Card
                                                </div>
                                            </div>
                                        </label>
                                        <label
                                            className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${formData.metodePembayaran === "venue"
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
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
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <div>
                                                <div className="font-medium">Pay at Venue</div>
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
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-semibold transition-colors"
                                >
                                    {loading ? "Processing..." : `Confirm Booking - ${formatRupiah(court.harga)}`}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                            <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>

                            <div className="space-y-4">
                                {/* Studio */}
                                <div className="flex gap-3">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={studio.gambar}
                                            alt={studio.nama}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">{studio.nama}</h4>
                                        <p className="text-gray-500 text-sm">{studio.lokasi}</p>
                                    </div>
                                </div>

                                <hr />

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Date</span>
                                        <span className="font-medium">
                                            {new Date(tanggal).toLocaleDateString("id-ID", {
                                                weekday: "short",
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Time</span>
                                        <span className="font-medium">{timeslot.label}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Room</span>
                                        <span className="font-medium">{court.nama}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Mentor</span>
                                        <span className="font-medium">{mentor.nama}</span>
                                    </div>
                                </div>

                                <hr />

                                <div className="flex justify-between text-lg">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-bold text-blue-600">
                                        {formatRupiah(court.harga)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
