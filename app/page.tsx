import Header from "@/components/navbar/header";
import MovieBanner from "@/components/banner/movie-banner";
import { MovieRow } from "@/components/movie-row";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const popularMovies = await prisma.movie.findMany({
    where: {
      category: "popular",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  const upcomingMovies = await prisma.movie.findMany({
    where: {
      category: "upcoming",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  const trendingMovies = await prisma.movie.findMany({
    where: {
      category: "trending",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  }); 
  const featuredMovie = await prisma.movie.findFirst({
    where: {
      category: "trailer",
    },
    orderBy: {
      createdAt: "desc",
    },
  }); 
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="space-y-12 pb-20">
        {featuredMovie && (
          <MovieBanner
            id={featuredMovie.id}
            movieName={featuredMovie.movieName}
            description={featuredMovie.description || ""}
            videoUrl={featuredMovie.videoUrl}
          />
        )}

        <section className="  px-4 sm:px-6 space-y-8">
          <MovieRow title="Trendings" movies={trendingMovies} />
          <MovieRow title="Populars" movies={popularMovies} />
          <MovieRow title="Upcomings" movies={upcomingMovies} />
        </section>
      </main>
    </div>
  );
}
