import { useMemo } from "react";
import { useAllVideos } from "@/hooks/useAllVideos";
import { useAllUsers } from "@/hooks/useAllUsers";
import { Video, UserProfile } from "@/types";

interface VideoWithUser extends Video {
  user?: UserProfile;
}

export const useVideosWithUsers = () => {
  const {
    videos,
    loading: videosLoading,
    error: videosError,
    updateVideo,
    deleteVideo,
    refetch,
  } = useAllVideos();
  const { users, loading: usersLoading } = useAllUsers();

  const videosWithUsers = useMemo(() => {
    if (usersLoading || videosLoading) return [];

    return videos.map((video) => {
      const user = users.find((u) => u.uid === video.userId);
      return { ...video, user };
    });
  }, [videos, users, usersLoading, videosLoading]);

  return {
    videos: videosWithUsers as VideoWithUser[],
    loading: usersLoading || videosLoading,
    error: videosError,
    updateVideo,
    deleteVideo,
    refetch,
  };
};
