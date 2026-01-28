import HeroSection from "@/components/HeroSection";
import ClassesSection from "@/components/ClassesSection";
import StudiosSection from "@/components/StudiosSection";
import Footer from "@/components/Footer";
import ScrollAnimate from "@/components/ScrollAnimate";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <ScrollAnimate animation="fade-up">
        <ClassesSection />
      </ScrollAnimate>
      
      <ScrollAnimate animation="fade-up">
        <StudiosSection />
      </ScrollAnimate>
      
      <Footer />
    </div>
  );
}


