import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Mail, CheckCircle, XCircle, Users, Calendar, Download } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { da } from "date-fns/locale";

interface EventRegistration {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  subscribe_newsletter: boolean;
  confirmed_at?: string;
  created_at: string;
  events: {
    id: string;
    title: string;
    event_date: string;
    event_time?: string;
  };
}

export const AdminEventRegistrations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Fetch all registrations
  const { data: registrations = [], isLoading } = useQuery({
    queryKey: ['admin-registrations'],
    queryFn: async (): Promise<EventRegistration[]> => {
      const { data, error } = await supabase
        .from('event_registrations')
        .select(`
          *,
          events (
            id,
            title,
            event_date,
            event_time
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  // Fetch events for filter dropdown
  const { data: events = [] } = useQuery({
    queryKey: ['admin-events-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('id, title, event_date')
        .order('event_date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  // Confirm registration mutation
  const confirmRegistration = useMutation({
    mutationFn: async (registrationId: string) => {
      const { error } = await supabase
        .from('event_registrations')
        .update({ confirmed_at: new Date().toISOString() })
        .eq('id', registrationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-registrations'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({
        title: "Tilmelding bekræftet",
        description: "Tilmeldingen er nu bekræftet og deltageren er tilføjet til eventet.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fejl",
        description: "Kunne ikke bekræfte tilmelding: " + error.message,
        variant: "destructive",
      });
    },
  });

  // Delete registration mutation
  const deleteRegistration = useMutation({
    mutationFn: async (registrationId: string) => {
      const { error } = await supabase
        .from('event_registrations')
        .delete()
        .eq('id', registrationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-registrations'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({
        title: "Tilmelding slettet",
        description: "Tilmeldingen er blevet slettet.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fejl",
        description: "Kunne ikke slette tilmelding: " + error.message,
        variant: "destructive",
      });
    },
  });

  // Filter registrations
  const filteredRegistrations = registrations.filter(registration => {
    const matchesSearch = 
      registration.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.events.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEvent = selectedEvent === "all" || registration.events.id === selectedEvent;
    
    const matchesStatus = 
      statusFilter === "all" ||
      (statusFilter === "confirmed" && registration.confirmed_at) ||
      (statusFilter === "pending" && !registration.confirmed_at);

    return matchesSearch && matchesEvent && matchesStatus;
  });

  // Statistics
  const totalRegistrations = registrations.length;
  const confirmedRegistrations = registrations.filter(r => r.confirmed_at).length;
  const pendingRegistrations = registrations.filter(r => !r.confirmed_at).length;
  const newsletterSubscribers = registrations.filter(r => r.subscribe_newsletter).length;

  // Export functionality
  const exportRegistrations = () => {
    const csvData = filteredRegistrations.map(reg => ({
      Event: reg.events.title,
      Email: reg.email,
      Fornavn: reg.first_name || '',
      Efternavn: reg.last_name || '',
      Status: reg.confirmed_at ? 'Bekræftet' : 'Afventer',
      Nyhedsbrev: reg.subscribe_newsletter ? 'Ja' : 'Nej',
      Tilmeldt: format(new Date(reg.created_at), 'dd.MM.yyyy HH:mm', { locale: da }),
      Bekræftet: reg.confirmed_at ? format(new Date(reg.confirmed_at), 'dd.MM.yyyy HH:mm', { locale: da }) : '-'
    }));

    const csv = [
      Object.keys(csvData[0] || {}).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event-registrations-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  if (isLoading) {
    return <div className="text-center">Loader tilmeldinger...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tilmeldinger</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRegistrations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bekræftede</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{confirmedRegistrations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Afventer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingRegistrations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nyhedsbrev</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{newsletterSubscribers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Event Tilmeldinger</CardTitle>
            <Button onClick={exportRegistrations} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Eksporter CSV
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Søg efter email, navn eller event..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Vælg event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle events</SelectItem>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle</SelectItem>
                <SelectItem value="confirmed">Bekræftede</SelectItem>
                <SelectItem value="pending">Afventer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deltager</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Nyhedsbrev</TableHead>
                <TableHead>Tilmeldt</TableHead>
                <TableHead>Handlinger</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{registration.email}</div>
                      {(registration.first_name || registration.last_name) && (
                        <div className="text-sm text-muted-foreground">
                          {[registration.first_name, registration.last_name].filter(Boolean).join(' ')}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{registration.events.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(registration.events.event_date), 'dd.MM.yyyy', { locale: da })}
                        {registration.events.event_time && ` ${registration.events.event_time.slice(0, 5)}`}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {registration.confirmed_at ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Bekræftet
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <XCircle className="w-3 h-3 mr-1" />
                        Afventer
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {registration.subscribe_newsletter ? (
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        <Mail className="w-3 h-3 mr-1" />
                        Ja
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">Nej</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {format(new Date(registration.created_at), 'dd.MM.yyyy HH:mm', { locale: da })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {!registration.confirmed_at && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => confirmRegistration.mutate(registration.id)}
                          disabled={confirmRegistration.isPending}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Bekræft
                        </Button>
                      )}
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-destructive">
                            <XCircle className="w-4 h-4 mr-1" />
                            Slet
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Slet tilmelding</AlertDialogTitle>
                            <AlertDialogDescription>
                              Er du sikker på at du vil slette denne tilmelding? Dette kan ikke fortrydes.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuller</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteRegistration.mutate(registration.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Slet
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredRegistrations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    {searchTerm || selectedEvent !== "all" || statusFilter !== "all" 
                      ? 'Ingen tilmeldinger matcher filtreringen' 
                      : 'Ingen tilmeldinger endnu'
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};