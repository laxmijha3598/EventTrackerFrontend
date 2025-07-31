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
      .then((data) => setStates(data));
  }, []);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setShowStates(false);
    fetch(`https://eventdata.onrender.com/cities/${state}`)
      .then((res) => res.json())
      .then((data) => setCities(data));
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowCities(false);
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
          <div onClick={() => setShowStates(!showStates)} className="dropdown-label">
            {selectedState || "Select State"}
          </div>
          {showStates && (
            <ul className="dropdown-options">
              {states.map((state) => (
                <li key={state} onClick={() => handleStateSelect(state)}>
                  {state}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div id="city" className="dropdown">
          <label>City:</label>
          <div onClick={() => setShowCities(!showCities)} className="dropdown-label">
            {selectedCity || "Select City"}
          </div>
          {showCities && (
            <ul className="dropdown-options">
              {cities.map((city) => (
                <li key={city} onClick={() => handleCitySelect(city)}>
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" id="searchBtn">Search</button>
      </form>
    </div>
  );
};

export default Home;
