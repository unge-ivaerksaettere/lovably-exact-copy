import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users, Mail } from "lucide-react";
import { useEventRegistration } from "@/hooks/useEventRegistration";

interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  event_time?: string;
  location?: string;
  max_attendees?: number;
  current_attendees?: number;
}

interface EventRegistrationDialogProps {
  event: Event;
  children: React.ReactNode;
}

export const EventRegistrationDialog = ({ event, children }: EventRegistrationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  
  const registerMutation = useEventRegistration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      return;
    }

    await registerMutation.mutateAsync({
      eventId: event.id,
      email: email.trim(),
      firstName: firstName.trim() || undefined,
      lastName: lastName.trim() || undefined,
      subscribeNewsletter,
    });

    // Reset form and close dialog
    setEmail("");
    setFirstName("");
    setLastName("");
    setSubscribeNewsletter(false);
    setOpen(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("da-DK", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isFull = event.max_attendees && event.current_attendees && event.current_attendees >= event.max_attendees;
  const isEventPast = new Date(event.event_date) < new Date();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Tilmeld dig eventet
          </DialogTitle>
        </DialogHeader>

        <Card className="border-l-4 border-l-primary">
          <CardContent className="pt-4">
            <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(event.event_date)}</span>
              </div>
              {event.event_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.event_time}</span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              )}
              {event.max_attendees && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{event.current_attendees || 0} / {event.max_attendees} tilmeldte</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {isEventPast ? (
          <div className="bg-muted p-4 rounded-lg text-center">
            <p className="text-muted-foreground">Dette event er allerede afholdt</p>
          </div>
        ) : isFull ? (
          <div className="bg-destructive/10 p-4 rounded-lg text-center">
            <p className="text-destructive font-medium">Dette event er fuldt booket</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@email.dk"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Fornavn</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Fornavn"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Efternavn</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Efternavn"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
              <Checkbox
                id="newsletter"
                checked={subscribeNewsletter}
                onCheckedChange={(checked) => setSubscribeNewsletter(checked === true)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="newsletter"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Tilmeld nyhedsbrev
                  </div>
                </Label>
                <p className="text-xs text-muted-foreground">
                  Få besked om nye events og iværksætter-nyheder
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                💡 Du vil modtage en bekræftelses-email efter tilmelding
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Tilmelder..." : "Tilmeld dig nu"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};