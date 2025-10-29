import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import VideoEmbed from "@/components/Video/VideoEmbed";
import { Video as VideoIcon, Trash2 } from "lucide-react";
import { formatDateAr } from "@/lib/utils";

type VideoItem = {
  id: string;
  title: string;
  type: "embed" | "cloudinary" | string;
  videoUrl?: string | null;
  createdAt: any;
  storagePath?: string;
};

type VideosGridProps = {
  videos: VideoItem[];
  loading: boolean;
  error?: Error | null;
  onDelete: (videoId: string, storagePath?: string) => void;
};

export function VideosGrid({
  videos,
  loading,
  error,
  onDelete,
}: VideosGridProps) {
  return (
    <TabsContent value="videos" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>فيديوهاتي ({videos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              Error: {error.message}
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-12">
              <VideoIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                لا توجد فيديوهات بعد
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="video-card">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted rounded-t-xl overflow-hidden">
                      <VideoEmbed
                        url={video.videoUrl || ""}
                        title={video.title}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">
                          {video.type === "embed" ? "مدمج" : "مرفوع"}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {formatDateAr(video.createdAt)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(video.id, video.storagePath)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}

export default VideosGrid;
