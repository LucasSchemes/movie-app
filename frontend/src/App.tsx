import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import RatedMovies from "./pages/RatedMovies";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/rated" element={<RatedMovies />} />
      </Routes>
    </div>
  );
}
