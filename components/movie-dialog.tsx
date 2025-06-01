// components/movie-dialog.tsx
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Loader2, Play } from 'lucide-react';

interface MovieDialogProps {
  movieId: number;
  title: string;
  backdropPath: string;
  children: React.ReactNode;
}

export function MovieDialog({ movieId, title, backdropPath, children }: MovieDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchTrailer = async () => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      const response = await fetch(`/api/movies/${movieId}/videos`);
      if (!response.ok) throw new Error('Failed to fetch trailer');
      
      const data = await response.json();
      const trailer = data.find((v: any) => 
        v.site === "YouTube" && v.type === "Trailer" && v.official
      );

      if (trailer?.key) {
        setVideoKey(trailer.key);
        setIsOpen(true);
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    if (!isOpen) {
      fetchTrailer();
    }
  };

  return (
    <>
      <div 
        onClick={handleOpen}
        className="cursor-pointer relative group"
        aria-label={`Play ${title}`}
      >
        {children}
        
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="bg-white/90 p-3 rounded-full transform scale-90 group-hover:scale-110 transition-transform">
            <Play className="h-6 w-6 text-black" />
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-5xl bg-black p-0 aspect-video border-none overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-12 w-12 animate-spin text-white" />
            </div>
          ) : hasError ? (
            <div className="relative h-full">
              {/* Fallback to backdrop image */}
              <img
                src={`https://image.tmdb.org/t/p/original${backdropPath}`}
                alt={title}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl text-white">Trailer not available</p>
              </div>
            </div>
          ) : videoKey ? (
            <>
              <Button 
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-50 text-white hover:bg-white/10 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
              <iframe
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
                title={`${title} Trailer`}
              />
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}