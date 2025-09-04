import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Linkedin, Heart, Rocket, Diamond, Zap } from "lucide-react";
import nicolajImage from "@/assets/nicolaj-profile.jpg";
import sejerImage from "@/assets/sejer-profile.jpg";
import albertImage from "@/assets/albert-profile.jpg";
import niklasImage from "@/assets/niklas-profile.jpg";

const MedTeamet = () => {
  const teamMembers = [
    {
      id: 1,
      initials: "NG",
      name: "Nicolaj Gram",
      title: "Online Community Lead",
      description: "Nicolaj er drivkraften bag vores online fællesskab og med til at skabe stærke rammer for events i Aarhus. Han brænder for at engagere medlemmerne og sørger for, at alle føler sig som en del af UI-familien.",
      location: "Aarhus",
      image: nicolajImage,
      linkedin: "https://www.linkedin.com/in/nicolaj-gram-136178232/"
    },
    {
      id: 2,
      initials: "SA",
      name: "Sejer Andersen", 
      title: "Tech lead",
      description: "Sejer er vores tech-hjerne. Han arbejder med at styrke Unge Iværksætteres digitale tilstedeværelse og udvikler løsninger, der gør det muligt for UI at vokse hurtigt og bæredygtigt.",
      location: "København",
      image: sejerImage,
      linkedin: "https://www.linkedin.com/in/sejer-hornb%C3%A6k-dahl-andersen-703548222/"
    },
    {
      id: 3,
      initials: "ML",
      name: "Mik Lønborg",
      title: "Formand", 
      description: "Mik har stået i spidsen for Unge Iværksættere de sidste to år og driver organisationen med både stærkt lederskab og en ægte passion for iværksætteri. Han sikrer, at UI har det bedste fundament for at vokse, skabe fede events og give unge iværksættere de rette muligheder.",
      location: "København",
      linkedin: "https://www.linkedin.com/in/miklonborg/"
    },
    {
      id: 4,
      initials: "NO",
      name: "Niklas Olesen",
      title: "Podcast production lead",
      description: "Niklas er stemmen bag Unge Iværksætteres podcast-univers. Han skaber samtaler, der både inspirerer og udfordrer, og bringer spændende historier fra iværksættermiljøet direkte til vores community. Med Niklas bag mikrofonen bliver der altid leveret indhold, man kan lære af – og lytte til igen og igen.",
      location: "København", 
      image: niklasImage,
      linkedin: "https://www.linkedin.com/in/niklaskockolesen/"
    },
    {
      id: 5,
      initials: "FK",
      name: "Freja Kjeldgaard",
      title: "Head of content",
      description: "Freja er vores kreative kraftcenter og hjernen bag alt det content, du ser fra Unge Iværksættere. Hun kombinerer skarp strategi med et øje for trends og sikrer, at vores indhold både inspirerer, engagerer og ser knivskarpt ud. Kort sagt: hun gør idéer til content, der rammer plet – hver gang.",
      location: "København",
      linkedin: "https://www.linkedin.com/in/freja-kjeldgaard-498a10267/"
    },
    {
      id: 6,
      initials: "LJ", 
      name: "Lauritz Jelsdal",
      title: "Head of finance",
      description: "Lauritz er manden med styr på tallene. Han sørger for, at økonomien spiller, og at alle vores projekter og events kan løbe rundt uden problemer.",
      location: "København",
      linkedin: "https://www.linkedin.com/in/lauritz-jelsdal-jensen/"
    },
    {
      id: 7,
      initials: "TD",
      name: "Thomas Dahl",
      title: "Event lead",
      description: "Med solid erhvervserfaring og et stort netværk er Thomas en nøglespiller i at skabe de fedeste events i Jylland – sammen med Nicolaj.",
      location: "Danmark",
      linkedin: "https://www.linkedin.com/in/thomas-dahl-placeholder/" // TODO: Add real LinkedIn URL
    },
    {
      id: 8,
      initials: "ST",
      name: "Selma Thaysen", 
      title: "Graphic designer",
      description: "Selma er vores visuelle tryllekunstner. Hun designer alt fra grafik til identitet, og sikrer, at UI altid fremstår kreativt og professionelt.",
      location: "København",
      image: albertImage,
      linkedin: "https://www.linkedin.com/in/selma-thaysen-placeholder/" // TODO: Add real LinkedIn URL
    },
    {
      id: 9,
      initials: "AM",
      name: "Albert Malling",
      title: "Head of Photography", 
      description: "Albert er manden bag kameraet og skyder alt det fede content, du ser fra UI. Han fanger stemningen og gør vores events og platforme levende.",
      location: "København",
      linkedin: "https://www.linkedin.com/in/albert-malling-placeholder/" // TODO: Add real LinkedIn URL
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
      <section className="py-12 bg-background">
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
            Vores Team
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
                    </div>
                    
                    {/* Social Links */}
                    {member.linkedin && (
                      <div className="flex justify-center gap-3">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4 text-muted-foreground" />
                          </a>
                        </Button>
                      </div>
                    )}
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