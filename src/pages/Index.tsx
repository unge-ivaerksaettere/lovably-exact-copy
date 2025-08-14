import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PodcastSection from "@/components/PodcastSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import SpeakersSection from "@/components/SpeakersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import FAQSection from "@/components/FAQSection";
import NewsletterPopup from "@/components/NewsletterPopup";

const Index = () => {
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewsletterPopup(true);
    }, 3000); // Show popup after 3 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <PodcastSection />
      <WhyChooseSection />
      <SpeakersSection />
      <TestimonialsSection />
      <NewsletterSection />
      <FAQSection />
      <NewsletterPopup 
        isOpen={showNewsletterPopup} 
        onClose={() => setShowNewsletterPopup(false)} 
      />
      <Footer />
    </div>
  );
};

export default Index;
