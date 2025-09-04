import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";
import billyLogo from "@/assets/billy-logo.png";
import agerasLogo from "@/assets/ageras-logo-real.png";
import jakobProfile from "@/assets/jakob-profile-new.jpeg";

const NewSponsors = () => {
  const sponsors = [
    {
      name: "Billy",
      logo: billyLogo,
      type: "🏢 Hovedsponsor",
      description: "Billy støtter danske iværksættere med deres intelligente økonomisystem og hjælper dem med at fokusere på det, de elsker mest.",
      website: "https://billy.dk",
      isMain: true
    }
  ];

  const supportSponsors = [
    {
      name: "Jakob H.",
      image: jakobProfile,
      type: "🤝 Støtte Sponsor"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-primary/20">
            <span className="text-2xl">🤝</span>
            <span className="text-sm font-dm-sans font-bold text-primary">Vores Partnere</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-anton font-bold text-foreground mb-8 leading-tight">
            Sammen bygger vi
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"> Danmarks</span>
            <br />
            stærkeste startup-fællesskab
          </h1>
          
          <p className="text-xl md:text-2xl font-inter text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Tak til vores fantastiske hovedsponsor <span className="text-primary font-bold">Billy</span> der hjælper danske iværksættere med at fokusere på det, de elsker mest og støtter vores <span className="text-primary font-bold">3000+ unge iværksættere</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open('mailto:kontakt@ungeivaerksaettere.dk?subject=Sponsor%20Inquiry', '_blank')}
            >
              <Mail className="w-5 h-5 mr-2" />
              Bliv Sponsor
            </Button>
          </div>
        </div>
      </section>

      {/* Main Sponsors */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-anton font-bold text-foreground mb-6">
              Vores Hovedsponsor
            </h2>
            <p className="text-xl font-inter text-muted-foreground max-w-3xl mx-auto">
              Virksomheden der investerer i Danmarks fremtidige iværksættere
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {sponsors.map((sponsor, index) => (
              <Card 
                key={index} 
                className="group transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10 shadow-lg"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center overflow-hidden rounded-lg bg-white/50 backdrop-blur-sm">
                    <img 
                      src={sponsor.logo} 
                      alt={`${sponsor.name} logo`} 
                      className="w-full h-full object-contain p-4" 
                    />
                  </div>
                  
                  <h3 className="text-3xl font-anton font-bold mb-4 text-foreground">
                    {sponsor.name}
                  </h3>
                  
                  <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                    {sponsor.type}
                  </Badge>
                  
                  <p className="font-inter text-lg text-muted-foreground mb-6 leading-relaxed">
                    {sponsor.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="border-primary/30 hover:bg-primary/10 font-dm-sans font-bold"
                    onClick={() => window.open(sponsor.website, '_blank')}
                  >
                    Besøg {sponsor.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Sponsors */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-anton font-bold text-foreground mb-8">
              Støttesponsorer
            </h3>
            <p className="text-lg font-inter text-muted-foreground mb-8">
              Fantastiske mennesker der tror på vores mission
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            {supportSponsors.map((sponsor, index) => (
              <Card key={index} className="p-8 bg-background/80 backdrop-blur-sm border border-border/50">
                <CardContent className="flex items-center gap-6 p-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={sponsor.image} 
                      alt={`${sponsor.name} profil`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-2xl font-anton font-bold mb-2 text-foreground">
                      {sponsor.name}
                    </h4>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {sponsor.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-anton font-bold text-foreground mb-6">
            Vil du være sponsor?
          </h2>
          <p className="text-xl font-inter text-muted-foreground max-w-3xl mx-auto mb-8">
            Kontakt os for at høre om mulighederne for at støtte Danmarks største iværksætterfællesskab
          </p>
          
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold text-xl px-12 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.open('mailto:kontakt@ungeivaerksaettere.dk?subject=Sponsor%20Inquiry', '_blank')}
          >
            <Mail className="w-6 h-6 mr-3" />
            Kontakt os i dag
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NewSponsors;