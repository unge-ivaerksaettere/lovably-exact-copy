import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Podcast from "./pages/Podcast";
import FindCoFounder from "./pages/FindCoFounder";
import MedTeamet from "./pages/MedTeamet";
import VoresHistorie from "./pages/VoresHistorie";
import VoresSponsoreBlivSponsor from "./pages/VoresSponsoreBlivSponsor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/find-co-founder" element={<FindCoFounder />} />
          <Route path="/med-teamet" element={<MedTeamet />} />
          <Route path="/vores-historie" element={<VoresHistorie />} />
          <Route path="/vores-sponsore" element={<VoresSponsoreBlivSponsor />} />
          <Route path="/bliv-sponsor" element={<VoresSponsoreBlivSponsor />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
