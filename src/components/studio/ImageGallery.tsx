import Image from "next/image";

interface ImageGalleryProps {
    images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8">
            {/* Gambar Utama */}
            <div className="col-span-1 md:col-span-2 row-span-2 relative group">
                <Image 
                    src={images[0]} 
                    alt="Main View" 
                    fill 
                    className="object-cover transition-all duration-300" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            
            {/* Gambar Sekunder */}
            {images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="hidden md:block relative h-full group">
                    <Image 
                        src={img} 
                        alt={`View ${idx + 2}`} 
                        fill 
                        className="object-cover transition-all duration-300" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
            ))}
        </div>
    );
}
