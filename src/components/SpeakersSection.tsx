import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import kimRantsImg from "@/assets/kim-rants.jpg";
import wernerValeurImg from "@/assets/werner-valeur.png";
import nikolajNyholmImg from "@/assets/nikolaj-nyholm.jpg";
import fazelProfileImg from "@/assets/fazel-profile.jpg";
import sophusProfileImg from "@/assets/sophus-profile.jpg";
import saxoProfileImg from "@/assets/saxo-profile.jpg";
const SpeakersSection = () => {
  const speakers = [{
    initials: "KR",
    name: "Kim Rants",
    title: "Co-founder & CEO, Alice.tech",
    company: "Alice.tech",
    description: "AI-ekspert og tidligere McKinsey Partner. Bygger AI-drevet uddannelsesplatform.",
    image: kimRantsImg
  }, {
    initials: "WV",
    name: "Werner Valeur",
    title: "Seriel Iværksætter",
    company: "10+ Companies",
    description: "Grundlagt over 10 virksomheder siden han var 18 år. Specialist i hurtig skalering.",
    image: wernerValeurImg
  }, {
    initials: "NN",
    name: "Nikolaj Nyholm",
    title: "Partner, Sunstone Capital",
    company: "Sunstone Capital",
    description: "Grundlagde Polar Rose (solgt til Apple) og Speednames/Ascio. Nu investor hos Sunstone.",
    image: nikolajNyholmImg
  }, {
    initials: "FM",
    name: "Fazel Majed",
    title: "Forbes 30 Under 30",
    company: "Entrepreneur",
    description: "Ung iværksætter og Forbes 30 Under 30 modtager. Aktiv i startup-økosystemet og inspirerer næste generation af iværksættere.",
    image: fazelProfileImg
  }, {
    initials: "SV",
    name: "Sophus Vinterberg",
    title: "Founder & CEO, House of Vinterberg",
    company: "House of Vinterberg",
    description: "Grundlægger og CEO af House of Vinterberg. Specialist i skandinavisk stil og skræddersyet mode til ledere og iværksættere.",
    image: sophusProfileImg
  }, {
    initials: "SA",
    name: "Saxo Agdestein",
    title: "Founder, Handyhand & HappyHelper",
    company: "Handyhand",
    description: "Entrepreneur og podcaster der har bygget Handyhand til 250K+ brugere og 300K+ tasks. Specialist i at forbinde mennesker gennem innovative digitale løsninger.",
    image: saxoProfileImg
  }];
  return <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-6 md:px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-anton font-bold mb-4 px-2">Featured Speakers</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-inter px-2">
            Lær af Danmarks mest succesrige iværksættere og investorer på vores events.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {speakers.map((speaker, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <Avatar className="w-12 h-12 sm:w-14 sm:h-14 ring-1 ring-border">
                    <AvatarImage src={speaker.image} alt={speaker.name} />
                    <AvatarFallback>{speaker.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-semibold">{speaker.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{speaker.title}</p>
                    <Badge variant="outline" className="mt-1 text-xs">{speaker.company}</Badge>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{speaker.description}</p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default SpeakersSection;