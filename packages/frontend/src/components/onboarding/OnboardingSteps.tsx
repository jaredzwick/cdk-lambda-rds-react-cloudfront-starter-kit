import { GenderStep } from "./steps/GenderStep";
import { PreferencesStep } from "./steps/PreferencesStep";
import { RateStep } from "./steps/RateStep";
import { LocationStep } from "./steps/LocationStep";
import { OnboardingFormData } from "../../types/onboarding";

interface OnboardingStepsProps {
  currentStep: number;
  formData: OnboardingFormData;
  setFormData: (data: OnboardingFormData) => void;
  errors: { [key: string]: string };
}

export function OnboardingSteps({
  currentStep,
  formData,
  setFormData,
  errors,
}: OnboardingStepsProps) {
  const steps = [
    <GenderStep
      key="gender"
      formData={formData}
      setFormData={setFormData}
      error={errors.gender}
    />,
    <PreferencesStep
      key="preferences"
      formData={formData}
      setFormData={setFormData}
      error={errors.preferences}
    />,
    <RateStep
      key="rate"
      formData={formData}
      setFormData={setFormData}
      error={errors.rate}
    />,
    <LocationStep
      key="location"
      formData={formData}
      setFormData={setFormData}
      error={errors.location}
    />,
  ];

  return steps[currentStep];
}
