import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import RatingCircle from "./RatingCircle";

export default function MovieCard({
  movie,
  addToWatchlist,
  removeFromWatchlist,
  isWatchlist = false,
}) {
  const [favorite, setFavorite] = useState(isWatchlist);

  useEffect(() => {
    setFavorite(Boolean(isWatchlist));
  }, [isWatchlist]);

  const toggleFavorite = () => {
    if (!favorite) {
      if (addToWatchlist) addToWatchlist(movie);
      setFavorite(true);
    } else {
      if (removeFromWatchlist) removeFromWatchlist(movie.id);
      setFavorite(false);
    }
  };

  const poster = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png";

  const releaseDate = movie?.release_date
    ? new Date(movie.release_date).toDateString()
    : "Unknown";

  const vote =
    typeof movie?.vote_average === "number"
      ? Math.round(movie.vote_average * 10)
      : 0;

  return (
    <div
      className="movie-card"
      style={{
        backgroundColor: "#f5f5f5", 
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <div className="poster-wrapper" style={{ position: "relative" }}>
        <Link to={`/movie/${movie.id}`}>
          <img
            src={poster}
            alt={movie?.title || "Untitled"}
            style={{ borderRadius: "10px" }}
          />
        </Link>
        <div style={{ position: "absolute", bottom: "1px", left: "5px" }}>
          <RatingCircle value={vote} />
        </div>
      </div>

      
      <h3
        style={{
          color: "#000",
          margin: "10px 0 5px 0",
          fontWeight: "bold",
        }}
      >
        {movie?.title || "Untitled"}
      </h3>

     
      <p
        style={{
          color: "#777",
          margin: "0 0 10px 0",
          fontSize: "0.9rem",
        }}
      >
        {releaseDate}
      </p>

      
      <div
        className="info-row"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        {(addToWatchlist || removeFromWatchlist) && (
          <button
            className={`fav-btn ${favorite ? "active" : ""}`}
            onClick={toggleFavorite}
          >
            {favorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        )}
      </div>
    </div>
  );
}












