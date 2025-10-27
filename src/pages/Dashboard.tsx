
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import VideoEmbed from "@/components/Video/VideoEmbed";
import { Upload, Video, Settings, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { useVideoUpload } from "@/hooks/useVideoUpload";
import { useVideos } from "@/hooks/useVideos";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import UploadTrigger from "@/components/UplaodTrigger";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, updateProfile, loading: profileLoading, error: profileError } = useUserData();
  const { uploadVideo, saveEmbedVideo, deleteVideo, uploading, progress } = useVideoUpload();
  const { videos, loading: videosLoading, error: videosError } = useVideos(user?.uid);

  const [activeTab, setActiveTab] = useState("videos");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [profileName, setProfileName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [newUserImage, setNewUserImage] = useState("");
  const [newPannerImage, setNewPannerImage] = useState("");
  const [socialMediaLinks, setSocialMediaLinks] = useState<{ platform: string; url: string }[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

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

  const formatDate = (date: any) => {
    const d = date?.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleAddEmbedVideo = () => {
    saveEmbedVideo(newVideoUrl, newVideoTitle);
    setNewVideoUrl("");
    setNewVideoTitle("");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadVideo = () => {
    if (!selectedFile || !newVideoTitle) return;
    uploadVideo(selectedFile, newVideoTitle);
    setSelectedFile(null);
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
      socialMediaLinks 
    });
  };

  const handleSocialLinkChange = (index: number, field: 'platform' | 'url', value: string) => {
    const newLinks = [...socialMediaLinks];
    newLinks[index][field] = value;
    setSocialMediaLinks(newLinks);
  };

  const addSocialLink = () => {
    setSocialMediaLinks([...socialMediaLinks, { platform: '', url: '' }]);
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

  const canUpload = profile?.role === 'influencer' || profile?.role === 'admin';
  const isAdmin = profile?.role === 'admin';

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={newUserImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                alt={profile?.name || ""}
                className="w-16 h-16 rounded-full object-cover shadow-primary"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  مرحباً، {profile?.name || user?.email}
                </h1>
                <p className="text-muted-foreground">
                  {profile?.title || (profile?.role === 'admin' ? 'مدير' : profile?.role === 'influencer' ? 'منشئ محتوى' : 'مستخدم')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setActiveTab("profile")}>
                <Settings className="w-4 h-4 ml-2" />
                تعديل
              </Button>
              {canUpload && (
                <Button className="gradient-primary" onClick={() => setActiveTab("add")}>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة فيديو
                </Button>
              )}
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="mb-8">
            <AdminDashboard />
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="videos">فيديوهاتي</TabsTrigger>
            <TabsTrigger value="add" disabled={!canUpload}>إضافة فيديو</TabsTrigger>
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>فيديوهاتي ({videos.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {videosLoading ? (
                  <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div></div>
                ) : videosError ? (
                  <div className="text-center py-12 text-red-500">Error: {videosError.message}</div>
                ) : videos.length === 0 ? (
                  <div className="text-center py-12"><Video className="w-16 h-16 mx-auto text-muted-foreground mb-4" /><h3 className="text-lg font-semibold mb-2">لا توجد فيديوهات بعد</h3></div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                      <Card key={video.id} className="video-card">
                        <CardContent className="p-0">
                          <div className="aspect-video bg-muted rounded-t-xl overflow-hidden"><VideoEmbed url={video.videoUrl || ''} title={video.title} /></div>
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2"><Badge variant="outline">{video.type === "embed" ? "مدمج" : "مرفوع"}</Badge></div>
                            <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">{formatDate(video.createdAt)}</span>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteVideo(video.id, video.storagePath)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader><CardTitle>إضافة فيديو جديد</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                {uploading && <Progress value={progress} />}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2"><Label>عنوان الفيديو</Label><Input value={newVideoTitle} onChange={(e) => setNewVideoTitle(e.target.value)} /></div>
                    <div className="space-y-2"><Label>رابط الفيديو (Embed)</Label><Input value={newVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} /></div>
                    <div className="space-y-2"><Label>أو رفع ملف</Label><Input type="file" accept="video/*" onChange={handleFileSelect} disabled={uploading} /></div>
                    <div className="flex gap-4">
                      {selectedFile ? (
                        <Button onClick={handleUploadVideo} className="gradient-primary" disabled={uploading}><Upload className="w-4 h-4 ml-2" />رفع</Button>
                      ) : (
                        <Button onClick={handleAddEmbedVideo} className="gradient-primary"><Plus className="w-4 h-4 ml-2" />حفظ</Button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>معاينة</Label>
                    <div className="border border-dashed rounded-lg p-8 text-center">
                      {newVideoUrl ? <VideoEmbed url={newVideoUrl} title={newVideoTitle} /> : <div><Video className="w-12 h-12 mx-auto mb-2" /><p>أدخل رابط الفيديو</p></div>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader><CardTitle>الملف الشخصي</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                {profileError && <div className="text-red-500">Error: {profileError.message}</div>}
                
                <div className="flex items-center gap-6">
                  <img src={newUserImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} alt="User" className="w-24 h-24 rounded-full object-cover"/>
                  <UploadTrigger onUpload={setNewUserImage} />
                </div>

                <div className="space-y-2">
                  <Label>صورة البانر</Label>
                  {newPannerImage && <img src={newPannerImage} alt="Banner" className="w-full h-48 object-cover rounded-lg mb-4"/>}
                  <UploadTrigger onUpload={setNewPannerImage} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>الاسم</Label><Input value={profileName} onChange={(e) => setProfileName(e.target.value)} /></div>
                  <div className="space-y-2"><Label>البريد</Label><Input value={user?.email || ''} disabled /></div>
                </div>
                {(profile?.role === 'influencer' || profile?.role === 'admin') && (
                  <div className="space-y-2"><Label>المسمى الوظيفي</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                )}
                <div className="space-y-2"><Label>النبذة الشخصية</Label><Textarea value={bio} onChange={(e) => setBio(e.target.value)} /></div>

                <div className="space-y-4">
                  <Label>روابط التواصل الاجتماعي</Label>
                  {socialMediaLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input placeholder="Platform" value={link.platform} onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)} className="w-1/3" />
                      <Input placeholder="URL" value={link.url} onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)} className="flex-1" />
                      <Button variant="ghost" size="icon" onClick={() => removeSocialLink(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addSocialLink}><Plus className="w-4 h-4 ml-2" />إضافة رابط</Button>
                </div>

                <Button className="gradient-primary" onClick={handleUpdateProfile}>حفظ التغييرات</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
