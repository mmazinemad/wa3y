export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar_url: string;
  videoCount?: number;
}

export interface Video {
  id: string;
  user_id?: string;
  team_member_id?: string;
  type: "uploaded" | "embed";
  title: string;
  url: string;
  thumbnail?: string;
  created_at: string;
  description?: string;
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "أحمد محمد",
    role: "مدير المحتوى",
    bio: "خبير في إنتاج المحتوى المرئي وإدارة الفرق الإبداعية. يتمتع بخبرة تزيد عن 8 سنوات في مجال الإعلام الرقمي.",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    videoCount: 12
  },
  {
    id: "2",
    name: "فاطمة العلي",
    role: "مصممة جرافيك",
    bio: "مبدعة في التصميم البصري والرسوم المتحركة. تختص في إنتاج المحتوى البصري الجذاب لمنصات التواصل الاجتماعي.",
    avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    videoCount: 8
  },
  {
    id: "3",
    name: "خالد السالم",
    role: "محرر فيديو",
    bio: "محترف في مونتاج وتحرير الفيديوهات باستخدام أحدث التقنيات. يركز على إنتاج محتوى عالي الجودة يجذب المشاهدين.",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    videoCount: 15
  },
  {
    id: "4",
    name: "مريم أحمد",
    role: "منسقة المشاريع",
    bio: "متخصصة في إدارة المشاريع وتنسيق العمل بين الفرق المختلفة. تحرص على تسليم المشاريع في الوقت المحدد بأعلى جودة.",
    avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    videoCount: 6
  }
];

export const mockVideos: Video[] = [
  {
    id: "1",
    team_member_id: "1",
    type: "embed",
    title: "دورة تعلم المونتاج للمبتدئين",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=320&h=180&fit=crop",
    created_at: "2024-01-15T10:30:00Z",
    description: "شرح مفصل لأساسيات المونتاج باستخدام برامج احترافية"
  },
  {
    id: "2",
    team_member_id: "2",
    type: "embed",
    title: "أساسيات التصميم الجرافيكي",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1558655146-364adaf25c87?w=320&h=180&fit=crop",
    created_at: "2024-01-20T14:15:00Z",
    description: "تعلم مبادئ التصميم والألوان والتخطيط"
  },
  {
    id: "3",
    team_member_id: "3",
    type: "embed",
    title: "تقنيات الإضاءة في التصوير",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=320&h=180&fit=crop",
    created_at: "2024-01-25T16:45:00Z",
    description: "كيفية استخدام الإضاءة لتحسين جودة الفيديو"
  },
  {
    id: "4",
    team_member_id: "4",
    type: "embed",
    title: "إدارة المشاريع الإبداعية",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=320&h=180&fit=crop",
    created_at: "2024-02-01T09:20:00Z",
    description: "نصائح لإدارة الفرق الإبداعية وتنظيم المشاريع"
  },
  {
    id: "5",
    team_member_id: "1",
    type: "embed",
    title: "استراتيجيات المحتوى المرئي",
    url: "https://www.facebook.com/share/v/17TQxqjdnh/",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=320&h=180&fit=crop",
    created_at: "2024-02-05T11:10:00Z",
    description: "كيفية تخطيط وتنفيذ محتوى مرئي فعال"
  },
  {
    id: "6",
    team_member_id: "2",
    type: "embed",
    title: "اتجاهات التصميم الحديثة",
    url: "https://www.facebook.com/watch?v=751851504348091",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=320&h=180&fit=crop",
    created_at: "2024-02-10T13:30:00Z",
    description: "آخر اتجاهات التصميم لعام 2024"
  }
];