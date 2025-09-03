import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdminEventForm } from "@/components/AdminEventForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminEventsList } from "@/components/AdminEventsList";
import { AdminUsersAndInvites } from "@/components/AdminUsersAndInvites";
import { AdminAnalytics } from "@/components/AdminAnalytics";
import { AdminEventRegistrations } from "@/components/AdminEventRegistrations";
import AdminPageSettings from "@/components/AdminPageSettings";
import AdminSpotifySync from "@/components/AdminSpotifySync";
import { useUserRole } from "@/hooks/useEvents";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Admin = () => {
  const navigate = useNavigate();
  const { data: userRole, isLoading } = useUserRole();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkAuth = async () => {
      if (!authLoading && !user) {
        toast({
          title: "Adgang nægtet",
          description: "Du skal være logget ind for at tilgå admin-panelet.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      if (!isLoading && userRole !== 'admin') {
        toast({
          title: "Adgang nægtet", 
          description: "Du har ikke tilladelse til at tilgå admin-panelet.",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    checkAuth();
  }, [userRole, isLoading, user, authLoading, navigate, toast]);

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="text-center">Loader...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (userRole !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="text-center mb-8">
          <h1 className={`font-bold text-foreground mb-4 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>Admin Panel</h1>
          <p className={`text-muted-foreground ${isMobile ? 'text-base' : 'text-lg'}`}>Administrer events, invitationer og indhold</p>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className={isMobile 
            ? "flex w-full overflow-x-auto scrollbar-hide mb-8 p-1" 
            : "grid w-full grid-cols-7 max-w-5xl mx-auto mb-8"
          }>
            <TabsTrigger value="overview" className={isMobile ? "whitespace-nowrap flex-shrink-0" : ""}>
              {isMobile ? "Oversigt" : "Oversigt"}
            </TabsTrigger>
            <TabsTrigger value="events" className={isMobile ? "whitespace-nowrap flex-shrink-0" : ""}>
              Events
            </TabsTrigger>
            <TabsTrigger value="registrations" className={isMobile ? "whitespace-nowrap flex-shrink-0" : ""}>
              {isMobile ? "Tilmeld." : "Tilmeldinger"}
            </TabsTrigger>
            <TabsTrigger value="create" className={isMobile ? "whitespace-nowrap flex-shrink-0" : ""}>
              {isMobile ? "Opret" : "Opret Event"}
            </TabsTrigger>
            <TabsTrigger value="users" className={isMobile ? "whitespace-nowrap flex-shrink-0" : ""}>
              {isMobile ? "Brugere" : "Brugere & Invitationer"}
            </TabsTrigger>
            <TabsTrigger value="pages" className={isMobile ? "whitespace-nowrap flex-shrink-0" : ""}>
              Sider
            </TabsTrigger>
            <TabsTrigger value="spotify" className={isMobile ? "whitespace-nowrap flex-shrink-0" : ""}>
              Spotify
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <AdminAnalytics />
          </TabsContent>
          
          <TabsContent value="events">
            <AdminEventsList />
          </TabsContent>
          
          <TabsContent value="registrations">
            <AdminEventRegistrations />
          </TabsContent>
          
          <TabsContent value="create">
            <AdminEventForm />
          </TabsContent>
          
          <TabsContent value="users">
            <AdminUsersAndInvites />
          </TabsContent>
          
          <TabsContent value="pages">
            <AdminPageSettings />
          </TabsContent>
          
          <TabsContent value="spotify">
            <AdminSpotifySync />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;