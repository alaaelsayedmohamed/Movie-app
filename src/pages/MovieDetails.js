import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RatingCircle from "../components/RatingCircle";
import MovieCard from "../components/MovieCard";
import "../styles/MovieDetails.css";

const API_KEY = "3efb676a06eeac70ff18f5076611adab";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=recommendations`
      );
      setMovie(res.data);
      setRecommendations(res.data.recommendations.results || []);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p style={{ textAlign: "center" }}>Loading...</p>;

  const poster = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png";

  const release = movie?.release_date
    ? new Date(movie.release_date).toDateString()
    : "Unknown";

  const vote =
    typeof movie?.vote_average === "number"
      ? Math.round(movie.vote_average * 10)
      : 0;

  return (
    <div className="movie-details">
      {/* الجزء العلوي - البوستر + التفاصيل */}
      <div className="details-top">
        <div className="poster">
          <img src={poster} alt={movie.title} />
        </div>

        <div className="info">
          <h1>{movie.title}</h1>
          <p className="release">{release}</p>

          <div className="rating">
            <RatingCircle value={vote} />
            <span className="score">{movie.vote_average} / 10</span>
          </div>

          <p className="overview">{movie.overview}</p>

          <div className="genres">
            {movie.genres &&
              movie.genres.map((g) => (
                <span key={g.id} className="genre">
                  {g.name}
                </span>
              ))}
          </div>

          <p>
            <b>Duration:</b> {movie.runtime} min
          </p>
          <p>
            <b>Language:</b> {movie.original_language.toUpperCase()}
          </p>

          {movie.production_companies?.[0] && (
            <div className="studio">
              <b>Studio:</b> {movie.production_companies[0].name}
            </div>
          )}

          {movie.homepage && (
            <a href={movie.homepage} target="_blank" rel="noreferrer" className="website-btn">
              Website
            </a>
          )}
        </div>
      </div>

      {/* الجزء السفلي - Recommendations */}
      <div className="recommendations">
        <h2>Recommendations</h2>
        <div className="movies-grid">
          {recommendations.map((rec) => (
            <MovieCard key={rec.id} movie={rec} />
          ))}
        </div>
      </div>
    </div>
  );
}




