import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Heart, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "الهدف",
      description: "نهدف إلى تمكين الفرق الإبداعية من مشاركة وإدارة محتواهم المرئي بطريقة سهلة ومنظمة."
    },
    {
      icon: Eye,
      title: "الرؤية",
      description: "أن نكون المنصة الرائدة في الوطن العربي لإدارة المحتوى المرئي للفرق والمؤسسات."
    },
    {
      icon: Heart,
      title: "القيم",
      description: "نؤمن بالإبداع والتعاون والجودة في كل ما نقدمه لمجتمعنا من المبدعين العرب."
    },
    {
      icon: Award,
      title: "التميز",
      description: "نسعى لتقديم خدمات متميزة تلبي احتياجات مستخدمينا وتتجاوز توقعاتهم."
    }
  ];

  const stats = [
    { number: "500+", label: "فيديو مشارك" },
    { number: "50+", label: "عضو فريق" },
    { number: "25+", label: "مشروع مكتمل" },
    { number: "98%", label: "رضا العملاء" }
  ];

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
              من نحن
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              نحن فريق من المبدعين
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                نبني المستقبل المرئي
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              منصتنا تجمع بين التقنية الحديثة والتصميم الأنيق لتوفر لك أفضل تجربة في إدارة ومشاركة المحتوى المرئي. 
              نحن متخصصون في تطوير حلول تقنية تدعم المحتوى العربي بشكل كامل.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              قيمنا ومبادئنا
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نؤمن بمبادئ راسخة توجه عملنا وتشكل هويتنا كفريق إبداعي
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-primary transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-hero text-white overflow-hidden">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  إنجازاتنا بالأرقام
                </h2>
                <p className="text-xl opacity-90">
                  نفخر بما حققناه من إنجازات مع مجتمعنا المتنامي
                </p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg opacity-90">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-card">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  قصتنا
                </h2>
                <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
              </div>
              
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
                <p>
                  بدأت رحلتنا عام 2023 عندما لاحظنا الحاجة الماسة لمنصة عربية متخصصة في إدارة المحتوى المرئي. 
                  كنا مجموعة من المطورين والمصممين الذين يؤمنون بقوة المحتوى العربي وأهمية دعمه تقنياً.
                </p>
                
                <p>
                  واجهنا تحديات كثيرة في البداية، خاصة في تطوير واجهات تدعم اللغة العربية بشكل مثالي وتوفر تجربة 
                  مستخدم سلسة. لكن إيماننا بالهدف دفعنا للاستمرار والتطوير.
                </p>
                
                <p>
                  اليوم، نفخر بما وصلنا إليه. منصتنا تخدم المئات من المبدعين العرب وتساعدهم في تنظيم وإدارة 
                  محتواهم المرئي بطريقة احترافية. ما زلنا في بداية الطريق، ونتطلع لمستقبل مشرق مليء بالإبداع والابتكار.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;