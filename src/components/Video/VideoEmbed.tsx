import React, { useState } from "react";
import {
  YouTubeEmbed,
  TikTokEmbed,
  FacebookEmbed,
  XEmbed,
  InstagramEmbed,
} from "react-social-media-embed";
import { AlertCircle, Play } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VideoEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({
  url,
  title,
  className = "",
}) => {
  const [videoError, setVideoError] = useState(false);

  const getPlatform = (url: string): string | null => {
    if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
    if (/tiktok\.com/.test(url)) return "tiktok";
    if (/facebook\.com/.test(url)) return "facebook";
    if (/twitter\.com|x\.com/.test(url)) return "twitter";
    if (/instagram\.com/.test(url)) return "instagram";
    if (
      /cloudinary\.com.*\.mp4|cloudinary\.com.*\.mov|cloudinary\.com.*\.webm/.test(
        url
      )
    )
      return "cloudinary";
    return null;
  };

  const platform = getPlatform(url);

  const isVideoUrl = (url: string): boolean => {
    return (
      /\.(mp4|mov|avi|mkv|webm|ogv|3gp)(\?.*)?$/i.test(url) ||
      /cloudinary\.com.*\/video\//.test(url)
    );
  };

  if (platform === "youtube") {
    return (
      <div className={`${className} youtube-embed`}>
        <YouTubeEmbed url={url} />
      </div>
    );
  }

  if (platform === "tiktok") {
    return (
      <div className={`${className} tiktok-embed`}>
        <TikTokEmbed url={url} />
      </div>
    );
  }

  if (platform === "facebook") {
    return (
      <div className={`${className} facebook-embed`}>
        <FacebookEmbed url={url} />
      </div>
    );
  }

  if (platform === "twitter") {
    return (
      <div className={`${className} twitter-embed`}>
        <XEmbed url={url} />
      </div>
    );
  }

  if (platform === "instagram") {
    return (
      <div className={`${className} instagram-embed`}>
        <InstagramEmbed url={url} />
      </div>
    );
  }

  if (platform === "cloudinary" || isVideoUrl(url)) {
    return (
      <div
        className={`relative w-full bg-black rounded-lg overflow-hidden ${className}`}
      >
        {videoError ? (
          <div className="flex items-center justify-center bg-muted min-h-[200px] p-4">
            <Alert className="border-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                تعذر تحميل الفيديو. يرجى التحقق من الرابط.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <video
            src={url}
            controls
            className="w-full h-auto object-contain"
            onError={() => setVideoError(true)}
            onLoadedMetadata={(e) => {
              const video = e.target as HTMLVideoElement;
              if (video.videoWidth && video.videoHeight) {
                const aspectRatio = video.videoWidth / video.videoHeight;
                const container = video.parentElement;
                if (container) {
                  container.style.aspectRatio = `${aspectRatio}`;
                }
              }
            }}
            preload="metadata"
          >
            <source src={url} type="video/mp4" />
            <source src={url} type="video/webm" />
            <source src={url} type="video/ogg" />
            المتصفح لا يدعم تشغيل الفيديو.
          </video>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative w-full aspect-video bg-muted rounded-lg overflow-hidden ${className} default-embed`}
    >
      <iframe
        src={url}
        title={title || "Video Embed"}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onError={() => setVideoError(true)}
      />
      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <Alert className="border-destructive max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              تعذر تحميل المحتوى. يرجى التحقق من الرابط.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default VideoEmbed;
