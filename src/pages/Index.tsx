import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PodcastSection from "@/components/PodcastSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import SpeakersSection from "@/components/SpeakersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import FAQSection from "@/components/FAQSection";

const Index = () => {
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
    </div>
  );
};

export default Index;
