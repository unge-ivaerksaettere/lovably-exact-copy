import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import mathiasProfile from "@/assets/mathias-profile.jpg";
import lasseProfile from "@/assets/lasse-profile.png";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Lasse Osmann",
      company: "Startup Founder",
      image: lasseProfile,
      quote: "Unge Iværksættere har givet mig det netværk og de insights, jeg havde brug for til at tage mit startup til næste niveau.",
    },
    {
      name: "Mathias Streander",
      company: "Coach",
      image: mathiasProfile,
      quote: "Fantastisk community med unge iværksættere der virkelig forstår udfordringerne ved at starte og drive en virksomhed.",
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hvad siger vores deltagere?</h2>
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
                   <Avatar className="w-12 h-12">
                     <AvatarImage src={testimonial.image} alt={testimonial.name} />
                   </Avatar>
                   <div>
                     <h4 className="font-semibold">{testimonial.name}</h4>
                     <Badge variant="outline" className="mt-1 text-xs">{testimonial.company}</Badge>
                   </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <a href="https://www.skool.com/unge-ivrksttere-3699/about?ref=be5d1399328b408e8a2cbe59f14ac667" target="_blank" rel="noopener noreferrer">
              🚀 Bliv en del af vores community
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;