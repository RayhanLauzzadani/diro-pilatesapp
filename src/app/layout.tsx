import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "DIRO - Find & Book Pilates Studios",
  description: "Discover the best Pilates studios near you and book your session in minutes. DIRO connects you with top-rated studios and expert instructors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} ${poppins.variable} font-body antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
        {/* Midtrans Snap JS */}
        <script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        ></script>
      </body>
    </html>
  );
}

