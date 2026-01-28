import { MapPin, Star } from "lucide-react";
import { Studio } from "@/types";

interface StudioHeaderProps {
    studio: Studio;
}

export default function StudioHeader({ studio }: StudioHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{studio.nama}</h1>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                            <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.round(studio.rating) ? "fill-current" : "text-gray-300"}`} 
                            />
                        ))}
                    </div>
                    <span className="mr-2">•</span>
                    <MapPin className="w-4 h-4 mr-1" />
                    {studio.alamat}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                    <p className="text-sm font-semibold text-green-600">Excellent</p>
                    <p className="text-xs text-gray-500">{studio.totalReview} reviews</p>
                </div>
                <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center font-bold text-lg">
                    {studio.rating}
                </div>
            </div>
        </div>
    );
}
