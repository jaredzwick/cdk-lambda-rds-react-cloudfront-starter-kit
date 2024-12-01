import React from "react";
import { Users, Heart, Navigation } from "lucide-react";

export function PublicProfileInfo() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        About Sarah
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        I'm a certified professional cuddler passionate about providing platonic
        comfort and support. I create a safe, nurturing space where you can
        relax and feel understood. Whether you're dealing with stress,
        loneliness, or just need human connection, I'm here to help.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium mb-2">
            <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Gender & Preferences
          </div>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <p>Female</p>
            <p>Open to cuddling: All genders</p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium mb-2">
            <Heart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Session Rate
          </div>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <p>$60 per hour</p>
            <p>2-hour minimum</p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium mb-2">
            <Navigation className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Location & Travel
          </div>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <p>Based in New York, NY</p>
            <p>Travels up to 25 miles</p>
          </div>
        </div>
      </div>
    </div>
  );
}
