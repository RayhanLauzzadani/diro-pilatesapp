import { Studio, Court, Mentor, Timeslot } from "@/types";

export const daftarStudio: Studio[] = [
  {
    id: "zen-pilates",
    nama: "Zen Pilates Studio",
    lokasi: "Jakarta Selatan",
    alamat: "Jl. Kemang Raya No. 45, Jakarta Selatan",
    rating: 4.8,
    totalReview: 124,
    deskripsi: "Zen Pilates Studio adalah studio pilates premium yang menawarkan pengalaman latihan terbaik dengan instruktur bersertifikat internasional. Dilengkapi dengan peralatan Reformer terbaru dan suasana yang tenang.",
    gambar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
    fasilitas: ["Reformer", "Private"],
    jamOperasional: "06:00 - 21:00",
    details: {
        studioType: "Premium Boutique Studio",
        serviceFocus: ["Reformer Groups", "Private Sessions", "Prenatal Pilates"],
        coachingStyle: "STOTT Pilates Certified Instructors focusing on precision and anatomical correctness.",
        amenities: ["Luxury Shower Rooms", "Dyson Hair Dryers", "Aesop Toiletries", "Lounge Area", "Valet Parking"]
    }
  },
  {
    id: "core-studio",
    nama: "Core Pilates Center",
    lokasi: "Jakarta Pusat",
    alamat: "Jl. Sudirman No. 123, Jakarta Pusat",
    rating: 4.9,
    totalReview: 89,
    deskripsi: "Core Pilates Center adalah pusat pilates modern di jantung Jakarta. Kami menyediakan berbagai kelas dari pemula hingga advanced dengan fokus pada core strength dan posture improvement.",
    gambar: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1200",
    fasilitas: ["Reformer", "Group"],
    jamOperasional: "07:00 - 22:00",
    details: {
        studioType: "Modern Clinical Studio",
        serviceFocus: ["Rehabilitation", "Post-Injury Recovery", "Core Strength"],
        coachingStyle: "Physiotherapy-led approach with focus on safe movement and rehabilitation.",
        amenities: ["Physio Consultation Room", "Changing Rooms", "Filtered Water Station", "Towel Service"]
    }
  },
  {
    id: "flow-pilates",
    nama: "Flow Pilates & Wellness",
    lokasi: "Bandung",
    alamat: "Jl. Dago No. 78, Bandung",
    rating: 4.7,
    totalReview: 56,
    deskripsi: "Flow Pilates & Wellness menggabungkan pilates dengan wellness holistik. Nikmati udara sejuk Bandung sambil melatih tubuh dan pikiran Anda.",
    gambar: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200",
    fasilitas: ["Mat Pilates", "Yoga"],
    jamOperasional: "06:00 - 20:00",
    details: {
        studioType: "Holistic Wellness Center",
        serviceFocus: ["Mindful Pilates", "Yoga Fusion", "Meditation"],
        coachingStyle: "Holistic approach integrating breathwork and mindfulness into every session.",
        amenities: ["Garden View", "Herbal Tea Bar", "Meditation Corner", "Eco-friendly Mats"]
    }
  },
  {
    id: "balance-studio",
    nama: "Balance Studio",
    lokasi: "Surabaya",
    alamat: "Jl. Basuki Rahmat No. 56, Surabaya",
    rating: 4.6,
    totalReview: 78,
    deskripsi: "Balance Studio adalah pilihan terbaik untuk pemula yang ingin memulai perjalanan pilates mereka. Instruktur kami sangat sabar dan berpengalaman dalam membimbing pemula.",
    gambar: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200",
    fasilitas: ["Mat Pilates", "Beginner"],
    jamOperasional: "07:00 - 21:00",
    details: {
        studioType: "Community & Beginner Friendly",
        serviceFocus: ["Foundations", "Group Mat Classes", "Senior Pilates"],
        coachingStyle: "Supportive and patient instruction, perfect for those starting their fitness journey.",
        amenities: ["Spacious Locker Room", "Community Board", "Free WiFi", "Parking Area"]
    }
  },
];

