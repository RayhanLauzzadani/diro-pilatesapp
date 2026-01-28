export interface Studio {
  id: string;
  nama: string;
  lokasi: string;
  alamat: string;
  rating: number;
  totalReview: number;
  deskripsi: string;
  gambar: string;
  fasilitas: string[];
  jamOperasional: string;
  details: {
    studioType: string;
    serviceFocus: string[];
    coachingStyle: string;
    amenities: string[];
  };
}

export interface Court {
  id: number;
  studioId: string;
  nama: string;
  deskripsi: string;
  kapasitas: number;
  harga: number;
  gambar: string;
}

export interface Mentor {
  id: number;
  studioId: string;
  nama: string;
  spesialisasi: string;
  foto: string;
  bio: string;
}

export interface Timeslot {
  id: number;
  waktuMulai: string;
  waktuSelesai: string;
  label: string;
}

export interface Booking {
  studioId: string;
  tanggal: string;
  timeslotId: number;
  courtId: number;
  mentorId: number;
  namaPelanggan: string;
  emailPelanggan: string;
  teleponPelanggan: string;
  catatan: string;
  metodePembayaran: "online" | "venue";
}
