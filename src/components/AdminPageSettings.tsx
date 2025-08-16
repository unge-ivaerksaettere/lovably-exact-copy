import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { usePageSettings, useUpdatePageVisibility } from "@/hooks/usePageSettings";

const AdminPageSettings = () => {
  const { data: pageSettings, isLoading } = usePageSettings();
  const updatePageVisibility = useUpdatePageVisibility();

  const handleToggle = (id: string, currentVisibility: boolean) => {
    updatePageVisibility.mutate({
      id,
      is_visible: !currentVisibility,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
          <div className="h-8 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Side Synlighed
        </CardTitle>
        <CardDescription>
          Kontroller hvilke sider der er synlige for brugere på hjemmesiden
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {pageSettings?.map((page) => (
          <div
            key={page.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              {page.is_visible ? (
                <Eye className="w-4 h-4 text-green-500" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor={`page-${page.id}`} className="font-medium">
                  {page.page_name}
                </Label>
                <p className="text-sm text-muted-foreground">
                  /{page.page_key}
                </p>
              </div>
            </div>
            <Switch
              id={`page-${page.id}`}
              checked={page.is_visible}
              onCheckedChange={() => handleToggle(page.id, page.is_visible)}
              disabled={updatePageVisibility.isPending}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AdminPageSettings;