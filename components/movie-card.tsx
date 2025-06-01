// components/movie-card.tsx
'use client';

import Image from 'next/image';
import { Movie } from '@/types';
import { MovieDialog } from './movie-dialog';

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <MovieDialog 
      movieId={movie.id}
      title={movie.title}
      backdropPath={movie.backdrop_path}
    >
      <div className="relative h-48 min-w-[200px] md:h-56 md:min-w-[300px]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className="rounded-sm object-cover"
          sizes="(max-width: 768px) 200px, 300px"
        />
      </div>
    </MovieDialog>
  );
}