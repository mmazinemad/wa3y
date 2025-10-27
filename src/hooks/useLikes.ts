
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useLikes = (videoId: string) => {
  const { user } = useAuth();
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) return;

    const q = query(collection(db, 'likes'), where('videoId', '==', videoId));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const likes = snapshot.docs;
      setLikesCount(likes.length);

      if (user) {
        const userLike = likes.find((like) => like.data().userId === user.uid);
        setHasLiked(!!userLike);
      } else {
        setHasLiked(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [videoId, user]);

  const toggleLike = async () => {
    if (!user) {
      toast.error('يجب تسجيل الدخول للإعجاب');
      return { error: 'Not authenticated' };
    }

    try {
      const q = query(collection(db, 'likes'), where('videoId', '==', videoId), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Add like
        await addDoc(collection(db, 'likes'), {
          videoId,
          userId: user.uid,
        });
      } else {
        // Remove like
        const likeDoc = querySnapshot.docs[0];
        await deleteDoc(doc(db, 'likes', likeDoc.id));
      }

      return { error: null };
    } catch (error: any) {
      console.error('Error toggling like:', error);
      toast.error('حدث خطأ أثناء الإعجاب');
      return { error };
    }
  };

  return {
    likesCount,
    hasLiked,
    loading,
    toggleLike,
  };
};
