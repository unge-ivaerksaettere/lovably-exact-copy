import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
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
      const response = await fetch('https://kwaflmugyjdlcmnpgqhi.supabase.co/functions/v1/mailerlite-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Tak!",
          description: "Du er nu tilmeldt vores newsletter!",
        });
        setEmail("");
      } else {
        toast({
          title: "Fejl",
          description: data.error || "Der skete en fejl. Prøv igen senere.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Fejl",
        description: "Der skete en fejl. Prøv igen senere.",
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
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-4">
            <Input 
              type="email"
              placeholder="Din email adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="flex-1 rounded-2xl border-2 border-primary/20 bg-background/50 backdrop-blur-sm h-12 px-6"
            />
            <Button type="submit" variant="orange" disabled={isLoading}>
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