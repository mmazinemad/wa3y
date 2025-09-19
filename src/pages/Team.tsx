import React from "react";
import { Badge } from "@/components/ui/badge";
import TeamCard from "@/components/Team/TeamCard";
import { mockTeamMembers } from "@/data/mockData";

const Team = () => {
  const totalVideos = mockTeamMembers.reduce((total, member) => total + (member.videoCount || 0), 0);

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
              فريق العمل
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              تعرف على
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                فريقنا المبدع
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              مجموعة متنوعة من المختصين والمبدعين في مجالات مختلفة، نعمل معاً لتقديم أفضل المحتوى المرئي 
              والخدمات التقنية للمجتمع العربي.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-center">
              <div className="bg-card rounded-lg p-4 shadow-card">
                <div className="text-2xl font-bold text-primary">{mockTeamMembers.length}</div>
                <div className="text-sm text-muted-foreground">عضو في الفريق</div>
              </div>
              
              <div className="bg-card rounded-lg p-4 shadow-card">
                <div className="text-2xl font-bold text-accent">{totalVideos}</div>
                <div className="text-sm text-muted-foreground">إجمالي الفيديوهات</div>
              </div>
              
              <div className="bg-card rounded-lg p-4 shadow-card">
                <div className="text-2xl font-bold text-secondary">4</div>
                <div className="text-sm text-muted-foreground">تخصصات مختلفة</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockTeamMembers.map((member, index) => (
              <div key={member.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-primary rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              هل تريد الانضمام إلينا؟
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              نحن دائماً نبحث عن المواهب المميزة للانضمام إلى فريقنا. إذا كنت شغوفاً بالمحتوى المرئي والتقنية، فنحن نرحب بك.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:careers@videoteam.com"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                تواصل معنا
              </a>
              
              <a
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
              >
                اعرف المزيد عنا
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;