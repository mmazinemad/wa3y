import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoEmbed from "@/components/Video/VideoEmbed";
import { Upload, Link as LinkIcon, Video, Settings, User, Plus, Edit, Trash2, Eye } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoDescription, setNewVideoDescription] = useState("");

  // Mock user data
  const user = {
    name: "محمد عبدالله",
    email: "mohamed@example.com",
    role: "منشئ محتوى",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    videosCount: 8,
    viewsCount: "2.5K"
  };

  const userVideos = [
    {
      id: "1",
      title: "شرح مونتاج الفيديو للمبتدئين",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      type: "embed",
      views: 245,
      createdAt: "2024-02-15"
    },
    {
      id: "2", 
      title: "تقنيات الإضاءة المتقدمة",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      type: "embed",
      views: 189,
      createdAt: "2024-02-10"
    }
  ];

  const handleAddVideo = () => {
    console.log("إضافة فيديو جديد:", {
      title: newVideoTitle,
      url: newVideoUrl,
      description: newVideoDescription
    });
    
    // Reset form
    setNewVideoUrl("");
    setNewVideoTitle("");
    setNewVideoDescription("");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover shadow-primary"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  مرحباً، {user.name}
                </h1>
                <p className="text-muted-foreground">{user.role}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button variant="outline">
                <Settings className="w-4 h-4 ml-2" />
                الإعدادات
              </Button>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 ml-2" />
                إضافة فيديو
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الفيديوهات</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{user.videosCount}</div>
              <p className="text-xs text-muted-foreground">+2 هذا الشهر</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المشاهدات</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{user.viewsCount}</div>
              <p className="text-xs text-muted-foreground">+12% من الشهر الماضي</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">متوسط التفاعل</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">4.8</div>
              <p className="text-xs text-muted-foreground">من 5 نجوم</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="videos">فيديوهاتي</TabsTrigger>
            <TabsTrigger value="add">إضافة فيديو</TabsTrigger>
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
          </TabsList>
          
          {/* My Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>فيديوهاتي ({userVideos.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {userVideos.length === 0 ? (
                  <div className="text-center py-12">
                    <Video className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      لا توجد فيديوهات بعد
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      ابدأ بإضافة أول فيديو لك
                    </p>
                    <Button onClick={() => setActiveTab("add")}>
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة فيديو
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userVideos.map((video) => (
                      <Card key={video.id} className="video-card">
                        <CardContent className="p-0">
                          <div className="aspect-video bg-muted rounded-t-xl overflow-hidden">
                            <VideoEmbed url={video.url} title={video.title} />
                          </div>
                          
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="text-xs">
                                {video.type === "embed" ? "مدمج" : "مرفوع"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {video.views} مشاهدة
                              </span>
                            </div>
                            
                            <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                              {video.title}
                            </h3>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">
                                {new Date(video.createdAt).toLocaleDateString('ar-EG')}
                              </span>
                              
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
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
          
          {/* Add Video Tab */}
          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إضافة فيديو جديد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="video-title">عنوان الفيديو</Label>
                      <Input
                        id="video-title"
                        value={newVideoTitle}
                        onChange={(e) => setNewVideoTitle(e.target.value)}
                        placeholder="أدخل عنوان الفيديو"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="video-url">رابط الفيديو</Label>
                      <div className="relative">
                        <LinkIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="video-url"
                          value={newVideoUrl}
                          onChange={(e) => setNewVideoUrl(e.target.value)}
                          className="pr-10"
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="video-description">الوصف</Label>
                      <Textarea
                        id="video-description"
                        value={newVideoDescription}
                        onChange={(e) => setNewVideoDescription(e.target.value)}
                        placeholder="اكتب وصف للفيديو..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <Button onClick={handleAddVideo} className="gradient-primary">
                        <Plus className="w-4 h-4 ml-2" />
                        إضافة الفيديو
                      </Button>
                      <Button variant="outline">
                        <Upload className="w-4 h-4 ml-2" />
                        رفع ملف
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>معاينة الفيديو</Label>
                    <div className="border border-dashed border-border rounded-lg p-8 text-center">
                      {newVideoUrl ? (
                        <VideoEmbed url={newVideoUrl} title={newVideoTitle || "معاينة الفيديو"} />
                      ) : (
                        <div className="text-muted-foreground">
                          <Video className="w-12 h-12 mx-auto mb-2" />
                          <p>أدخل رابط الفيديو لمشاهدة المعاينة</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>الملف الشخصي</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover shadow-primary"
                  />
                  <div className="space-y-2">
                    <Button variant="outline">تغيير الصورة</Button>
                    <p className="text-sm text-muted-foreground">
                      يُنصح باستخدام صورة بدقة 400x400 بكسل
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>الاسم</Label>
                    <Input defaultValue={user.name} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>البريد الإلكتروني</Label>
                    <Input defaultValue={user.email} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>المسمى الوظيفي</Label>
                    <Input defaultValue={user.role} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>رقم الهاتف</Label>
                    <Input placeholder="+966 50 123 4567" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>نبذة شخصية</Label>
                  <Textarea 
                    placeholder="اكتب نبذة قصيرة عنك وعن خبراتك..."
                    rows={4}
                  />
                </div>
                
                <Button className="gradient-primary">
                  حفظ التغييرات
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;