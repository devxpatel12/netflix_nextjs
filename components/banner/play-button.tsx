// components/PlayButton.tsx
'use client';
import { Play, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import VideoPlayer from './video-player';
 
interface PlayButtonProps {
  movieId: number;
  variant?: 'primary' | 'secondary';
}

export default function PlayButton({ movieId, variant = 'primary' }: PlayButtonProps) {
  const router = useRouter();
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');

  const handlePlay = async () => {
    // For primary button: try to play trailer first
    if (variant === 'primary') {
      try {
        const response = await fetch(`/api/movies/${movieId}/videos`);
        const videos = await response.json();
        const officialTrailer = videos.find(
          (v: any) => v.official && v.type === 'Trailer'
        );

        if (officialTrailer) {
          setTrailerKey(officialTrailer.key);
          setShowTrailer(true);
          return;
        }
      } catch (error) {
        console.error('Failed to fetch trailer:', error);
      }
    }
    // Fallback to navigating to watch page if no trailer or secondary button
    router.push(`/watch/${movieId}`);
  };

  const handleInfo = () => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <>
      <div className="flex gap-3 mt-4">
        {/* Primary Play Button */}
        <button
          onClick={handlePlay}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md transition
            ${variant === 'primary' 
              ? 'bg-white text-black hover:bg-opacity-80' 
              : 'bg-gray-600 bg-opacity-70 text-white hover:bg-opacity-50'}
          `}
        >
          <Play size={20} fill="currentColor" />
          <span className="font-medium">Play</span>
        </button>
        {/* Info Button (only shown with primary variant) */}
        {variant === 'primary' && (
          <button
            onClick={handleInfo}
            className="flex items-center gap-2 bg-gray-600 bg-opacity-70 text-white px-4 py-2 rounded-md hover:bg-opacity-50 transition"
          >
            <Info size={20} />
            <span className="font-medium">More Info</span>
          </button>
        )}
      </div>
      {/* Trailer Modal */}
      {showTrailer && (
        <VideoPlayer 
          videoKey={trailerKey} 
          onClose={() => setShowTrailer(false)} 
        />
      )}
    </>
  );
}