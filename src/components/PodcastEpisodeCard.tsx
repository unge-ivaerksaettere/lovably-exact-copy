import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Play } from "lucide-react";
import { PodcastEpisode } from "@/hooks/usePodcastEpisodes";
import podcastStudio from "@/assets/podcast-studio.jpg";
import podcastFazel from "@/assets/podcast-fazel.png";
import podcastDoubles from "@/assets/podcast-doubles-fixed.png";
import podcastLouliving from "@/assets/podcast-louliving.png";
import podcastDoner from "@/assets/podcast-doner.png";

interface PodcastEpisodeCardProps {
  episode: PodcastEpisode;
  showBadge?: boolean;
}

const PodcastEpisodeCard = ({ episode, showBadge = true }: PodcastEpisodeCardProps) => {
  const formatDuration = (durationMs: number | null) => {
    if (!durationMs) return "N/A";
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getEpisodeImage = (episode: PodcastEpisode) => {
    const lc = episode.title.toLowerCase();
    
    // Specific episode matches
    if (lc.includes('fazel')) return podcastFazel;
    if (lc.includes('doubles') || lc.includes('doublés') || lc.includes('peter')) return podcastDoubles;
    if (lc.includes('louliving')) return podcastLouliving;
    if (lc.includes('döner') || lc.includes('doner')) return podcastDoner;
    
    // For other episodes, check if Spotify provides a valid image URL
    if (episode.image_url && episode.image_url !== '' && !episode.image_url.includes('undefined') && !episode.image_url.includes('null')) {
      return episode.image_url;
    }
    
    // Default fallback
    return podcastStudio;
  };

  return (
    <Card className="group border-border/50 bg-gradient-to-b from-background to-muted/20 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 h-full">
      <CardContent className="p-0 h-full flex flex-col">
        {/* Episode Image - Taller aspect ratio */}
        <div className="relative overflow-hidden">
          <img 
            src={getEpisodeImage(episode)}
            alt={`${episode.title} cover`}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = podcastStudio; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Duration Badge */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(episode.duration_ms)}
          </div>
        </div>
        
        {/* Content Area */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            {showBadge && (
              <div className="flex items-center gap-2 text-xs text-primary font-medium">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>PODCAST EPISODE</span>
              </div>
            )}
            
            <h4 className="text-lg font-bold text-foreground line-clamp-3 group-hover:text-primary transition-colors">
              {episode.title}
            </h4>
          </div>
          
          {/* Action Button */}
          <Button 
            className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-12 group-hover:scale-105"
            onClick={() => window.open(episode.spotify_url, '_blank')}
          >
            <Play className="w-4 h-4 mr-2 fill-current" />
            Lyt på Spotify
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PodcastEpisodeCard;