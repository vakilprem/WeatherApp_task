// src/App.jsx
import { useTheme } from "./context/ThemeContext";
import Home from "./pages/Home";

function App() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <header className="app-header">
        <div className="header-container">
          <h1 className="app-title">Weather App 🌦️</h1>
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
          >
            Switch to {darkMode ? "Light ☀️" : "Dark 🌙"} Mode
          </button>
        </div>
      </header>

      <Home />
    </div>
  );
}

export default App;