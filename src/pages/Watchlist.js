import MovieCard from "../components/MovieCard";
import "../styles/watchlist.css";

export default function Watchlist({ watchlist, removeFromWatchlist }) { 
  return (
    <div className="watchlist-page">
      {watchlist.length === 0 ? (
        <div className="empty-center">
          <h2>Your Watchlist ❤️</h2>
          <p>No movies added yet.</p>
        </div>
      ) : (
        <div>
          <h2>Your Watchlist ❤️</h2>
          <div className="movies-grid">
            {watchlist.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                removeFromWatchlist={removeFromWatchlist} 
                isWatchlist={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}




