import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import MovieDetails from "./pages/MovieDetails";
import "./App.css";

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (movie) => {
    if (!watchlist.find((m) => m.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((m) => m.id !== id));
  };

  return (
    <Router>
      <Navbar watchlist={watchlist} />
      <Routes>
        <Route path="/" element={<Home addToWatchlist={addToWatchlist} />} />
        <Route
          path="/movie/:id"
          element={<MovieDetails addToWatchlist={addToWatchlist} />}
        />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              watchlist={watchlist}
              removeFromWatchlist={removeFromWatchlist}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;






