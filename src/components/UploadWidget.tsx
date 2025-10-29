import { useEffect, useRef } from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface UploadWidgetProps {
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

const UploadWidget: React.FC<UploadWidgetProps> = ({ children, onUpload }) => {
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

    // ✅ Use built-in requestIdleCallback safely
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(onIdle);
    } else {
      setTimeout(onIdle, 1);
    }

    return () => {
      widget.current?.destroy?.();
      widget.current = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function createWidget() {
    const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      console.warn(
        `⚠️ Please ensure VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET exist in your .env file`
      );
    }

    const options = { cloudName, uploadPreset };

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

export default UploadWidget;
