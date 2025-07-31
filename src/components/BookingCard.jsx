import React from "react";

const BookingCard = ({ booking }) => {
  return (
    <div className="booking-card">
      <h3>{booking.eventName}</h3>
      <p>{booking.address}</p>
      <p>{booking.city}, {booking.state}</p>
      <p>Date: {new Date(booking.bookingDate || booking.date).toLocaleDateString()}</p>
      <p>Time: {booking.bookingTime || booking.time}</p>
    </div>
  );
};

export default BookingCard;
