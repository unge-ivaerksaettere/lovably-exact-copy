import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionTypes, setSubscriptionTypes] = useState({
    events_copenhagen: true,
    events_aarhus: false,
    podcast: false,
    webinars: true
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
        description: "Du er nu tilmeldt vores newsletter!",
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
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center bg-background/50 backdrop-blur-sm rounded-4xl p-12 shadow-large">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hold dig opdateret</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Få de seneste startup nyheder, podcast episodes og event invitationer direkte i din indbakke.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto mb-4">
            <Input 
              type="email"
              placeholder="Din email adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full rounded-2xl border-2 border-primary/20 bg-background/50 backdrop-blur-sm h-12 px-6"
            />
            
            {/* Subscription Preferences */}
            <div className="space-y-3">
              <p className="text-sm font-dm-sans font-bold text-foreground">Hvad vil du modtage?</p>
              <div className="grid grid-cols-1 gap-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionTypes.events_copenhagen}
                    onChange={(e) => setSubscriptionTypes(prev => ({...prev, events_copenhagen: e.target.checked}))}
                    className="rounded border-primary/30 bg-background/50 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-inter text-foreground">📅 Events i København</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionTypes.events_aarhus}
                    onChange={(e) => setSubscriptionTypes(prev => ({...prev, events_aarhus: e.target.checked}))}
                    className="rounded border-primary/30 bg-background/50 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-inter text-foreground">📅 Events i Århus</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionTypes.podcast}
                    onChange={(e) => setSubscriptionTypes(prev => ({...prev, podcast: e.target.checked}))}
                    className="rounded border-primary/30 bg-background/50 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-inter text-foreground">🎧 Podcast</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscriptionTypes.webinars}
                    onChange={(e) => setSubscriptionTypes(prev => ({...prev, webinars: e.target.checked}))}
                    className="rounded border-primary/30 bg-background/50 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-inter text-foreground">💻 Webinars</span>
                </label>
              </div>
            </div>
            
            <Button 
              type="submit" 
              variant="orange" 
              disabled={isLoading || (!subscriptionTypes.events_copenhagen && !subscriptionTypes.events_aarhus && !subscriptionTypes.podcast && !subscriptionTypes.webinars)}
              className="w-full"
            >
              {isLoading ? "Tilmelder..." : "Tilmeld"}
            </Button>
          </form>
          
          <p className="text-sm text-muted-foreground">
            Vi sender kun kvalitetsindhold. Ingen spam. Afmeld når som helst.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;