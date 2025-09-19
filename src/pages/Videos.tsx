import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import VideoEmbed from "@/components/Video/VideoEmbed";
import { mockVideos, mockTeamMembers } from "@/data/mockData";
import { Search, Filter, Calendar, User } from "lucide-react";

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<string>("all");

  const filteredVideos = mockVideos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMember = selectedMember === "all" || video.team_member_id === selectedMember;
    
    return matchesSearch && matchesMember;
  });

  const getTeamMemberName = (memberId: string) => {
    const member = mockTeamMembers.find(m => m.id === memberId);
    return member ? member.name : "غير معروف";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
              معرض الفيديوهات
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              مكتبة
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                الفيديوهات الشاملة
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              استكشف مجموعة متنوعة من الفيديوهات التعليمية والإبداعية من أعضاء فريقنا المتخصصين في مجالات مختلفة.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="ابحث في الفيديوهات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="px-4 py-2 border border-border rounded-md bg-background text-foreground min-w-[200px]"
              >
                <option value="all">جميع الأعضاء</option>
                {mockTeamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 ml-2" />
                تصفية
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary mb-1">{mockVideos.length}</div>
                <div className="text-sm text-muted-foreground">إجمالي الفيديوهات</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-secondary mb-1">{mockTeamMembers.length}</div>
                <div className="text-sm text-muted-foreground">المساهمون</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-accent mb-1">{filteredVideos.length}</div>
                <div className="text-sm text-muted-foreground">نتائج البحث</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredVideos.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-6xl mb-4">🎥</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد فيديوهات</h3>
                <p className="text-muted-foreground">جرب تغيير معايير البحث أو الفلترة</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video, index) => (
                <Card key={video.id} className="video-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-0">
                    {/* Video Embed */}
                    <div className="aspect-video bg-muted rounded-t-xl overflow-hidden">
                      <VideoEmbed 
                        url={video.url} 
                        title={video.title}
                        className="w-full h-full"
                      />
                    </div>
                    
                    {/* Video Info */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {video.type === "embed" ? "مدمج" : "مرفوع"}
                        </Badge>
                        
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="w-3 h-3 ml-1" />
                          {formatDate(video.created_at)}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      
                      {video.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {video.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="w-4 h-4 ml-2" />
                          {getTeamMemberName(video.team_member_id!)}
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          مشاهدة
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Videos;