import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentWeather, fetchForecast } from '../redux/wetherSlice';
import { FiSearch } from 'react-icons/fi';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (!city.trim()) return;
    dispatch(fetchCurrentWeather(city));
    dispatch(fetchForecast(city));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input
          type="text"
          value={city}
          placeholder="Search for a city..."
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;