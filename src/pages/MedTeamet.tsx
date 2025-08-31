import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Linkedin, Twitter, Mail, Heart, Rocket, Diamond, Zap } from "lucide-react";
import nicolajImage from "@/assets/nicolaj-gram-profile.png";

const MedTeamet = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Nicolaj Gram",
      title: "Online Community Lead",
      description: "Ansvarlig for at engagere vores medlemmer i communityet og lede events i Aarhus-området. Nicolaj bygger bro mellem lokale iværksættere og skaber sammenhæng i vores community.",
      location: "Aarhus",
      image: nicolajImage,
      quote: "Community bygges en relation ad gangen 🚀"
    },
    {
      id: 2,
      initials: "MN",
      name: "Marcus Nielsen", 
      title: "Co-founder & CTO",
      description: "Tech wizard med baggrund fra Spotify og Klarna. Bygger platforme der skalerer og communities der vokser.",
      location: "København",
      company: "Stripe",
      quote: "Code is poetry, startups er jazz 🎷",
      linkedin: "#",
      twitter: "#",
      email: "#"
    },
    {
      id: 3,
      initials: "SC",
      name: "Sarah Christensen",
      title: "Head of Content", 
      description: "Storyteller og podcaster med baggrund fra DR og Soundvenue. Laver content der inspirerer og engagerer.",
      location: "Aarhus",
      company: "Notion",
      quote: "Gode historier forandrer verden 🌟",
      linkedin: "#",
      twitter: "#",
      email: "#"
    },
    {
      id: 4,
      initials: "OA",
      name: "Oliver Andersen",
      title: "Head of Events",
      description: "Event maestro der skaber uforglemmelige oplevelser. Tidligere hos TED og Roskilde Festival.",
      location: "København", 
      company: "Eventbrite",
      quote: "Liv er for kort til kedelige events 🎉",
      linkedin: "#",
      twitter: "#",
      email: "#"
    },
    {
      id: 5,
      initials: "IH",
      name: "Ida Hansen",
      title: "Community Manager",
      description: "Skaber connections der betyder noget. Tidligere hos Founders House og Techstars København.",
      location: "København",
      company: "Discord", 
      quote: "Communities bygges en relation ad gangen 💚",
      linkedin: "#",
      twitter: "#",
      email: "#"
    },
    {
      id: 6,
      initials: "LP", 
      name: "Lucas Petersen",
      title: "Partnership Manager",
      description: "Builder bridges mellem startups og etablerede virksomheder. MBA fra INSEAD og erfaring fra Microsoft.",
      location: "København",
      company: "Salesforce",
      quote: "Partnerships = 1+1=3 🤝",
      linkedin: "#",
      twitter: "#", 
      email: "#"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Authenticity",
      description: "Vi er ægte, gennemsigtlig og bygger reelle relationer.",
      color: "text-green-500"
    },
    {
      icon: Rocket,
      title: "Innovation", 
      description: "Vi udfordrer status quo og skaber nye løsninger.",
      color: "text-red-500"
    },
    {
      icon: Diamond,
      title: "Community",
      description: "Vi bygger sammen og hjælper hinanden med at vokse.",
      color: "text-yellow-500"
    },
    {
      icon: Zap,
      title: "Impact",
      description: "Vi skaber reel værdi for Danmarks startup økosystem.",
      color: "text-blue-500"
    }
  ];

  const faqData = [
    {
      question: "Hvad er Unge Iværksættere?",
      answer: "Unge Iværksættere er Danmarks største community for startup-entreprenører under 35 år."
    },
    {
      question: "Hvem kan deltage i jeres events?",
      answer: "Alle interesserede i startup og entrepreneurship er velkommen - fra idéstadiet til etablerede iværksættere."
    },
    {
      question: "Koster det noget at deltage?",
      answer: "De fleste af vores events er gratis. Enkelte workshops kan have en lille deltagerbetaling."
    },
    {
      question: "Hvor afholdes jeres events?",
      answer: "Vi afholder events i hele Danmark - primært i København, Aarhus og online."
    },
    {
      question: "Kan jeg blive speaker på jeres events?",
      answer: "Ja! Vi er altid på udkig efter inspirerende speakers. Kontakt os for mere information."
    },
    {
      question: "Hvordan kan min virksomhed blive sponsor?",
      answer: "Vi tilbyder forskellige sponsormuligheder. Send os en mail for at høre mere om mulighederne."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-anton text-foreground mb-6">
              Mød Teamet
            </h1>
            <p className="text-lg font-inter text-muted-foreground max-w-3xl mx-auto mb-16">
              Vi er passionerede iværksættere og tech entusiaster der brænder for at skabe Danmarks stærkeste startup community.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-anton text-foreground text-center mb-16">
            Meet the Team
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="border-border relative">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Avatar and Orange Dot */}
                    <div className="relative w-fit mx-auto">
                      {member.image ? (
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xl font-dm-sans font-bold text-primary-foreground">
                            {member.initials}
                          </span>
                        </div>
                      )}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full"></div>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-dm-sans font-bold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-primary font-dm-sans text-sm">
                        {member.title}
                      </p>
                    </div>
                    
                    <p className="text-sm text-muted-foreground font-inter text-center">
                      {member.description}
                    </p>
                    
                    <div className="space-y-2 text-xs font-inter">
                      <div className="flex items-center justify-center gap-1">
                        <span>📍</span>
                        <span className="text-muted-foreground">{member.location}</span>
                      </div>
                      {member.company && (
                        <div className="flex items-center justify-center gap-1">
                          <span>💼</span>
                          <span className="text-muted-foreground">{member.company}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm font-inter text-center italic text-muted-foreground">
                      "{member.quote}"
                    </p>
                    
                    {/* Social Links */}
                    {(member.linkedin || member.twitter || member.email) && (
                      <div className="flex justify-center gap-3">
                        {member.linkedin && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="w-4 h-4 text-muted-foreground" />
                            </a>
                          </Button>
                        )}
                        {member.twitter && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                              <Twitter className="w-4 h-4 text-muted-foreground" />
                            </a>
                          </Button>
                        )}
                        {member.email && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={`mailto:${member.email}`}>
                              <Mail className="w-4 h-4 text-muted-foreground" />
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-anton text-foreground text-center mb-16">
            Vores Værdier
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-border text-center">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <value.icon className={`w-12 h-12 ${value.color}`} />
                    </div>
                    <h3 className="text-lg font-dm-sans font-bold text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-inter">
                      {value.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-lg p-8 text-center text-primary-foreground">
            <h3 className="text-2xl font-anton mb-4">
              Vil du være en del af teamet?
            </h3>
            <p className="font-inter mb-6 opacity-90 max-w-2xl mx-auto">
              Vi er altid på udkig efter talentfulde personer der deler vores passion for entrepreneurship og community building.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold">
                📧 Se Ledige Stillinger
              </Button>
              <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-dm-sans font-bold">
                Kontakt Os
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-anton text-foreground mb-4">
              Ofte Stillede Spørgsmål
            </h2>
            <p className="text-muted-foreground font-inter">
              Find svar på de mest almindelige spørgsmål om Unge Iværksættere
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-background border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="font-dm-sans font-bold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-inter text-muted-foreground pb-6">
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

export default MedTeamet;