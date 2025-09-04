import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NewSponsors = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Ny Sponsorside
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Her bygger vi den nye lækre sponsorside sammen!
          </p>
          
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => window.open('mailto:kontakt@ungeivaerksaettere.dk', '_blank')}
          >
            Kontakt os
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NewSponsors;