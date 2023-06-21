import { NavLink } from "react-router-dom";
import { logOutHandler } from "../../utils/handlers";
import "./Header.scss";

const Header = ({ user, setUser }) => {
  return (
    <header className="header">
      <h1 className="header__logo">snowDREAM</h1>
      <nav className="header__nav">
        <NavLink to="/" className="header__link">
          Home
        </NavLink>
        <NavLink to="locations" className="header__link">
          Locations
        </NavLink>
        {!user ? (
          <NavLink to="/login" className="header__link">
            Login
          </NavLink>
        ) : (
          <a
            href="/"
            className="header__link"
            onClick={() => logOutHandler(setUser)}
          >
            Logout
          </a>
        )}
      </nav>
    </header>
  );
};

export default Header;
