import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import VideoEmbed from "@/components/Video/VideoEmbed";
import { TabsContent } from "@/components/ui/tabs";
import { Plus, Video as VideoIcon } from "lucide-react";
import VideoUploadTrigger from "@/components/VideoUploadTrigger";

type AddVideoFormProps = {
  uploading: boolean;
  progress: number;
  newVideoTitle: string;
  setNewVideoTitle: (v: string) => void;
  newVideoUrl: string;
  setNewVideoUrl: (v: string) => void;
  cloudinaryVideoUrl: string;
  onUploadCloudinary: (url: string, publicId?: string) => void;
  onSaveCloudinary: () => void;
  onSaveEmbed: () => void;
};

export function AddVideoForm({
  uploading,
  progress,
  newVideoTitle,
  setNewVideoTitle,
  newVideoUrl,
  setNewVideoUrl,
  cloudinaryVideoUrl,
  onUploadCloudinary,
  onSaveCloudinary,
  onSaveEmbed,
}: AddVideoFormProps) {
  return (
    <TabsContent value="add" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إضافة فيديو جديد</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {uploading && <Progress value={progress} />}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>عنوان الفيديو</Label>
                <Input
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>رابط الفيديو (Embed)</Label>
                <Input
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>رفع فيديو </Label>
                <VideoUploadTrigger
                  onUpload={onUploadCloudinary}
                  label="رفع فيديو "
                />
              </div>
              <div className="flex gap-4">
                {cloudinaryVideoUrl ? (
                  <Button
                    onClick={onSaveCloudinary}
                    className="gradient-primary"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    حفظ الفيديو
                  </Button>
                ) : (
                  <Button onClick={onSaveEmbed} className="gradient-primary">
                    <Plus className="w-4 h-4 ml-2" />
                    حفظ رابط
                  </Button>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <Label>معاينة</Label>
              <div className="border border-dashed rounded-lg p-8 text-center">
                {cloudinaryVideoUrl ? (
                  <VideoEmbed url={cloudinaryVideoUrl} title={newVideoTitle} />
                ) : newVideoUrl ? (
                  <VideoEmbed url={newVideoUrl} title={newVideoTitle} />
                ) : (
                  <div>
                    <VideoIcon className="w-12 h-12 mx-auto mb-2" />
                    <p>أدخل رابط الفيديو أو ارفع </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

export default AddVideoForm;
