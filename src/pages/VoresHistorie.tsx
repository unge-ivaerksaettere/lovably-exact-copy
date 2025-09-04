import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const VoresHistorie = () => {
  const faqs = [
    {
      question: "Hvad er Unge Iværksættere?",
      answer: "Unge Iværksættere er Danmarks største startup community med over 500 medlemmer med henblik på at gøre iværksætteri mere tilgængeligt og give fremtidens iværksættere de bedste kort på hånden. Vi arrangerer events, laver podcast og skaber netværk for unge iværksættere.",
    },
    {
      question: "Hvem kan deltage i jeres events?",
      answer: "Alle interesserede i iværksætteri kan deltage i vores events - både erfarne iværksættere og dem der overvejer at starte deres første startup.",
    },
    {
      question: "Koster det noget at deltage?",
      answer: "Alle vores events er gratis for deltagerne. Vi tror på at gøre iværksætteri tilgængeligt for alle.",
    },
    {
      question: "Hvor afholdes jeres events?",
      answer: "Vi holder events i København og Aarhus samt virtuelle webinarer så alle kan deltage.",
    },
    {
      question: "Kan jeg blive speaker på jeres events?",
      answer: "Absolut! Vi er altid på udkig efter inspirerende speakers. Kontakt os på kontakt@ungeiværksættere.dk med dit forslag og vi vender tilbage hurtigst muligt.",
    },
    {
      question: "Hvordan kan min virksomhed blive sponsor?",
      answer: "Vi samarbejder med virksomheder der støtter startup-økosystemet. Kontakt os på kontakt@ungeiværksættere.dk for at høre om sponsormuligheder og partnerskaber.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-anton font-bold text-foreground mb-6">
            Vores Historie
          </h1>
          <p className="text-xl font-inter text-muted-foreground max-w-3xl mx-auto">
            Læs om hvordan Unge Iværksættere blev til, og vores rejse gennem årene
          </p>
        </div>
      </section>

      {/* Content Section - Placeholder for now */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg font-inter text-muted-foreground text-center mb-12">
              Indhold kommer snart...
            </p>
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

export default VoresHistorie;