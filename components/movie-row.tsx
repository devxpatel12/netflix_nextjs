// components/movie-row.tsx
'use client';

import { Movie } from '@/types';
import { MovieCard } from './movie-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export function MovieRow({ title, movies }: { title: string; movies: Movie[] }) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      rowRef.current.scrollTo({ 
        left: scrollTo, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-4 md:px-8">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition"
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition"
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={rowRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide px-4 md:px-8 py-2"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}