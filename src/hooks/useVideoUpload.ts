
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '@/integrations/firebase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useVideoUpload = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const saveVideoMetadata = async (videoData: any) => {
    if (!user) throw new Error('User not authenticated');
    await addDoc(collection(db, 'videos'), {
      ...videoData,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });
  };

  const uploadVideo = (file: File, title: string) => {
    if (!user) {
      toast.error('You must be logged in to upload a video.');
      return;
    }
    if (!file || !title) {
      toast.error('Please provide a file and a title.');
      return;
    }

    setUploading(true);
    setProgress(0);

    const fileExtension = file.name.split('.').pop();
    const storagePath = `videos/${user.uid}/${new Date().getTime()}.${fileExtension}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(currentProgress);
      },
      (error) => {
        console.error("Upload error:", error);
        toast.error(`Upload failed: ${error.message}`);
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await saveVideoMetadata({ title, videoUrl: downloadURL, storagePath, type: 'uploaded' });
          toast.success('Video uploaded and saved successfully!');
        } catch (error: any) {
          console.error("Error saving video metadata:", error);
          toast.error(`Failed to save video details: ${error.message}`);
        } finally {
          setUploading(false);
          setProgress(0);
        }
      }
    );
  };

  const saveEmbedVideo = async (url: string, title: string) => {
    if (!user) {
      toast.error('You must be logged in to save a video.');
      return;
    }
    if (!url || !title) {
      toast.error('Please provide a URL and a title.');
      return;
    }

    try {
      await saveVideoMetadata({ title, videoUrl: url, type: 'embed' });
      toast.success('Embedded video saved successfully!');
    } catch (error: any) {
      console.error("Error saving embed video:", error);
      toast.error(`Failed to save video: ${error.message}`);
    }
  };

  const deleteVideo = async (videoId: string, storagePath?: string) => {
    try {
      if (storagePath) {
        const storageRef = ref(storage, storagePath);
        await deleteObject(storageRef);
      }
      await deleteDoc(doc(db, 'videos', videoId));
      toast.success('Video deleted successfully');
    } catch (error: any) {
      console.error("Error deleting video:", error);
      toast.error(`Failed to delete video: ${error.message}`);
    }
  };

  return { uploadVideo, saveEmbedVideo, deleteVideo, uploading, progress };
};
