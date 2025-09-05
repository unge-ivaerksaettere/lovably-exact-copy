import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NewsletterPodcast = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionTypes, setSubscriptionTypes] = useState({
    events: false,
    podcast: true,  // Default to podcast for podcast signup
    general: false
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
        description: "Du er nu tilmeldt vores newsletter og får besked om nye episoder!",
      });
      setEmail("");
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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-lg p-8 text-center text-primary-foreground">
          <h3 className="text-2xl font-anton mb-4">
            Få besked om nye episodes
          </h3>
          <p className="font-inter mb-6 opacity-90">
            Tilmeld dig vores newsletter og vær den første til at høre nye podcast episodes.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <Input 
              type="email"
              placeholder="Din email adresse" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 font-inter"
            />
            
            {/* Subscription Preferences */}
            <div className="space-y-3">
              <p className="text-sm font-dm-sans font-bold text-primary-foreground">Hvad vil du modtage?</p>
              <div className="grid grid-cols-1 gap-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionTypes.events}
                    onChange={(e) => setSubscriptionTypes(prev => ({...prev, events: e.target.checked}))}
                    className="rounded border-primary-foreground/30 bg-primary-foreground/10 text-secondary focus:ring-secondary"
                  />
                  <span className="text-sm font-inter text-primary-foreground">📅 Events</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionTypes.podcast}
                    onChange={(e) => setSubscriptionTypes(prev => ({...prev, podcast: e.target.checked}))}
                    className="rounded border-primary-foreground/30 bg-primary-foreground/10 text-secondary focus:ring-secondary"
                  />
                  <span className="text-sm font-inter text-primary-foreground">🎧 Podcast</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionTypes.general}
                    onChange={(e) => setSubscriptionTypes(prev => ({...prev, general: e.target.checked}))}
                    className="rounded border-primary-foreground/30 bg-primary-foreground/10 text-secondary focus:ring-secondary"
                  />
                  <span className="text-sm font-inter text-primary-foreground">📰 Generelle nyheder</span>
                </label>
              </div>
            </div>
            
            <Button 
              type="submit"
              disabled={isLoading || (!subscriptionTypes.events && !subscriptionTypes.podcast && !subscriptionTypes.general)}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold"
            >
              {isLoading ? "Tilmelder..." : "Tilmeld"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterPodcast;