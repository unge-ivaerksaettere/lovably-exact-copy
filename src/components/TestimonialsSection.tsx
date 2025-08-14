import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TestimonialsSection = () => {
  const testimonials = [
    {
      initials: "MH",
      name: "Marie Hansen",
      title: "Founder & CEO, EcoTech Solutions",
      company: "EcoTech Solutions",
      quote: "Unge Iværksættere har været afgørende for min startup rejse. Netværket og mentorskabet jeg har fået gennem communityet er uvurderligt.",
    },
    {
      initials: "TA", 
      name: "Thomas Andersen",
      company: "FinanceBot",
      quote: "Gennem deres events og podcast har jeg lært mere om startup fundraising end noget sted andet. Jeg rejste 5M DKK efter at have fulgt deres råd.",
    },
    {
      initials: "LC",
      name: "Line Christensen", 
      company: "HealthTech Innovation",
      quote: "Det bedste startup community i Danmark. Jeg har fundet både co-founder, investorer og kunder gennem deres netværk.",
    },
    {
      initials: "FN",
      name: "Frederik Nielsen",
      company: "SportsTech Pro", 
      quote: "Podcasten er fyldt med actionable insights. Jeg lytter til hver episode og implementerer strategierne i mit eget startup.",
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hvad siger vores medlemmer?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hør hvordan Unge Iværksættere har hjulpet hundredvis af danske startups med at vokse.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <blockquote className="text-lg mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    {testimonial.title && (
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    )}
                    <Badge variant="outline" className="mt-1 text-xs">{testimonial.company}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;