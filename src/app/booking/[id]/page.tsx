"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, MapPin, Check, Loader2, User } from "lucide-react";
import {
    getCourtById,
    getStudioById,
    getMentorsByStudioId,
    daftarTimeslot,
    formatRupiah
} from "@/data";
import { createReservation } from "@/services";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import ScrollAnimate from "@/components/ScrollAnimate";

declare global {
    interface Window {
        snap: any;
    }
}

interface PageProps {
    params: { id: string };
}

export default function BookingPage({ params }: PageProps) {
    const router = useRouter();
    const courtId = parseInt(params.id);
    const court = getCourtById(courtId);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (!court) {
        notFound();
    }

    const studio = getStudioById(court.studioId);
    if (!studio) {
        notFound();
    }

    const mentors = getMentorsByStudioId(court.studioId);

    const [selectedMentor, setSelectedMentor] = useState<number | null>(null);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [bookingResult, setBookingResult] = useState<any>(null);

    const handleBooking = async () => {
        if (!date || !selectedTimeSlot || !selectedMentor) return;

        setIsSubmitting(true);
        try {
            const formattedDate = format(date, "yyyy-MM-dd");

            const data = await createReservation({
                court_id: court.id,
                timeslot_id: selectedTimeSlot,
                date: formattedDate,
                payment_method: "midtrans",
                bank_id: "",
                customer_name: "Test User",
                customer_email: "test@example.com",
                customer_phone: "08123456789"
            });

            if (data.snap_token && window.snap) {
                window.snap.pay(data.snap_token, {
                    onSuccess: function (result: any) {
                        setBookingResult(data.data);
                        setIsSuccess(true);
                        setIsSubmitting(false);
                    },
                    onPending: function (result: any) {
                        setBookingResult(data.data);
                        setIsSuccess(true);
                        setIsSubmitting(false);
                    },
                    onError: function (result: any) {
                        alert("Payment failed!");
                        setIsSubmitting(false);
                    },
                    onClose: function () {
                        alert("Payment cancelled.");
                        setIsSubmitting(false);
                    }
                });
            } else {
                setBookingResult(data.data);
                setIsSuccess(true);
                setIsSubmitting(false);
            }

        } catch (error: any) {
            alert("Booking Failed: " + error.message);
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        const selectedMentorData = mentors.find(m => m.id === selectedMentor);
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <ScrollAnimate animation="scale">
                    <div className="bg-gray-50 rounded-3xl p-8 max-w-md w-full border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
                        <p className="text-gray-600 mb-8">
                            You have successfully booked <span className="font-semibold">{court.nama}</span> at {studio.nama}.
                            <br />
                            <span className="text-sm text-gray-500 mt-2 block">Booking Code: <span className="font-mono font-bold text-gray-900">{bookingResult?.booking_code}</span></span>
                        </p>
                        <div className="bg-white rounded-xl p-4 mb-8 text-left space-y-3 border border-gray-100">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Instructor</span>
                                <span className="font-medium text-gray-900">{selectedMentorData?.nama}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Date</span>
                                <span className="font-medium text-gray-900">{format(date!, "PPP")}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Time</span>
                                <span className="font-medium text-gray-900">
                                    {daftarTimeslot.find(t => t.id === selectedTimeSlot)?.label}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Payment</span>
                                <span className="font-medium text-gray-900 capitalize">
                                    Midtrans
                                </span>
                            </div>
                        </div>
                        <Button
                            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 h-12"
                            onClick={() => router.push("/studios")}
                        >
                            Back to Studios
                        </Button>
                    </div>
                </ScrollAnimate>
            </div>
        );
    }

    if (isLoading) {
        return <BookingPageSkeleton />;
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 pt-28">
                {/* Page Title */}
                <ScrollAnimate animation="fade-up">
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Book Your Session</h1>
                        <p className="text-gray-500 mt-1">Select your preferred date and time</p>
                    </div>
                </ScrollAnimate>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Col: Class Details */}
                    <div className="lg:col-span-1 h-fit space-y-6">
                        <ScrollAnimate animation="fade-right" delay={100}>
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
                                    <Image
                                        src={court.gambar || studio.gambar}
                                        alt={court.nama}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{court.nama}</h2>
                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {studio.nama}
                                </div>
                                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                    {court.deskripsi}
                                </p>
                                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                    <span className="text-gray-500">Price</span>
                                    <span className="text-xl font-bold text-blue-600">{formatRupiah(court.harga)}</span>
                                </div>
                            </div>
                        </ScrollAnimate>
                    </div>

                    {/* Right Col: Booking Form */}
                    <div className="lg:col-span-2">
                        <ScrollAnimate animation="fade-up" delay={200}>
                            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Select Schedule</h2>

                                {/* Select Instructor */}
                                <div className="mb-8">
                                    <label className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                            <User className="w-3 h-3 text-blue-600" />
                                        </div>
                                        Select Instructor
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                        {mentors.map((mentor) => (
                                            <button
                                                key={mentor.id}
                                                onClick={() => setSelectedMentor(mentor.id)}
                                                className={cn(
                                                    "p-3 rounded-xl border transition-all text-center bg-white",
                                                    selectedMentor === mentor.id
                                                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                                                        : "border-gray-200 hover:border-blue-300"
                                                )}
                                            >
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden mx-auto mb-2">
                                                    <Image
                                                        src={mentor.foto}
                                                        alt={mentor.nama}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <p className="font-medium text-gray-900 text-sm truncate">{mentor.nama}</p>
                                                <p className="text-xs text-gray-500 truncate">{mentor.spesialisasi}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    {/* Pilih Tanggal */}
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                                <CalendarIcon className="w-3 h-3 text-blue-600" />
                                            </div>
                                            Select Date
                                        </label>
                                        <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-center mt-3">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                className="rounded-md"
                                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                            />
                                        </div>
                                    </div>

                                    {/* Pilih Waktu */}
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                                <Clock className="w-3 h-3 text-blue-600" />
                                            </div>
                                            Select Time
                                        </label>
                                        <div className="grid grid-cols-2 gap-3 h-fit max-h-[350px] overflow-y-auto pr-2 custom-scrollbar mt-3">
                                            {daftarTimeslot.map((slot) => (
                                                <button
                                                    key={slot.id}
                                                    onClick={() => setSelectedTimeSlot(slot.id)}
                                                    className={cn(
                                                        "px-3 py-2.5 text-sm rounded-xl border transition-all text-center bg-white",
                                                        selectedTimeSlot === slot.id
                                                            ? "border-blue-600 bg-blue-50 text-blue-600 font-semibold ring-2 ring-blue-100"
                                                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-600"
                                                    )}
                                                >
                                                    {slot.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Summary & Action */}
                                <div className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 mt-8">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Total Payment</p>
                                        <p className="text-2xl font-bold text-gray-900">{formatRupiah(court.harga)}</p>
                                    </div>
                                    <Button
                                        size="lg"
                                        className="w-full md:w-auto rounded-xl bg-blue-600 hover:bg-blue-700 hover:shadow-lg px-8 h-12 text-base transition-all"
                                        disabled={
                                            !date ||
                                            !selectedTimeSlot ||
                                            !selectedMentor ||
                                            isSubmitting
                                        }
                                        onClick={handleBooking}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            "Pay Now via Midtrans"
                                        )}
                                    </Button>
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
        <div className="min-h-screen bg-white pb-20">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 pt-28">
                <div className="mb-8">
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-48" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <Skeleton className="w-full h-48 rounded-xl mb-6" />
                            <Skeleton className="h-6 w-40 mb-2" />
                            <Skeleton className="h-4 w-32 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4 mb-6" />
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-6 w-28" />
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                            <Skeleton className="h-7 w-40 mb-6" />
                            
                            {/* Instructor Skeleton */}
                            <Skeleton className="h-5 w-32 mb-3" />
                            <div className="grid grid-cols-4 gap-3 mb-8">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="p-3 rounded-xl border border-gray-200 bg-white">
                                        <Skeleton className="w-12 h-12 rounded-full mx-auto mb-2" />
                                        <Skeleton className="h-4 w-16 mx-auto mb-1" />
                                        <Skeleton className="h-3 w-14 mx-auto" />
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <Skeleton className="h-5 w-28 mb-3" />
                                    <Skeleton className="h-72 w-full rounded-xl" />
                                </div>
                                <div>
                                    <Skeleton className="h-5 w-28 mb-3" />
                                    <div className="grid grid-cols-2 gap-3">
                                        {[...Array(8)].map((_, i) => (
                                            <Skeleton key={i} className="h-10 w-full rounded-xl" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Skeleton className="h-24 w-full rounded-xl mt-8" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
