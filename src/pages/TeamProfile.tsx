
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import VideoEmbed from "@/components/Video/VideoEmbed";
import { useAllUsers } from "@/hooks/useAllUsers";
import { useAllVideos } from "@/hooks/useAllVideos";
import { ArrowRight, Calendar, PlayCircle, Mail, Globe, Twitter, Linkedin, Youtube, Github } from "lucide-react";
import { VideoCard } from "@/components/VideoCard";

const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform.toLowerCase()) {
    case 'twitter': return <Twitter className="w-4 h-4" />;
    case 'linkedin': return <Linkedin className="w-4 h-4" />;
    case 'youtube': return <Youtube className="w-4 h-4" />;
    case 'github': return <Github className="w-4 h-4" />;
    default: return <Globe className="w-4 h-4" />;
  }
};

const TeamProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { users, loading: usersLoading } = useAllUsers();
  const { videos, loading: videosLoading } = useAllVideos();

  const member = users.find(user => user.id === id);
  const memberVideos = videos.filter(video => video.userId === id);

  if (usersLoading || videosLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-2xl font-bold text-foreground mb-4">عضو غير موجود</h2>
            <p className="text-muted-foreground mb-6">الملف الشخصي المطلوب غير متوفر</p>
            <Button asChild>
              <Link to="/team"><ArrowRight className="w-4 h-4 ml-2" />العودة للفريق</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (date: any) => {
    const d = date?.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen py-16">
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto"><Button variant="ghost" asChild className="mb-4"><Link to="/team"><ArrowRight className="w-4 h-4 ml-2" />العودة للفريق</Link></Button></div>
      </div>

      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <Card className="shadow-card overflow-hidden">
            <CardContent className="p-0">
              <div className="h-48 bg-gradient-primary relative">
                {member.pannerImageUrl && (
                  <img src={member.pannerImageUrl} alt={`${member.name}'s banner`} className="w-full h-full object-cover" />
                )}
                <div className="absolute -bottom-16 right-8">
                  <img
                    src={member.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.email}`}
                    alt={member.name}
                    className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-primary"
                  />
                </div>
              </div>
              
              <div className="pt-20 pb-8 px-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{member.name}</h1>
                    {/* <p className="text-xl text-muted-foreground font-semibold mb-2">{member.title}</p> */}
                    <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">{member.title}</Badge>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                      {member.bio || 'هذا العضو لم يقم بكتابة نبذة شخصية بعد.'}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <a href={`mailto:${member.email}`}><Button className="gradient-primary"><Mail className="w-4 h-4 ml-2" />التواصل</Button></a>
                      {member.socialMediaLinks?.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="flex items-center gap-2"><SocialIcon platform={link.platform} />{link.platform}</Button>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="lg:text-left">
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{memberVideos.length}</div>
                      <div className="text-sm text-muted-foreground">فيديو</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">فيديوهات {member.name}</h2>
            <Badge variant="outline" className="text-sm px-3 py-1">{memberVideos.length} فيديو</Badge>
          </div>
          
          {memberVideos.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <PlayCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد فيديوهات بعد</h3>
                <p className="text-muted-foreground">لم يقم {member.name} برفع أي فيديوهات حتى الآن</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-fit">
              {memberVideos.map((video, index) => (
                <VideoCard key={index} video={video} userName={member.name} userImage={member.image} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TeamProfile;
