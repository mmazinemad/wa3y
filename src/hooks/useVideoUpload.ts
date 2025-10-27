import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "@/integrations/firebase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export const useVideoUpload = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const saveVideoMetadata = async (videoData: any) => {
    if (!user) throw new Error("User not authenticated");
    await addDoc(collection(db, "videos"), {
      ...videoData,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });
  };

  const uploadVideo = (file: File, title: string) => {
    if (!user) {
      toast.error("يجب تسجيل الدخول لرفع فيديو");
      return;
    }
    if (!file || !title) {
      toast.error("يرجى إدخال الملف والعنوان");
      return;
    }

    setUploading(true);
    setProgress(0);

    const fileExtension = file.name.split(".").pop();
    const storagePath = `videos/${
      user.uid
    }/${new Date().getTime()}.${fileExtension}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const currentProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(currentProgress);
      },
      (error) => {
        console.error("Upload error:", error);
        toast.error(`فشل رفع الفيديو: ${error.message}`);
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await saveVideoMetadata({
            title,
            videoUrl: downloadURL,
            storagePath,
            type: "uploaded",
          });
          toast.success("تم رفع الفيديو بنجاح!");
        } catch (error: any) {
          console.error("Error saving video metadata:", error);
          toast.error(`فشل حفظ تفاصيل الفيديو: ${error.message}`);
        } finally {
          setUploading(false);
          setProgress(0);
        }
      }
    );
  };

  const saveEmbedVideo = async (url: string, title: string) => {
    if (!user) {
      toast.error("يجب تسجيل الدخول لحفظ فيديو");
      return;
    }
    if (!url || !title) {
      toast.error("يرجى إدخال الرابط والعنوان");
      return;
    }

    try {
      await saveVideoMetadata({ title, videoUrl: url, type: "embed" });
      toast.success("تم حفظ الفيديو المدمج بنجاح!");
    } catch (error: any) {
      console.error("Error saving embed video:", error);
      toast.error(`فشل حفظ الفيديو: ${error.message}`);
    }
  };

  const saveCloudinaryVideo = async (
    url: string,
    title: string,
    publicId?: string
  ) => {
    if (!user) {
      toast.error("يجب تسجيل الدخول لحفظ فيديو");
      return;
    }
    if (!url || !title) {
      toast.error("يرجى إدخال العنوان");
      return;
    }

    try {
      await saveVideoMetadata({
        title,
        videoUrl: url,
        type: "cloudinary",
        cloudinaryPublicId: publicId,
      });
      toast.success("تم حفظ الفيديو بنجاح!");
    } catch (error: any) {
      console.error("Error saving Cloudinary video:", error);
      toast.error(`فشل حفظ الفيديو: ${error.message}`);
    }
  };

  const deleteVideo = async (videoId: string, storagePath?: string) => {
    try {
      if (storagePath) {
        const storageRef = ref(storage, storagePath);
        await deleteObject(storageRef);
      }
      await deleteDoc(doc(db, "videos", videoId));
      toast.success("تم حذف الفيديو بنجاح");
    } catch (error: any) {
      console.error("Error deleting video:", error);
      toast.error(`فشل حذف الفيديو: ${error.message}`);
    }
  };

  return {
    uploadVideo,
    saveEmbedVideo,
    saveCloudinaryVideo,
    deleteVideo,
    uploading,
    progress,
  };
};
