import { useNavigate } from "react-router-dom";
import { OnboardingSteps } from "../components/onboarding/OnboardingSteps";
import { OnboardingProgress } from "../components/onboarding/OnboardingProgress";
import { useOnboarding } from "../hooks/useOnboarding";

export function Onboarding() {
  const navigate = useNavigate();
  const {
    currentStep,
    formData,
    setFormData,
    nextStep,
    prevStep,
    isLastStep,
    errors,
  } = useOnboarding();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      if (nextStep()) {
        // Submit data to backend
        console.log("Form submitted:", formData);
        navigate("/dashboard");
      }
    } else {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <OnboardingProgress currentStep={currentStep} />
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit}>
            <OnboardingSteps
              currentStep={currentStep}
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
            <div className="mt-8 flex justify-between">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="ml-auto px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isLastStep ? "Complete Profile" : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
