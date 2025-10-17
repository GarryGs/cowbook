import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          🐄 Cowbook
        </Link>
        {user && <Link to="/allcows" className="nav-link">My Cows</Link>}
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="user-greet">Hello, {user.name}</span>
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn login-btn">Login</Link>
            <Link to="/register" className="btn register-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
