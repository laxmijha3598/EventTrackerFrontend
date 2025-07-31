import React, { useEffect, useState } from "react";
import BookingCard from "../components/BookingCard";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(data);
  }, []);

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking, index) => (
          <BookingCard key={index} booking={booking} />
        ))
      )}
    </div>
  );
};

export default MyBookings;
