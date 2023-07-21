import search from "../../assets/images/icons/search.svg";
import {searchHandler} from "../../utils/handlers";
import { SetString } from "../../types/types";
import "./Search.scss";

interface Props { 
  setSearchValue: SetString
}

const Search: React.FC<Props> = ({ setSearchValue }) => {
  return (
    <div className="search">
      <img src={search} alt="search" className="search__icon" />
      <input
        type="text"
        className="search__input"
        placeholder="Search"
        onChange={(e)=> searchHandler(e, setSearchValue)}
      ></input>
    </div>
  );
};

export default Search;
