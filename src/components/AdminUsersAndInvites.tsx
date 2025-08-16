import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserCheck, UserX, Crown, User, Copy, Mail, UserPlus } from "lucide-react";
import { useAdminUsers, useUpdateUserRole } from "@/hooks/useAdminUsers";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { da } from "date-fns/locale";

interface Invite {
  id: string;
  email: string;
  invite_code: string;
  used_at: string | null;
  expires_at: string;
  created_at: string;
}

export const AdminUsersAndInvites = () => {
  const { data: users = [], isLoading: usersLoading } = useAdminUsers();
  const updateUserRole = useUpdateUserRole();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  // Invite queries and mutations
  const { data: invites = [], isLoading: invitesLoading } = useQuery({
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
      const { data: userData } = await supabase.auth.getUser();
      
      // Create invite - let database generate the invite code automatically
      const { data, error } = await supabase
        .from('invites')
        .insert([{
          email: email.toLowerCase(),
          invited_by: userData.user?.id
        }])
        .select()
        .single();
      
      if (error) throw error;

      // Send invitation email
      const { error: emailError } = await supabase.functions.invoke(
        'send-invitation-email',
        {
          body: {
            email: data.email,
            inviteCode: data.invite_code,
            inviterName: userData.user?.email || 'Admin'
          }
        }
      );

      if (emailError) {
        console.error('Failed to send invitation email:', emailError);
        // Don't fail the invitation creation if email fails
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['invites'] });
      toast({
        title: "Invitation sendt! 📧",
        description: `Invitation til ${data.email} er oprettet og sendt via email.`,
      });
      setInviteEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Fejl",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleRoleChange = async (userId: string, newRole: string, userName: string, userEmail: string, currentRole: string) => {
    await updateUserRole.mutateAsync({ 
      userId, 
      role: newRole, 
      currentUserRole: currentRole,
      targetUserEmail: userEmail 
    });
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail) {
      createInvite.mutate(inviteEmail);
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

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const adminCount = users.filter(user => user.role === 'admin').length;
  const userCount = users.filter(user => user.role === 'user').length;
  const pendingInvites = invites.filter(invite => !invite.used_at && new Date(invite.expires_at) > new Date()).length;

  if (usersLoading) {
    return <div className="text-center">Loader brugere...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Brugere</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Administratorer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{adminCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Almindelige Brugere</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{userCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ventende Invitationer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{pendingInvites}</div>
          </CardContent>
        </Card>
      </div>

      {/* Invite New User */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Inviter ny bruger
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInviteSubmit} className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="invite-email" className="sr-only">Email adresse</Label>
              <Input
                id="invite-email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
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

      {/* Tabs for Users and Invitations */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="users">Aktive Brugere ({users.length})</TabsTrigger>
          <TabsTrigger value="invites">Invitationer ({invites.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Brugerstyring</CardTitle>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Søg brugere..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bruger</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rolle</TableHead>
                    <TableHead>Oprettet</TableHead>
                    <TableHead>Handlinger</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.role === 'admin' ? (
                            <Crown className="w-4 h-4 text-primary" />
                          ) : (
                            <User className="w-4 h-4 text-muted-foreground" />
                          )}
                          <div>
                            <div className="font-medium">
                              {user.first_name || user.last_name 
                                ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
                                : 'Ingen navn'
                              }
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role === 'admin' ? 'Administrator' : 'Bruger'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.created_at ? format(new Date(user.created_at), 'dd.MM.yyyy', { locale: da }) : '-'}
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              {user.role === 'admin' ? (
                                <>
                                  <UserX className="w-4 h-4 mr-1" />
                                  Fjern Admin
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-4 h-4 mr-1" />
                                  Gør Admin
                                </>
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {user.role === 'admin' ? 'Fjern Administrator' : 'Gør til Administrator'}
                              </AlertDialogTitle>
                            <AlertDialogDescription className="space-y-2">
                                <div>
                                  Er du sikker på at du vil ændre {user.email || 'denne bruger'} til{' '}
                                  {user.role === 'admin' ? 'almindelig bruger' : 'administrator'}?
                                </div>
                                {user.role === 'admin' && (
                                  <div className="text-destructive font-medium">
                                    ⚠️ ADVARSEL: Dette vil fjerne administratorrettigheder fra denne bruger.
                                  </div>
                                )}
                                {adminCount <= 1 && user.role === 'admin' && (
                                  <div className="text-destructive font-medium">
                                    ❌ FEJL: Dette er den eneste admin. Der skal være mindst én admin i systemet.
                                  </div>
                                )}
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuller</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleRoleChange(
                                  user.id, 
                                  user.role === 'admin' ? 'user' : 'admin',
                                  user.first_name || user.email || 'Bruger',
                                  user.email || 'Ukendt email',
                                  user.role || 'user'
                                )}
                                disabled={adminCount <= 1 && user.role === 'admin'}
                              >
                                Bekræft
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        {searchTerm ? 'Ingen brugere matcher søgningen' : 'Ingen brugere fundet'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invites">
          <Card>
            <CardHeader>
              <CardTitle>Invitationer ({invites.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {invitesLoading ? (
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
        </TabsContent>
      </Tabs>
    </div>
  );
};