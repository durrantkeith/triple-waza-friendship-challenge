import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Play, BookOpen } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  youtube_url: string;
  level: number;
}

export function DemoVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    try {
      const { data, error } = await supabase
        .from('educational_videos')
        .select('*')
        .order('order_index')
        .limit(3);

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  }

  const extractYouTubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  };

  if (loading || videos.length === 0) {
    return null;
  }

  return (
    <div className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Play className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            See The Techniques in Action
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Watch demonstration videos to understand what each level entails
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video) => {
            const videoId = extractYouTubeId(video.youtube_url);
            return (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative aspect-video bg-black">
                  {playingVideos.has(video.id) && videoId ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : videoId ? (
                    <div className="relative w-full h-full">
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3">
                        <button
                          onClick={() => setPlayingVideos(prev => new Set([...prev, video.id]))}
                          className="bg-red-600 hover:bg-red-700 rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-2xl"
                          aria-label="Play video"
                        >
                          <Play className="w-12 h-12 text-white fill-white" />
                        </button>
                        <span className="text-white text-sm font-semibold">Click to play embedded video</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                      Level {video.level}
                    </span>
                    {videoId && (
                      <a
                        href={`https://www.youtube.com/watch?v=${videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-semibold"
                      >
                        <Play size={14} />
                        <span>YouTube</span>
                      </a>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-lg">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">More educational resources coming soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}