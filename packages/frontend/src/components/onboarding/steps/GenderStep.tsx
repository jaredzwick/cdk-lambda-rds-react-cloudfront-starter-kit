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
      <h2 className="text-2xl font-bold text-gray-900">What's your gender?</h2>
      <p className="mt-2 text-sm text-gray-600">
        This helps us create a more personalized experience for you.
      </p>
      <div className="mt-6 space-y-4">
        {genderOptions.map((option) => (
          <label
            key={option.value}
            className={`block relative rounded-lg border p-4 cursor-pointer hover:border-indigo-500 ${
              formData.gender === option.value
                ? "border-indigo-600 ring-2 ring-indigo-600"
                : "border-gray-300"
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
              <option.icon className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm font-medium text-gray-900">
                {option.label}
              </span>
            </div>
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
