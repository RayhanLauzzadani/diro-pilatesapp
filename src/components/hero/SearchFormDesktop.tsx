"use client";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const daftarLokasi = [
    { value: "jakarta-selatan", label: "Jakarta Selatan" },
    { value: "jakarta-pusat", label: "Jakarta Pusat" },
    { value: "bandung", label: "Bandung" },
    { value: "surabaya", label: "Surabaya" },
];

const daftarWaktu = [
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

const daftarPeserta = [
    { value: "1", label: "1 Person" },
    { value: "2", label: "2 People" },
    { value: "3", label: "3 People" },
    { value: "4", label: "4 People" },
    { value: "5", label: "5 People" },
];

interface SearchFormDesktopProps {
    lokasi: string;
    setLokasi: (value: string) => void;
    lokasiOpen: boolean;
    setLokasiOpen: (value: boolean) => void;
    tanggal: Date | undefined;
    setTanggal: (value: Date | undefined) => void;
    waktu: string;
    setWaktu: (value: string) => void;
    waktuOpen: boolean;
    setWaktuOpen: (value: boolean) => void;
    peserta: string;
    setPeserta: (value: string) => void;
    pesertaOpen: boolean;
    setPesertaOpen: (value: boolean) => void;
}

export default function SearchFormDesktop({
    lokasi, setLokasi, lokasiOpen, setLokasiOpen,
    tanggal, setTanggal,
    waktu, setWaktu, waktuOpen, setWaktuOpen,
    peserta, setPeserta, pesertaOpen, setPesertaOpen
}: SearchFormDesktopProps) {
    return (
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 -bottom-10 z-20 w-full px-4">
            <div className="max-w-4xl mx-auto">
                <div
                    className="bg-white rounded-full px-6 py-4 flex items-center gap-4"
                    style={{ boxShadow: '0px 1px 12px rgba(3,3,3,0.1)' }}
                >
                    {/* Lokasi */}
                    <div className="flex-1 border-r border-gray-200 pr-4">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
                        <Popover open={lokasiOpen} onOpenChange={setLokasiOpen}>
                            <PopoverTrigger asChild>
                                <button className="w-full flex items-center justify-between text-left text-sm focus:outline-none bg-transparent cursor-pointer">
                                    <span className={cn(lokasi ? "text-gray-900" : "text-gray-500")}>
                                        {lokasi ? daftarLokasi.find((l) => l.value === lokasi)?.label : "Choose a studio"}
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
                                            {daftarLokasi.map((location) => (
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

                    {/* Tanggal */}
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

                    {/* Waktu */}
                    <div className="flex-1 w-full md:w-auto md:border-r border-gray-200 md:pr-4">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Time</label>
                        <Popover open={waktuOpen} onOpenChange={setWaktuOpen}>
                            <PopoverTrigger asChild>
                                <button className="w-full flex items-center justify-between text-left text-sm focus:outline-none bg-transparent cursor-pointer">
                                    <span className={cn(waktu ? "text-gray-900" : "text-gray-500")}>
                                        {waktu ? daftarWaktu.find((t) => t.value === waktu)?.label : "Select time"}
                                    </span>
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-400" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[150px] p-0" align="start">
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {daftarWaktu.map((time) => (
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

                    {/* Peserta */}
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Participants</label>
                        <Popover open={pesertaOpen} onOpenChange={setPesertaOpen}>
                            <PopoverTrigger asChild>
                                <button className="w-full flex items-center justify-between text-left text-sm focus:outline-none bg-transparent cursor-pointer">
                                    <span className={cn(peserta ? "text-gray-900" : "text-gray-500")}>
                                        {peserta ? daftarPeserta.find((p) => p.value === peserta)?.label : "Number of people"}
                                    </span>
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-400" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[150px] p-0" align="start">
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {daftarPeserta.map((p) => (
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

                    {/* Tombol Cari */}
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transition-colors shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
