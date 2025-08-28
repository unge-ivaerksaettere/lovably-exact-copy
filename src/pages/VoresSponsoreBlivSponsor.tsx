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
import agerasLogo from "@/assets/ageras-logo.png";
import jakobHProfile from "@/assets/jakob-h-profile.jpg";

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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const sponsorPackages = [
    {
      title: "Partner",
      quantity: "(3 stk)",
      price: "15.000 kr",
      description: "Få eksponering til 12 events og byg relationer med unge iværksættere",
      isPopular: true,
      features: [
        "Eksponering til 12 events (slides, roll-ups og shoutout fra scenen)",
        "Mulighed for at dele egne tilbud med deltagerne",
        "Eksponering på sociale medier",
        "PR- og kampagnesamarbejde",
        "Webinarer i vores online forum"
      ],
      buttonText: "Vælg 🏢 Partner"
    },
    {
      title: "🎙️ Podcast-sponsor",
      quantity: "(2 stk)",
      price: "7.500 kr",
      description: "Få eksponering gennem vores populære podcast med 60.000+ downloads",
      features: [
        '"I samarbejde med [jeres navn]" i starten af 12 episoder',
        "Et reklamespot midden af 12 episoder"
      ],
      buttonText: "Vælg 🎙️ Podcast-sponsor"
    },
    {
      title: "🤝 Støttesponsor",
      price: "2.500 kr",
      description: "Vis jeres støtte til startup-økosystemet og få brand exposure",
      features: [
        "Navn på takkeliste på vores hjemmeside"
      ],
      buttonText: "Vælg 🤝 Støttesponsor"
    }
  ];

  const partners = [
    { name: "Ageras", logo: agerasLogo, website: "https://www.ageras.com/dk" },
    { name: "Jakob H.", logo: jakobHProfile, website: "https://www.linkedin.com/in/jakobh/?originalSubdomain=dk" }
  ];

  const testimonials = [
    {
      name: "Ageras Team",
      role: "Partnership, Ageras",
      company: "Ageras",
      avatar: agerasLogo,
      quote: "Vores samarbejde med Unge Iværksættere giver os fantastisk eksponering til Danmarks mest lovende unge iværksættere og talenter."
    },
    {
      name: "Jakob H.",
      role: "Støttesponsor",
      company: "Privat",
      avatar: jakobHProfile,
      quote: "Jeg støtter Unge Iværksættere fordi jeg tror på at investere i Danmarks næste generation af iværksættere."
    }
  ];

  const faqs = [
    {
      question: "Hvad er Unge Iværksættere?",
      answer: "Unge Iværksættere er Danmarks største community for unge entrepreneurs. Vi arrangerer events, driver en populær podcast og skaber netværk mellem ambitiøse unge."
    },
    {
      question: "Hvem kan deltage i jeres events?",
      answer: "Vores events er åbne for alle unge mellem 16-30 år, der har interesse for iværksætteri, startup-verdenen eller bare vil netværke med ligesindede."
    },
    {
      question: "Koster det noget at deltage?",
      answer: "De fleste af vores events er gratis for at sikre, at alle har mulighed for at deltage uanset økonomisk situation."
    },
    {
      question: "Hvor afholdes jeres events?",
      answer: "Vi afholder events i hele Danmark, primært i København, Aarhus og Odense. Vi har også online events for at nå endnu flere."
    },
    {
      question: "Kan jeg blive speaker på jeres events?",
      answer: "Ja! Vi søger altid spændende speakers. Kontakt os på kontakt@ungeivaerksaettere.dk med din baggrund og hvad du gerne vil tale om."
    },
    {
      question: "Hvordan kan min virksomhed blive sponsor?",
      answer: "Du kan udfylde formularen på denne side eller kontakte os direkte. Vi tilbyder forskellige sponsorpakker, der kan tilpasses jeres behov og budget."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-anton font-bold text-foreground mb-6">
            Vi søger sponsorer til de næste 12 måneder
          </h1>
          <p className="text-xl font-inter text-muted-foreground max-w-3xl mx-auto">
            Alle priser er engangsbetaling for 12 måneders sponsorat.
          </p>
        </div>
      </section>

      {/* Sponsor Packages */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sponsorPackages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.isPopular ? 'border-primary shadow-lg' : ''}`}>
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Mest Populær
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-dm-sans">
                    {pkg.title} {pkg.quantity}
                  </CardTitle>
                  <div className="text-4xl font-anton font-bold text-primary mb-2">
                    {pkg.price}
                  </div>
                  <CardDescription className="font-inter">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="font-inter text-sm">{feature}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={pkg.isPopular ? "default" : "outline"}>
                    {pkg.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
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
              Tak til vores nuværende sponsorer
            </h2>
            <p className="text-lg font-inter text-muted-foreground mb-8">
              Vi er stolte af at samarbejde med disse fantastiske virksomheder
            </p>
          </div>

          {/* Current Sponsor Showcase */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <Card className="text-center p-8 border-2 border-primary/20">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden bg-white flex items-center justify-center">
                <img src={agerasLogo} alt="Ageras logo" className="w-14 h-14 object-contain" />
              </div>
              <h3 className="text-xl font-dm-sans font-bold mb-2">Ageras</h3>
              <Badge className="mb-3">🏢 Partner Sponsor</Badge>
              <p className="font-inter text-sm text-muted-foreground">
                1x Partner pakke - Støtter vores community med events og networking
              </p>
            </Card>

            <Card className="text-center p-8 border-2 border-secondary/20">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden bg-white flex items-center justify-center">
                <img src={agerasLogo} alt="Ageras logo" className="w-14 h-14 object-contain" />
              </div>
              <h3 className="text-xl font-dm-sans font-bold mb-2">Ageras</h3>
              <Badge variant="secondary" className="mb-3">🎙️ Podcast Sponsor</Badge>
              <p className="font-inter text-sm text-muted-foreground">
                2x Podcast sponsorater - Hørbar partner i vores podcast
              </p>
            </Card>

            <Card className="text-center p-8 border-2 border-accent/20">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden bg-muted flex items-center justify-center">
                <img src={jakobHProfile} alt="Jakob H. profile" className="w-16 h-16 object-cover" />
              </div>
              <h3 className="text-xl font-dm-sans font-bold mb-2">Jakob H.</h3>
              <Badge variant="outline" className="mb-3">🤝 Støtte Sponsor</Badge>
              <p className="font-inter text-sm text-muted-foreground">
                Støtter startup-økosystemet og unge entrepreneurs
              </p>
            </Card>
          </div>
          
          {/* Additional Partner Logos */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-anton font-bold text-foreground mb-6">
              Alle vores partnere
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-20 max-w-md mx-auto">
            {partners.map((partner, index) => (
              <a 
                key={index} 
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-muted rounded-lg p-6 text-center hover:shadow-lg transition-all cursor-pointer flex items-center justify-center"
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className={partner.name === "Ageras" ? "h-8 object-contain" : "w-12 h-12 rounded-full object-cover"}
                />
              </a>
            ))}
          </div>

          {/* Partner Testimonials */}
          <div className="mb-16">
            <h3 className="text-3xl font-anton font-bold text-foreground text-center mb-12">
              Hvad siger vores partnere?
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-muted flex items-center justify-center">
                        <img 
                          src={testimonial.avatar} 
                          alt={`${testimonial.name} avatar`}
                          className={testimonial.name === "Ageras Team" ? "w-10 h-10 object-contain" : "w-12 h-12 object-cover"}
                        />
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
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-anton font-bold text-foreground mb-6">
                Klar til at blive partner?
              </h2>
              <p className="font-inter text-muted-foreground mb-6">
                🎯 For sponsorat eller mere info, kontakt mig på LinkedIn eller via mail på kontakt@mikloenborg.com
              </p>
            </div>

            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="font-inter font-medium">
                      Virksomhedsnavn *
                    </Label>
                    <Input
                      id="companyName"
                      placeholder="Jeres virksomhed"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="font-inter"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson" className="font-inter font-medium">
                      Kontaktperson *
                    </Label>
                    <Input
                      id="contactPerson"
                      placeholder="Fulde navn"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      className="font-inter"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-inter font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="kontakt@jeresfirma.dk"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="font-inter"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-inter font-medium">
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+45 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="font-inter"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="package" className="font-inter font-medium">
                      Interesseret pakke
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('package', value)}>
                      <SelectTrigger className="font-inter">
                        <SelectValue placeholder="Vælg pakke" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="partner">Partner</SelectItem>
                        <SelectItem value="podcast">Podcast-sponsor</SelectItem>
                        <SelectItem value="support">Støttesponsor</SelectItem>
                        <SelectItem value="custom">Custom løsning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="font-inter font-medium">
                      Budget
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="font-inter">
                        <SelectValue placeholder="Vælg budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5k">Under 5.000 kr</SelectItem>
                        <SelectItem value="5k-10k">5.000-10.000 kr</SelectItem>
                        <SelectItem value="10k-20k">10.000-20.000 kr</SelectItem>
                        <SelectItem value="over-20k">Over 20.000 kr</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="font-inter font-medium">
                      Ønsket opstart
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="font-inter"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-inter font-medium">
                    Besked
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Fortæl os om jeres mål og hvordan vi kan hjælpe..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="font-inter min-h-[120px]"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Forespørgsel
                </Button>

                <p className="text-sm text-muted-foreground text-center font-inter">
                  Vi respekterer jeres privatty og deler aldrig jeres information.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
              <p className="font-inter text-sm text-muted-foreground">
                +45 12 34 56 78
              </p>
            </Card>
            <Card className="text-center p-6">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-dm-sans font-bold mb-2">Book Møde</h3>
              <p className="font-inter text-sm text-muted-foreground">
                Book et 30 min intro møde
              </p>
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
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg border px-6">
                  <AccordionTrigger className="font-dm-sans font-bold text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-inter text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VoresSponsoreBlivSponsor;