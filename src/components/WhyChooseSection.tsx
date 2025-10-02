import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mic, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import thinkLogo from "@/assets/think-transparent.png";
import uiLogo from "@/assets/ui-logo-main.png";
import uiIconFeature from "@/assets/ui-logo-events.png";
import uiTalksLogo from "@/assets/ui-talks-logo-new.png";

const WhyChooseSection = () => {
  const features = [
    {
      icon: null,
      title: "",
      description: "Bliv en del af vores eksklusive community på Skool med ressourcer, netværk og værktøjer til at accelerere din iværksætterrejse.",
      customIcon: thinkLogo,
    },
    {
      icon: null,
      title: "",
      description: "Deltag i inspirerende events i Århus og København med erfarne speakers og succesfulde iværksættere.",
      customIcon: uiIconFeature,
      link: "/events",
    },
    {
      icon: null,
      title: "",
      description: "Hør Niklas i samtale med Danmarks mest succesfulde iværksættere og lær fra deres rejse til toppen.",
      customIcon: uiTalksLogo,
      link: "/podcast",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6 md:px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-anton font-bold mb-4 px-2">Hvorfor vælge Unge Iværksættere?</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-inter px-2">
            Gratis deltagelse, mulighed for networking og vidensdeling fra erfarne iværksættere. Kom med til vores næste event og bliv en del af fællesskabet.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center group">
              <CardContent className="p-6 sm:p-8">
                {feature.customIcon ? (
                  <div className="mx-auto mb-2 sm:mb-3">
                    {feature.link ? (
                      <Link to={feature.link}>
                        <img src={feature.customIcon} alt={feature.title} className="w-40 h-40 sm:w-48 sm:h-48 object-contain mx-auto group-hover:scale-110 transition-all duration-300 ease-bounce cursor-pointer" />
                      </Link>
                    ) : (
                      <a href="https://www.skool.com/unge-ivrksttere-3699/about?ref=be5d1399328b408e8a2cbe59f14ac667" target="_blank" rel="noopener noreferrer">
                        <img src={feature.customIcon} alt={feature.title} className="w-40 h-40 sm:w-48 sm:h-48 object-contain mx-auto group-hover:scale-110 transition-all duration-300 ease-bounce cursor-pointer" />
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-30 sm:h-30 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-medium group-hover:scale-110 transition-all duration-300 ease-bounce">
                    {feature.icon && <feature.icon className="w-12 h-12 sm:w-15 sm:h-15 text-white" />}
                  </div>
                )}
                {feature.title && <h3 className="text-lg sm:text-xl font-dm-sans font-bold mb-3 sm:mb-4">{feature.title}</h3>}
                <p className="text-sm sm:text-base text-muted-foreground font-inter">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;