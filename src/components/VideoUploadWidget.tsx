import { useEffect, useRef } from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface VideoUploadWidgetProps {
  children: (props: {
    cloudinary: any;
    widget: React.MutableRefObject<any>;
    open: () => void;
  }) => React.ReactNode;
  onUpload?: (
    error: any,
    result: any,
    widget: React.MutableRefObject<any>
  ) => void;
}

let cloudinary: any;

const VideoUploadWidget: React.FC<VideoUploadWidgetProps> = ({
  children,
  onUpload,
}) => {
  const widget = useRef<any>();

  useEffect(() => {
    if (!cloudinary) {
      cloudinary = window.cloudinary;
    }

    const onIdle = () => {
      if (!widget.current) {
        widget.current = createWidget();
      }
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(onIdle);
    } else {
      setTimeout(onIdle, 1);
    }

    return () => {
      widget.current?.destroy?.();
      widget.current = undefined;
    };
  }, []);

  function createWidget() {
    const cloudName = "dwrbucvkc";
    const uploadPreset = "mazinForWa3i";

    const options = {
      cloudName,
      uploadPreset,
      sources: ["local", "url"],
      resourceType: "video",
      multiple: false,
      maxFileSize: 500000000,
      clientAllowedFormats: ["mp4", "mov", "avi", "mkv", "webm"],
      showAdvancedOptions: false,
      cropping: false,
      singleUploadAutoClose: true,
    };

    return cloudinary?.createUploadWidget(
      options,
      (error: any, result: any) => {
        if (typeof onUpload === "function") {
          onUpload(error, result, widget);
        }
      }
    );
  }

  function open() {
    if (!widget.current) {
      widget.current = createWidget();
    }
    widget.current?.open?.();
  }

  return <>{children({ cloudinary, widget, open })}</>;
};

export default VideoUploadWidget;
