import React from "react";

const EventCard = ({ event }) => {
  const handleBooking = () => {
    const newBooking = {
      ...event,
      date: new Date().toLocaleDateString(),
      time: "Evening",
    };

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    existing.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    alert("Event booked!");
  };

  return (
    <div className="event-card">
      <h3>{event.eventName}</h3>
      <p>{event.address}</p>
      <p>Rating: {event.rating}</p>
      <button onClick={handleBooking}>Book FREE Event</button>
    </div>
  );
};

export default EventCard;
