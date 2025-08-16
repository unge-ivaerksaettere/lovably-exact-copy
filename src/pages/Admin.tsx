import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdminEventForm } from "@/components/AdminEventForm";
import { InviteManagement } from "@/components/InviteManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminEventsList } from "@/components/AdminEventsList";
import { AdminUsersManagement } from "@/components/AdminUsersManagement";
import { AdminAnalytics } from "@/components/AdminAnalytics";
import { AdminEventRegistrations } from "@/components/AdminEventRegistrations";
import AdminPageSettings from "@/components/AdminPageSettings";
import { useUserRole } from "@/hooks/useEvents";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { data: userRole, isLoading } = useUserRole();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

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
          <h1 className="text-4xl font-bold text-foreground mb-4">Admin Panel</h1>
          <p className="text-lg text-muted-foreground">Administrer events, invitationer og indhold</p>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-7 max-w-4xl mx-auto mb-8">
            <TabsTrigger value="overview">Oversigt</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="registrations">Tilmeldinger</TabsTrigger>
            <TabsTrigger value="create">Opret Event</TabsTrigger>
            <TabsTrigger value="users">Brugere</TabsTrigger>
            <TabsTrigger value="invites">Invitationer</TabsTrigger>
            <TabsTrigger value="pages">Sider</TabsTrigger>
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
            <AdminUsersManagement />
          </TabsContent>
          
          <TabsContent value="invites">
            <InviteManagement />
          </TabsContent>
          
          <TabsContent value="pages">
            <AdminPageSettings />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;