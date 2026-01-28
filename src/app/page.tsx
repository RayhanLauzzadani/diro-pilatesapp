import HeroSection from "@/components/HeroSection";
import ClassesSection from "@/components/ClassesSection";
import StudiosSection from "@/components/StudiosSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ClassesSection />
      <StudiosSection />
      <Footer />
    </div>
  );
}


