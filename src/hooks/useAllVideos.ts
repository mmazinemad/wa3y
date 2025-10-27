
import { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { toast } from 'sonner';
import { Video } from '@/types';

export const useAllVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, 'videos'), (snapshot) => {
      try {
        const videosData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        } as Video));
        setVideos(videosData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
      } catch (err: any) {
        console.error('Error fetching videos:', err);
        setError(err);
        toast.error(err.message || 'Failed to fetch videos.');
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = refetch();
    return () => unsubscribe();
  }, [refetch]);

  const updateVideo = async (videoId: string, data: Partial<Video>) => {
    try {
      const videoDocRef = doc(db, 'videos', videoId);
      await updateDoc(videoDocRef, data);
      toast.success('Video updated successfully.');
    } catch (err: any) {
      console.error('Error updating video:', err);
      toast.error(err.message || 'Failed to update video.');
    }
  };

  const deleteVideo = async (videoId: string) => {
    try {
      await deleteDoc(doc(db, 'videos', videoId));
      toast.success("Video deleted successfully.");
    } catch (err: any) {
      console.error("Error deleting video:", err);
      toast.error(err.message || "Failed to delete video.");
    }
  };

  return { videos, loading, error, updateVideo, deleteVideo, refetch };
};
