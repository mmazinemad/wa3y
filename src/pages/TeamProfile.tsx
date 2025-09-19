import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import VideoEmbed from "@/components/Video/VideoEmbed";
import { mockTeamMembers, mockVideos } from "@/data/mockData";
import { ArrowRight, Calendar, PlayCircle, Mail, Globe } from "lucide-react";

const TeamProfile = () => {
  const { id } = useParams<{ id: string }>();
  
  const member = mockTeamMembers.find(m => m.id === id);
  const memberVideos = mockVideos.filter(v => v.team_member_id === id);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-2xl font-bold text-foreground mb-4">عضو غير موجود</h2>
            <p className="text-muted-foreground mb-6">الملف الشخصي المطلوب غير متوفر</p>
            <Button asChild>
              <Link to="/team">
                <ArrowRight className="w-4 h-4 ml-2" />
                العودة للفريق
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
      {/* Back Navigation */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/team">
              <ArrowRight className="w-4 h-4 ml-2" />
              العودة للفريق
            </Link>
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <Card className="shadow-card overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-primary h-32 relative">
                <div className="absolute -bottom-16 right-8">
                  <img
                    src={member.avatar_url}
                    alt={member.name}
                    className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-primary"
                  />
                </div>
              </div>
              
              <div className="pt-20 pb-8 px-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {member.name}
                    </h1>
                    
                    <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">
                      {member.role}
                    </Badge>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                      {member.bio}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="gradient-primary">
                        <Mail className="w-4 h-4 ml-2" />
                        التواصل
                      </Button>
                      
                      <Button variant="outline">
                        <Globe className="w-4 h-4 ml-2" />
                        الموقع الشخصي
                      </Button>
                    </div>
                  </div>
                  
                  <div className="lg:text-left">
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                      <div className="bg-card border border-border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary">{memberVideos.length}</div>
                        <div className="text-sm text-muted-foreground">فيديو</div>
                      </div>
                      
                      <div className="bg-card border border-border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-accent">4.9</div>
                        <div className="text-sm text-muted-foreground">التقييم</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Member Videos */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              فيديوهات {member.name}
            </h2>
            
            <Badge variant="outline" className="text-sm px-3 py-1">
              {memberVideos.length} فيديو
            </Badge>
          </div>
          
          {memberVideos.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <PlayCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  لا توجد فيديوهات بعد
                </h3>
                <p className="text-muted-foreground">
                  لم يقم {member.name} برفع أي فيديوهات حتى الآن
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {memberVideos.map((video, index) => (
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
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {video.description}
                        </p>
                      )}
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

export default TeamProfile;