import { useState } from "react";
import VideoUploadWidget from "./VideoUploadWidget";
import { Button } from "@/components/ui/button";
import { Upload, AlertCircle, Video } from "lucide-react";
import { toast } from "sonner";

interface VideoUploadTriggerProps {
  onUpload: (url: string, publicId?: string) => void;
  label?: string;
}

function VideoUploadTrigger({
  onUpload,
  label = "رفع فيديو",
}: VideoUploadTriggerProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  function handleOnUpload(
    error: any,
    result: any,
    widget: React.MutableRefObject<any>
  ) {
    if (error) {
      setError(error.statusText || "حدث خطأ أثناء رفع الفيديو");
      setUploading(false);
      setProgress(0);
      toast.error("فشل رفع الفيديو");
      widget.current?.close({ quiet: true });
      return;
    }

    if (result?.event === "success") {
      const videoUrl = result?.info?.secure_url;
      const publicId = result?.info?.public_id;
      if (videoUrl) {
        onUpload(videoUrl, publicId);
        setUploading(false);
        setProgress(0);
        setError(null);
        toast.success("تم رفع الفيديو بنجاح! أدخل العنوان ثم احفظ");
        widget.current?.close({ quiet: true });
      }
    } else if (result?.event === "queues-end") {
      setUploading(false);
      setProgress(0);
    } else if (result?.event === "upload-added") {
      setUploading(true);
      setError(null);
      setProgress(0);
    } else if (result?.event === "progress") {
      const progressPercent = Math.round(
        (result?.info?.bytes / result?.info?.total_bytes) * 100
      );
      setProgress(progressPercent);
    }
  }

  return (
    <div className="space-y-2">
      <VideoUploadWidget onUpload={handleOnUpload}>
        {({ open }) => {
          function handleOnClick(e: React.MouseEvent) {
            e.preventDefault();
            open();
          }

          return (
            <Button
              type="button"
              variant="outline"
              onClick={handleOnClick}
              disabled={uploading}
              className="w-full"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary ml-2"></div>
                  {progress > 0
                    ? `جاري الرفع... ${progress}%`
                    : "جاري الرفع..."}
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 ml-2" />
                  {label}
                </>
              )}
            </Button>
          );
        }}
      </VideoUploadWidget>

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default VideoUploadTrigger;
