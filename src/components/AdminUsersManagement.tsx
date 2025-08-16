import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UserCheck, UserX, Crown, User } from "lucide-react";
import { useAdminUsers, useUpdateUserRole } from "@/hooks/useAdminUsers";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { da } from "date-fns/locale";

export const AdminUsersManagement = () => {
  const { data: users = [], isLoading } = useAdminUsers();
  const updateUserRole = useUpdateUserRole();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const handleRoleChange = async (userId: string, newRole: string, userName: string, userEmail: string, currentRole: string) => {
    await updateUserRole.mutateAsync({ 
      userId, 
      role: newRole, 
      currentUserRole: currentRole,
      targetUserEmail: userEmail 
    });
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const adminCount = users.filter(user => user.role === 'admin').length;
  const userCount = users.filter(user => user.role === 'user').length;

  if (isLoading) {
    return <div className="text-center">Loader brugere...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>

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
    </div>
  );
};