import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Comment {
  id: number;
  video_id: number;
  user_id: string;
  content: string;
  created_at: string;
  users?: {
    name: string | null;
    image: string | null;
  };
}

export const useComments = (videoId: number) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videoId) {
      fetchComments();
      
      // Subscribe to realtime updates
      const channel = supabase
        .channel(`comments:${videoId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'comments',
            filter: `video_id=eq.${videoId}`,
          },
          () => {
            fetchComments();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [videoId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          users (
            name,
            image
          )
        `)
        .eq('video_id', videoId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error: any) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string) => {
    if (!user) {
      toast.error('يجب تسجيل الدخول للتعليق');
      return { error: 'Not authenticated' };
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          video_id: videoId,
          user_id: user.id,
          content,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('تم إضافة التعليق بنجاح');
      return { data, error: null };
    } catch (error: any) {
      console.error('Error adding comment:', error);
      toast.error('حدث خطأ أثناء إضافة التعليق');
      return { data: null, error };
    }
  };

  const deleteComment = async (commentId: number) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

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
    refetch: fetchComments,
  };
};
