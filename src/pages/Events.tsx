import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Startup Pitch Night Copenhagen",
      date: "2024-02-15",
      time: "18:00 - 21:00",
      location: "Impact Hub Copenhagen",
      attendees: 89,
      maxAttendees: 100,
      description: "En aften hvor unge iværksættere kan pitche deres idéer for investorer og mentorer",
      category: "Pitch",
      status: "Få pladser tilbage"
    },
    {
      id: 2,
      title: "Digital Marketing for Startups",
      date: "2024-02-22",
      time: "19:00 - 21:30",
      location: "Online (Zoom)",
      attendees: 156,
      maxAttendees: 200,
      description: "Lær hvordan du markedsfører din startup digitalt med eksperter fra branchen",
      category: "Workshop",
      status: "Åben tilmelding"
    },
    {
      id: 3,
      title: "Fundraising Fundamentals",
      date: "2024-03-01",
      time: "17:30 - 20:00",
      location: "Founders House, Aarhus",
      attendees: 42,
      maxAttendees: 80,
      description: "Alt hvad du skal vide om fundraising - fra første møde til term sheet",
      category: "Education",
      status: "Åben tilmelding"
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "SaaS Scaling Strategies",
      date: "2024-01-18",
      location: "Copenhagen Business School",
      attendees: 120,
      category: "Panel"
    },
    {
      id: 5,
      title: "Women in Tech Meetup",
      date: "2024-01-10",
      location: "TechBBQ HQ",
      attendees: 95,
      category: "Networking"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Events & Meetups
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Mød ligesindede iværksættere og lær af de bedste
            </p>
            <Button size="lg" variant="hero">
              Se alle kommende events
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kommende Events</h2>
            <p className="text-lg text-muted-foreground">
              Tilmeld dig vores næste events og vær del af fællesskabet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{event.category}</Badge>
                    <Badge variant={event.status === "Få pladser tilbage" ? "destructive" : "default"}>
                      {event.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString('da-DK', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {event.attendees}/{event.maxAttendees} tilmeldte
                    </div>
                  </div>
                  <Button className="w-full mt-6" variant="orange">
                    Tilmeld dig
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tidligere Events</h2>
            <p className="text-lg text-muted-foreground">
              Se hvad vi har arrangeret tidligere
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastEvents.map((event) => (
              <Card key={event.id} className="bg-white">
                <CardHeader>
                  <Badge variant="outline" className="w-fit">{event.category}</Badge>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString('da-DK')}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {event.attendees} deltagere
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange to-orange-dark">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vil du arrangere et event?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Vi hjælper dig med at nå ud til vores community af 500+ iværksættere
            </p>
            <Button size="lg" variant="hero">
              Kontakt os
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;