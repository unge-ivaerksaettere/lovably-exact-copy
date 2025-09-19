import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Events = lazy(() => import("./pages/Events"));
const Podcast = lazy(() => import("./pages/Podcast"));
const FindCoFounder = lazy(() => import("./pages/FindCoFounder"));
const MedTeamet = lazy(() => import("./pages/MedTeamet"));
const VoresHistorie = lazy(() => import("./pages/VoresHistorie"));
const VoresSponsoreBlivSponsor = lazy(() => import("./pages/VoresSponsoreBlivSponsor"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/events" element={<Events />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/find-co-founder" element={<FindCoFounder />} />
          <Route path="/med-teamet" element={<MedTeamet />} />
          <Route path="/vores-historie" element={<VoresHistorie />} />
          <Route path="/vores-sponsorer" element={<VoresSponsoreBlivSponsor />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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
