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
      <h2 className="text-2xl font-bold text-gray-900">Set your hourly rate</h2>
      <p className="mt-2 text-sm text-gray-600">
        Choose a competitive rate. Most cuddlers charge between $40-100 per
        hour.
      </p>
      <div className="mt-6">
        <div className="relative">
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
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
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
              placeholder="60"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-gray-500 sm:text-sm ml-1">/hour</span>
            </div>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          <h3 className="text-sm font-medium text-gray-700">
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
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
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
