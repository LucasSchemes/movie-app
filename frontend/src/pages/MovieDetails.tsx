import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";
import { api } from "../services/api";
import { Star } from "lucide-react";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState<any[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movies/${id}`);
        setMovie(response.data);
        setCast(response.data.cast);
      } catch (error) {
        console.error("Erro ao buscar detalhes", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  // buscar avaliação
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await api.get(`/ratings/${id}`);
        if (response.data?.rating) {
          setRating(response.data.rating);
        }
      } catch (error) {
        console.error("Erro ao buscar rating", error);
      }
    };

    if (id) fetchRating();
  }, [id]);

  const handleRate = async (value: number) => {
    try {
      await api.post(`/ratings/${id}`, {
        rating: value,
        movie: movie,
      });
      setRating(value);
    } catch (error) {
      console.error("Erro ao salvar avaliação", error);
    }
  };

  const handleDeleteRating = async () => {
    try {
      await api.delete(`/ratings/${id}`);
      setRating(null);
    } catch (error) {
      console.error("Erro ao remover avaliação", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        Movie not found.
      </div>
    );
  }

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-red-500 hover:underline"
        >
          ← Return
        </button>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <img
            src={imageUrl}
            alt={movie.title}
            className="rounded-xl shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

            <p className="text-zinc-400 mb-2">
              ⭐ {(movie.vote_average / 2).toFixed(1)}
            </p>

            <p className="text-zinc-400 mb-4">{movie.release_date}</p>

            <p className="text-lg leading-relaxed text-zinc-300 mb-8">
              {movie.overview}
            </p>

            <h2 className="text-xl font-semibold mb-4">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {cast.map((actor) => (
                <div key={actor.id} className="text-sm text-zinc-400">
                  {actor.name}
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Rate this movie</h2>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => {
                  const isActive = value <= (hovered ?? rating ?? 0);

                  return (
                    <Star
                      key={value}
                      onClick={() => handleRate(value)}
                      onMouseEnter={() => setHovered(value)}
                      onMouseLeave={() => setHovered(null)}
                      className={`
                        w-9 h-9 cursor-pointer transition-all duration-200
                        ${
                          isActive
                            ? "fill-yellow-400 text-yellow-400 scale-110"
                            : "text-zinc-500 hover:text-yellow-300"
                        }
                      `}
                    />
                  );
                })}
              </div>

              {rating && (
                <>
                  <button
                    onClick={handleDeleteRating}
                    className="mt-2 text-sm text-red-400 hover:underline"
                  >
                    Delete Rating
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
