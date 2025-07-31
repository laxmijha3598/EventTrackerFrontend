import React, { useState } from "react";

const EventCard = ({ event }) => {
  const [showBookingOptions, setShowBookingOptions] = useState(false);

  const handleBookingClick = () => {
    setShowBookingOptions(true);
  };

  const handleConfirmBooking = (time) => {
    const newBooking = {
      ...event,
      date: new Date().toISOString(),
      time,
    };

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    existing.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    alert("Event booked!");
    setShowBookingOptions(false);
  };

  return (
    <div className="event-card">
      <h3>{event.eventName}</h3>
      <p>{event.address}</p>
      <p>Rating: {event.rating}</p>
      <button onClick={handleBookingClick}>Book FREE Event</button>

      {showBookingOptions && (
        <div className="booking-options">
          <p>Today</p>
          <p onClick={() => handleConfirmBooking("Morning")}>Morning</p>
          <p onClick={() => handleConfirmBooking("Afternoon")}>Afternoon</p>
          <p onClick={() => handleConfirmBooking("Evening")}>Evening</p>
        </div>
      )}
    </div>
  );
};

export default EventCard;
