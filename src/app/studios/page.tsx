"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { daftarStudio, daftarCourt, formatRupiah } from "@/data";
import { MapPin, Star, Clock, ChevronDown, Search, ArrowLeft } from "lucide-react";

// Get price range for a studio
function getStudioPriceRange(studioId: string) {
    const courts = daftarCourt.filter(c => c.studioId === studioId);
    if (courts.length === 0) return { min: 0, max: 0 };
    const prices = courts.map(c => c.harga);
    return { min: Math.min(...prices), max: Math.max(...prices) };
}

const locations = ["Jakarta Selatan", "Jakarta Pusat", "Bandung", "Surabaya"];
const classTypes = ["Reformer", "Mat Pilates", "Private", "Group", "Yoga"];
const priceRanges = [
    { label: "Under Rp 100.000", min: 0, max: 100000 },
    { label: "Rp 100.000 - Rp 150.000", min: 100000, max: 150000 },
    { label: "Rp 150.000 - Rp 200.000", min: 150000, max: 200000 },
    { label: "Above Rp 200.000", min: 200000, max: Infinity },
];

export default function StudiosPage() {
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedClassTypes, setSelectedClassTypes] = useState<string[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState("rating");

    // Filter studios
    const filteredStudios = daftarStudio.filter(studio => {
        if (selectedLocation && studio.lokasi !== selectedLocation) return false;
        if (selectedClassTypes.length > 0) {
            const hasMatchingClass = studio.fasilitas.some(f => selectedClassTypes.includes(f));
            if (!hasMatchingClass) return false;
        }
        if (selectedPriceRange !== null) {
            const priceRange = getStudioPriceRange(studio.id);
            const selectedRange = priceRanges[selectedPriceRange];
            if (priceRange.min > selectedRange.max || priceRange.max < selectedRange.min) return false;
        }
        return true;
    });

    // Sort studios
    const sortedStudios = [...filteredStudios].sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "reviews") return b.totalReview - a.totalReview;
        return 0;
    });

    const toggleClassType = (type: string) => {
        setSelectedClassTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const getRatingLabel = (rating: number) => {
        if (rating >= 4.8) return { label: "Excellent", color: "text-green-600" };
        if (rating >= 4.5) return { label: "Very good", color: "text-blue-600" };
        if (rating >= 4.0) return { label: "Good", color: "text-yellow-600" };
        return { label: "Average", color: "text-gray-600" };
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar - Filters */}
                    <aside className="w-full lg:w-72 shrink-0">
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                            <h2 className="font-semibold text-gray-900 mb-4">Your Search</h2>

                            {/* Location */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <select
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="">All Locations</option>
                                        {locations.map(loc => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Search Button */}
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors mb-6 flex items-center justify-center gap-2">
                                <Search className="w-4 h-4" />
                                Search
                            </button>

                            <hr className="border-gray-100 mb-6" />

                            {/* Class Type Filter */}
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900 mb-3">Class Type</h3>
                                <div className="space-y-2">
                                    {classTypes.map(type => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedClassTypes.includes(type)}
                                                onChange={() => toggleClassType(type)}
                                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-600">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range Filter */}
                            <div>
                                <h3 className="font-medium text-gray-900 mb-3">Price per Session</h3>
                                <div className="space-y-2">
                                    {priceRanges.map((range, index) => (
                                        <label key={index} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="priceRange"
                                                checked={selectedPriceRange === index}
                                                onChange={() => setSelectedPriceRange(selectedPriceRange === index ? null : index)}
                                                className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-600">{range.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Content - Studio List */}
                    <main className="flex-1">
                        {/* Results Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <p className="text-sm text-gray-500">{sortedStudios.length} studios found</p>
                                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                                    Pilates Studios {selectedLocation && `in ${selectedLocation}`}
                                </h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Sort by</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="rating">Highest Rating</option>
                                    <option value="reviews">Most Reviews</option>
                                </select>
                            </div>
                        </div>

                        {/* Studio Cards */}
                        <div className="space-y-4">
                            {sortedStudios.map(studio => {
                                const priceRange = getStudioPriceRange(studio.id);
                                const ratingInfo = getRatingLabel(studio.rating);

                                return (
                                    <div
                                        key={studio.id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            {/* Image */}
                                            <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0">
                                                <Image
                                                    src={studio.gambar}
                                                    alt={studio.nama}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 p-5">
                                                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                                                    {/* Left Info */}
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                                            <Link href={`/studio/${studio.id}`}>{studio.nama}</Link>
                                                        </h3>
                                                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                                            <MapPin className="w-3.5 h-3.5" />
                                                            {studio.lokasi}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {studio.jamOperasional}
                                                        </div>

                                                        {/* Facilities/Tags */}
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {studio.fasilitas.map(f => (
                                                                <span
                                                                    key={f}
                                                                    className="px-2.5 py-1 text-xs font-medium border border-blue-200 text-blue-600 rounded-full"
                                                                >
                                                                    {f}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Right Info - Rating & Price */}
                                                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2 md:text-right">
                                                        <div className="flex items-center gap-2">
                                                            <div>
                                                                <span className={`text-sm font-medium ${ratingInfo.color}`}>
                                                                    {ratingInfo.label}
                                                                </span>
                                                                <p className="text-xs text-gray-400">{studio.totalReview} reviews</p>
                                                            </div>
                                                            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg font-semibold">
                                                                {studio.rating}
                                                            </div>
                                                        </div>

                                                        <div className="mt-auto pt-4">
                                                            <p className="text-lg font-bold text-gray-900">
                                                                {formatRupiah(priceRange.min)}
                                                            </p>
                                                            <p className="text-xs text-gray-400">starting from</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* CTA Button */}
                                                <Link
                                                    href={`/studio/${studio.id}`}
                                                    className="mt-4 w-full md:w-auto inline-block bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-2.5 rounded-xl font-medium transition-colors"
                                                >
                                                    See booking options
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Empty State */}
                        {sortedStudios.length === 0 && (
                            <div className="bg-white rounded-2xl p-12 text-center">
                                <p className="text-gray-500">No studios found matching your criteria.</p>
                                <button
                                    onClick={() => {
                                        setSelectedLocation("");
                                        setSelectedClassTypes([]);
                                        setSelectedPriceRange(null);
                                    }}
                                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
