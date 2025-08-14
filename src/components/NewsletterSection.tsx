import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
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
              className="flex-1 rounded-2xl border-2 border-primary/20 bg-background/50 backdrop-blur-sm h-12 px-6"
            />
            <Button type="submit" variant="orange">
              Tilmeld
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