import React from "react";

const BookingCard = ({ booking }) => {
  return (
    <div className="booking-card">
      <h3>{booking.eventName}</h3>
      <p>{booking.address}</p>
      <p>{booking.city}, {booking.state}</p>
      <p>Date: {booking.date}</p>
      <p>Time: {booking.time}</p>
    </div>
  );
};

export default BookingCard;
