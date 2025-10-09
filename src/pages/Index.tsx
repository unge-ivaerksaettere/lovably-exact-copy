import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PodcastSection from "@/components/PodcastSection";
import SpeakersSection from "@/components/SpeakersSection";
import CommunityGallery from "@/components/CommunityGallery";
import NewsletterSection from "@/components/NewsletterSection";
import FAQSection from "@/components/FAQSection";
import NewsletterPopup from "@/components/NewsletterPopup";

const Index = () => {
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewsletterPopup(true);
    }, 10000); // Show popup after 10 seconds instead of 3

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <WhyChooseSection />
      <SpeakersSection />
      <TestimonialsSection />
      <PodcastSection />
      <CommunityGallery />
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
