"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const locations = [
    { value: "jakarta-selatan", label: "Jakarta Selatan" },
    { value: "jakarta-pusat", label: "Jakarta Pusat" },
    { value: "bandung", label: "Bandung" },
    { value: "surabaya", label: "Surabaya" },
];

const times = [
    { value: "07:00", label: "07:00" },
    { value: "08:00", label: "08:00" },
    { value: "09:00", label: "09:00" },
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "14:00", label: "14:00" },
    { value: "15:00", label: "15:00" },
    { value: "16:00", label: "16:00" },
    { value: "17:00", label: "17:00" },
    { value: "18:00", label: "18:00" },
];

const participants = [
    { value: "1", label: "1 Person" },
    { value: "2", label: "2 People" },
    { value: "3", label: "3 People" },
    { value: "4", label: "4 People" },
    { value: "5", label: "5 People" },
];

export default function HeroSection() {
    const [lokasi, setLokasi] = useState("");
    const [lokasiOpen, setLokasiOpen] = useState(false);
    const [tanggal, setTanggal] = useState<Date | undefined>(undefined);
    const [waktu, setWaktu] = useState("");
    const [waktuOpen, setWaktuOpen] = useState(false);
    const [peserta, setPeserta] = useState("");
    const [pesertaOpen, setPesertaOpen] = useState(false);

    return (
        <div className="px-4 md:px-8 pt-4 md:pt-6 pb-8 md:pb-12">
            {/* Hero Card Container */}
            <div className="relative max-w-7xl mx-auto">
                <section
                    className="relative h-[290px] md:h-[320px] flex items-center justify-center overflow-hidden"
                    style={{ borderRadius: '32px' }}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070')",
                            borderRadius: '32px',
                        }}
                    />

                    {/* Overlay */}
                    <div
                        className="absolute inset-0"
                        style={{ backgroundColor: 'rgba(3,3,3,0.48)', borderRadius: '32px' }}
                    />

                    {/* Content */}
                    <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                        {/* Headline */}
                        <div className="mb-6">
                            <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                                Reserve your spot with DIRO Pilates
                            </h1>
                        </div>

                        <p className="font-body text-base md:text-lg text-gray-200 font-light tracking-wide">
                            Join our community of wellness enthusiasts!
                        </p>
                    </div>
                </section>

                {/* Desktop Booking Bar - Hidden on Mobile */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 -bottom-10 z-20 w-full px-4">
                    <div className="max-w-4xl mx-auto">
                        <div
                            className="bg-white rounded-full px-6 py-4 flex items-center gap-4"
                            style={{ boxShadow: '0px 1px 12px rgba(3,3,3,0.1)' }}
                        >
                            {/* Location - Combobox */}
                            <div className="flex-1 border-r border-gray-200 pr-4">
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
                                <Popover open={lokasiOpen} onOpenChange={setLokasiOpen}>
                                    <PopoverTrigger asChild>
                                        <button className="w-full flex items-center justify-between text-left text-sm focus:outline-none bg-transparent cursor-pointer">
                                            <span className={cn(lokasi ? "text-gray-900" : "text-gray-500")}>
                                                {lokasi ? locations.find((l) => l.value === lokasi)?.label : "Choose a studio"}
                                            </span>
                                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-400" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0" align="start">
                                        <Command>
                                            <CommandInput placeholder="Search location..." />
                                            <CommandList>
                                                <CommandEmpty>No location found.</CommandEmpty>
                                                <CommandGroup>
                                                    {locations.map((location) => (
                                                        <CommandItem
                                                            key={location.value}
                                                            value={location.value}
                                                            onSelect={(currentValue) => {
                                                                setLokasi(currentValue === lokasi ? "" : currentValue);
                                                                setLokasiOpen(false);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    lokasi === location.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {location.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Date - Calendar */}
                            <div className="flex-1 w-full md:w-auto md:border-r border-gray-200 md:pr-4">
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Date</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="w-full flex items-center justify-between text-left text-sm focus:outline-none bg-transparent cursor-pointer">
                                            <span className={cn(tanggal ? "text-gray-900" : "text-gray-500")}>
                                                {tanggal ? format(tanggal, "dd MMM yyyy") : "Select date"}
                                            </span>
                                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-400" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={tanggal}
                                            onSelect={setTanggal}
                                            initialFocus
                                            disabled={(date) => date < new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Time - Combobox */}
                            <div className="flex-1 w-full md:w-auto md:border-r border-gray-200 md:pr-4">
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Time</label>
                                <Popover open={waktuOpen} onOpenChange={setWaktuOpen}>
                                    <PopoverTrigger asChild>
                                        <button className="w-full flex items-center justify-between text-left text-sm focus:outline-none bg-transparent cursor-pointer">
                                            <span className={cn(waktu ? "text-gray-900" : "text-gray-500")}>
                                                {waktu ? times.find((t) => t.value === waktu)?.label : "Select time"}
                                            </span>
                                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-400" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[150px] p-0" align="start">
                                        <Command>
                                            <CommandList>
                                                <CommandGroup>
                                                    {times.map((time) => (
                                                        <CommandItem
                                                            key={time.value}
                                                            value={time.value}
                                                            onSelect={(currentValue) => {
                                                                setWaktu(currentValue === waktu ? "" : currentValue);
                                                                setWaktuOpen(false);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    waktu === time.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {time.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Participants - Combobox */}
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Participants</label>
                                <Popover open={pesertaOpen} onOpenChange={setPesertaOpen}>
                                    <PopoverTrigger asChild>
                                        <button className="w-full flex items-center justify-between text-left text-sm focus:outline-none bg-transparent cursor-pointer">
                                            <span className={cn(peserta ? "text-gray-900" : "text-gray-500")}>
                                                {peserta ? participants.find((p) => p.value === peserta)?.label : "Number of people"}
                                            </span>
                                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-400" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[150px] p-0" align="start">
                                        <Command>
                                            <CommandList>
                                                <CommandGroup>
                                                    {participants.map((p) => (
                                                        <CommandItem
                                                            key={p.value}
                                                            value={p.value}
                                                            onSelect={(currentValue) => {
                                                                setPeserta(currentValue === peserta ? "" : currentValue);
                                                                setPesertaOpen(false);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    peserta === p.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {p.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Submit Button */}
                            <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transition-colors shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Booking Form - Visible on Mobile Only */}
                <div className="md:hidden mt-6">
                    <div className="bg-white rounded-3xl p-5" style={{ boxShadow: '0px 1px 12px rgba(3,3,3,0.1)' }}>
                        {/* Location */}
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-700 mb-2">Location</label>
                            <select
                                value={lokasi}
                                onChange={(e) => setLokasi(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Choose a studio</option>
                                {locations.map((location) => (
                                    <option key={location.value} value={location.value}>
                                        {location.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date */}
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                value={tanggal ? format(tanggal, "yyyy-MM-dd") : ""}
                                onChange={(e) => setTanggal(e.target.value ? new Date(e.target.value) : undefined)}
                                min={format(new Date(), "yyyy-MM-dd")}
                                className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Time & People */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">Time</label>
                                <select
                                    value={waktu}
                                    onChange={(e) => setWaktu(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select time</option>
                                    {times.map((time) => (
                                        <option key={time.value} value={time.value}>
                                            {time.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">People</label>
                                <select
                                    value={peserta}
                                    onChange={(e) => setPeserta(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select</option>
                                    {participants.map((p) => (
                                        <option key={p.value} value={p.value}>
                                            {p.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Search Button */}
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-full font-medium transition-colors">
                            Search Classes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
