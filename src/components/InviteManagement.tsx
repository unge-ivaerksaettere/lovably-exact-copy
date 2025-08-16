import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { da } from "date-fns/locale";
import { Copy, Mail } from "lucide-react";

interface Invite {
  id: string;
  email: string;
  invite_code: string;
  used_at: string | null;
  expires_at: string;
  created_at: string;
}

export const InviteManagement = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: invites = [], isLoading } = useQuery({
    queryKey: ['invites'],
    queryFn: async (): Promise<Invite[]> => {
      const { data, error } = await supabase
        .from('invites')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const createInvite = useMutation({
    mutationFn: async (email: string) => {
      // Generate invite code
      const { data: codeData, error: codeError } = await supabase.rpc('generate_invite_code');
      if (codeError) throw codeError;

      // Create invite
      const { data, error } = await supabase
        .from('invites')
        .insert([{
          email: email.toLowerCase(),
          invite_code: codeData,
          invited_by: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['invites'] });
      toast({
        title: "Invitation sendt!",
        description: `Invitation til ${data.email} er oprettet med kode: ${data.invite_code}`,
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Fejl",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      createInvite.mutate(email);
    }
  };

  const copyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Kopieret!",
      description: "Invitationskoden er kopieret til udklipsholderen.",
    });
  };

  const copyInviteLink = (email: string, code: string) => {
    const inviteUrl = `${window.location.origin}/?invite=${code}&email=${encodeURIComponent(email)}`;
    navigator.clipboard.writeText(inviteUrl);
    toast({
      title: "Link kopieret!",
      description: "Invitationslinket er kopieret til udklipsholderen.",
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Send invitation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email adresse</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="person@firma.dk"
                required
              />
            </div>
            <Button type="submit" disabled={createInvite.isPending}>
              {createInvite.isPending ? "Sender..." : "Send invitation"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invitationer ({invites.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loader invitationer...</div>
          ) : invites.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              Ingen invitationer endnu
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Kode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Udløber</TableHead>
                  <TableHead>Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invites.map((invite) => {
                  const isExpired = new Date(invite.expires_at) < new Date();
                  const isUsed = !!invite.used_at;
                  
                  return (
                    <TableRow key={invite.id}>
                      <TableCell>{invite.email}</TableCell>
                      <TableCell className="font-mono">{invite.invite_code}</TableCell>
                      <TableCell>
                        {isUsed ? (
                          <Badge variant="secondary">Brugt</Badge>
                        ) : isExpired ? (
                          <Badge variant="destructive">Udløbet</Badge>
                        ) : (
                          <Badge variant="default">Aktiv</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {format(new Date(invite.expires_at), 'dd/MM/yyyy HH:mm', { locale: da })}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyInviteCode(invite.invite_code)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyInviteLink(invite.email, invite.invite_code)}
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};