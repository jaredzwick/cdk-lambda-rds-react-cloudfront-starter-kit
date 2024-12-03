import React, { useState } from "react";
import { BookingCalendar } from "../components/bookings/BookingCalendar";
import { BookingTabs } from "../components/bookings/BookingTabs";
import { BookingList } from "../components/bookings/BookingList";

export function Bookings() {
  const [selectedTab, setSelectedTab] = useState<
    "pending" | "upcoming" | "past"
  >("upcoming");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          My Bookings
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookingTabs
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
            />
            <BookingList type={selectedTab} />
          </div>
          <div>
            <BookingCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}
