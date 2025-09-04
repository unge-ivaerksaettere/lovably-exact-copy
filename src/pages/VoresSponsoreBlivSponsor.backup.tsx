import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Check, Mail, Phone, Calendar } from "lucide-react";
import agerasLogo from "@/assets/ageras-logo-real.png";
import jakobProfile from "@/assets/jakob-h-profile.jpg";
const VoresSponsoreBlivSponsor = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    package: "",
    budget: "",
    startDate: "",
    message: ""
  });
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  const sponsorPackages = [{
    title: "Partner",
    quantity: "(3 stk)",
    price: "15.000 kr",
    description: "Få eksponering til 12 events og byg relationer med unge iværksættere",
    isPopular: true,
    features: ["Eksponering til 12 events (slides, roll-ups og shoutout fra scenen)", "Mulighed for at dele egne tilbud med deltagerne", "Eksponering på sociale medier", "PR- og kampagnesamarbejde", "Webinarer i vores online forum"],
    buttonText: "Vælg 🏢 Partner"
  }, {
    title: "🎙️ Podcast-sponsor",
    quantity: "(2 stk)",
    price: "7.500 kr",
    description: "Få eksponering gennem vores populære podcast med 60.000+ downloads",
    features: ['"I samarbejde med [jeres navn]" i starten af 12 episoder', "Et reklamespot midden af 12 episoder"],
    buttonText: "Vælg 🎙️ Podcast-sponsor"
  }, {
    title: "🤝 Støttesponsor",
    price: "2.500 kr",
    description: "Vis jeres støtte til startup-økosystemet og få brand exposure",
    features: ["Navn på takkeliste på vores hjemmeside"],
    buttonText: "Vælg 🤝 Støttesponsor"
  }];
  const partners = [{
    name: "Ageras",
    logo: "AG",
    website: "https://www.ageras.com/dk"
  }, {
    name: "Jakob H.",
    logo: "JH",
    website: "https://www.linkedin.com/in/jakobh/?originalSubdomain=dk"
  }];
  const testimonials = [{
    name: "Ageras Team",
    role: "Partnership, Ageras",
    company: "Ageras",
    avatar: "AG",
    quote: "Vores samarbejde med Unge Iværksættere giver os fantastisk eksponering til Danmarks mest lovende unge iværksættere og talenter."
  }, {
    name: "Jakob H.",
    role: "Støttesponsor",
    company: "Privat",
    avatar: "JH",
    quote: "Jeg støtter Unge Iværksættere fordi jeg tror på at investere i Danmarks næste generation af iværksættere."
  }];
  const faqs = [{
    question: "Hvad er Unge Iværksættere?",
    answer: "Danmarks største frivillige fællesskab for unge iværksættere med henblik på at gøre iværksætteri mere tilgængeligt og give fremtidens iværksættere de bedste kort på hånden."
  }, {
    question: "Hvem kan deltage i jeres events?",
    answer: "Alle interesserede i iværksætteri kan deltage i vores events - både erfarne iværksættere og dem der overvejer at starte deres første startup."
  }, {
    question: "Koster det noget at deltage?",
    answer: "Alle vores events er gratis for deltagerne. Vi tror på at gøre iværksætteri tilgængeligt for alle."
  }, {
    question: "Hvor afholdes jeres events?",
    answer: "Vi holder events i København og Aarhus samt virtuelle webinarer så alle kan deltage."
  }, {
    question: "Kan jeg blive speaker på jeres events?",
    answer: "Absolut! Vi er altid på udkig efter inspirerende speakers. Kontakt os på kontakt@ungeiværksættere.dk med dit forslag og vi vender tilbage hurtigst muligt."
  }, {
    question: "Hvordan kan min virksomhed blive sponsor?",
    answer: "Vi samarbejder med virksomheder der støtter startup-økosystemet. Kontakt os på kontakt@ungeiværksættere.dk for at høre om sponsormuligheder og partnerskaber."
  }];
  return <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Enhanced background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-primary/20">
            <span className="text-2xl">🤝</span>
            <span className="text-sm font-dm-sans font-bold text-primary">Partnership Muligheder</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-anton font-bold text-foreground mb-8 leading-tight">
            Bliv en del af 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"> Danmarks</span>
            <br />
            største iværksætterfællesskab
          </h1>
          
          <p className="text-xl md:text-2xl font-inter text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Partner med os og få adgang til <span className="text-primary font-bold">3000+ unge talenter</span> der former fremtidens startup-økosystem
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open('mailto:kontakt@ungeivaerksaettere.dk?subject=Partnership%20Inquiry', '_blank')}
            >
              🚀 Start Partnership
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="font-dm-sans font-bold text-lg px-8 py-4 border-2 hover:bg-primary/5"
            >
              📊 Se Vores Impact
            </Button>
          </div>
        </div>
      </section>

      {/* Sponsor Packages */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3" />
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-anton font-bold text-foreground mb-6">
              Sponsorpakker
            </h2>
            <p className="text-xl font-inter text-muted-foreground max-w-3xl mx-auto">
              Vælg den pakke der passer til jeres virksomhed og mål
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sponsorPackages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`relative group transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 ${
                  pkg.isPopular 
                    ? 'border-primary bg-gradient-to-br from-primary/5 via-background to-primary/10 shadow-lg' 
                    : 'border-border hover:border-primary/30 bg-background/80 backdrop-blur-sm'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm font-bold shadow-lg">
                      🔥 Mest Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-anton text-foreground flex items-center justify-center gap-2">
                      {pkg.title}
                      {pkg.quantity && (
                        <span className="text-sm text-muted-foreground font-inter">
                          {pkg.quantity}
                        </span>
                      )}
                    </CardTitle>
                    <div className="text-3xl font-anton font-bold text-primary">
                      {pkg.price}
                    </div>
                    <CardDescription className="text-base font-inter">
                      {pkg.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 font-inter text-sm">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button 
                    className={`w-full font-dm-sans font-bold text-base py-6 transition-all duration-300 ${
                      pkg.isPopular 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl' 
                        : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                    }`}
                    onClick={() => window.open('mailto:kontakt@ungeivaerksaettere.dk?subject=Sponsor%20Inquiry', '_blank')}
                  >
                    {pkg.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Stats row */}
          <div className="mt-20 grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-anton font-bold text-primary">3000+</div>
              <div className="text-sm font-inter text-muted-foreground">Deltagere</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-anton font-bold text-primary">50.000+</div>
              <div className="text-sm font-inter text-muted-foreground">Podcast Downloads</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-anton font-bold text-primary">30+</div>
              <div className="text-sm font-inter text-muted-foreground">Events Yearly</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-anton font-bold text-primary">2</div>
              <div className="text-sm font-inter text-muted-foreground">Byer</div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solutions */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="font-inter text-muted-foreground mb-4">
            Har I brug for en skræddersyet løsning?
          </p>
          <Button variant="outline" className="gap-2">
            <Mail className="w-4 h-4" />
            Kontakt os for custom pakke
          </Button>
        </div>
      </section>

      {/* Current Sponsors Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-anton font-bold text-foreground mb-6">
              Vores hovedsponsor
            </h2>
          </div>

          {/* Main Sponsor - Ageras gets most space */}
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="text-center p-12 border-2 border-primary bg-gradient-to-br from-primary/5 to-background">
              <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center overflow-hidden">
                <img src={agerasLogo} alt="Ageras logo" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-3xl font-anton font-bold mb-4">Ageras</h3>
              <div className="space-y-2 mb-6">
                <Badge className="mx-1">🏢 Partner Sponsor</Badge>
                <Badge variant="secondary" className="mx-1">🎙️ Podcast Sponsor</Badge>
              </div>
              <p className="font-inter text-lg text-muted-foreground mb-6">
                Ageras støtter vores community med både partner- og podcast sponsorater og hjælper med at skabe værdi for Danmarks unge iværksættere.
              </p>
              <Button variant="outline" asChild>
                <a href="https://www.ageras.com/dk" target="_blank" rel="noopener noreferrer">
                  Besøg Ageras
                </a>
              </Button>
            </Card>
          </div>
          
          {/* Support Sponsors - smaller section */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-anton font-bold text-foreground mb-8">
              Støttesponsorer
            </h3>
            <div className="max-w-sm mx-auto">
              <Card className="text-center p-6">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  <img src={jakobProfile} alt="Jakob H profil" className="w-full h-full object-cover" />
                </div>
                <h4 className="text-lg font-dm-sans font-bold mb-2">Jakob H.</h4>
                <Badge variant="outline" className="mb-3">🤝 Støtte Sponsor</Badge>
              </Card>
            </div>
          </div>

          {/* Partner Testimonials - COMMENTED OUT FOR FUTURE USE 
           <div className="mb-16">
            <h3 className="text-3xl font-anton font-bold text-foreground text-center mb-12">
              Hvad siger vores partnere?
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center font-dm-sans font-bold overflow-hidden">
                        {testimonial.avatar === "AG" ? (
                          <img src={agerasLogo} alt="Ageras logo" className="w-full h-full object-contain" />
                        ) : (
                          <img src={jakobProfile} alt="Jakob H profil" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-dm-sans font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-primary font-inter">{testimonial.role}</p>
                        <p className="text-sm text-muted-foreground font-inter">{testimonial.company}</p>
                      </div>
                    </div>
                    <p className="font-inter text-muted-foreground italic">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
           </div>
           */}
        </div>
      </section>

      {/* Simple Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-anton font-bold text-foreground mb-6">
            Samarbejde og presse
          </h2>
          <p className="font-inter text-lg text-muted-foreground mb-8">
            For samarbejder og presse, kontakt Mik Lønborg
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="gap-2" asChild>
              <a href="mailto:kontakt@mikloenborg.com">
                <Mail className="w-4 h-4" />
                kontakt@mikloenborg.com
              </a>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a href="https://www.linkedin.com/in/miklonborg/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card className="text-center p-6">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-dm-sans font-bold mb-2">Email</h3>
              <p className="font-inter text-sm text-muted-foreground">
                kontakt@ungeivaerksaettere.dk
              </p>
            </Card>
            <Card className="text-center p-6">
              <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-dm-sans font-bold mb-2">Telefon</h3>
              <p className="font-inter text-sm text-muted-foreground">+45 21 96 62 04</p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-anton font-bold text-foreground mb-6">
              Ofte Stillede Spørgsmål
            </h2>
            <p className="text-xl font-inter text-muted-foreground max-w-3xl mx-auto">
              Find svar på de mest almindelige spørgsmål om Unge Iværksættere
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg border px-6">
                  <AccordionTrigger className="font-dm-sans font-bold text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-inter text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default VoresSponsoreBlivSponsor;