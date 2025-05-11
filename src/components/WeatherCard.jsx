import { useState } from 'react';
import { useSelector } from 'react-redux';
import { WiHumidity, WiStrongWind, WiBarometer } from 'react-icons/wi';
import { FiSunrise, FiSunset } from 'react-icons/fi';

const WeatherCard = () => {
  const [unit, setUnit] = useState('C');
  const { current, loading, error } = useSelector((state) => state.weather);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const convertTemp = (temp) => {
    if (unit === 'F') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!current) return <div className="welcome-message">Search for a city to see weather</div>;

  return (
    <div className="weather-card">
      <div className="temp-toggle">
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            checked={unit === 'F'} 
            onChange={() => setUnit(unit === 'C' ? 'F' : 'C')}
          />
          <span className="toggle-slider"></span>
          <div className="toggle-labels">
            <span>°C</span>
            <span>°F</span>
          </div>
        </label>
      </div>

      <div className="weather-header">
        <h2 className="weather-location">{current.name}</h2>
        <p className="weather-date">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
        <p className="weather-desc">{current.weather[0].description}</p>
      </div>
      
      <div className="weather-main">
        <div className="temp-container">
          <div className="current-temp">
            <span className="temp-value">{convertTemp(current.main.temp)}</span>
            <span className="temp-unit">°{unit}</span>
          </div>
          <div className="temp-range">
            <span className="temp-max">↑ {convertTemp(current.main.temp_max)}°</span>
            <span className="temp-min">↓ {convertTemp(current.main.temp_min)}°</span>
          </div>
        </div>
        
        <div className="weather-icon-container">
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
            alt={current.weather[0].description}
          />
        </div>
      </div>

      <p className="feels-like">Feels like {convertTemp(current.main.feels_like)}°{unit}</p>
      
      <div className="weather-details-grid">
        <div className="detail-card">
          <WiHumidity className="detail-icon" />
          <div>
            <p className="detail-value">{current.main.humidity}%</p>
            <p className="detail-label">Humidity</p>
          </div>
        </div>
        
        <div className="detail-card">
          <WiStrongWind className="detail-icon" />
          <div>
            <p className="detail-value">{current.wind.speed} m/s</p>
            <p className="detail-label">Wind</p>
          </div>
        </div>
        
        <div className="detail-card">
          <WiBarometer className="detail-icon" />
          <div>
            <p className="detail-value">{current.main.pressure} hPa</p>
            <p className="detail-label">Pressure</p>
          </div>
        </div>
        
        <div className="detail-card">
          <FiSunrise className="detail-icon" />
          <div>
            <p className="detail-value">{formatTime(current.sys.sunrise)}</p>
            <p className="detail-label">Sunrise</p>
          </div>
        </div>
        
        <div className="detail-card">
          <FiSunset className="detail-icon" />
          <div>
            <p className="detail-value">{formatTime(current.sys.sunset)}</p>
            <p className="detail-label">Sunset</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;