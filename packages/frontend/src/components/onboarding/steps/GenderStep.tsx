import React from "react";
import { Users, HelpCircle } from "lucide-react";
import { OnboardingFormData } from "../../../types/onboarding";
import { FemaleIcon, MaleIcon } from "../../icons/gender";

interface GenderStepProps {
  formData: OnboardingFormData;
  setFormData: (data: OnboardingFormData) => void;
  error?: string;
}

export function GenderStep({ formData, setFormData, error }: GenderStepProps) {
  const genderOptions = [
    { value: "male", label: "Male", icon: MaleIcon },
    { value: "female", label: "Female", icon: FemaleIcon },
    { value: "non-binary", label: "Non-binary", icon: Users },
    { value: "no-preference", label: "No Preference", icon: HelpCircle },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        What's your gender?
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        This helps us create a more personalized experience for you.
      </p>
      <div className="mt-6 space-y-4">
        {genderOptions.map((option) => (
          <label
            key={option.value}
            className={`block relative rounded-lg border p-4 cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 ${
              formData.gender === option.value
                ? "border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-600 dark:ring-indigo-500"
                : "border-gray-300 dark:border-gray-600"
            } ${
              formData.gender === option.value
                ? "bg-indigo-50 dark:bg-indigo-900/50"
                : "bg-white dark:bg-gray-800"
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
            <div className="flex items-center">
              <option.icon
                className={`h-5 w-5 mr-3 ${
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
