import { FcSearch } from "react-icons/fc";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = ({ placeholder, onSelectRestaurant }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (value.trim()) {
      axios
        .get(`/search?query=${value}`)
        .then(response => setSuggestions(response.data))
        .catch(error => console.error('Error fetching search suggestions:', error));
    } else {
      setSuggestions([]);
    }
  }, [value]);

  const handleSuggestionClick = (restaurantId) => {
    onSelectRestaurant(restaurantId);
    setValue('');
    setSuggestions([]); 
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder || "Write the restaurant name here ..."}
      />
      <FcSearch className="search-icon" />

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion.resturents[0].resturentid)}
            >
              {suggestion.resturents[0].resturentName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
