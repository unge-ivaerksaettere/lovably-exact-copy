import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";

interface AuthDialogProps {
  children: React.ReactNode;
}

export const AuthDialog = ({ children }: AuthDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    inviteCode: "",
  });

  // Pre-fill form if invite params are in URL
  useEffect(() => {
    const inviteCode = searchParams.get('invite');
    const inviteEmail = searchParams.get('email');
    
    if (inviteCode) {
      setSignupForm(prev => ({ 
        ...prev, 
        inviteCode,
        email: inviteEmail || ""
      }));
      setOpen(true);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (error) throw error;

      toast({
        title: "Velkommen tilbage!",
        description: "Du er nu logget ind.",
      });
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Login fejl",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: "Fejl",
        description: "Adgangskoderne matcher ikke.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
        options: {
          data: {
            first_name: signupForm.firstName,
            last_name: signupForm.lastName,
            invite_code: signupForm.inviteCode,
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;

      toast({
        title: "Kontoen er oprettet!",
        description: "Du er nu logget ind og kan bruge systemet.",
      });
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Signup fejl",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log ind eller opret konto</DialogTitle>
          <DialogDescription>
            Få adgang til events og admin funktioner
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Log ind</TabsTrigger>
            <TabsTrigger value="signup">Opret konto</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="login-password">Adgangskode</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logger ind..." : "Log ind"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="signup-invitecode">Invitationskode *</Label>
                <Input
                  id="signup-invitecode"
                  value={signupForm.inviteCode}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, inviteCode: e.target.value.toUpperCase() }))}
                  placeholder="8-tegns kode"
                  maxLength={8}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="signup-firstname">Fornavn</Label>
                  <Input
                    id="signup-firstname"
                    value={signupForm.firstName}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signup-lastname">Efternavn</Label>
                  <Input
                    id="signup-lastname"
                    value={signupForm.lastName}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="signup-password">Adgangskode</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="signup-confirm">Bekræft adgangskode</Label>
                <Input
                  id="signup-confirm"
                  type="password"
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Opretter konto..." : "Opret konto"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};