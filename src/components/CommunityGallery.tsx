import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import podcastRecording1 from "@/assets/podcast-recording-1.jpg";
import eventPresentation1 from "@/assets/event-presentation-1.jpg";
import communityNetworking1 from "@/assets/community-networking-1.jpg";
import eventAudience1 from "@/assets/event-audience-1.jpg";
import podcastRecording2 from "@/assets/podcast-recording-2.jpg";
import communityNetworking2 from "@/assets/community-networking-2.jpg";

const CommunityGallery = () => {
  const galleryImages = [
    {
      src: podcastRecording1,
      alt: "Podcast recording session in studio",
      category: "Podcast",
      title: "Behind the Scenes"
    },
    {
      src: eventPresentation1, 
      alt: "Speaker presenting at startup event",
      category: "Events",
      title: "Knowledge Sharing"
    },
    {
      src: communityNetworking1,
      alt: "Entrepreneurs networking at event", 
      category: "Networking",
      title: "Community Building"
    },
    {
      src: communityNetworking2,
      alt: "Group discussion at entrepreneur meetup",
      category: "Community", 
      title: "Collaboration"
    },
    {
      src: eventAudience1,
      alt: "Engaged audience at startup presentation",
      category: "Events",
      title: "Learning Together"
    },
    {
      src: podcastRecording2,
      alt: "Interview setup for entrepreneur podcast",
      category: "Podcast", 
      title: "Storytelling"
    }
  ];

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