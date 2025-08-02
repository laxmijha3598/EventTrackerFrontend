import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [loadingStates, setLoadingStates] = useState(true);  // Loading state for states
  const [loadingCities, setLoadingCities] = useState(false);  // Loading state for cities
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch states and set loading to false once data is fetched
    fetch("https://eventdata.onrender.com/states")
      .then((res) => res.json())
      .then((data) => {
        setStates(data);
        setLoadingStates(false);
      })
      .catch((err) => {
        console.error("Error fetching states:", err);
        setLoadingStates(false);  // Stop loading even if there's an error
      });
  }, []);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setShowStates(false);
    setLoadingCities(true); // Start loading cities for the selected state

    fetch(`https://eventdata.onrender.com/cities/${state}`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        setLoadingCities(false); // Stop loading cities once fetched
      })
      .catch((err) => {
        console.error("Error fetching cities:", err);
        setLoadingCities(false); // Stop loading even if there's an error
      });
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
          <div
            onClick={() => setShowStates(!showStates)}
            className="dropdown-label"
            data-testid="state-dropdown"
          >
            {selectedState || "Select State"}
          </div>
          {showStates && (
            <ul className="dropdown-list" data-testid="state-options">
              {loadingStates ? (
                <li>Loading...</li> // Show loading state until data is fetched
              ) : (
                states.map((state) => (
                  <li
                    key={state}
                    onClick={() => handleStateSelect(state)}
                    data-testid={`state-option-${state}`}
                  >
                    {state}
                  </li>
                ))
              )}
            </ul>
          )}
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
          {showCities && (
            <ul className="dropdown-list" data-testid="city-options">
              {loadingCities ? (
                <li>Loading...</li> // Show loading state until cities are fetched
              ) : (
                cities.map((city) => (
                  <li
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    data-testid={`city-option-${city}`}
                  >
                    {city}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        <button type="submit" id="searchBtn" data-testid="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default Home;
