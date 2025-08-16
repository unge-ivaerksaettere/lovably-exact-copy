import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdminEventForm } from "@/components/AdminEventForm";
import { InviteManagement } from "@/components/InviteManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="invites">Invitationer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events">
            <AdminEventForm />
          </TabsContent>
          
          <TabsContent value="invites">
            <InviteManagement />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;