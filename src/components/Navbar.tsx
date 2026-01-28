"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";

interface ItemNavigasi {
    label: string;
    href: string;
}

const daftarNavigasi: ItemNavigasi[] = [
    { label: "Home", href: "/" },
    { label: "Studios", href: "/studios" },
    { label: "About", href: "/about" },
];

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo + Navigation Links */}
                    <div className="flex items-center gap-12">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/images/logo.png"
                                alt="DIRO Pilates"
                                width={160}
                                height={50}
                                className="h-32 w-auto"
                                priority
                            />
                        </Link>

                        {/* Menu Desktop */}
                        <div className="hidden md:flex items-center gap-8">
                            {daftarNavigasi.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/register"
                            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-5 py-2 rounded-full font-medium transition-colors"
                        >
                            Sign up
                        </Link>
                        <Link
                            href="/login"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-colors"
                        >
                            Log in
                        </Link>
                    </div>

                    {/* Mobile Menu - Sheet */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <button
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Open menu"
                            >
                                <Menu className="w-6 h-6 text-gray-600" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                            <SheetHeader className="text-left">
                                <SheetTitle className="flex items-center">
                                    <Image
                                        src="/images/logo.png"
                                        alt="DIRO Pilates"
                                        width={120}
                                        height={40}
                                        className="h-24 w-auto"
                                    />
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-6 mt-8">
                                {/* Navigation Links */}
                                <div className="flex flex-col gap-4">
                                    {daftarNavigasi.map((item) => (
                                        <SheetClose asChild key={item.href}>
                                            <Link
                                                href={item.href}
                                                className="text-lg text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                                            >
                                                {item.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </div>

                                <hr className="border-gray-200" />

                                {/* Auth Buttons */}
                                <div className="flex flex-col gap-3">
                                    <SheetClose asChild>
                                        <Link
                                            href="/register"
                                            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-full font-medium text-center transition-colors"
                                        >
                                            Sign up
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            href="/login"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium text-center transition-colors"
                                        >
                                            Log in
                                        </Link>
                                    </SheetClose>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