export const daftarCourt: Court[] = [
  { id: 1, studioId: "zen-pilates", nama: "Reformer Room A", deskripsi: "Ruangan dengan 6 unit Reformer premium", kapasitas: 6, harga: 150000, gambar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400" },
  { id: 2, studioId: "zen-pilates", nama: "Reformer Room B", deskripsi: "Ruangan dengan 4 unit Reformer untuk kelas kecil", kapasitas: 4, harga: 175000, gambar: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=400" },
  { id: 3, studioId: "zen-pilates", nama: "Private Suite", deskripsi: "Ruangan privat untuk sesi 1-on-1", kapasitas: 1, harga: 350000, gambar: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400" },
  { id: 4, studioId: "core-studio", nama: "Main Studio", deskripsi: "Studio utama dengan berbagai equipment", kapasitas: 8, harga: 175000, gambar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400" },
  { id: 5, studioId: "core-studio", nama: "Cadillac Room", deskripsi: "Ruangan khusus Cadillac training", kapasitas: 4, harga: 200000, gambar: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=400" },
  { id: 6, studioId: "flow-pilates", nama: "Garden Studio", deskripsi: "Studio dengan pemandangan taman", kapasitas: 10, harga: 120000, gambar: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400" },
  { id: 7, studioId: "flow-pilates", nama: "Zen Room", deskripsi: "Ruangan untuk yoga dan meditasi", kapasitas: 8, harga: 100000, gambar: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400" },
  { id: 8, studioId: "balance-studio", nama: "Beginner Studio", deskripsi: "Studio khusus untuk pemula", kapasitas: 6, harga: 100000, gambar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400" },
];

export const daftarMentor: Mentor[] = [
  { id: 1, studioId: "zen-pilates", nama: "Coach Lisa", spesialisasi: "Reformer Specialist", foto: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=400", bio: "10 tahun pengalaman, sertifikasi STOTT Pilates" },
  { id: 2, studioId: "zen-pilates", nama: "Coach Dewi", spesialisasi: "Mat Pilates Expert", foto: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400", bio: "Former ballet dancer, 8 tahun mengajar" },
  { id: 3, studioId: "core-studio", nama: "Coach Rina", spesialisasi: "Core & Posture", foto: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=400", bio: "Fisioterapis bersertifikat, spesialisasi rehabilitasi" },
  { id: 4, studioId: "core-studio", nama: "Coach Maya", spesialisasi: "Advanced Training", foto: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400", bio: "Kompetitor pilates internasional" },
  { id: 5, studioId: "flow-pilates", nama: "Coach Sari", spesialisasi: "Yoga & Pilates Fusion", foto: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=400", bio: "Certified yoga instructor, 5 tahun pilates" },
  { id: 6, studioId: "balance-studio", nama: "Coach Putri", spesialisasi: "Beginner Specialist", foto: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400", bio: "Sabar dan ramah, cocok untuk pemula" },
];

export const daftarTimeslot: Timeslot[] = [
  { id: 1, waktuMulai: "06:00", waktuSelesai: "07:00", label: "06:00 - 07:00" },
  { id: 2, waktuMulai: "07:00", waktuSelesai: "08:00", label: "07:00 - 08:00" },
  { id: 3, waktuMulai: "08:00", waktuSelesai: "09:00", label: "08:00 - 09:00" },
  { id: 4, waktuMulai: "09:00", waktuSelesai: "10:00", label: "09:00 - 10:00" },
  { id: 5, waktuMulai: "10:00", waktuSelesai: "11:00", label: "10:00 - 11:00" },
  { id: 6, waktuMulai: "11:00", waktuSelesai: "12:00", label: "11:00 - 12:00" },
  { id: 7, waktuMulai: "13:00", waktuSelesai: "14:00", label: "13:00 - 14:00" },
  { id: 8, waktuMulai: "14:00", waktuSelesai: "15:00", label: "14:00 - 15:00" },
  { id: 9, waktuMulai: "15:00", waktuSelesai: "16:00", label: "15:00 - 16:00" },
  { id: 10, waktuMulai: "16:00", waktuSelesai: "17:00", label: "16:00 - 17:00" },
  { id: 11, waktuMulai: "17:00", waktuSelesai: "18:00", label: "17:00 - 18:00" },
  { id: 12, waktuMulai: "18:00", waktuSelesai: "19:00", label: "18:00 - 19:00" },
  { id: 13, waktuMulai: "19:00", waktuSelesai: "20:00", label: "19:00 - 20:00" },
  { id: 14, waktuMulai: "20:00", waktuSelesai: "21:00", label: "20:00 - 21:00" },
];

export function getStudioById(id: string): Studio | undefined {
  return daftarStudio.find((s) => s.id === id);
}

export function getCourtsByStudioId(studioId: string): Court[] {
  return daftarCourt.filter((c) => c.studioId === studioId);
}

export function getMentorsByStudioId(studioId: string): Mentor[] {
  return daftarMentor.filter((m) => m.studioId === studioId);
}

export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

export function getCourtById(id: number): Court | undefined {
  return daftarCourt.find((c) => c.id === id);
}
