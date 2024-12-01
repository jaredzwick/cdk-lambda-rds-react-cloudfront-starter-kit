import React, { useState } from "react";
import {
  Users,
  HelpCircle,
  MapPin,
  DollarSign,
  Navigation,
} from "lucide-react";
import { OnboardingFormData } from "../../types/onboarding";
import { FemaleIcon, MaleIcon } from "../icons/gender";

export function ProfileForm() {
  const [formData, setFormData] = useState<OnboardingFormData>({
    gender: "female",
    preferences: ["male", "female"],
    rate: 60,
    location: "New York, NY",
    maxDistance: 25,
  });

  const genderOptions = [
    { value: "male", label: "Male", icon: MaleIcon },
    { value: "female", label: "Female", icon: FemaleIcon },
    { value: "non-binary", label: "Non-binary", icon: Users },
    { value: "no-preference", label: "No Preference", icon: HelpCircle },
  ];

  const handlePreferenceChange = (value: string) => {
    const currentPreferences = formData.preferences || [];
    const updatedPreferences = currentPreferences.includes(value)
      ? currentPreferences.filter((p) => p !== value)
      : [...currentPreferences, value];
    setFormData({ ...formData, preferences: updatedPreferences });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Profile Information
      </h2>

      <div className="space-y-6">
        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-3">
            {genderOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-3 rounded-lg border cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 ${
                  formData.gender === option.value
                    ? "border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-600 dark:ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/50"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={option.value}
                  checked={formData.gender === option.value}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="sr-only"
                />
                <option.icon
                  className={`h-5 w-5 mr-2 ${
                    formData.gender === option.value
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    formData.gender === option.value
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cuddle Preferences
          </label>
          <div className="grid grid-cols-2 gap-3">
            {genderOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-3 rounded-lg border cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 ${
                  formData.preferences?.includes(option.value)
                    ? "border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-600 dark:ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/50"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                }`}
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={formData.preferences?.includes(option.value)}
                  onChange={() => handlePreferenceChange(option.value)}
                  className="sr-only"
                />
                <option.icon
                  className={`h-5 w-5 mr-2 ${
                    formData.preferences?.includes(option.value)
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    formData.preferences?.includes(option.value)
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Hourly Rate
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <DollarSign className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="number"
              min="20"
              step="5"
              value={formData.rate}
              onChange={(e) =>
                setFormData({ ...formData, rate: Number(e.target.value) })
              }
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 pl-10 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 pl-10 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Max Distance */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Maximum Travel Distance
            </label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formData.maxDistance} miles
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            <input
              type="range"
              min="1"
              max="100"
              value={formData.maxDistance}
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

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
