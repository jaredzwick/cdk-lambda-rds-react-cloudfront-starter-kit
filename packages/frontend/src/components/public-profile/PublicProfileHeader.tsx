import React from "react";
import { MapPin, Shield, Star } from "lucide-react";

export function PublicProfileHeader() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:items-start sm:gap-6">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sarah Johnson
            </h1>
            <Shield className="h-5 w-5 text-green-500" />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              New York, NY
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
              4.9 (128 reviews)
            </div>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Professional cuddler with 3+ years of experience providing comfort
            and companionship.
          </p>
        </div>
        <div className="hidden sm:block">
          <button className="whitespace-nowrap px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-400">
            Book Session
          </button>
        </div>
      </div>
      {/* Mobile booking button */}
      <div className="mt-6 sm:hidden">
        <button className="w-full px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-400">
          Book Session
        </button>
      </div>
    </div>
  );
}
