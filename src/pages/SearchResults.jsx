import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EventCard from "../components/EventCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const city = searchParams.get("city");
  const state = searchParams.get("state");

  useEffect(() => {
    fetch(`https://eventdata.onrender.com/events?state=${state}&city=${city}`)
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, [state, city]);

  return (
    <div className="search-results">
      <h1>{events.length} events available in {city}</h1>
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default SearchResults;
