import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mic, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const WhyChooseSection = () => {
  const features = [
    {
      icon: Users,
      title: "UI Club",
      description: "Bliv en del af vores eksklusive community på Skool med ressourcer, netværk og værktøjer til at accelerere din iværksætterrejse.",
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Deltag i inspirerende events i Århus og København med erfarne speakers og succesfulde iværksættere.",
    },
    {
      icon: Mic,
      title: "UI Talks",
      description: "Hør Niklas i samtale med Danmarks succesfulde iværksættere og lær fra deres rejse til toppen.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hvorfor vælge Unge Iværksættere?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gratis deltagelse, mulighed for networking og vidensdeling fra erfarne iværksættere. Kom med til vores næste event og bliv en del af fællesskabet.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center group">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-medium group-hover:scale-110 transition-all duration-300 ease-bounce">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button asChild variant="default" size="lg">
            <Link to="/events">Se Kommende Events</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/podcast">Lyt til Podcast</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;