import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__logo">snowDREAM</h1>
      <nav className="header__nav">
        <NavLink to="/" className="header__link" >Home</NavLink>
        <NavLink to="locations" className="header__link">Locations</NavLink>
        <NavLink to="/login" className="header__link">Login</NavLink>
      </nav>
    </header>
  );
};

export default Header;
