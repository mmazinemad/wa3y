export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  userId: string;
  createdAt: Date;
  type: "embed" | "cloudinary";
  storagePath?: string;
  cloudinaryPublicId?: string;
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
  role: "user" | "influencer" | "admin";
  bio?: string;
  socialMediaLinks?: { platform: string; url: string }[];
  createdAt: Date;
}
