
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  content: string;
  createdAt: Date;
  user?: {
    name: string | null;
    image: string | null;
  };
}

export const useComments = (videoId: string) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) return;

    const q = query(collection(db, 'comments'), where('videoId', '==', videoId));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const commentsData: Comment[] = [];
      for (const commentDoc of snapshot.docs) {
        const commentData = commentDoc.data();
        const userDoc = await getDoc(doc(db, 'users', commentData.userId));
        const userData = userDoc.data() as DocumentData | undefined;

        commentsData.push({
          id: commentDoc.id,
          ...commentData,
          createdAt: commentData.createdAt.toDate(),
          user: {
            name: userData?.name || null,
            image: userData?.image || null,
          },
        } as Comment);
      }
      setComments(commentsData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [videoId]);

  const addComment = async (content: string) => {
    if (!user) {
      toast.error('يجب تسجيل الدخول للتعليق');
      return { error: 'Not authenticated' };
    }

    try {
      await addDoc(collection(db, 'comments'), {
        videoId,
        userId: user.uid,
        content,
        createdAt: new Date(),
      });

      toast.success('تم إضافة التعليق بنجاح');
      return { error: null };
    } catch (error: any) {
      console.error('Error adding comment:', error);
      toast.error('حدث خطأ أثناء إضافة التعليق');
      return { error };
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      await deleteDoc(doc(db, 'comments', commentId));
      toast.success('تم حذف التعليق بنجاح');
      return { error: null };
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      toast.error('حدث خطأ أثناء حذف التعليق');
      return { error };
    }
  };

  return {
    comments,
    loading,
    addComment,
    deleteComment,
  };
};
