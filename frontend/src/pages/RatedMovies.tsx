import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

interface RatedMovie {
  id: number;
  movie_id: number;
  title: string;
  poster_path: string | null;
  rating: number;
}

function RatedMovies() {
  const [ratedMovies, setRatedMovies] = useState<RatedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRatedMovies = async () => {
      try {
        const response = await api.get("/ratings");
        setRatedMovies(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erro ao buscar filmes avaliados", error);
        setRatedMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRatedMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        Loading rated movies...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">⭐ Rated Movies</h1>

        {ratedMovies.length === 0 ? (
          <p className="text-zinc-400">You haven't rated any movies yet.</p>
        ) : (
          <div className="grid md:grid-cols-4 gap-8">
            {ratedMovies.map((item) => {
              const imageUrl = item?.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image";

              return (
                <div
                  key={item.movie_id}
                  className="bg-zinc-800 rounded-xl p-4 hover:scale-105 transition cursor-pointer"
                  onClick={() => navigate(`/movie/${item.movie_id}`)}
                >
                  <img
                    src={imageUrl}
                    alt={item?.title || "Movie"}
                    className="rounded-lg mb-4 w-full aspect-[2/3] object-cover"
                  />

                  <h2 className="font-semibold mb-2 truncate">
                    {item?.title || "Untitled Movie"}
                  </h2>

                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        className={`w-4 h-4 ${
                          value <= (item?.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-zinc-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default RatedMovies;
