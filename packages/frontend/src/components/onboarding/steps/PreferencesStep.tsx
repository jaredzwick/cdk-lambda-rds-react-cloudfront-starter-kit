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
      <h2 className="text-2xl font-bold text-gray-900">
        Who would you like to cuddle with?
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Select all that apply. You can always change this later.
      </p>
      <div className="mt-6 space-y-4">
        {preferenceOptions.map((option) => (
          <label
            key={option.value}
            className={`block relative rounded-lg border p-4 cursor-pointer hover:border-indigo-500 ${
              formData.preferences?.includes(option.value)
                ? "border-indigo-600 ring-2 ring-indigo-600"
                : "border-gray-300"
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
