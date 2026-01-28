import { Skeleton } from "@/components/ui/skeleton";

export function ClassCardSkeleton() {
    return (
        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden bg-gray-100">
            <Skeleton className="absolute inset-0" />
            <div className="absolute bottom-4 left-4 right-4">
                <Skeleton className="h-6 w-20 rounded-full mb-2" />
                <Skeleton className="h-4 w-32" />
            </div>
        </div>
    );
}

export function StudioCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-4 w-24 mb-3" />
                <div className="flex gap-1 mb-3">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-28" />
            </div>
        </div>
    );
}

export function HeroSkeleton() {
    return (
        <div className="px-4 md:px-8 pt-4 md:pt-6 pb-8 md:pb-12">
            <div className="relative max-w-7xl mx-auto">
                <Skeleton className="h-[290px] md:h-[320px] rounded-[32px]" />
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 -bottom-10 z-20 w-full px-4">
                    <div className="max-w-4xl mx-auto">
                        <Skeleton className="h-20 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ClassesSectionSkeleton() {
    return (
        <section className="py-10 md:py-16 px-4 md:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <Skeleton className="h-8 w-48 mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <ClassCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export function StudiosSectionSkeleton() {
    return (
        <section className="py-10 md:py-16 px-4 md:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="h-4 w-32 hidden md:block" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <StudioCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export function StudioDetailSkeleton() {
    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                {/* Gallery Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8">
                    <Skeleton className="col-span-1 md:col-span-2 row-span-2 h-full" />
                    <Skeleton className="hidden md:block h-full" />
                    <Skeleton className="hidden md:block h-full" />
                    <Skeleton className="hidden md:block h-full" />
                    <Skeleton className="hidden md:block h-full" />
                </div>
                
                {/* Header Skeleton */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                    <div>
                        <Skeleton className="h-8 w-64 mb-2" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-12 w-12 rounded-xl" />
                </div>
                
                {/* Tabs Skeleton */}
                <Skeleton className="h-12 w-full mb-8" />
                
                {/* Content Skeleton */}
                <Skeleton className="h-96 w-full rounded-2xl" />
            </div>
        </div>
    );
}

export function BookingFormSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Skeleton className="h-64 rounded-2xl" />
                        <Skeleton className="h-48 rounded-2xl" />
                    </div>
                    <div>
                        <Skeleton className="h-80 rounded-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
