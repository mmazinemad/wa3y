import { useState } from 'react';
import UploadWidget from './UploadWidget';
import { Button } from '@/components/ui/button';
import { Upload, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface UploadTriggerProps {
  onUpload: (url: string) => void;
  label?: string;
  currentImage?: string;
}

function UploadTrigger({ onUpload, label = "رفع صورة", currentImage }: UploadTriggerProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleOnUpload(error: any, result: any, widget: React.MutableRefObject<any>) {
        if (error) {
            setError(error.statusText || 'حدث خطأ أثناء رفع الصورة');
            setUploading(false);
            toast.error('فشل رفع الصورة');
            widget.current?.close({
                quiet: true
            });
            return;
        }

        if (result?.event === "success") {
            const imageUrl = result?.info?.secure_url;
            if (imageUrl) {
                onUpload(imageUrl);
                setUploading(false);
                setError(null);
                toast.success('تم رفع الصورة بنجاح');
                widget.current?.close({
                    quiet: true
                });
            }
        } else if (result?.event === "queues-end") {
            setUploading(false);
        } else if (result?.event === "upload-added") {
            setUploading(true);
            setError(null);
        }
    }

    return (
        <div className="space-y-2">
            <UploadWidget onUpload={handleOnUpload}>
                {({ open }) => {
                    function handleOnClick(e: React.MouseEvent) {
                        e.preventDefault();
                        open();
                    }
                    
                    return (
                        <Button 
                            type="button"
                            variant="outline" 
                            onClick={handleOnClick}
                            disabled={uploading}
                            className="w-full"
                        >
                            {uploading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary ml-2"></div>
                                    جاري الرفع...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4 ml-2" />
                                    {label}
                                </>
                            )}
                        </Button>
                    );
                }}
            </UploadWidget>

            {error && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}

export default UploadTrigger;