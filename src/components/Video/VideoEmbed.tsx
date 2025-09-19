import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VideoEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ url, title, className = "" }) => {
  const getEmbedUrl = (url: string): string | null => {
    // YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    // TikTok
    const tiktokRegex = /tiktok\.com\/@[\w.-]+\/video\/(\d+)/;
    const tiktokMatch = url.match(tiktokRegex);
    if (tiktokMatch) {
      return `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}`;
    }

    // Facebook
    const facebookRegex = /facebook\.com.*\/videos\/(\d+)/;
    const facebookMatch = url.match(facebookRegex);
    if (facebookMatch) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`;
    }

    // Twitter/X
    const twitterRegex = /(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/;
    const twitterMatch = url.match(twitterRegex);
    if (twitterMatch) {
      return `https://platform.twitter.com/embed/Tweet.html?id=${twitterMatch[1]}`;
    }

    return null;
  };

  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    return (
      <Alert className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          رابط الفيديو غير مدعوم. يرجى التأكد من أن الرابط من YouTube أو TikTok أو Facebook أو Twitter/X.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={`embed-container ${className}`}>
      <iframe
        src={embedUrl}
        title={title || "فيديو مدمج"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-xl"
      />
    </div>
  );
};

export default VideoEmbed;