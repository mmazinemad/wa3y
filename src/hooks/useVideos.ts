
import { useState, useEffect, useCallback } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { toast } from 'sonner';
import { Video } from '@/types';

export const useVideos = (userId?: string) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    const q = userId
      ? query(collection(db, 'videos'), where('userId', '==', userId))
      : collection(db, 'videos');

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const videosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Video));
      setVideos(videosData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching videos:", err);
      setError(err);
      toast.error(err.message || "Failed to fetch videos.");
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  useEffect(() => {
    const unsubscribe = refetch();
    return () => unsubscribe();
  }, [refetch]);

  return { videos, loading, error, refetch };
};
