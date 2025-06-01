"use client";

type MovieBannerProps = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  trailerKey?: string;
};

const MovieBanner = ({
  id,
  title,
  overview,
  backdrop_path,
  trailerKey,
}: MovieBannerProps) => {
  return (
    <div className="w-full h-[56.25vw] max-h-screen overflow-hidden">
      {trailerKey ? (
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1&controls=1&mute=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            title="Movie Trailer"
          />
        </div>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover brightness-[60%] rounded-lg"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/10 to-transparent" />

      <div className="absolute bottom-[20%] left-4 md:left-16 z-20 max-w-2xl">
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-xl">
          {title}
        </h1>
        <p className="text-white text-sm md:text-lg mt-3 md:mt-8 line-clamp-3">
          {overview}
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
