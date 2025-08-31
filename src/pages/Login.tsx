import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import { LogIn, UserPlus, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

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
    }
  }, [searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Login fejl",
        description: error.message === "Invalid login credentials" 
          ? "Forkert email eller adgangskode" 
          : error.message,
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

    if (signupForm.password.length < 6) {
      toast({
        title: "Fejl",
        description: "Adgangskoden skal være mindst 6 tegn.",
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
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Registrering fejl",
        description: error.message === "User already registered" 
          ? "Denne email er allerede registreret" 
          : error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-anton text-foreground mb-2">
            Unge Iværksættere
          </h1>
          <p className="text-muted-foreground font-inter">
            Log ind for at få adgang til admin funktioner
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Adgang til systemet</CardTitle>
            <CardDescription>
              Log ind med din eksisterende konto eller opret en ny med invitationskode
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Log ind
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Opret konto
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="din@email.dk"
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
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Logger ind..." : "Log ind"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="mt-6">
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
                    <p className="text-xs text-muted-foreground mt-1">
                      Du skal have en invitationskode for at oprette en konto
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="signup-firstname">Fornavn</Label>
                      <Input
                        id="signup-firstname"
                        value={signupForm.firstName}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="Dit fornavn"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-lastname">Efternavn</Label>
                      <Input
                        id="signup-lastname"
                        value={signupForm.lastName}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Dit efternavn"
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
                      placeholder="din@email.dk"
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
                      placeholder="Mindst 6 tegn"
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
                      placeholder="Gentag adgangskode"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Opretter konto..." : "Opret konto"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            Tilbage til forsiden
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;