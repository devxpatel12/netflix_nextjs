// components/VideoPlayer.tsx
'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VideoPlayerProps {
  videoKey: string;
  onClose: () => void;
}

export default function VideoPlayer({ videoKey, onClose }: VideoPlayerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl aspect-video">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 z-50"
          aria-label="Close trailer"
        >
          <X size={28} />
        </button>
        
        <div className="w-full h-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1&controls=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
            frameBorder="0"
            title="Movie Trailer"
          />
        </div>
      </div>
    </div>
  );
}