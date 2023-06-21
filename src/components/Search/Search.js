import search from "../../assets/images/icons/search.svg";
import "./Search.scss";

const Search = ({ searchHandler}) => {
  return (
    <div className="search">
      <img src={search} alt="search" className="search__icon" />
      <input
        type="text"
        className="search__input"
        placeholder="Search"
        onChange={searchHandler}
      ></input>
    </div>
  );
};

export default Search;
