import { useState, useEffect } from "react";

const useGetSingleMovie = (movieId: string) => {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=f02e0d2fb98a63d497c1577888874504`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const data = await response.json();
        setMovie(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return { movie, loading, error };
};
export default useGetSingleMovie;
