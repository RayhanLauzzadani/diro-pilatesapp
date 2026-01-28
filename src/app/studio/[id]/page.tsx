"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    getStudioById,
    getCourtsByStudioId,
    getMentorsByStudioId,
    formatRupiah
} from "@/data";
import {
    MapPin,
    Star,
    Check,
    Users,
    Heart
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface PageProps {
    params: { id: string };
}

export default function StudioDetailPage({ params }: PageProps) {
    const studio = getStudioById(params.id);
    const courts = getCourtsByStudioId(params.id);
    const mentors = getMentorsByStudioId(params.id);

    if (!studio) {
        notFound();
    }

    // Mock images for gallery (using court images + studio image)
    const galleryImages = [
        studio.gambar,
        ...courts.map(c => c.gambar).slice(0, 4)
    ];
    // Fill if not enough images
    while (galleryImages.length < 5) {
        galleryImages.push(studio.gambar);
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">

                {/* Image Gallery - Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8">
                    {/* Main Image (Large) */}
                    <div className="col-span-1 md:col-span-2 row-span-2 relative">
                        <Image src={galleryImages[0]} alt="Main View" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    {/* Secondary Images */}
                    <div className="hidden md:block relative h-full">
                        <Image src={galleryImages[1]} alt="View 2" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="hidden md:block relative h-full">
                        <Image src={galleryImages[2]} alt="View 3" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="hidden md:block relative h-full">
                        <Image src={galleryImages[3]} alt="View 4" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="hidden md:block relative h-full">
                        <Image src={galleryImages[4]} alt="View 5" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                </div>

                {/* Header Info */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{studio.nama}</h1>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < Math.round(studio.rating) ? "fill-current" : "text-gray-300"}`} />
                                ))}
                            </div>
                            <span className="mr-2">•</span>
                            <MapPin className="w-4 h-4 mr-1" />
                            {studio.alamat}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-semibold text-green-600">Excellent</p>
                            <p className="text-xs text-gray-500">{studio.totalReview} reviews</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center font-bold text-lg">
                            {studio.rating}
                        </div>
                    </div>
                </div>

                {/* Shadcn Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full justify-start bg-white border-b border-gray-100 rounded-none h-auto p-0 mb-8">
                        <TabsTrigger
                            value="overview"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:shadow-none px-4 py-3"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="classes"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:shadow-none px-4 py-3"
                        >
                            Classes
                        </TabsTrigger>
                        <TabsTrigger
                            value="instructors"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:shadow-none px-4 py-3"
                        >
                            Instructors
                        </TabsTrigger>
                        <TabsTrigger
                            value="reviews"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:shadow-none px-4 py-3"
                        >
                            Reviews
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab Content - Shows All Sections */}
                    <TabsContent value="overview" className="mt-0 space-y-12">
                        {/* About Section */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">About {studio.nama}</h2>
                                    <div className="mb-6">
                                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
                                            {studio.details.studioType}
                                        </span>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            {studio.deskripsi}
                                        </p>
                                        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                                            <h3 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">Coaching Style</h3>
                                            <p className="text-gray-600 italic">"{studio.details.coachingStyle}"</p>
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-gray-900 mb-3">Services & Focus</h3>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {studio.details.serviceFocus.map(focus => (
                                            <span key={focus} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700">
                                                {focus}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="font-bold text-gray-900 mb-3">Amenities</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {studio.details.amenities.map(amenity => (
                                            <div key={amenity} className="flex items-center gap-3 text-sm text-gray-600">
                                                <Check className="w-4 h-4 text-blue-500" /> {amenity}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="lg:w-1/3 bg-white border border-gray-100 rounded-xl p-6 h-fit shadow-sm">
                                    <h3 className="font-semibold text-gray-900 mb-4">Why choose us?</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3 text-sm text-gray-600">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                                                <Users className="w-4 h-4" />
                                            </div>
                                            <span>Small group sizes for personalized attention</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-gray-600">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                                                <Star className="w-4 h-4" />
                                            </div>
                                            <span>Certified & experienced instructors</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-gray-600">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                                                <Heart className="w-4 h-4" />
                                            </div>
                                            <span>Supportive community atmosphere</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Classes Section in Overview */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Available Classes</h2>
                            <div className="grid grid-cols-1 gap-6">
                                {courts.map((court) => (
                                    <div key={court.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="relative w-full md:w-80 h-56 shrink-0">
                                                <Image
                                                    src={court.gambar || "https://images.unsplash.com/photo-1518611012118-696072aa579a"}
                                                    alt={court.nama}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
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
                                ))}
                            </div>
                        </div>

                        {/* Instructors Section in Overview */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Our Instructors</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {mentors.map((mentor) => (
                                    <div key={mentor.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                                                <Image
                                                    src={mentor.foto}
                                                    alt={mentor.nama}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{mentor.nama}</h3>
                                                <p className="text-sm text-blue-600 font-medium">{mentor.spesialisasi}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm">{mentor.bio}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section in Overview */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-blue-600">{studio.rating}/5</h2>
                                    <p className="text-gray-600">Based on {studio.totalReview} verified reviews</p>
                                </div>
                                <button className="text-blue-600 font-medium hover:underline hidden md:block">Read all reviews</button>
                            </div>
                            <div className="space-y-4 max-w-lg">
                                {[
                                    { label: "Cleanliness", score: "4.9" },
                                    { label: "Instructor Quality", score: "4.8" },
                                    { label: "Facilities", score: "4.7" },
                                    { label: "Value for Money", score: "4.8" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-4">
                                        <span className="text-sm font-medium text-gray-700 w-32">{item.label}</span>
                                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(parseFloat(item.score) / 5) * 100}%` }} />
                                        </div>
                                        <span className="text-sm font-bold text-gray-900 w-8">{item.score}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Classes Tab Content */}
                    <TabsContent value="classes" className="mt-0">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Available Classes</h2>
                        <div className="grid grid-cols-1 gap-6">
                            {courts.map((court) => (
                                <div key={court.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="relative w-full md:w-80 h-56 shrink-0">
                                            <Image
                                                src={court.gambar || "https://images.unsplash.com/photo-1518611012118-696072aa579a"}
                                                alt={court.nama}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-bold text-gray-900">{court.nama}</h3>
                                                </div>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                                        <Users className="w-4 h-4" /> Capacity: {court.kapasitas}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                                        <Check className="w-4 h-4" /> Equipment provided
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                                    {court.deskripsi}. Perfect for those looking to improve core strength and flexibility in a focused environment.
                                                </p>
                                            </div>

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
                            ))}
                        </div>
                    </TabsContent>

                    {/* Instructors Tab Content */}
                    <TabsContent value="instructors" className="mt-0">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Our Instructors</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mentors.map((mentor) => (
                                <div key={mentor.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                                            <Image
                                                src={mentor.foto}
                                                alt={mentor.nama}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{mentor.nama}</h3>
                                            <p className="text-sm text-blue-600 font-medium">{mentor.spesialisasi}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm">{mentor.bio}</p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Reviews Tab Content */}
                    <TabsContent value="reviews" className="mt-0">
                        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-blue-600">{studio.rating}/5</h2>
                                    <p className="text-gray-600">Based on {studio.totalReview} verified reviews</p>
                                </div>
                                <div className="hidden md:block">
                                    <button className="text-blue-600 font-medium hover:underline">Read all reviews</button>
                                </div>
                            </div>

                            {/* Rating Bars (Mock) */}
                            <div className="space-y-4 max-w-lg mb-8">
                                {[
                                    { label: "Cleanliness", score: "4.9" },
                                    { label: "Instructor Quality", score: "4.8" },
                                    { label: "Facilities", score: "4.7" },
                                    { label: "Value for Money", score: "4.8" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-4">
                                        <span className="text-sm font-medium text-gray-700 w-32">{item.label}</span>
                                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(parseFloat(item.score) / 5) * 100}%` }} />
                                        </div>
                                        <span className="text-sm font-bold text-gray-900 w-8">{item.score}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

            </div>
        </div >
    );
}
