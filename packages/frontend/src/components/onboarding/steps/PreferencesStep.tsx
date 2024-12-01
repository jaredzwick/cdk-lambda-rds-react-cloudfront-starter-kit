import React from "react";
import { Users, Heart } from "lucide-react";
import { OnboardingFormData } from "../../../types/onboarding";
import { FemaleIcon, MaleIcon } from "../../icons/gender";

interface PreferencesStepProps {
  formData: OnboardingFormData;
  setFormData: (data: OnboardingFormData) => void;
  error?: string;
}

export function PreferencesStep({
  formData,
  setFormData,
  error,
}: PreferencesStepProps) {
  const preferenceOptions = [
    { value: "male", label: "Male", icon: MaleIcon },
    { value: "female", label: "Female", icon: FemaleIcon },
    { value: "non-binary", label: "Non-binary", icon: Users },
    { value: "any", label: "Any gender", icon: Heart },
  ];

  const handlePreferenceChange = (value: string) => {
    const currentPreferences = formData.preferences || [];
    const updatedPreferences = currentPreferences.includes(value)
      ? currentPreferences.filter((p) => p !== value)
      : [...currentPreferences, value];
    setFormData({ ...formData, preferences: updatedPreferences });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Who would you like to cuddle with?
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Select all that apply. You can always change this later.
      </p>
      <div className="mt-6 space-y-4">
        {preferenceOptions.map((option) => (
          <label
            key={option.value}
            className={`block relative rounded-lg border p-4 cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 dark:text-white ${
              formData.preferences?.includes(option.value)
                ? "border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-600 dark:ring-indigo-500"
                : "border-gray-300 dark:border-gray-600"
            } ${
              formData.preferences?.includes(option.value)
                ? "bg-indigo-50 dark:bg-indigo-900/50"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            <input
              type="checkbox"
              value={option.value}
              checked={formData.preferences?.includes(option.value)}
              onChange={() => handlePreferenceChange(option.value)}
              className="sr-only"
            />
            <div className="flex items-center">
              <option.icon
                className={`h-5 w-5 mr-3 ${
                  formData.preferences?.includes(option.value)
                    ? "text-indigo-600 dark:text-white"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  formData.preferences?.includes(option.value)
                    ? "text-indigo-600 dark:text-white"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {option.label}
              </span>
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
