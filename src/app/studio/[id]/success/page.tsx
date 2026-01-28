"use client";

import { useSearchParams } from "next/navigation";
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

export default function BookingSuccessPage({ params }: PageProps) {
    const searchParams = useSearchParams();

    const studio = getStudioById(params.id);
    if (!studio) {
        notFound();
    }

    const courts = getCourtsByStudioId(params.id);
    const mentors = getMentorsByStudioId(params.id);

    const bookingCode = searchParams.get("code") || "";
    const tanggal = searchParams.get("date") || "";
    const timeslotId = parseInt(searchParams.get("timeslot") || "0");
    const courtId = parseInt(searchParams.get("court") || "0");
    const mentorId = parseInt(searchParams.get("mentor") || "0");
    const paymentMethod = searchParams.get("payment") || "online";

    const timeslot = daftarTimeslot.find((t) => t.id === timeslotId);
    const court = courts.find((c) => c.id === courtId);
    const mentor = mentors.find((m) => m.id === mentorId);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-lg mx-auto px-4">
                <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Booking Confirmed!
                    </h1>
                    <p className="text-gray-500 mb-6">
                        Your pilates session has been successfully booked
                    </p>

                    {/* Booking Code */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <p className="text-sm text-gray-500 mb-1">Booking Code</p>
                        <p className="text-2xl font-bold text-blue-600">{bookingCode}</p>
                    </div>

                    {/* Booking Details */}
                    <div className="text-left space-y-4 mb-8">
                        <div className="flex justify-between py-3 border-b">
                            <span className="text-gray-500">Studio</span>
                            <span className="font-medium">{studio.nama}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b">
                            <span className="text-gray-500">Location</span>
                            <span className="font-medium">{studio.lokasi}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b">
                            <span className="text-gray-500">Date</span>
                            <span className="font-medium">
                                {tanggal && new Date(tanggal).toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex justify-between py-3 border-b">
                            <span className="text-gray-500">Time</span>
                            <span className="font-medium">{timeslot?.label}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b">
                            <span className="text-gray-500">Room</span>
                            <span className="font-medium">{court?.nama}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b">
                            <span className="text-gray-500">Mentor</span>
                            <span className="font-medium">{mentor?.nama}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b">
                            <span className="text-gray-500">Payment</span>
                            <span className={`font-medium ${paymentMethod === "online" ? "text-green-600" : "text-orange-600"}`}>
                                {paymentMethod === "online" ? "Paid Online" : "Pay at Venue"}
                            </span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span className="text-gray-500">Total</span>
                            <span className="font-bold text-lg text-blue-600">
                                {court && formatRupiah(court.harga)}
                            </span>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
                        <p className="text-sm text-blue-800">
                            📧 A confirmation email has been sent to your email address. Please show this booking code when you arrive at the studio.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <Link
                            href="/"
                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition-colors"
                        >
                            Back to Home
                        </Link>
                        <Link
                            href={`/studio/${params.id}`}
                            className="block w-full border border-gray-200 hover:bg-gray-50 text-gray-700 py-4 rounded-xl font-semibold transition-colors"
                        >
                            Book Another Session
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
