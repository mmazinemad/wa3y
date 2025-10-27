import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Heart, Award } from "lucide-react";
import { useAllVideos } from "@/hooks/useAllVideos";
import { useAllUsers } from "@/hooks/useAllUsers";
import { metaData } from "@/constants";

const values = [
  {
    icon: Target,
    title: "الهدف",
    description: "نهدف لإلهام الشباب المصري والعربي عبر محتوى إبداعي هادف يعكس طموحات جيلنا ويصنع تأثيرًا إيجابيًا في المجتمع."
  },
  {
    icon: Eye,
    title: "الرؤية",
    description: "أن نكون من أبرز الفرق المؤثرة في العالم العربي، نوصل رسائلنا بصدق ونبني مجتمعًا من الإبداع والتأثير."
  },
  {
    icon: Heart,
    title: "القيم",
    description: "الإبداع، الشغف، التعاون، والصدق في كل ما نقدمه."
  },
  {
    icon: Award,
    title: "التميز",
    description: "نسعى لتقديم محتوى مميز يعبر عنا ويترك بصمة حقيقية في قلوب متابعينا."
  }
];
const About = () => {

  const { videos, loading, error } = useAllVideos();
  const { users, loading: usersLoading, error: usersError } = useAllUsers();


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
            منصتنا تجمع بين الإبداع وروح الشباب لتقديم محتوى عربي ملهم يعبر عن واقعنا وطموحاتنا.
            نستخدم التقنية الحديثة والتصميم الأنيق لصناعة تجربة فريدة تعكس هوية المبدعين المصريين والعرب.</p>
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
                <div className="text-center animate-slide-up" style={{ animationDelay: "0" }}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                  {!error && !loading && `${videos.length}`}+
                    {error && !loading && "حدث خطأ أثناء تحميل المستخدمين"}
                    {!error && loading && "جار التحميل...."}
                  </div>
                  <div className="text-lg opacity-90">
                    فيديو مشارك
                  </div>
                </div>
                <div className="text-center animate-slide-up" style={{ animationDelay: "0.2" }}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {!usersError && !usersLoading && `${users.length}`}+
                    {usersError && !usersLoading && "حدث خطأ أثناء تحميل المستخدمين"}
                    {!usersError && usersLoading && "جار التحميل...."}
                  </div>
                  <div className="text-lg opacity-90">
                    عضو في الفريق
                  </div>
                </div>
                <div className="text-center animate-slide-up" style={{ animationDelay: "0.4" }}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {metaData.weaklyVideo}+
                  </div>
                  <div className="text-lg opacity-90">
                    فيديو اسبوعيا
                  </div>
                </div>
                <div className="text-center animate-slide-up" style={{ animationDelay: "0.6" }}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {metaData.folwers / 1000}k+
                  </div>
                  <div className="text-lg opacity-90">
                  متابع
                  </div>
                </div>

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
                <p>بدأت رحلتنا عام 2023 كمجموعة من الشباب المصري الطموح الذين يجمعهم حلم واحد: ترك بصمة حقيقية في المجتمع المصري والعربي من خلال الإنترنت.
                  جمعنا الشغف بالمحتوى، والرغبة في إيصال صوتنا وأفكارنا بطريقة مختلفة، فقررنا أن نحول طاقتنا الإبداعية إلى رسالة ملهمة تُحدث أثراً حقيقياً.
                </p>

                <p>
                  واجهنا تحديات كثيرة في البداية — من تطوير أسلوبنا، إلى بناء هويتنا الرقمية، وحتى فهم ما يحتاجه جمهورنا العربي. لكن الإصرار على النجاح وحبّ ما نفعل كانا دافعنا للاستمرار.
                </p>

                <p>
                  اليوم، نحن فخورون بأننا أصبحنا جزءاً من مشهد صناعة المحتوى العربي، نعمل على تقديم محتوى هادف يجمع بين الإبداع، الترفيه، والتأثير الإيجابي.
                  ورحلتنا ما زالت في بدايتها — فالقادم، بإذن الله، سيكون أكبر وأجمل. 🌟</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;