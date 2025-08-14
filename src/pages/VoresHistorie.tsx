import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const VoresHistorie = () => {
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
      answer: "Du kan udfylde formularen på vores sponsor-side eller kontakte os direkte. Vi tilbyder forskellige sponsorpakker, der kan tilpasses jeres behov og budget."
    }
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