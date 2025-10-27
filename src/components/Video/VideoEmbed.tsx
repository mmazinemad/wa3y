// export default VideoEmbed;
import React from "react";
import {
  YouTubeEmbed,
  TikTokEmbed,
  FacebookEmbed,
  XEmbed,
  PlaceholderEmbed,
} from "react-social-media-embed";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VideoEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ url, className = "" }) => {
  const getPlatform = (url: string): string | null => {
    if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
    if (/tiktok\.com/.test(url)) return "tiktok";
    if (/facebook\.com/.test(url)) return "facebook";
    if (/twitter\.com|x\.com/.test(url)) return "twitter";
    return null;
  };

  const platform = getPlatform(url);

  if (!platform) {
    return (
      <Alert className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          رابط الفيديو غير مدعوم. تأكد أن الرابط من YouTube أو TikTok أو Facebook أو
          Twitter/X.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={`${className}`}>
      {platform === "youtube" && <YouTubeEmbed url={url} />}
      {platform === "tiktok" && <TikTokEmbed url={url} />}
      {platform === "facebook" && <FacebookEmbed url={url}/>}
      {platform === "twitter" && <XEmbed url={url} />}
      {!platform && <PlaceholderEmbed url={url} />}
    </div>
  );
};

export default VideoEmbed;
