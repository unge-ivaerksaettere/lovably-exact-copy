import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateEvent } from "@/hooks/useEvents";
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from "@/components/ImageUploader";

export const AdminEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    location: "",
    max_attendees: "",
    image_url: "",
    featured: false,
  });

  const createEvent = useCreateEvent();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createEvent.mutateAsync({
        title: formData.title,
        description: formData.description || null,
        event_date: formData.event_date,
        event_time: formData.event_time || null,
        location: formData.location || null,
        max_attendees: formData.max_attendees ? parseInt(formData.max_attendees) : null,
        image_url: formData.image_url || null,
        featured: formData.featured,
      });

      toast({
        title: "Event oprettet",
        description: "Dit event er blevet oprettet succesfuldt!",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        event_date: "",
        event_time: "",
        location: "",
        max_attendees: "",
        image_url: "",
        featured: false,
      });
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved oprettelse af eventet.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Opret nyt event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Event titel *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Beskrivelse</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="event_date">Dato *</Label>
              <Input
                id="event_date"
                type="date"
                value={formData.event_date}
                onChange={(e) => handleInputChange("event_date", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="event_time">Tid</Label>
              <Input
                id="event_time"
                type="time"
                value={formData.event_time}
                onChange={(e) => handleInputChange("event_time", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Lokation</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="max_attendees">Max deltagere</Label>
            <Input
              id="max_attendees"
              type="number"
              value={formData.max_attendees}
              onChange={(e) => handleInputChange("max_attendees", e.target.value)}
            />
          </div>

          <div>
            <Label>Event billede</Label>
            <ImageUploader
              onImageUploaded={(url) => handleInputChange("image_url", url)}
              currentImageUrl={formData.image_url}
              onImageRemoved={() => handleInputChange("image_url", "")}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleInputChange("featured", checked)}
            />
            <Label htmlFor="featured">Fremhævet event</Label>
          </div>

          <Button type="submit" disabled={createEvent.isPending} className="w-full">
            {createEvent.isPending ? "Opretter..." : "Opret event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};