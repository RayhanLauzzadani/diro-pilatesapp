"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    return (
        <>
            {!isAuthPage && <Navbar />}
            <main className={!isAuthPage ? "pt-16" : ""}>
                {children}
            </main>
        </>
    );
}
