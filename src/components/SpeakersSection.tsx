import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SpeakersSection = () => {
  const speakers = [
    {
      initials: "JT",
      name: "Jesper Theil Thomsen",
      title: "CEO & Founder",
      company: "Soundboks"
    },
    {
      initials: "MA",
      name: "Mads Andreas Olesen", 
      title: "Founder",
      company: "MXNEY.IO"
    },
    {
      initials: "LS",
      name: "Lasse Søkilde",
      title: "Founder", 
      company: "BOLD"
    },
    {
      initials: "KK",
      name: "Kasper Knudsen",
      title: "Founder og CEO",
      company: "Sedia ApS"
    },
    {
      initials: "DP", 
      name: "Daniel Pedersen",
      title: "Founder",
      company: "Daniels Pengetips"
    },
    {
      initials: "AL",
      name: "Anthon Louis",
      title: "Serieiværksætter",
      company: "Arch, Museo & Bareen"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-anton font-bold text-foreground mb-6">
            De fedeste iværksættere, hver gang!
          </h2>
          <p className="text-lg font-inter text-muted-foreground mb-8 max-w-3xl mx-auto">
            Her er nogle af de speakers, som har inspiret vores deltagere til vores events. Fra succesfulde grundlæggere til erfarne iværksættere.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker, index) => (
            <Card key={index} className="p-6 text-center border-border">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold font-dm-sans">
                {speaker.initials}
              </div>
              <h3 className="text-lg font-dm-sans font-bold text-foreground mb-1">
                {speaker.name}
              </h3>
              <p className="text-sm font-inter font-semibold text-primary mb-1">
                {speaker.title}
              </p>
              <Badge className="bg-muted text-muted-foreground">
                {speaker.company}
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
