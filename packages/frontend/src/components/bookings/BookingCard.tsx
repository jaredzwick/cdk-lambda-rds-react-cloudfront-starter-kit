import React from "react";
import { MapPin, Clock, Calendar, MessageSquare } from "lucide-react";

interface Booking {
  id: string;
  cuddler: {
    name: string;
    image: string;
  };
  date: string;
  time: string;
  duration: number;
  status: "pending" | "confirmed" | "completed";
  location: string;
}

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  const statusColors = {
    pending:
      "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-400",
    confirmed:
      "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400",
    completed: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={booking.cuddler.image}
            alt={booking.cuddler.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {booking.cuddler.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  statusColors[booking.status]
                }`}
              >
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
        <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
          <MessageSquare className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>{new Date(booking.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Clock className="h-4 w-4" />
          <span>
            {booking.time} ({booking.duration} hours)
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4" />
          <span>{booking.location}</span>
        </div>
      </div>

      {booking.status === "pending" && (
        <div className="mt-4 flex gap-3">
          <button className="flex-1 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-400">
            Accept
          </button>
          <button className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
            Decline
          </button>
        </div>
      )}
    </div>
  );
}
