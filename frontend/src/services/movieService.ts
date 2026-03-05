import { api } from "./api";
import type { Movie } from "../types/movie";

export type SearchResponse = {
  page: number;
  total_pages: number;
  results: Movie[];
};

export async function searchMovies(q: string, page = 1, year?: string) {
  const params: Record<string, string | number> = { q, page };

  if (year && year.trim() !== "") {
    params.year = year.trim();
  }

  const res = await api.get("/movies/search", { params });

  if (Array.isArray(res.data)) {
    return {
      page,
      total_pages: 1,
      results: res.data as Movie[],
    };
  }

  return {
    page: res.data.page ?? page,
    total_pages: res.data.total_pages ?? 1,
    results: res.data.results ?? [],
  };
}
