import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NewsletterPodcast = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
        body: { email }
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
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <Input 
              type="email"
              placeholder="Din email adresse" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 font-inter"
            />
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold"
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