
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { useAllUsers } from '@/hooks/useAllUsers';
import { useAllVideos } from '@/hooks/useAllVideos';
import { Video, UserProfile } from '@/types';

interface VideoWithUser extends Video {
  user?: UserProfile;
}

export const usePublicVideos = () => {
  const { users, loading: usersLoading, error: usersError } = useAllUsers();
  const { videos, loading: videosLoading, error: videosError } = useAllVideos();

  useEffect(() => {
    if (usersError) {
      toast.error(usersError.message || 'Failed to fetch users.');
    }
  }, [usersError]);

  useEffect(() => {
    if (videosError) {
      toast.error(videosError.message || 'Failed to fetch videos.');
    }
  }, [videosError]);

  const videosWithUsers = useMemo(() => {
    if (usersLoading || videosLoading) return [];

    return videos.map(video => {
      const user = users.find(u => u.uid === video.userId);
      return { ...video, user };
    });
  }, [videos, users, usersLoading, videosLoading]);

  return {
    videos: videosWithUsers as VideoWithUser[],
    loading: usersLoading || videosLoading,
  };
};
