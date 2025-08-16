import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar, MapPin, Users, Edit, Trash2, Eye } from "lucide-react";
import { useEvents, useUpdateEvent, useDeleteEvent, Event } from "@/hooks/useEvents";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { da } from "date-fns/locale";

export const AdminEventsList = () => {
  const { data: allEvents = [], isLoading } = useEvents('all');
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const { toast } = useToast();
  
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    location: "",
    max_attendees: "",
    image_url: "",
    featured: false,
  });

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'dd.MM.yyyy', { locale: da });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string | null) => {
    if (!timeStr) return null;
    return timeStr.slice(0, 5);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setEditForm({
      title: event.title,
      description: event.description || "",
      event_date: event.event_date,
      event_time: event.event_time || "",
      location: event.location || "",
      max_attendees: event.max_attendees?.toString() || "",
      image_url: event.image_url || "",
      featured: event.featured,
    });
  };

  const handleUpdate = async () => {
    if (!editingEvent) return;
    
    try {
      await updateEvent.mutateAsync({
        id: editingEvent.id,
        updates: {
          title: editForm.title,
          description: editForm.description || null,
          event_date: editForm.event_date,
          event_time: editForm.event_time || null,
          location: editForm.location || null,
          max_attendees: editForm.max_attendees ? parseInt(editForm.max_attendees) : null,
          image_url: editForm.image_url || null,
          featured: editForm.featured,
        }
      });

      toast({
        title: "Event opdateret",
        description: "Eventet er blevet opdateret succesfuldt!",
      });
      
      setEditingEvent(null);
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved opdatering af eventet.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (eventId: string, eventTitle: string) => {
    try {
      await deleteEvent.mutateAsync(eventId);
      toast({
        title: "Event slettet",
        description: `"${eventTitle}" er blevet slettet.`,
      });
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved sletning af eventet.",
        variant: "destructive",
      });
    }
  };

  const upcomingEvents = allEvents.filter(event => event.status === 'upcoming');
  const pastEvents = allEvents.filter(event => event.status === 'past');

  if (isLoading) {
    return <div className="text-center">Loader events...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allEvents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Kommende Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{upcomingEvents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tidligere Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{pastEvents.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Alle Events</h3>
        
        {allEvents.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">Ingen events oprettet endnu</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {allEvents.map((event) => (
              <Card key={event.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{event.title}</h4>
                      {event.featured && (
                        <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                      )}
                      <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                        {event.status === 'upcoming' ? 'Kommende' : 'Tidligere'}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(event.event_date)} {event.event_time && `⏰ ${formatTime(event.event_time)}`}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.current_attendees} deltagere
                        {event.max_attendees && ` / ${event.max_attendees} max`}
                      </div>
                    </div>
                    
                    {event.description && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Dialog open={editingEvent?.id === event.id} onOpenChange={(open) => !open && setEditingEvent(null)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Rediger Event</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-title">Titel</Label>
                            <Input
                              id="edit-title"
                              value={editForm.title}
                              onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-description">Beskrivelse</Label>
                            <Textarea
                              id="edit-description"
                              value={editForm.description}
                              onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                              rows={3}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="edit-date">Dato</Label>
                              <Input
                                id="edit-date"
                                type="date"
                                value={editForm.event_date}
                                onChange={(e) => setEditForm(prev => ({ ...prev, event_date: e.target.value }))}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-time">Tid</Label>
                              <Input
                                id="edit-time"
                                type="time"
                                value={editForm.event_time}
                                onChange={(e) => setEditForm(prev => ({ ...prev, event_time: e.target.value }))}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="edit-location">Lokation</Label>
                            <Input
                              id="edit-location"
                              value={editForm.location}
                              onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-max-attendees">Max deltagere</Label>
                            <Input
                              id="edit-max-attendees"
                              type="number"
                              value={editForm.max_attendees}
                              onChange={(e) => setEditForm(prev => ({ ...prev, max_attendees: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-image">Billede URL</Label>
                            <Input
                              id="edit-image"
                              value={editForm.image_url}
                              onChange={(e) => setEditForm(prev => ({ ...prev, image_url: e.target.value }))}
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="edit-featured"
                              checked={editForm.featured}
                              onCheckedChange={(checked) => setEditForm(prev => ({ ...prev, featured: checked }))}
                            />
                            <Label htmlFor="edit-featured">Fremhævet</Label>
                          </div>
                          <Button onClick={handleUpdate} disabled={updateEvent.isPending} className="w-full">
                            {updateEvent.isPending ? "Opdaterer..." : "Opdater Event"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Slet Event</AlertDialogTitle>
                          <AlertDialogDescription>
                            Er du sikker på at du vil slette "{event.title}"? Denne handling kan ikke fortrydes.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuller</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(event.id, event.title)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Slet
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};