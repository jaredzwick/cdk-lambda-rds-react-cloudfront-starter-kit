import { useState } from "react";
import { OnboardingFormData } from "../types/onboarding";

export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<OnboardingFormData>({
    gender: "",
    preferences: [],
    rate: 60,
    location: "",
    maxDistance: 25,
  });

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    switch (step) {
      case 0:
        if (!formData.gender) {
          newErrors.gender = "Please select your gender";
        }
        break;
      case 1:
        if (!formData.preferences?.length) {
          newErrors.preferences = "Please select at least one preference";
        }
        break;
      case 2:
        if (!formData.rate || formData.rate < 20) {
          newErrors.rate = "Please set a valid rate (minimum $20/hour)";
        }
        break;
      case 3:
        if (!formData.location?.trim()) {
          newErrors.location = "Please enter your location";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      return true;
    }
    return false;
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const isLastStep = currentStep === 3;

  return {
    currentStep,
    formData,
    setFormData,
    nextStep,
    prevStep,
    isLastStep,
    errors,
  };
}
