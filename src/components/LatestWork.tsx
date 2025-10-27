import { usePublicVideos } from '@/hooks/usePublicVideos';
import { VideoCard } from './VideoCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function LatestWork() {
  const { videos, loading } = usePublicVideos();

  const latestVideos = videos.slice(0, 3);

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">أحدث أعمالنا</h2>
          <Link to="/videos">
            <Button>شاهد كل الفيديوهات</Button>
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg bg-muted/40 p-4">
                <div className="h-[200px] w-full animate-pulse rounded-md bg-muted/50"></div>
                <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-muted/50"></div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-6 w-6 animate-pulse rounded-full bg-muted/50"></div>
                  <div className="h-4 w-1/4 animate-pulse rounded bg-muted/50"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestVideos.map((video) => (
              <VideoCard key={video.id} video={video} userName={video.user?.name} userImage={video.user?.image} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
