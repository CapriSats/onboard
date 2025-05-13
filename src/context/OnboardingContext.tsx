
import React, { createContext, useContext, useState } from "react";

export type OnboardingStep = "welcome" | "prerequisites" | "services" | "guided";
export type ServiceStep = "s1" | "s2" | "s3" | "ready";

interface OnboardingContextType {
  currentStep: OnboardingStep;
  setCurrentStep: (step: OnboardingStep) => void;
  projectDescription: string;
  setProjectDescription: (description: string) => void;
  currentServiceStep: ServiceStep;
  setCurrentServiceStep: (step: ServiceStep) => void;
  isPaid: boolean;
  setIsPaid: (paid: boolean) => void;
  isDummyMode: boolean;
  setIsDummyMode: (isDummy: boolean) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [currentServiceStep, setCurrentServiceStep] = useState<ServiceStep>("s1");
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isDummyMode, setIsDummyMode] = useState<boolean>(false);

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        projectDescription,
        setProjectDescription,
        currentServiceStep,
        setCurrentServiceStep,
        isPaid,
        setIsPaid,
        isDummyMode,
        setIsDummyMode
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
