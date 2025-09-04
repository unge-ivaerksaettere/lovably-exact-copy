import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import podcastRecording1 from "@/assets/podcast-recording-1.jpg";
import eventPresentation1 from "@/assets/event-presentation-1.jpg";
import communityNetworking1 from "@/assets/community-networking-1.jpg";
import eventAudience1 from "@/assets/event-audience-1.jpg";
import podcastRecording2 from "@/assets/podcast-recording-2.jpg";
import communityNetworking2 from "@/assets/community-networking-2.jpg";

const CommunityGallery = () => {
  const galleryImages = [
    {
      src: eventPresentation1,
      alt: "Speaker presenting at startup event with engaged audience",
      category: "Community",
      title: "Knowledge Sharing"
    },
    {
      src: communityNetworking1, 
      alt: "Young entrepreneurs networking and discussing ideas",
      category: "Community",
      title: "Behind the Scenes"
    },
    {
      src: podcastRecording1,
      alt: "Podcast recording session in professional studio",
      category: "Community",
      title: "Storytelling"
    },
    {
      src: eventAudience1,
      alt: "Engaged audience at startup presentation",
      category: "Community",
      title: "Learning Together"
    },
    {
      src: podcastRecording2,
      alt: "Interview setup for entrepreneur podcast",
      category: "Community", 
      title: "Deep Conversations"
    },
    {
      src: communityNetworking2,
      alt: "Group discussion at entrepreneur meetup",
      category: "Community", 
      title: "Collaboration"
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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[Autoplay({ delay: 3000 })]}
          className="max-w-6xl mx-auto"
        >
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img 
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default CommunityGallery;