import { React, useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

export default function Home({ addToWatchlist }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState(""); 
  const [isSearching, setIsSearching] = useState(false); 

 
  const fetchMovies = async () => {
    try {
      const url = isSearching && searchText
        ? `https://api.themoviedb.org/3/search/movie?api_key=3efb676a06eeac70ff18f5076611adab&query=${searchText}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=3efb676a06eeac70ff18f5076611adab&page=${page}`;

      const res = await axios.get(url);
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages || 1);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [page]);
  useEffect(() => {
  fetchMovies();
}, [fetchMovies]);

 
  const handleSearch = () => {
    setIsSearching(true);
    setPage(1); 
    fetchMovies();
  };

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to our movie app</h1>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>
        <input
          type="text"
          placeholder="Search and explore..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </section>

      <h2>{isSearching && searchText ? `Search Results for "${searchText}"` : "Popular Movies"}</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            addToWatchlist={addToWatchlist}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}





