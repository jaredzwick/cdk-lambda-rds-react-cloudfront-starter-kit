import React from "react";
import { DollarSign, Sparkles, Clock } from "lucide-react";
import { OnboardingFormData } from "../../../types/onboarding";

interface RateStepProps {
  formData: OnboardingFormData;
  setFormData: (data: OnboardingFormData) => void;
  error?: string;
}

export function RateStep({ formData, setFormData, error }: RateStepProps) {
  const suggestedRates = [40, 60, 80, 100];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Set your hourly rate
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Choose a competitive rate. Most cuddlers charge between $40-100 per
        hour.
      </p>
      <div className="mt-6">
        <div className="relative">
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <DollarSign className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="number"
              min="20"
              step="5"
              value={formData.rate || ""}
              onChange={(e) =>
                setFormData({ ...formData, rate: Number(e.target.value) })
              }
              className={`block w-full rounded-md pl-10 pr-12 text-lg ${
                error
                  ? "border-red-300 dark:border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
              } dark:bg-gray-700 dark:text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              placeholder="60"
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, rate: (formData.rate || 0) + 5 })
                  }
                  className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 border-l border-gray-300 dark:border-gray-600"
                >
                  <span className="sr-only">Increase</span>
                  <svg
                    className="w-2.5 h-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 8"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      rate: Math.max((formData.rate || 0) - 5, 20),
                    })
                  }
                  className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 border-l border-t border-gray-300 dark:border-gray-600"
                >
                  <span className="sr-only">Decrease</span>
                  <svg
                    className="w-2.5 h-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 8"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-12 flex items-center pr-3">
              <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm ml-1">
                /hour
              </span>
            </div>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Suggested rates in your area:
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {suggestedRates.map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => setFormData({ ...formData, rate })}
              className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm ${
                formData.rate === rate
                  ? "bg-indigo-600 dark:bg-indigo-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <DollarSign className="h-4 w-4 mr-1" />
              {rate}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
