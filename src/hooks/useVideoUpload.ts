import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const useVideoUpload = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadVideo = async (file: File, title: string) => {
    if (!user) {
      toast.error('يجب تسجيل الدخول أولاً');
      return { error: 'Not authenticated' };
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('حجم الملف يجب أن يكون أقل من 100 ميجابايت');
      return { error: 'File too large' };
    }

    setUploading(true);
    setProgress(0);

    try {
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      // Create video record in database
      const { data: videoData, error: dbError } = await supabase
        .from('videos')
        .insert({
          user_id: user.id,
          title,
          video_url: publicUrl,
          storage_path: fileName,
          type: 'uploaded',
        })
        .select()
        .single();

      if (dbError) throw dbError;

      toast.success('تم رفع الفيديو بنجاح!');
      setProgress(100);
      return { data: videoData, error: null };
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('حدث خطأ أثناء رفع الفيديو');
      return { data: null, error };
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const saveEmbedVideo = async (url: string, title: string) => {
    if (!user) {
      toast.error('يجب تسجيل الدخول أولاً');
      return { error: 'Not authenticated' };
    }

    try {
      const { data, error } = await supabase
        .from('videos')
        .insert({
          user_id: user.id,
          title,
          video_url: url,
          type: 'embed',
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('تم حفظ الفيديو بنجاح!');
      return { data, error: null };
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error('حدث خطأ أثناء حفظ الفيديو');
      return { data: null, error };
    }
  };

  const deleteVideo = async (videoId: number, storagePath?: string) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      // Delete from storage if it's an uploaded video
      if (storagePath) {
        const { error: storageError } = await supabase.storage
          .from('videos')
          .remove([storagePath]);

        if (storageError) throw storageError;
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('videos')
        .delete()
        .eq('id', videoId);

      if (dbError) throw dbError;

      toast.success('تم حذف الفيديو بنجاح');
      return { error: null };
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error('حدث خطأ أثناء حذف الفيديو');
      return { error };
    }
  };

  return {
    uploadVideo,
    saveEmbedVideo,
    deleteVideo,
    uploading,
    progress,
  };
};
