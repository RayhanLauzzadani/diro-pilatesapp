"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { Check, Users, Star, Heart } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
    getStudioById,
    getCourtsByStudioId,
    getMentorsByStudioId,
} from "@/data";
import { 
    ImageGallery, 
    StudioHeader, 
    ClassCard, 
    InstructorCard, 
    ReviewSummary 
} from "@/components/studio";
import ScrollAnimate from "@/components/ScrollAnimate";

interface PageProps {
    params: { id: string };
}

export default function StudioDetailPage({ params }: PageProps) {
    const [isLoading, setIsLoading] = useState(true);

    const studio = getStudioById(params.id);
    const courts = getCourtsByStudioId(params.id);
    const mentors = getMentorsByStudioId(params.id);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (!studio) {
        notFound();
    }

    const galleryImages = [
        studio.gambar,
        ...courts.map(c => c.gambar).slice(0, 4)
    ];
    while (galleryImages.length < 5) {
        galleryImages.push(studio.gambar);
    }

    if (isLoading) {
        return <StudioDetailSkeleton />;
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                {/* Galeri Gambar */}
                <ScrollAnimate animation="fade-up">
                    <ImageGallery images={galleryImages} />
                </ScrollAnimate>

                {/* Header Studio */}
                <ScrollAnimate animation="fade-up" delay={100}>
                    <StudioHeader studio={studio} />
                </ScrollAnimate>

                {/* Tabs Konten */}
                <ScrollAnimate animation="fade-up" delay={200}>
                    <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full justify-start bg-white border-b border-gray-100 rounded-none h-auto p-0 mb-8">
                        <TabsTrigger
                            value="overview"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:shadow-none px-4 py-3"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="classes"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:shadow-none px-4 py-3"
                        >
                            Classes
                        </TabsTrigger>
                        <TabsTrigger
                            value="instructors"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:shadow-none px-4 py-3"
                        >
                            Instructors
                        </TabsTrigger>
                        <TabsTrigger
                            value="reviews"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:shadow-none px-4 py-3"
                        >
                            Reviews
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab Overview */}
                    <TabsContent value="overview" className="mt-0 space-y-12">
                        {/* About Section */}
                        <ScrollAnimate animation="fade-up">
                            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
                                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6">About {studio.nama}</h2>
                                        <div className="mb-6">
                                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
                                                {studio.details.studioType}
                                            </span>
                                            <p className="text-gray-600 leading-relaxed mb-4">
                                                {studio.deskripsi}
                                            </p>
                                            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                                                <h3 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">Coaching Style</h3>
                                                <p className="text-gray-600 italic">"{studio.details.coachingStyle}"</p>
                                            </div>
                                        </div>

                                        <h3 className="font-bold text-gray-900 mb-3">Services & Focus</h3>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {studio.details.serviceFocus.map(focus => (
                                                <span key={focus} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700">
                                                    {focus}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className="font-bold text-gray-900 mb-3">Amenities</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {studio.details.amenities.map(amenity => (
                                                <div key={amenity} className="flex items-center gap-3 text-sm text-gray-600">
                                                    <Check className="w-4 h-4 text-blue-500" /> {amenity}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Why Choose Us */}
                                <div className="lg:w-1/3 bg-white border border-gray-100 rounded-xl p-6 h-fit shadow-sm">
                                    <h3 className="font-semibold text-gray-900 mb-4">Why choose us?</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3 text-sm text-gray-600">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                                                <Users className="w-4 h-4" />
                                            </div>
                                            <span>Small group sizes for personalized attention</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-gray-600">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                                                <Star className="w-4 h-4" />
                                            </div>
                                            <span>Certified & experienced instructors</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-gray-600">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                                                <Heart className="w-4 h-4" />
                                            </div>
                                            <span>Supportive community atmosphere</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        </ScrollAnimate>

                        {/* Classes Section */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Available Classes</h2>
                            <div className="grid grid-cols-1 gap-6">
                                {courts.map((court, index) => (
                                    <ScrollAnimate 
                                        key={court.id} 
                                        animation="fade-up" 
                                        delay={((index + 1) * 100) as 100 | 200 | 300}
                                    >
                                        <ClassCard court={court} />
                                    </ScrollAnimate>
                                ))}
                            </div>
                        </div>

                        {/* Instructors Section */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Our Instructors</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {mentors.map((mentor, index) => (
                                    <ScrollAnimate 
                                        key={mentor.id} 
                                        animation="scale" 
                                        delay={((index + 1) * 100) as 100 | 200 | 300}
                                    >
                                        <InstructorCard mentor={mentor} />
                                    </ScrollAnimate>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <ScrollAnimate animation="fade-up">
                            <ReviewSummary rating={studio.rating} totalReview={studio.totalReview} />
                        </ScrollAnimate>
                    </TabsContent>

                    {/* Tab Classes */}
                    <TabsContent value="classes" className="mt-0">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Available Classes</h2>
                        <div className="grid grid-cols-1 gap-6">
                            {courts.map((court, index) => (
                                <ScrollAnimate 
                                    key={court.id} 
                                    animation="fade-up" 
                                    delay={((index + 1) * 100) as 100 | 200 | 300}
                                >
                                    <ClassCard court={court} />
                                </ScrollAnimate>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Tab Instructors */}
                    <TabsContent value="instructors" className="mt-0">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Our Instructors</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mentors.map((mentor, index) => (
                                <ScrollAnimate 
                                    key={mentor.id} 
                                    animation="scale" 
                                    delay={((index + 1) * 100) as 100 | 200 | 300}
                                >
                                    <InstructorCard mentor={mentor} />
                                </ScrollAnimate>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Tab Reviews */}
                    <TabsContent value="reviews" className="mt-0">
                        <ScrollAnimate animation="fade-up">
                            <ReviewSummary rating={studio.rating} totalReview={studio.totalReview} />
                        </ScrollAnimate>
                    </TabsContent>
                </Tabs>
                </ScrollAnimate>
            </div>
        </div>
    );
}

{/* Skeleton Component */}
function StudioDetailSkeleton() {
    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                {/* Gallery Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8">
                    <Skeleton className="col-span-1 md:col-span-2 md:row-span-2 h-full" />
                    <Skeleton className="hidden md:block h-full" />
                    <Skeleton className="hidden md:block h-full" />
                    <Skeleton className="hidden md:block h-full" />
                    <Skeleton className="hidden md:block h-full" />
                </div>

                {/* Header Skeleton */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                    <div className="flex-1">
                        <Skeleton className="h-8 w-64 mb-2" />
                        <Skeleton className="h-4 w-48 mb-4" />
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </div>
                    </div>
                    <Skeleton className="h-12 w-12 rounded-xl" />
                </div>

                {/* Tabs Skeleton */}
                <div className="flex gap-4 border-b border-gray-100 mb-8">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-20" />
                </div>

                {/* Content Skeleton */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                        <div className="flex-1">
                            <Skeleton className="h-7 w-48 mb-6" />
                            <Skeleton className="h-6 w-24 rounded-full mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4 mb-6" />
                            
                            <Skeleton className="h-24 w-full rounded-xl mb-6" />
                            
                            <Skeleton className="h-6 w-36 mb-3" />
                            <div className="flex flex-wrap gap-2 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className="h-8 w-24 rounded-lg" />
                                ))}
                            </div>
                            
                            <Skeleton className="h-6 w-28 mb-3" />
                            <div className="grid grid-cols-2 gap-4">
                                {[...Array(6)].map((_, i) => (
                                    <Skeleton key={i} className="h-5 w-full" />
                                ))}
                            </div>
                        </div>
                        
                        <div className="lg:w-1/3">
                            <Skeleton className="h-64 w-full rounded-xl" />
                        </div>
                    </div>
                </div>

                {/* Classes Skeleton */}
                <div className="mt-12">
                    <Skeleton className="h-7 w-40 mb-6" />
                    <div className="space-y-6">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    <Skeleton className="w-full md:w-64 h-48" />
                                    <div className="flex-1 p-5">
                                        <Skeleton className="h-6 w-48 mb-2" />
                                        <Skeleton className="h-4 w-full mb-2" />
                                        <Skeleton className="h-4 w-3/4 mb-4" />
                                        <div className="flex gap-2 mb-4">
                                            <Skeleton className="h-6 w-20 rounded-full" />
                                            <Skeleton className="h-6 w-16 rounded-full" />
                                        </div>
                                        <Skeleton className="h-10 w-32 rounded-xl" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
