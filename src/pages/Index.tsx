
import React from "react";
import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";
import WelcomePage from "@/components/WelcomePage";
import PrerequisitesPage from "@/components/PrerequisitesPage";
import ServicesPage from "@/components/ServicesPage";
import GuidedActivityPage from "@/components/GuidedActivityPage";
import OnboardingNavigation from "@/components/OnboardingNavigation";
import DummyWalkthrough from "@/components/DummyWalkthrough";

const OnboardingFlow: React.FC = () => {
  const { currentStep, isDummyMode } = useOnboarding();
  
  if (isDummyMode) {
    return (
      <div className="flex-1 w-full px-4 py-8">
        <DummyWalkthrough />
      </div>
    );
  }
  
  return (
    <div className="flex-1 w-full px-4 py-4">
      {currentStep === "welcome" && <WelcomePage />}
      {currentStep === "prerequisites" && <PrerequisitesPage />}
      {currentStep === "services" && <ServicesPage />}
      {currentStep === "guided" && <GuidedActivityPage />}
    </div>
  );
};

const Index = () => {
  return (
    <OnboardingProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <OnboardingNavigation />
        <OnboardingFlow />
      </div>
    </OnboardingProvider>
  );
};

export default Index;
