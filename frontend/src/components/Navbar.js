import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Cowbook</div>
      <div className="navbar-links">
        <Link to="/">Add Cow</Link>
        <Link to="/allcows">All Cows</Link>
      </div>
    </nav>
  );
}

export default Navbar;
