import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SpeakersSection = () => {
  const featuredSpeaker = {
    name: "Jesper Theil Thomsen",
    title: "CEO & Founder", 
    company: "Soundboks",
    description: "Jesper delte sin inspirerende rejse fra startup til international hardware succes med Soundboks.",
    image: "/lovable-uploads/5fbda5c2-d6ad-4437-ac2c-5e5b1182b6c3.png",
    linkedin: "https://www.linkedin.com/in/jespertheilthomsen",
    instagram: "https://www.instagram.com/jespertthomsen/",
    website: "https://soundboks.com/"
  };

  const speakers = [
    {
      initials: "MA",
      name: "Mads Andreas Olesen",
      title: "Founder",
      company: "MXNEY.IO",
      description: "Mads delte indsigter om fintech innovation og digitale finansielle løsninger.",
      linkedin: "https://www.linkedin.com/in/madsandreasolesen/",
      instagram: "https://www.instagram.com/madsandreasolesen/"
    },
    {
      initials: "LS",
      name: "Lasse Søkilde",
      title: "Founder",
      company: "BOLD",
      description: "Lasse lærte deltagerne om brand building og kreativ markedsføring.",
      linkedin: "https://www.linkedin.com/in/lassesoekilde",
      instagram: "https://www.instagram.com/lassesoekildebold"
    },
    {
      initials: "KK",
      name: "Kasper Knudsen",
      title: "Founder og CEO",
      company: "Sedia ApS",
      description: "Kasper delte sin erfaring med at skalere tech-virksomheder.",
      linkedin: "https://www.linkedin.com/in/kasper-knudsen-sedia",
      website: "https://sedia.dk/"
    },
    {
      initials: "DP",
      name: "Daniel Pedersen",
      title: "Founder",
      company: "Daniels Pengetips",
      description: "Daniel gav praktiske råd om finansiel rådgivning for startups.",
      linkedin: "https://www.linkedin.com/in/danielhansenp",
      website: "https://danielspengetips.dk/"
    },
    {
      initials: "AL",
      name: "Anthon Louis",
      title: "Serieiværksætter",
      company: "Arch, Museo & Bareen",
      description: "Anthon delte sin erfaring som serieiværksætter og opbygning af flere virksomheder.",
      linkedin: "https://www.linkedin.com/in/anthon-louis-madsen-719054113",
      instagram: "https://www.instagram.com/anthonlouis/"
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

        {/* Featured Speaker */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={featuredSpeaker.image} 
                alt={featuredSpeaker.name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground">⭐ Featured Speaker</Badge>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-anton text-foreground mb-2">
                  {featuredSpeaker.name}
                </h3>
                <p className="text-lg font-dm-sans font-bold text-primary mb-1">
                  {featuredSpeaker.title}
                </p>
                <p className="font-inter text-muted-foreground mb-4">
                  {featuredSpeaker.company}
                </p>
              </div>
              
              <p className="text-muted-foreground font-inter">
                {featuredSpeaker.description}
              </p>
              
              <div className="flex gap-3">
                {featuredSpeaker.linkedin && (
                  <Button variant="outline" size="sm" className="font-dm-sans" asChild>
                    <a href={featuredSpeaker.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </Button>
                )}
                {featuredSpeaker.instagram && (
                  <Button variant="outline" size="sm" className="font-dm-sans" asChild>
                    <a href={featuredSpeaker.instagram} target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  </Button>
                )}
                {featuredSpeaker.website && (
                  <Button variant="outline" size="sm" className="font-dm-sans" asChild>
                    <a href={featuredSpeaker.website} target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Other Speakers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
              <p className="text-sm font-inter text-muted-foreground mb-3">
                {speaker.company}
              </p>
              <p className="text-sm font-inter text-muted-foreground mb-4">
                {speaker.description}
              </p>
              <div className="flex gap-2 justify-center">
                {speaker.linkedin && (
                  <Button variant="outline" size="sm" className="text-xs" asChild>
                    <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </Button>
                )}
                {speaker.instagram && (
                  <Button variant="outline" size="sm" className="text-xs" asChild>
                    <a href={speaker.instagram} target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  </Button>
                )}
                {speaker.website && (
                  <Button variant="outline" size="sm" className="text-xs" asChild>
                    <a href={speaker.website} target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center space-y-4">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold px-8 mr-4">
            Se event replays
          </Button>
          <Button variant="outline" className="font-dm-sans font-bold px-8">
            Se alle speakers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
