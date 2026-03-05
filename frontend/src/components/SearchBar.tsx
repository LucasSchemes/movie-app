import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl gap-3">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-3 rounded-lg text-black outline-none focus:ring-2 focus:ring-red-600"
      />

      <button
        type="submit"
        className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold"
      >
        Search
      </button>
    </form>
  );
}
