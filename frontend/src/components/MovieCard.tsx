import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";

interface Props {
  movie: Movie;
}

export function MovieCard({ movie }: Props) {
  const navigate = useNavigate();

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="bg-zinc-800 rounded-xl overflow-hidden shadow-md hover:scale-105 hover:shadow-xl transition cursor-pointer"
    >
      <img
        src={imageUrl}
        alt={movie.title}
        className="w-full h-80 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>

        <p className="text-sm text-zinc-400">
          ⭐ {movie.vote_average.toPrecision(3)}
        </p>
      </div>
    </div>
  );
}
