import { Button } from "@/components/ui/button";
import { Settings, Plus } from "lucide-react";
import type { User } from "firebase/auth";
import type { UserProfile } from "@/types";

type DashboardHeaderProps = {
  user: User | null;
  profile: UserProfile | null;
  newUserImage: string;
  onEdit: () => void;
  onAddVideo: () => void;
  canUpload: boolean;
};

export function DashboardHeader({
  user,
  profile,
  newUserImage,
  onEdit,
  onAddVideo,
  canUpload,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={
              newUserImage ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`
            }
            alt={profile?.name || ""}
            className="w-16 h-16 rounded-full object-cover shadow-primary"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              مرحباً، {profile?.name || user?.email}
            </h1>
            <p className="text-muted-foreground">
              {profile?.title ||
                (profile?.role === "admin"
                  ? "مدير"
                  : profile?.role === "influencer"
                  ? "منشئ محتوى"
                  : "مستخدم")}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onEdit}>
            <Settings className="w-4 h-4 ml-2" />
            تعديل
          </Button>
          {canUpload && (
            <Button className="gradient-primary" onClick={onAddVideo}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة فيديو
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
