"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { daftarStudio, daftarCourt, formatRupiah } from "@/data";
import { MapPin, Clock, Search, CalendarDays } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import ScrollAnimate from "@/components/ScrollAnimate";

function getStudioPriceRange(studioId: string) {
    const courts = daftarCourt.filter(c => c.studioId === studioId);
    if (courts.length === 0) return { min: 0, max: 0 };
    const prices = courts.map(c => c.harga);
    return { min: Math.min(...prices), max: Math.max(...prices) };
}

const daftarLokasi = ["Jakarta Selatan", "Jakarta Pusat", "Bandung", "Surabaya"];
const jenisKelas = ["Reformer", "Mat Pilates", "Private", "Group", "Yoga"];
const rentangHarga = [
    { label: "Under Rp 100.000", min: 0, max: 100000 },
    { label: "Rp 100.000 - Rp 150.000", min: 100000, max: 150000 },
    { label: "Rp 150.000 - Rp 200.000", min: 150000, max: 200000 },
    { label: "Above Rp 200.000", min: 200000, max: Infinity },
];

export default function StudiosPage() {
    const [lokasiTerpilih, setLokasiTerpilih] = useState("");
    const [tanggalTerpilih, setTanggalTerpilih] = useState<Date | undefined>(undefined);
    const [jenisKelasTerpilih, setJenisKelasTerpilih] = useState<string[]>([]);
    const [rentangHargaTerpilih, setRentangHargaTerpilih] = useState<number | null>(null);
    const [urutkanBerdasar, setUrutkanBerdasar] = useState("rating");
    const [isLoading, setIsLoading] = useState(true);
    const [openLocation, setOpenLocation] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const studioTerfilter = daftarStudio.filter(studio => {
        if (lokasiTerpilih && studio.lokasi !== lokasiTerpilih) return false;
        if (jenisKelasTerpilih.length > 0) {
            const hasMatchingClass = studio.fasilitas.some(f => jenisKelasTerpilih.includes(f));
            if (!hasMatchingClass) return false;
        }
        if (rentangHargaTerpilih !== null) {
            const priceRange = getStudioPriceRange(studio.id);
            const selectedRange = rentangHarga[rentangHargaTerpilih];
            if (priceRange.min > selectedRange.max || priceRange.max < selectedRange.min) return false;
        }
        return true;
    });

    const studioTerurut = [...studioTerfilter].sort((a, b) => {
        if (urutkanBerdasar === "rating") return b.rating - a.rating;
        if (urutkanBerdasar === "reviews") return b.totalReview - a.totalReview;
        return 0;
    });

    const toggleJenisKelas = (type: string) => {
        setJenisKelasTerpilih(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const getLabelRating = (rating: number) => {
        if (rating >= 4.8) return { label: "Excellent", color: "text-green-600" };
        if (rating >= 4.5) return { label: "Very good", color: "text-blue-600" };
        if (rating >= 4.0) return { label: "Good", color: "text-yellow-600" };
        return { label: "Average", color: "text-gray-600" };
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filter */}
                    <aside className="w-full lg:w-80 shrink-0">
                        <div className="bg-gray-50 rounded-2xl p-6 sticky top-24 border border-gray-100">
                            <h2 className="font-semibold text-gray-900 mb-6 text-lg">Your Search</h2>

                            {/* Lokasi - Shadcn Combobox */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                <Popover open={openLocation} onOpenChange={setOpenLocation}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openLocation}
                                            className="w-full justify-between h-11 rounded-xl border-gray-200 bg-white hover:bg-gray-50"
                                        >
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                <span className={lokasiTerpilih ? "text-gray-900" : "text-gray-400"}>
                                                    {lokasiTerpilih || "Select location"}
                                                </span>
                                            </div>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0" align="start">
                                        <Command>
                                            <CommandInput placeholder="Search location..." />
                                            <CommandList>
                                                <CommandEmpty>No location found.</CommandEmpty>
                                                <CommandGroup>
                                                    <CommandItem
                                                        value=""
                                                        onSelect={() => {
                                                            setLokasiTerpilih("");
                                                            setOpenLocation(false);
                                                        }}
                                                    >
                                                        All Locations
                                                    </CommandItem>
                                                    {daftarLokasi.map(loc => (
                                                        <CommandItem
                                                            key={loc}
                                                            value={loc}
                                                            onSelect={() => {
                                                                setLokasiTerpilih(loc);
                                                                setOpenLocation(false);
                                                            }}
                                                        >
                                                            {loc}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Tanggal - Shadcn Calendar */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start h-11 rounded-xl border-gray-200 bg-white hover:bg-gray-50",
                                                !tanggalTerpilih && "text-gray-400"
                                            )}
                                        >
                                            <CalendarDays className="mr-2 h-4 w-4 text-gray-400" />
                                            {tanggalTerpilih ? format(tanggalTerpilih, "PPP") : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={tanggalTerpilih}
                                            onSelect={setTanggalTerpilih}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Tombol Cari */}
                            <Button className="w-full h-11 rounded-xl mb-6">
                                <Search className="w-4 h-4 mr-2" />
                                Search
                            </Button>

                            <hr className="border-gray-200 mb-6" />

                            {/* Filter Jenis Kelas - Shadcn Checkbox */}
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900 mb-4">Class Type</h3>
                                <div className="space-y-3">
                                    {jenisKelas.map(type => (
                                        <label 
                                            key={type} 
                                            className="flex items-center gap-3 cursor-pointer group"
                                        >
                                            <Checkbox
                                                id={type}
                                                checked={jenisKelasTerpilih.includes(type)}
                                                onCheckedChange={() => toggleJenisKelas(type)}
                                                className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                            />
                                            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                                {type}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Filter Harga - Custom Radio */}
                            <div>
                                <h3 className="font-medium text-gray-900 mb-4">Price per Session</h3>
                                <div className="space-y-3">
                                    {rentangHarga.map((range, index) => (
                                        <label 
                                            key={index} 
                                            className={cn(
                                                "flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition-all",
                                                rentangHargaTerpilih === index 
                                                    ? "border-blue-500 bg-blue-50" 
                                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                            )}
                                        >
                                            <div 
                                                className={cn(
                                                    "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
                                                    rentangHargaTerpilih === index 
                                                        ? "border-blue-600" 
                                                        : "border-gray-300"
                                                )}
                                            >
                                                {rentangHargaTerpilih === index && (
                                                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                                                )}
                                            </div>
                                            <input
                                                type="radio"
                                                name="priceRange"
                                                checked={rentangHargaTerpilih === index}
                                                onChange={() => setRentangHargaTerpilih(rentangHargaTerpilih === index ? null : index)}
                                                className="sr-only"
                                            />
                                            <span className={cn(
                                                "text-sm transition-colors",
                                                rentangHargaTerpilih === index ? "text-blue-700 font-medium" : "text-gray-600"
                                            )}>
                                                {range.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Daftar Studio */}
                    <main className="flex-1">
                        {/* Header Hasil */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                {isLoading ? (
                                    <>
                                        <Skeleton className="h-4 w-24 mb-2" />
                                        <Skeleton className="h-7 w-48" />
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm text-gray-500">{studioTerurut.length} studios found</p>
                                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                                            Pilates Studios {lokasiTerpilih && `in ${lokasiTerpilih}`}
                                        </h1>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Sort by</span>
                                <select
                                    value={urutkanBerdasar}
                                    onChange={(e) => setUrutkanBerdasar(e.target.value)}
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="rating">Highest Rating</option>
                                    <option value="reviews">Most Reviews</option>
                                </select>
                            </div>
                        </div>

                        {/* Kartu Studio */}
                        <div className="space-y-4">
                            {isLoading ? (
                                <>
                                    {[...Array(3)].map((_, i) => (
                                        <StudioListCardSkeleton key={i} />
                                    ))}
                                </>
                            ) : (
                                studioTerurut.map((studio, index) => {
                                    const priceRange = getStudioPriceRange(studio.id);
                                    const ratingInfo = getLabelRating(studio.rating);

                                    return (
                                        <ScrollAnimate
                                            key={studio.id}
                                            animation="fade-up"
                                            delay={((index % 3) + 1) * 100 as 100 | 200 | 300}
                                        >
                                            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all">
                                                <div className="flex flex-col md:flex-row">
                                                    {/* Gambar */}
                                                    <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0">
                                                        <Image
                                                            src={studio.gambar}
                                                            alt={studio.nama}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>

                                                    {/* Konten */}
                                                    <div className="flex-1 p-5">
                                                        <div className="flex flex-col md:flex-row md:justify-between gap-4">
                                                            {/* Info Kiri */}
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

                                                                {/* Fasilitas */}
                                                                <div className="flex flex-wrap gap-2 mt-3">
                                                                    {studio.fasilitas.map(f => (
                                                                        <span
                                                                            key={f}
                                                                            className="px-2.5 py-1 text-xs font-medium border border-blue-200 text-blue-600 rounded-full bg-blue-50"
                                                                        >
                                                                            {f}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Info Kanan - Rating & Harga */}
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

                                                        {/* Tombol Lihat */}
                                                        <Link
                                                            href={`/studio/${studio.id}`}
                                                            className="mt-4 w-full md:w-auto inline-block bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-2.5 rounded-xl font-medium transition-colors"
                                                        >
                                                            See booking options
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </ScrollAnimate>
                                    );
                                })
                            )}
                        </div>

                        {/* State Kosong */}
                        {!isLoading && studioTerurut.length === 0 && (
                            <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-100">
                                <p className="text-gray-500">No studios found matching your criteria.</p>
                                <button
                                    onClick={() => {
                                        setLokasiTerpilih("");
                                        setJenisKelasTerpilih([]);
                                        setRentangHargaTerpilih(null);
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

{/* Skeleton untuk Studio List Card */}
function StudioListCardSkeleton() {
    return (
        <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
            <div className="flex flex-col md:flex-row">
                <Skeleton className="w-full md:w-72 h-48 md:h-52" />
                <div className="flex-1 p-5">
                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                        <div className="flex-1">
                            <Skeleton className="h-6 w-48 mb-2" />
                            <Skeleton className="h-4 w-32 mb-1" />
                            <Skeleton className="h-4 w-28 mb-3" />
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-14 rounded-full" />
                            </div>
                        </div>
                        <div className="flex md:flex-col items-center md:items-end gap-2">
                            <div className="flex items-center gap-2">
                                <div>
                                    <Skeleton className="h-4 w-16 mb-1" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <Skeleton className="w-10 h-10 rounded-lg" />
                            </div>
                            <div className="mt-4">
                                <Skeleton className="h-6 w-24 mb-1" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                    </div>
                    <Skeleton className="mt-4 h-10 w-40 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
