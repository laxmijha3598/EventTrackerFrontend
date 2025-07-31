import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://eventdata.onrender.com/states")
      .then((res) => res.json())
      .then((data) => setStates(data));
  }, []);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    fetch(`https://eventdata.onrender.com/cities/${state}`)
      .then((res) => res.json())
      .then((data) => setCities(data));
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
        <div id="state">
          <label htmlFor="state-select">State:</label>
          <select
            id="state-select"
            data-testid="state-select"
            onChange={handleStateChange}
            value={selectedState}
            required
          >
            <option value="">Select</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div id="city">
          <label htmlFor="city-select">City:</label>
          <select
            id="city-select"
            data-testid="city-select"
            onChange={(e) => setSelectedCity(e.target.value)}
            value={selectedCity}
            required
          >
            <option value="">Select</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" id="searchBtn">Search</button>
      </form>
    </div>
  );
};

export default Home;
