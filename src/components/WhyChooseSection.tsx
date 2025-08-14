import { Card, CardContent } from "@/components/ui/card";
import { Users, Mic, Calendar } from "lucide-react";

const WhyChooseSection = () => {
  const features = [
    {
      icon: Users,
      title: "Stærkt Netværk",
      description: "Få adgang til Danmarks største community af unge iværksættere og mentorer.",
    },
    {
      icon: Mic,
      title: "Ekspert Podcast",
      description: "Lyt til dybdegående interviews med succesrige grundlægge og investorer.",
    },
    {
      icon: Calendar,
      title: "Inspirerende Events",
      description: "Deltag i workshops, networking events og pitch sessions i hele landet.",
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hvorfor vælge Unge Iværksættere?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bliv en del af Danmarks mest dynamiske startup community og accelerer din iværksætter rejse.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;