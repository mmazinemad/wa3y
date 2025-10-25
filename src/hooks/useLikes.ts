import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useLikes = (videoId: number) => {
  const { user } = useAuth();
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !videoId) {
      setLoading(false);
      return;
    }

    fetchLikes();
    const channel = supabase
      .channel(`likes:${videoId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'likes',
          filter: `video_id=eq.${videoId}`,
        },
        () => {
          fetchLikes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [videoId, user]);

  const fetchLikes = async () => {
    if (!isSupabaseConfigured) return;
    try {
      // Get total likes count
      const { count, error: countError } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('video_id', videoId);

      if (countError) throw countError;
      setLikesCount(count || 0);

      // Check if current user has liked
      if (user) {
        const { data, error: likeError } = await supabase
          .from('likes')
          .select('id')
          .eq('video_id', videoId)
          .eq('user_id', user.id)
          .maybeSingle();

        if (likeError) throw likeError;
        setHasLiked(!!data);
      } else {
        setHasLiked(false);
      }
    } catch (error: any) {
      console.error('Error fetching likes:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    if (!isSupabaseConfigured) {
      toast.error('خدمة Supabase غير مُهيأة.');
      return { error: 'Supabase not configured' };
    }
    if (!user) {
      toast.error('يجب تسجيل الدخول للإعجاب');
      return { error: 'Not authenticated' };
    }

    try {
      if (hasLiked) {
        // Remove like
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('video_id', videoId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Add like
        const { error } = await supabase
          .from('likes')
          .insert({
            video_id: videoId,
            user_id: user.id,
          });

        if (error) throw error;
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
    refetch: fetchLikes,
  };
};
