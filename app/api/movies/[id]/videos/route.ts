// app/api/movies/[id]/videos/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const movieId = params.id;
  
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.TMDB_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    
    const data = await response.json();
    return NextResponse.json(data.results);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch movie videos' },
      { status: 500 }
    );
  }
}