// components/movie-dialog.tsx
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Loader2, Play } from "lucide-react";
import { IKImage } from "imagekitio-next";
import type { Movie } from "@/lib/generated/prisma";
import { Video } from "@imagekit/next";

interface MovieDialogProps {
  movie: Movie;
  children: React.ReactNode;
}

export function MovieDialog({ movie, children }: MovieDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setIsLoading(true);
    setHasError(false);
  };
 
  return (
    <>
      <div
        onClick={handleOpen}
        className="cursor-pointer relative group"
        aria-label={`Play ${movie.movieName}`}
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
          <DialogTitle>{movie.movieName}</DialogTitle>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-white" />
            </div>
          )}

          {hasError ? (
            <div className="relative h-full">
              {/* Fallback to thumbnail image */}
              {movie.thumbnailUrl ? (
                <IKImage
                  urlEndpoint="https://ik.imagekit.io/1kavc6xkz9"
                  path={movie.thumbnailUrl}
                  transformation={[{ height: 720, width: 1280 }]}
                  alt={`${movie.movieName} thumbnail`}
                  className="w-full h-full object-cover opacity-50"
                />
              ) : (
                <div className="w-full h-full bg-gray-800" />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl text-white">Video playback failed</p>
              </div>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-50 text-white hover:bg-white/10 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>

              <Video
                urlEndpoint="https://ik.imagekit.io/1kavc6xkz9"
                src="/netflix-uploads/sample-video__H1EED-gNv.mp4"
                transformation={[{ quality: 80, height: 720 }]}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="absolute inset-0 w-full h-full object-cover"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
