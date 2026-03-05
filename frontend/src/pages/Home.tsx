import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { MovieCard } from "../components/MovieCard";
import { searchMovies } from "../services/movieService";
import type { Movie } from "../types/movie";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [year, setYear] = useState(searchParams.get("year") || "");

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const performSearch = async (
    searchQuery: string,
    searchYear: string,
    searchPage: number,
    isLoadMore: boolean,
  ) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const data = await searchMovies(searchQuery, searchPage, searchYear);
      const newResults = data.results ?? [];

      if (isLoadMore) {
        setMovies((prev) => [...prev, ...newResults]);
      } else {
        setMovies(newResults);
        setHasSearched(true);
      }
      setTotalPages(data.total_pages ?? 1);
      setPage(searchPage);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const q = searchParams.get("q");
    const y = searchParams.get("year") || "";

    if (q) {
      setQuery(q);
      setYear(y);
      performSearch(q, y, 1, false);
    }
  }, [searchParams]);
  const handleSearch = (q: string) => {
    const trimmedYear = year.trim();

    if (
      trimmedYear !== "" &&
      (trimmedYear.length !== 4 || isNaN(Number(trimmedYear)))
    ) {
      alert("Please enter a valid year (e.g., 2023)");
      return;
    }

    setSearchParams({ q, year: trimmedYear });
  };

  const handleLoadMore = () => {
    if (loading || page >= totalPages) return;
    performSearch(query, year, page + 1, true);
  };

  const handleYearKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  };

  const canLoadMore = page < totalPages;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Search movies</h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <SearchBar onSearch={handleSearch} />

          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onKeyDown={handleYearKeyDown}
            placeholder="Year (e.g. 1994)"
            inputMode="numeric"
            className="w-full sm:w-44 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
          />
        </div>

        {loading && movies.length === 0 && (
          <div className="flex justify-center mt-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-600"></div>
            <p className="ml-3">Loading movies...</p>
          </div>
        )}

        {!loading && hasSearched && movies.length === 0 && (
          <p className="text-center mt-12 text-zinc-400">
            No movies found for this search.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {movies.map((movie, index) => (
            <MovieCard key={`${movie.id}-${index}`} movie={movie} />
          ))}
        </div>

        {canLoadMore && movies.length > 0 && (
          <div className="flex flex-col items-center mt-12 gap-4">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-red-600 hover:bg-red-500 px-8 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95"
            >
              {loading ? "Loading..." : "Load more"}
            </button>

            <p className="text-sm text-zinc-500">
              Page {page} of {totalPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
