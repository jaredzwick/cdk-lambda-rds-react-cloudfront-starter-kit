import React from "react";
import { Check } from "lucide-react";

const steps = ["Gender", "Preferences", "Rate", "Location"];

interface OnboardingProgressProps {
  currentStep: number;
}

export function OnboardingProgress({ currentStep }: OnboardingProgressProps) {
  return (
    <nav aria-label="Progress">
      {/* Desktop Progress Bar */}
      <ol className="hidden md:flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <li key={step} className="relative flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                index <= currentStep
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-full absolute left-0 top-4 -translate-y-1/2 transform ${
                  index < currentStep
                    ? "bg-indigo-600 dark:bg-indigo-500"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
                style={{ left: "100%", width: "calc(100% - 2rem)" }}
              />
            )}
          </li>
        ))}
      </ol>

      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {steps[currentStep]}
          </span>
        </div>
        <div className="overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </nav>
  );
}
