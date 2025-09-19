import { Button } from "@/components/ui/button";

const NewsletterEventButton = () => {
  const handleEventSignup = () => {
    window.open('https://lu.ma/evt-3FHJkLWSIfgIAsJ', '_blank');
  };

  return (
    <Button 
      onClick={handleEventSignup}
      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-dm-sans font-bold px-8"
    >
      🎯 Tilmeld dig eventet
    </Button>
  );
};

export default NewsletterEventButton;