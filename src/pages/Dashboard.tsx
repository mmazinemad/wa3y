import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { useVideoUpload } from "@/hooks/useVideoUpload";
import { useVideos } from "@/hooks/useVideos";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import VideosGrid from "@/components/dashboard/VideosGrid";
import AddVideoForm from "@/components/dashboard/AddVideoForm";
import ProfileForm from "@/components/dashboard/ProfileForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const {
    profile,
    updateProfile,
    loading: profileLoading,
    error: profileError,
  } = useUserData();
  const {
    saveEmbedVideo,
    saveCloudinaryVideo,
    deleteVideo,
    uploading,
    progress,
  } = useVideoUpload();
  const {
    videos,
    loading: videosLoading,
    error: videosError,
  } = useVideos(user?.uid);

  const [activeTab, setActiveTab] = useState("videos");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [cloudinaryVideoUrl, setCloudinaryVideoUrl] = useState("");
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState<
    string | undefined
  >();

  const [profileName, setProfileName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [newUserImage, setNewUserImage] = useState("");
  const [newPannerImage, setNewPannerImage] = useState("");
  const [socialMediaLinks, setSocialMediaLinks] = useState<
    { platform: string; url: string }[]
  >([]);

  useEffect(() => {
    if ((!authLoading && !user) || profile?.role == "user") {
      navigate("/");
    }
  }, [user, authLoading, navigate, profile]);

  useEffect(() => {
    if (profile) {
      setProfileName(profile.name || "");
      setTitle(profile.title || "");
      setBio(profile.bio || "");
      setNewUserImage(profile.image || "");
      setNewPannerImage(profile.pannerImageUrl || "");
      setSocialMediaLinks(profile.socialMediaLinks || []);
    }
  }, [profile]);

  // date formatting moved to lib/utils and used inside VideosGrid

  const handleAddEmbedVideo = () => {
    saveEmbedVideo(newVideoUrl, newVideoTitle);
    setNewVideoUrl("");
    setNewVideoTitle("");
  };

  const handleCloudinaryVideoUpload = (url: string, publicId?: string) => {
    setCloudinaryVideoUrl(url);
    setCloudinaryPublicId(publicId);
  };

  const handleSaveCloudinaryVideo = () => {
    if (!cloudinaryVideoUrl || !newVideoTitle) {
      toast.error("يرجى إدخال عنوان الفيديو");
      return;
    }
    saveCloudinaryVideo(cloudinaryVideoUrl, newVideoTitle, cloudinaryPublicId);
    setCloudinaryVideoUrl("");
    setCloudinaryPublicId(undefined);
    setNewVideoTitle("");
  };

  const handleDeleteVideo = (videoId: string, storagePath?: string) => {
    deleteVideo(videoId, storagePath);
  };

  const handleUpdateProfile = () => {
    updateProfile({
      name: profileName,
      title,
      bio,
      image: newUserImage,
      pannerImageUrl: newPannerImage,
      socialMediaLinks,
    });
  };

  const handleSocialLinkChange = (
    index: number,
    field: "platform" | "url",
    value: string
  ) => {
    const newLinks = [...socialMediaLinks];
    newLinks[index][field] = value;
    setSocialMediaLinks(newLinks);
  };

  const addSocialLink = () => {
    setSocialMediaLinks([...socialMediaLinks, { platform: "", url: "" }]);
  };

  const removeSocialLink = (index: number) => {
    const newLinks = socialMediaLinks.filter((_, i) => i !== index);
    setSocialMediaLinks(newLinks);
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const canUpload = profile?.role === "influencer" || profile?.role === "admin";
  const isAdmin = profile?.role === "admin";

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader
          user={user}
          profile={profile}
          newUserImage={newUserImage}
          onEdit={() => setActiveTab("profile")}
          onAddVideo={() => setActiveTab("add")}
          canUpload={canUpload}
        />

        {isAdmin && (
          <div className="mb-8">
            <AdminDashboard />
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="videos">فيديوهاتي</TabsTrigger>
            <TabsTrigger value="add" disabled={!canUpload}>
              إضافة فيديو
            </TabsTrigger>
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
          </TabsList>

          <VideosGrid
            videos={videos}
            loading={videosLoading}
            error={videosError}
            onDelete={handleDeleteVideo}
          />

          <AddVideoForm
            uploading={uploading}
            progress={progress}
            newVideoTitle={newVideoTitle}
            setNewVideoTitle={setNewVideoTitle}
            newVideoUrl={newVideoUrl}
            setNewVideoUrl={setNewVideoUrl}
            cloudinaryVideoUrl={cloudinaryVideoUrl}
            onUploadCloudinary={handleCloudinaryVideoUpload}
            onSaveCloudinary={handleSaveCloudinaryVideo}
            onSaveEmbed={handleAddEmbedVideo}
          />

          <ProfileForm
            user={user}
            profile={profile}
            profileName={profileName}
            setProfileName={setProfileName}
            title={title}
            setTitle={setTitle}
            bio={bio}
            setBio={setBio}
            newUserImage={newUserImage}
            setNewUserImage={setNewUserImage}
            newPannerImage={newPannerImage}
            setNewPannerImage={setNewPannerImage}
            socialMediaLinks={socialMediaLinks}
            onSocialChange={handleSocialLinkChange}
            onAddSocial={addSocialLink}
            onRemoveSocial={removeSocialLink}
            onSave={handleUpdateProfile}
            profileError={profileError}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
