import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UploadTrigger from "@/components/UplaodTrigger";
import { TabsContent } from "@/components/ui/tabs";
import { Trash2, Plus } from "lucide-react";
import type { User } from "firebase/auth";
import type { UserProfile } from "@/types";

type SocialLink = { platform: string; url: string };

type ProfileFormProps = {
  user: User | null;
  profile: UserProfile | null;
  profileName: string;
  setProfileName: (v: string) => void;
  title: string;
  setTitle: (v: string) => void;
  bio: string;
  setBio: (v: string) => void;
  newUserImage: string;
  setNewUserImage: (v: string) => void;
  newPannerImage: string;
  setNewPannerImage: (v: string) => void;
  socialMediaLinks: SocialLink[];
  onSocialChange: (
    index: number,
    field: "platform" | "url",
    value: string
  ) => void;
  onAddSocial: () => void;
  onRemoveSocial: (index: number) => void;
  onSave: () => void;
  profileError?: Error | null;
};

export function ProfileForm({
  user,
  profile,
  profileName,
  setProfileName,
  title,
  setTitle,
  bio,
  setBio,
  newUserImage,
  setNewUserImage,
  newPannerImage,
  setNewPannerImage,
  socialMediaLinks,
  onSocialChange,
  onAddSocial,
  onRemoveSocial,
  onSave,
  profileError,
}: ProfileFormProps) {
  return (
    <TabsContent value="profile" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>الملف الشخصي</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {profileError && (
            <div className="text-red-500">Error: {profileError.message}</div>
          )}

          <div className="space-y-2">
            <Label>صورة الملف الشخصي</Label>
            <div className="flex items-center gap-6">
              <img
                src={
                  newUserImage ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`
                }
                alt="User"
                className="w-24 h-24 rounded-full object-cover border-2 border-border"
              />
              <div className="flex-1">
                <UploadTrigger
                  onUpload={setNewUserImage}
                  label="رفع صورة شخصية"
                  currentImage={newUserImage}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>صورة البانر</Label>
            {newPannerImage && (
              <img
                src={newPannerImage}
                alt="Banner"
                className="w-full h-48 object-cover rounded-lg mb-4 border border-border"
              />
            )}
            <UploadTrigger
              onUpload={setNewPannerImage}
              label="رفع صورة البانر"
              currentImage={newPannerImage}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>الاسم</Label>
              <Input
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>البريد</Label>
              <Input value={user?.email || ""} disabled />
            </div>
          </div>
          {(profile?.role === "influencer" || profile?.role === "admin") && (
            <div className="space-y-2">
              <Label>المسمى الوظيفي</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
          )}
          <div className="space-y-2">
            <Label>النبذة الشخصية</Label>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>

          <div className="space-y-4">
            <Label>روابط التواصل الاجتماعي</Label>
            {socialMediaLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Platform"
                  value={link.platform}
                  onChange={(e) =>
                    onSocialChange(index, "platform", e.target.value)
                  }
                  className="w-1/3"
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => onSocialChange(index, "url", e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveSocial(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={onAddSocial}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة رابط
            </Button>
          </div>

          <Button className="gradient-primary" onClick={onSave}>
            حفظ التغييرات
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

export default ProfileForm;
