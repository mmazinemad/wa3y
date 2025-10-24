import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Video {
  id: number;
  user_id: string;
  title: string;
  video_url: string | null;
  storage_path: string | null;
  type: 'uploaded' | 'embed';
  created_at: string;
  users?: {
    name: string | null;
    image: string | null;
  };
  likes_count?: number;
  comments_count?: number;
  user_has_liked?: boolean;
}

export const useVideos = (userId?: string) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, [userId]);

  const fetchVideos = async () => {
    try {
      let query = supabase
        .from('videos')
        .select(`
          *,
          users (
            name,
            image
          )
        `)
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Fetch likes and comments counts for each video
      const videosWithCounts = await Promise.all(
        (data || []).map(async (video) => {
          const [likesResult, commentsResult] = await Promise.all([
            supabase
              .from('likes')
              .select('id', { count: 'exact', head: true })
              .eq('video_id', video.id),
            supabase
              .from('comments')
              .select('id', { count: 'exact', head: true })
              .eq('video_id', video.id),
          ]);

          return {
            ...video,
            likes_count: likesResult.count || 0,
            comments_count: commentsResult.count || 0,
          };
        })
      );

      setVideos(videosWithCounts as Video[]);
    } catch (error: any) {
      console.error('Error fetching videos:', error);
      toast.error('حدث خطأ في تحميل الفيديوهات');
    } finally {
      setLoading(false);
    }
  };

  return {
    videos,
    loading,
    refetch: fetchVideos,
  };
};
