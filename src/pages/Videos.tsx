import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { VideoCard } from "@/components/VideoCard";
import { usePublicVideos } from "@/hooks/usePublicVideos";
import { useAllUsers } from "@/hooks/useAllUsers";
import { Search, Filter } from "lucide-react";

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<string>("all");
  const { videos, loading } = usePublicVideos();
  const { users } = useAllUsers();

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesMember =
      selectedMember === "all" || video.userId === selectedMember;

    return matchesSearch && matchesMember;
  });

  return (
    <div className="min-h-screen py-16">
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
              استكشف مجموعة متنوعة من الفيديوهات التعليمية والإبداعية من أعضاء
              فريقنا المتخصصين في مجالات مختلفة.
            </p>
          </div>

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
                {users.map((member) => (
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary mb-1">
                  {videos.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  إجمالي الفيديوهات
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-secondary mb-1">
                  {users.length}
                </div>
                <div className="text-sm text-muted-foreground">المساهمون</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-accent mb-1">
                  {filteredVideos.length}
                </div>
                <div className="text-sm text-muted-foreground">نتائج البحث</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="break-inside-avoid mb-4 rounded-lg bg-muted/40 p-4"
                >
                  <div className="h-[200px] w-full animate-pulse rounded-md bg-muted/50"></div>
                  <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-muted/50"></div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-6 w-6 animate-pulse rounded-full bg-muted/50"></div>
                    <div className="h-4 w-1/4 animate-pulse rounded bg-muted/50"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredVideos.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-6xl mb-4">🎥</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  لا توجد فيديوهات
                </h3>
                <p className="text-muted-foreground">
                  جرب تغيير معايير البحث أو الفلترة
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  userName={video.user?.name}
                  userImage={video.user?.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Videos;
