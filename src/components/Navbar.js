import { Link } from "react-router-dom";

export default function Navbar({ watchlist }) {
  return (
    <nav className="navbar">
      <div className="logo">Movie App</div>
      <div className="nav-right">
        <Link to="/watchlist">
          <button className="watchlist-btn">
            ❤️ Watchlist ({watchlist.length})
          </button>
        </Link>
      </div>
    </nav>
  );
}
