import { useState, useEffect, lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FAQSection from "@/components/FAQSection";
import NewsletterPopup from "@/components/NewsletterPopup";

// Lazy load ALLE komponenter under folden
const WhyChooseSection = lazy(() => import("@/components/WhyChooseSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const PodcastSection = lazy(() => import("@/components/PodcastSection"));
const SpeakersSection = lazy(() => import("@/components/SpeakersSection"));
const CommunityGallery = lazy(() => import("@/components/CommunityGallery"));
const NewsletterSection = lazy(() => import("@/components/NewsletterSection"));

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
      <Suspense fallback={<div className="min-h-screen" />}>
        <WhyChooseSection />
        <SpeakersSection />
        <TestimonialsSection />
        <PodcastSection />
        <CommunityGallery />
        <NewsletterSection />
      </Suspense>
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
