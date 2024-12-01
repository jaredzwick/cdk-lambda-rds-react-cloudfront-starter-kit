import React from "react";
import { Sliders, Users, Clock, DollarSign } from "lucide-react";

export function CuddlerFilters() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sliders className="h-5 w-5 text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender
        </label>
        <div className="space-y-2">
          {["Male", "Female", "Non-binary"].map((gender) => (
            <label key={gender} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Availability
        </label>
        <div className="space-y-2">
          {["Morning", "Afternoon", "Evening", "Weekend"].map((time) => (
            <label key={time} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">{time}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range (per hour)
        </label>
        <div className="space-y-4">
          <input
            type="range"
            min="20"
            max="200"
            step="10"
            defaultValue="60"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$20</span>
            <span>$200</span>
          </div>
        </div>
      </div>

      {/* Distance */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Distance
        </label>
        <select className="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
          <option>Within 5 miles</option>
          <option>Within 10 miles</option>
          <option>Within 25 miles</option>
          <option>Within 50 miles</option>
        </select>
      </div>
    </div>
  );
}
