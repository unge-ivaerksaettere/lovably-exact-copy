import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const UnderConstruction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Wrench className="w-10 h-10 text-primary" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground">
            Under Konstruktion
          </h1>
          <p className="text-muted-foreground text-lg">
            Vi arbejder på at gøre siden endnu bedre. 
            Vend tilbage i morgen!
          </p>
        </div>
        
        <div className="pt-4">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/login">
              🔓 Administrator login
            </Link>
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Unge Iværksættere
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;