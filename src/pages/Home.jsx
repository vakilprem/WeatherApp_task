import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";

const Home = () => {
  return (
    <div className="home">
      <SearchBar />
      <WeatherCard />
      <ForecastCard />
    </div>
  );
};

export default Home;
