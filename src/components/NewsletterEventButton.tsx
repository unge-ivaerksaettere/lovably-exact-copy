import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NewsletterEventButton = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [subscriptionTypes, setSubscriptionTypes] = useState({
    events_copenhagen: true,  // Default to copenhagen events for event signup
    events_aarhus: false,
    podcast: false,
    webinars: false
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Fejl",
        description: "Indtast venligst din email adresse",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('mailerlite-subscribe', {
        body: { 
          email,
          subscriptionTypes
        }
      });

      if (error) {
        throw error;
      }
      toast({
        title: "Tak!",
        description: "Du er nu tilmeldt vores newsletter og får besked om nye events!",
      });
      setEmail("");
      setIsOpen(false);
    } catch (error: any) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Fejl",
        description: error.message || "Der skete en fejl. Prøv igen senere.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold px-8">
          Tilmeld Event Newsletter
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold mb-4">Tilmeld dig Event Newsletter</h3>
          <p className="text-muted-foreground mb-6">
            Få besked om nye events og vær blandt de første til at sikre din plads.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              type="email"
              placeholder="Din email adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            
            {/* Subscription Preferences */}
            <div className="space-y-3">
              <p className="text-sm font-dm-sans font-bold text-foreground">Hvad vil du modtage?</p>
              <div className="grid grid-cols-1 gap-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionTypes.events_copenhagen}
                    onChange={(e) => setSubscriptionTypes(prev => ({...prev, events_copenhagen: e.target.checked}))}
                    className="rounded border-primary/30 bg-background text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-inter text-foreground">📅 Events i København</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionTypes.events_aarhus}
                    onChange={(e) => setSubscriptionTypes(prev => ({...prev, events_aarhus: e.target.checked}))}
                    className="rounded border-primary/30 bg-background text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-inter text-foreground">📅 Events i Århus</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionTypes.podcast}
                    onChange={(e) => setSubscriptionTypes(prev => ({...prev, podcast: e.target.checked}))}
                    className="rounded border-primary/30 bg-background text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-inter text-foreground">🎧 Podcast</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionTypes.webinars}
                    onChange={(e) => setSubscriptionTypes(prev => ({...prev, webinars: e.target.checked}))}
                    className="rounded border-primary/30 bg-background text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-inter text-foreground">💻 Webinars</span>
                </label>
              </div>
            </div>
            
            <Button 
              type="submit"
              disabled={isLoading || (!subscriptionTypes.events_copenhagen && !subscriptionTypes.events_aarhus && !subscriptionTypes.podcast && !subscriptionTypes.webinars)}
              className="w-full"
            >
              {isLoading ? "Tilmelder..." : "Tilmeld"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterEventButton;