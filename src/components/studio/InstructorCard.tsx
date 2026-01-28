import Image from "next/image";
import { Mentor } from "@/types";

interface InstructorCardProps {
    mentor: Mentor;
}

export default function InstructorCard({ mentor }: InstructorCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
                {/* Foto */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                    <Image
                        src={mentor.foto}
                        alt={mentor.nama}
                        fill
                        className="object-cover"
                    />
                </div>
                
                {/* Info */}
                <div>
                    <h3 className="font-bold text-gray-900">{mentor.nama}</h3>
                    <p className="text-sm text-blue-600 font-medium">{mentor.spesialisasi}</p>
                </div>
            </div>
            
            {/* Bio */}
            <p className="text-gray-600 text-sm">{mentor.bio}</p>
        </div>
    );
}
