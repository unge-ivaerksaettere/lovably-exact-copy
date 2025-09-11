import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Login from "./pages/Login";

import Podcast from "./pages/Podcast";
import FindCoFounder from "./pages/FindCoFounder";
import MedTeamet from "./pages/MedTeamet";
import VoresHistorie from "./pages/VoresHistorie";
import VoresSponsoreBlivSponsor from "./pages/VoresSponsoreBlivSponsor";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Check if user just confirmed their email
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const tokenHash = urlParams.get('token_hash');
    
    if (type === 'signup' && tokenHash) {
      // Show success message for email confirmation
      toast({
        title: "Velkommen! 🎉",
        description: "Din konto er nu bekræftet og du er logget ind. Velkommen til Unge Iværksættere!",
      });
      
      // Clean up URL parameters
      const url = new URL(window.location.href);
      url.searchParams.delete('type');
      url.searchParams.delete('token_hash');
      url.searchParams.delete('redirect_to');
      window.history.replaceState({}, '', url.toString());
    }

    // Listen for auth state changes to show login success
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Only show this if it's not from email confirmation (which shows the welcome message above)
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.get('token_hash')) {
          toast({
            title: "Du er nu logget ind! 👋",
            description: "Velkommen tilbage til Unge Iværksættere",
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/find-co-founder" element={<FindCoFounder />} />
        <Route path="/med-teamet" element={<MedTeamet />} />
        <Route path="/vores-historie" element={<VoresHistorie />} />
        <Route path="/vores-sponsorer" element={<VoresSponsoreBlivSponsor />} />
        <Route path="/admin" element={<Admin />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
