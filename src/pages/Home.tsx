import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Users, Upload, Star } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Upload,
      title: "رفع الفيديوهات",
      description: "ارفع فيديوهاتك بسهولة وشاركها مع فريقك"
    },
    {
      icon: PlayCircle,
      title: "دمج الفيديوهات",
      description: "ادمج فيديوهات من يوتيوب وتيك توك وفيسبوك"
    },
    {
      icon: Users,
      title: "إدارة الفريق",
      description: "أنشئ ملفات شخصية للأعضاء وأظهر أعمالهم"
    },
    {
      icon: Star,
      title: "واجهة احترافية",
      description: "تصميم عصري يدعم اللغة العربية بشكل كامل"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              منصة الفيديو العربية
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                للفرق الإبداعية
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              شارك وأدر فيديوهاتك بسهولة مع فريقك. ارفع فيديوهاتك أو ادمج محتوى من منصات التواصل الاجتماعي في مكان واحد.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="gradient-primary shadow-primary text-lg px-8" asChild>
                <Link to="/dashboard">
                  <PlayCircle className="w-5 h-5 ml-2" />
                  ابدأ الآن
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8" asChild>
                <Link to="/videos">
                  عرض الفيديوهات
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Animation */}
        <div className="absolute top-20 right-10 animate-float opacity-30">
          <div className="w-20 h-20 bg-gradient-accent rounded-full"></div>
        </div>
        <div className="absolute bottom-20 left-10 animate-float opacity-20" style={{ animationDelay: '2s' }}>
          <div className="w-16 h-16 bg-gradient-primary rounded-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              لماذا تختار منصتنا؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نوفر لك جميع الأدوات التي تحتاجها لإدارة ومشاركة المحتوى المرئي مع فريقك
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-primary transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-primary rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              جاهز للبدء؟
            </h2>
            <p className="text-xl mb-8 opacity-90">
              انضم إلى فريقنا وابدأ في مشاركة فيديوهاتك اليوم
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="text-lg px-8" asChild>
                <Link to="/team">
                  <Users className="w-5 h-5 ml-2" />
                  تعرف على الفريق
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/about">
                  معرفة المزيد
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;