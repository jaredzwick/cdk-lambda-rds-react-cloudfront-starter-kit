import React from "react";
import { BookingCard } from "./BookingCard";
import { bookings, Booking } from "../../data/bookings";

interface BookingListProps {
  type: "pending" | "upcoming" | "past";
}

const filterBookings = (type: BookingListProps["type"]): Booking[] => {
  const today = new Date();
  return bookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    switch (type) {
      case "pending":
        return booking.status === "pending";
      case "upcoming":
        return booking.status === "confirmed" && bookingDate >= today;
      case "past":
        return booking.status === "completed" || bookingDate < today;
      default:
        return false;
    }
  });
};

export function BookingList({ type }: BookingListProps) {
  const filteredBookings = filterBookings(type);

  return (
    <div className="space-y-4 mt-6">
      {filteredBookings.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No {type} bookings</p>
        </div>
      ) : (
        filteredBookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))
      )}
    </div>
  );
}
