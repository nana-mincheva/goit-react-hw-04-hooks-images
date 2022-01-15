import "./Searchbar.css";
import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { ImSearch } from "react-icons/im";
import "react-toastify/dist/ReactToastify.css";

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      toast("Please enter search query");
      return;
    }
    onSubmit(searchQuery);
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button
          type="button"
          className="SearchForm-button"
          onClick={handleSubmit}
        >
          <ImSearch />
          <span className="SearchForm-button-label">Search</span>
        </button>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};