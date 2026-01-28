"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, User, LogOut } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import type { User as SupabaseUser } from "@supabase/supabase-js";

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
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
        router.refresh();
    };

    const getUserDisplayName = () => {
        if (!user) return "";
        return user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
    };

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
                        <div className="hidden md:flex items-center gap-1">
                            {daftarNavigasi.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "px-4 py-2 rounded-full font-medium transition-all",
                                        isActive(item.href)
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Auth Buttons Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        {loading ? (
                            <div className="w-20 h-10 bg-gray-100 rounded-full animate-pulse" />
                        ) : user ? (
                            <>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">{getUserDisplayName()}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 border border-gray-300 hover:border-red-400 hover:text-red-600 text-gray-700 px-4 py-2 rounded-full font-medium transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/signup"
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
                            </>
                        )}
                    </div>

                    {/* Mobile Menu */}
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
                                {/* Navigation Links Mobile */}
                                <div className="flex flex-col gap-2">
                                    {daftarNavigasi.map((item) => (
                                        <SheetClose asChild key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "text-lg font-medium py-3 px-4 rounded-xl transition-all",
                                                    isActive(item.href)
                                                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                                                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                                )}
                                            >
                                                {item.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </div>

                                <hr className="border-gray-200" />

                                {/* Auth Buttons Mobile */}
                                <div className="flex flex-col gap-3">
                                    {loading ? (
                                        <div className="w-full h-12 bg-gray-100 rounded-full animate-pulse" />
                                    ) : user ? (
                                        <>
                                            <div className="flex items-center gap-2 text-gray-700 py-2">
                                                <User className="w-5 h-5" />
                                                <span className="font-medium">{getUserDisplayName()}</span>
                                            </div>
                                            <SheetClose asChild>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center justify-center gap-2 border border-gray-300 hover:border-red-400 hover:text-red-600 text-gray-700 px-6 py-3 rounded-full font-medium transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Logout
                                                </button>
                                            </SheetClose>
                                        </>
                                    ) : (
                                        <>
                                            <SheetClose asChild>
                                                <Link
                                                    href="/signup"
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
                                        </>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
