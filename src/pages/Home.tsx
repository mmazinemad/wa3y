
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Users, Music, Book, Moon } from "lucide-react";
import  LatestWork  from "@/components/LatestWork";
import { ContactUs } from "@/components/ContactUs";

const Home = () => {
  const fields = [
    {
      icon: Music,
      title: "شعر وغناء",
      description: "نعبّر عن مشاعرنا بالكلمة واللحن، لنخلق تجربة فنية تصل إلى القلب مباشرة."
    },
    {
      icon: Book,
      title: "كتابة المحتوى",
      description: "نكتب بفكر وشغف لنشارك رسائل حقيقية تلامس الناس وتلهمهم."
    },
    {
      icon: Moon,
      title: "محتوى ديني",
      description: "نقدّم قيمنا ومبادئنا بأسلوب بسيط وقريب من الناس."
    },
    {
      icon: Users,
      title: "محتوى ثقافي",
      description: "نحتفي بالهوية العربية ونشارك العالم عمق ثقافتنا."
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
              فريق مبدع يصنع
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                أثره الرقمي
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              نحن مجموعة شباب مصريين، جمعنا الشغف وصناعة المحتوى لنترك بصمتنا في العالم الرقمي. نؤمن أن صوت الجيل الجديد قادر على الإلهام والتغيير عبر الإبداع والتأثير الإيجابي. </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="gradient-primary shadow-primary text-lg px-8" asChild>
                <a href="#contactUs">
                  <Mail className="w-5 h-5 ml-2" />
                  تواصل معنا
                  </a>
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
            مجالاتنا الإبداعية
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            كل عضو في فريقنا يضيف لونه الخاص، من الشعر والموسيقى إلى التصميم وصناعة المحتوى — معًا نصنع أثراً متنوعاً وملهمًا.  
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fields.map((feature, index) => (
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

      {/* Latest Work Section */}
      <LatestWork />

      {/* ContactUs Section */}
      <div id="contactUs">
        <ContactUs />
      </div>
    </div>
  );
};

export default Home;
