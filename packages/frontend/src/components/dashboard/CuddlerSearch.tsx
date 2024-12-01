import React from "react";
import { Search, MapPin } from "lucide-react";

export function CuddlerSearch() {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search cuddlers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Location"
            defaultValue="New York, NY"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-500"
          />
          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
    </div>
  );
}
