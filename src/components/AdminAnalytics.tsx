import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, TrendingUp, Clock, MapPin, Star } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useMemo } from "react";

export const AdminAnalytics = () => {
  const { data: allEvents = [] } = useEvents('all');
  const { data: users = [] } = useAdminUsers();

  const analytics = useMemo(() => {
    const upcomingEvents = allEvents.filter(event => event.status === 'upcoming');
    const pastEvents = allEvents.filter(event => event.status === 'past');
    const featuredEvents = allEvents.filter(event => event.featured);
    
    const totalAttendees = allEvents.reduce((sum, event) => sum + (event.current_attendees || 0), 0);
    const avgAttendeesPerEvent = pastEvents.length > 0 ? Math.round(totalAttendees / pastEvents.length) : 0;
    
    const eventsWithLocation = allEvents.filter(event => event.location);
    const topLocations = eventsWithLocation.reduce((acc, event) => {
      const location = event.location || 'Ukendt';
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const sortedLocations = Object.entries(topLocations)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    const recentUsers = users
      .filter(user => user.created_at)
      .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
      .slice(0, 5);

    return {
      totalEvents: allEvents.length,
      upcomingEvents: upcomingEvents.length,
      pastEvents: pastEvents.length,
      featuredEvents: featuredEvents.length,
      totalUsers: users.length,
      totalAttendees,
      avgAttendeesPerEvent,
      topLocations: sortedLocations,
      recentUsers,
    };
  }, [allEvents, users]);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.upcomingEvents} kommende, {analytics.pastEvents} tidligere
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Brugere</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registrerede brugere
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deltagere</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalAttendees}</div>
            <p className="text-xs text-muted-foreground">
              Gennemsnit: {analytics.avgAttendeesPerEvent} per event
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Events</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.featuredEvents}</div>
            <p className="text-xs text-muted-foreground">
              Fremhævede events
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Locations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Mest Populære Lokationer
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.topLocations.length > 0 ? (
              <div className="space-y-3">
                {analytics.topLocations.map(([location, count], index) => (
                  <div key={location} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        index === 0 ? 'bg-primary' : 
                        index === 1 ? 'bg-secondary' : 'bg-muted-foreground'
                      }`} />
                      <span className="font-medium">{location}</span>
                    </div>
                    <Badge variant="outline">{count} events</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Ingen lokationsdata endnu</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Seneste Brugere
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.recentUsers.length > 0 ? (
              <div className="space-y-3">
                {analytics.recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">
                        {user.first_name || user.last_name 
                          ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
                          : 'Ingen navn'
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role === 'admin' ? 'Admin' : 'Bruger'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Ingen brugere endnu</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hurtige Fakta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="font-semibold text-lg">{analytics.upcomingEvents}</div>
              <div className="text-muted-foreground">Kommende events der har brug for opmærksomhed</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="font-semibold text-lg">
                {analytics.totalEvents > 0 ? Math.round((analytics.featuredEvents / analytics.totalEvents) * 100) : 0}%
              </div>
              <div className="text-muted-foreground">Af events er fremhævede</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="font-semibold text-lg">{analytics.avgAttendeesPerEvent}</div>
              <div className="text-muted-foreground">Gennemsnitlig deltagelse per event</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};