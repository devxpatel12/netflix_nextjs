import Header from "@/components/navbar/header";
import MovieBanner from "@/components/banner/movie-banner";
import { MovieRow } from "@/components/movie-row";
 
// Type definitions for better type safety
interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number; 
}

interface Video {
  id: string;
  key: string;
  site: string;
  type: string; 
}

interface MovieListResponse {
  results: Movie[]; 
}

// Centralized API configuration
const TMDB_API = {
  baseUrl: "https://api.themoviedb.org/3",
  defaultParams: {
    api_key: process.env.TMDB_API_KEY,
    language: "en-US",
    region: "US",
  },
};
// Generic fetch function with error handling
async function fetchMovies(
  endpoint: string,
  params = {}
): Promise<MovieListResponse> {
  const url = new URL(`${TMDB_API.baseUrl}/${endpoint}`);
  const searchParams = new URLSearchParams({
    ...TMDB_API.defaultParams,
    api_key: TMDB_API.defaultParams.api_key || "",
    ...params,
  });
  url.search = searchParams.toString();

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return { results: [] };
  }
}

// Specific movie fetchers
async function getNowPlayingMovies(): Promise<MovieListResponse> {
  return fetchMovies("movie/now_playing", { page: "1" });
}

async function getTopRatedMovies(): Promise<MovieListResponse> {
  return fetchMovies("movie/top_rated", { page: "1" });
}

async function getPopularMovies(): Promise<MovieListResponse> {
  return fetchMovies("movie/popular", { page: "1" });
}

async function getUpcomingMovies(): Promise<MovieListResponse> {
  return fetchMovies("movie/upcoming", { page: "1" });
}

async function getMovieTrailer(movieId: number): Promise<Video | undefined> {
  const data = await fetchMovies(`movie/${movieId}/videos`);
  return (data.results as unknown as Video[])?.find(
    (vid: Video) => vid.site === "YouTube" && vid.type === "Trailer"
  );
}

export default async function Home() {
  // Fetch all data in parallel
  const [nowPlaying, topRated, popular, upcoming] = await Promise.all([
    getNowPlayingMovies(),
    getTopRatedMovies(),
    getPopularMovies(),
    getUpcomingMovies(),
  ]);

  // Get random featured movie
  const featuredMovie =
    nowPlaying.results[Math.floor(Math.random() * nowPlaying.results.length)];
  const trailer = featuredMovie
    ? await getMovieTrailer(featuredMovie.id)
    : undefined;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="space-y-12 pb-20">
        {featuredMovie && (
          <MovieBanner
            id={featuredMovie.id}
            backdrop_path={featuredMovie.backdrop_path}
            title={featuredMovie.title}
            overview={featuredMovie.overview}
            trailerKey={trailer?.key}
          />
        )}

        <section className="  px-4 sm:px-6 space-y-8">
          <MovieRow title="Top Rated" movies={topRated.results} />
          <MovieRow title="Popular" movies={popular.results} />
          <MovieRow title="Upcoming" movies={upcoming.results} />
        </section>
      </main>
    </div>
  );
}
