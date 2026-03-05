import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-white cursor-pointer"
        >
          🎬 MovieApp
        </h1>

        <nav className="flex gap-6">
          <button
            onClick={() => navigate("/")}
            className="text-zinc-300 hover:text-gray-400 transition"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/rated")}
            className="text-zinc-300 hover:text-yellow-400 transition"
          >
            Rated Movies
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
