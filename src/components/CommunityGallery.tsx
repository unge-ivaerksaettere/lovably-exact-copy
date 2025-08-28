import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CommunityGallery = () => {
  const galleryImages = [
    {
      src: "/placeholder.svg",
      alt: "Podcast recording session in studio",
      category: "Podcast",
      title: "Behind the Scenes"
    },
    {
      src: "/placeholder.svg", 
      alt: "Speaker presenting at startup event",
      category: "Events",
      title: "Knowledge Sharing"
    },
    {
      src: "/placeholder.svg",
      alt: "Entrepreneurs networking at event", 
      category: "Networking",
      title: "Community Building"
    },
    {
      src: "/placeholder.svg",
      alt: "Group discussion at entrepreneur meetup",
      category: "Community", 
      title: "Collaboration"
    },
    {
      src: "/placeholder.svg",
      alt: "Engaged audience at startup presentation",
      category: "Events",
      title: "Learning Together"
    },
    {
      src: "/placeholder.svg",
      alt: "Interview setup for entrepreneur podcast",
      category: "Podcast", 
      title: "Storytelling"
    }
  ];

  const categories = ["All", "Podcast", "Events", "Networking", "Community"];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vores Community i Aktion
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Se hvordan danske iværksættere samles, lærer og vokser sammen gennem vores events og podcast.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {categories.map((category) => (
            <Badge 
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <Badge variant="secondary" className="mb-2">
                        {image.category}
                      </Badge>
                      <h3 className="font-semibold">{image.title}</h3>
                    </div>
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

export default CommunityGallery;