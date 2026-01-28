export default function HeroBanner() {
    return (
        <section
            className="relative h-[290px] md:h-[320px] flex items-center justify-center overflow-hidden"
            style={{ borderRadius: '32px' }}
        >
            {/* Gambar Latar */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070')",
                    borderRadius: '32px',
                }}
            />

            {/* Overlay */}
            <div
                className="absolute inset-0"
                style={{ backgroundColor: 'rgba(3,3,3,0.48)', borderRadius: '32px' }}
            />

            {/* Konten */}
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                {/* Judul */}
                <div className="mb-6">
                    <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                        Reserve your spot with DIRO Pilates
                    </h1>
                </div>

                <p className="font-body text-base md:text-lg text-gray-200 font-light tracking-wide">
                    Join our community of wellness enthusiasts!
                </p>
            </div>
        </section>
    );
}
