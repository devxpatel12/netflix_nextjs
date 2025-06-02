"use client";

import { ImageKitProvider, Video } from "@imagekit/next";

type MovieBannerProps = {
  id: string;
  movieName: string;
  description: string;
  videoUrl?: string; // optional
};

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

const MovieBanner = ({
  id,
  movieName,
  description,
  videoUrl,
}: MovieBannerProps) => {
  return (
    <div className="relative w-full h-[56.25vw] max-h-screen overflow-hidden">
      {videoUrl && (
        <div className="absolute inset-0 w-full h-full">
          <ImageKitProvider urlEndpoint={urlEndpoint}>
            <Video
              src="/netflix-uploads/sample-video__H1EED-gNv.mp4"
              transformation={[{ quality: 80, height: 720 }]}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="absolute inset-0 w-full h-full object-cover"
            />
          </ImageKitProvider>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/10 to-transparent" />

      <div className="absolute bottom-[20%] left-4 md:left-16 z-20 max-w-2xl">
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-xl">
          {movieName}
        </h1>
        <p className="text-white text-sm md:text-lg mt-3 md:mt-8 line-clamp-3">
          {description}
        </p>
        <div className="flex gap-3 mt-4">
          <button className="bg-white/30 text-white px-4 py-2 rounded-md flex items-center gap-1 hover:bg-white/40 transition">
            <span className="text-sm md:text-base">More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;
