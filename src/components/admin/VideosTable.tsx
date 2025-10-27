
import { useState } from 'react';
import { useAllVideos } from '@/hooks/useAllVideos';
import { Video } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Edit, Save, X } from 'lucide-react';

export const VideosTable = () => {
  const { videos, loading, updateVideo, deleteVideo } = useAllVideos();
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [editedTitle, setEditedTitle] = useState('');

  const startEditing = (video: Video) => {
    setEditingVideo(video);
    setEditedTitle(video.title);
  };

  const cancelEditing = () => {
    setEditingVideo(null);
  };

  const handleUpdate = async () => {
    if (editingVideo) {
      await updateVideo(editingVideo.id, { title: editedTitle });
      cancelEditing();
    }
  };

  if (loading) return <div>Loading videos...</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {videos.map((video) => (
          <TableRow key={video.id}>
            {editingVideo?.id === video.id ? (
              <>
                <TableCell>
                  <Input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                </TableCell>
                <TableCell>{video.user?.name}</TableCell>
                <TableCell>{video.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button size="sm" onClick={handleUpdate}><Save className="h-4 w-4" /></Button>
                  <Button size="sm" variant="ghost" onClick={cancelEditing}><X className="h-4 w-4" /></Button>
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{video.title}</TableCell>
                <TableCell>{video.user?.name}</TableCell>
                <TableCell>{video.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost" onClick={() => startEditing(video)}><Edit className="h-4 w-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteVideo(video.id)}><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
