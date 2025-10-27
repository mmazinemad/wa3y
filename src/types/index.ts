export interface Video {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  userId: string;
  createdAt: any;
  type: 'embed' | 'uploaded';
  storagePath?: string;

  user?: UserProfile;
}

export interface UserProfile {
    id: string;
    uid: string;
    name: string;
    title: string;
    email: string;
    image?: string;
    pannerImageUrl?: string;
    role: 'user' | 'influencer' | 'admin';
    bio?: string;
    socialMediaLinks?: { platform: string; url: string; }[];
    createdAt: any;
}