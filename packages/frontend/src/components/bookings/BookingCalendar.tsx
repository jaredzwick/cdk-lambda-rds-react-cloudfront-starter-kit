import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { bookings } from "../../data/bookings";

export function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
    setSelectedDay(null);
  };

  const getBookingsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return bookings.filter((booking) => booking.date === dateStr);
  };

  const statusColors = {
    pending:
      "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-400",
    confirmed:
      "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400",
    completed: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <div key={`empty-${index}`} className="h-24 rounded-lg" />
        ))}
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const isToday =
            new Date().getDate() === day &&
            new Date().getMonth() === currentDate.getMonth() &&
            new Date().getFullYear() === currentDate.getFullYear();
          const dayBookings = getBookingsForDay(day);
          const isSelected = selectedDay === day;

          return (
            <div
              key={day}
              onClick={() => setSelectedDay(isSelected ? null : day)}
              className={`h-24 p-2 rounded-lg border border-transparent transition-colors
                ${
                  isToday
                    ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800"
                    : ""
                }
                ${isSelected ? "border-indigo-500 dark:border-indigo-400" : ""}
                ${
                  dayBookings.length > 0
                    ? "cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-600"
                    : ""
                }
                ${
                  !isToday && !isSelected
                    ? "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    : ""
                }
              `}
            >
              <div
                className={`text-sm font-medium mb-1
                ${
                  isToday
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-900 dark:text-white"
                }
              `}
              >
                {day}
              </div>
              {dayBookings.map(
                (booking, i) =>
                  i < 2 && (
                    <div
                      key={booking.id}
                      className={`text-xs px-1.5 py-0.5 rounded-full mb-1 ${
                        statusColors[booking.status]
                      }`}
                    >
                      {booking.time} - {booking.cuddler.name}
                    </div>
                  )
              )}
              {dayBookings.length > 2 && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  +{dayBookings.length - 2} more
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDay && (
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Bookings for {monthNames[currentDate.getMonth()]} {selectedDay}
          </h3>
          <div className="space-y-3">
            {getBookingsForDay(selectedDay).map((booking) => (
              <div
                key={booking.id}
                className="flex items-start gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
              >
                <img
                  src={booking.cuddler.image}
                  alt={booking.cuddler.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {booking.cuddler.name}
                    </h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        statusColors[booking.status]
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {booking.time} ({booking.duration}h)
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {booking.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
