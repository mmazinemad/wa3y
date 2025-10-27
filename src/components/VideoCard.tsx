import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VideoEmbed from "@/components/Video/VideoEmbed";
import { Trash2 } from "lucide-react";
import { Video } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

interface VideoCardProps {
  video: Video;
  userName?: string;
  userImage?: string;
  handleDeleteVideo?: (videoId: string, storagePath: string) => void;
}

export const VideoCard = ({
  video,
  userName,
  userImage,
  handleDeleteVideo,
}: VideoCardProps) => {
  return (
    <Card key={video.id} className="video-card break-inside-avoid mb-4">
      <CardContent className="p-0">
        <div className="w-full overflow-hidden">
          <VideoEmbed
            url={video.videoUrl || ""}
            title={video.title}
            className="w-full"
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {new Date(video.createdAt).toLocaleDateString("ar-EG")}
            </span>

            {handleDeleteVideo ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteVideo(video.id, video.storagePath)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            ) : (
              <Link
                to={`/team/${video.userId}`}
                className="flex items-center justify-center gap-2"
              >
                <Avatar>
                  <AvatarImage src={userImage} />
                  <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground">{userName}</span>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
