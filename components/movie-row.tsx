// components/movie-row.tsx
"use client";
import type { Movie } from "@/lib/generated/prisma";
import { MovieCard } from "./movie-card";

export function MovieRow({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-4 md:px-8">
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>

      <div className="relative">
        <div className="flex space-x-4 overflow-x-scroll scrollbar-hide px-4 md:px-8 py-2">
          {movies.map((movie: Movie) => (
            <div key={movie.id} className="flex-none">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
