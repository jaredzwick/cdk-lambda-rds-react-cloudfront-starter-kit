import React from "react";
import { MapPin, Navigation } from "lucide-react";
import { OnboardingFormData } from "../../../types/onboarding";

interface LocationStepProps {
  formData: OnboardingFormData;
  setFormData: (data: OnboardingFormData) => void;
  error?: string;
}

export function LocationStep({
  formData,
  setFormData,
  error,
}: LocationStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Where are you located?
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Enter your location and maximum travel distance.
      </p>
      <div className="mt-6 space-y-6">
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Location
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              id="location"
              value={formData.location || ""}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className={`block w-full rounded-md pl-10 focus:ring-indigo-500 focus:border-indigo-500 ${
                error
                  ? "border-red-300 dark:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
              placeholder="Enter your city"
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="distance"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Maximum travel distance
            </label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formData.maxDistance} miles
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
                type="range"
                id="distance"
                min="1"
                max="100"
                value={formData.maxDistance || 25}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxDistance: Number(e.target.value),
                  })
                }
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>1 mile</span>
              <span>50 miles</span>
              <span>100 miles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
