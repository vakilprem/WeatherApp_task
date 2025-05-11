import { useSelector } from "react-redux";

const ForecastCard = () => {
  const { forecast } = useSelector((state) => state.weather);

  if (!forecast || forecast.length === 0) return null;

  const dailyForecast = forecast.filter((_, i) => i % 8 === 0);

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {dailyForecast.map((item) => (
          <div className="forecast-item" key={item.dt}>
            <h4 className="forecast-day">
              {new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}
            </h4>
            <img
              className="forecast-icon"
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
            <div className="forecast-temps">
              <span className="forecast-temp-high">{Math.round(item.main.temp)}°</span>
            </div>
            <p className="forecast-desc">{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;