import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://eventdata.onrender.com/states")
      .then((res) => res.json())
      .then((data) => {
        setStates(data || []);
      })
      .catch((err) => console.error("Error fetching states:", err));
  }, []);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    fetch(`https://eventdata.onrender.com/cities/${state}`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data || []);
      })
      .catch((err) => console.error("Error fetching cities:", err));
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/search?state=${selectedState}&city=${selectedCity}`);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch}>
        <div id="state" className="dropdown">
          <label>State:</label>
          <div
            onClick={() => setShowStates(!showStates)}
            className="dropdown-label"
            data-testid="state-dropdown"
          >
            {selectedState || "Select State"}
          </div>

          <ul className="dropdown-list" style={{ display: showStates ? "block" : "none" }}>
            {states.map((state) => (
              <li
                key={state}
                onClick={() => {
                  handleStateSelect(state);
                  setShowStates(false);
                }}
              >
                {state}
              </li>
            ))}
          </ul>
        </div>

        <div id="city" className="dropdown">
          <label>City:</label>
          <div
            onClick={() => setShowCities(!showCities)}
            className="dropdown-label"
            data-testid="city-dropdown"
          >
            {selectedCity || "Select City"}
          </div>

          <ul className="dropdown-list" style={{ display: showCities ? "block" : "none" }}>
            {cities.map((city) => (
              <li
                key={city}
                onClick={() => {
                  handleCitySelect(city);
                  setShowCities(false);
                }}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" id="searchBtn">Search</button>
      </form>
    </div>
  );
};

export default Home;
