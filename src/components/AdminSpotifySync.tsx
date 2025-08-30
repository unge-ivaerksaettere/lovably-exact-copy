import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useSpotifySync } from "@/hooks/usePodcastEpisodes";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Music, RefreshCw, Clock, CheckCircle, XCircle } from "lucide-react";

interface SyncLog {
  id: string;
  sync_started_at: string;
  sync_completed_at: string | null;
  episodes_synced: number;
  status: 'in_progress' | 'completed' | 'failed';
  error_message: string | null;
  created_at: string;
}

const AdminSpotifySync = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();
  const { syncWithSpotify } = useSpotifySync();
  const queryClient = useQueryClient();

  const { data: syncLogs = [], isLoading: logsLoading } = useQuery({
    queryKey: ["sync-logs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("podcast_sync_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        throw error;
      }

      return data as SyncLog[];
    },
  });

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      const result = await syncWithSpotify();
      
      toast({
        title: "Sync Complete",
        description: `Successfully synced ${result.episodes_synced || 0} episodes from Spotify`,
      });

      // Refresh the data
      await queryClient.invalidateQueries({ queryKey: ["podcast-episodes"] });
      await queryClient.invalidateQueries({ queryKey: ["featured-podcast-episode"] });
      await queryClient.invalidateQueries({ queryKey: ["sync-logs"] });
      
    } catch (error: any) {
      console.error('Sync failed:', error);
      toast({
        title: "Sync Failed",
        description: error.message || "Failed to sync with Spotify",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'in_progress':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">In Progress</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('da-DK');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5" />
            Spotify Integration
          </CardTitle>
          <CardDescription>
            Manage podcast episode synchronization with Spotify
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Manual Sync</h4>
                <p className="text-sm text-muted-foreground">
                  Fetch the latest episodes from your Spotify podcast
                </p>
              </div>
              <Button 
                onClick={handleManualSync} 
                disabled={isSyncing}
                className="gap-2"
              >
                {isSyncing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p><strong>Note:</strong> You need to update the Spotify Show ID in the edge function code with your actual podcast show ID before syncing will work.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sync History</CardTitle>
          <CardDescription>
            Recent synchronization attempts and their results
          </CardDescription>
        </CardHeader>
        <CardContent>
          {logsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="ml-2">Loading sync history...</span>
            </div>
          ) : syncLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No sync history yet. Try running a manual sync above.
            </div>
          ) : (
            <div className="space-y-3">
              {syncLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(log.status)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {formatDate(log.sync_started_at)}
                        </span>
                        {getStatusBadge(log.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {log.status === 'completed' && (
                          <span>Synced {log.episodes_synced} episodes</span>
                        )}
                        {log.status === 'failed' && log.error_message && (
                          <span className="text-red-500">{log.error_message}</span>
                        )}
                        {log.status === 'in_progress' && (
                          <span>Sync in progress...</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {log.sync_completed_at && (
                    <div className="text-sm text-muted-foreground">
                      Completed: {formatDate(log.sync_completed_at)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSpotifySync;