import axios from "axios";
import { useEffect, useState } from "react";

const useGetNowPlayingMovie = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = "f02e0d2fb98a63d497c1577888874504";
  const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&region=US&language=en-US&page=1`;
 
 console.log("*** use effect one is called ***");
 

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const response = await axios.get(API_URL);
        setNowPlayingMovies(response.data.results);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch now playing movies");
      } finally {
        setLoading(false);
      }
    };
    fetchNowPlayingMovies();
  }, []);

  return { nowPlayingMovies, loading, error };
};
export default useGetNowPlayingMovie;
