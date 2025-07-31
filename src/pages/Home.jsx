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
    navigate(`/search?state=${selectedState}&city=${selectedCity}`);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch}>
        <div id="state">
          <label>State:</label>
          <select onChange={handleStateChange} required>
            <option value="">Select</option>
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>
        </div>
        <div id="city">
          <label>City:</label>
          <select onChange={(e) => setSelectedCity(e.target.value)} required>
            <option value="">Select</option>
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </div>
        <button type="submit" id="searchBtn">Search</button>
      </form>
    </div>
  );
};

export default Home;
