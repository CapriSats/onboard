
import React from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Progress } from "@/components/ui/progress";
import { Home, Settings, Book, Layout } from "lucide-react";
import DummyModeToggle from "./DummyModeToggle";

const OnboardingNavigation: React.FC = () => {
  const { currentStep, setCurrentStep } = useOnboarding();

  // Get progress percentage based on the current step
  const getProgressPercentage = () => {
    const steps = ["welcome", "prerequisites", "services", "guided"];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-xl text-black">Awesome AI</span>
          </div>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle() + (currentStep === "welcome" ? " bg-accent" : "")}
                  onClick={() => setCurrentStep("welcome")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Welcome
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle() + (currentStep === "prerequisites" ? " bg-accent" : "")}
                  onClick={() => setCurrentStep("prerequisites")}
                >
                  <Layout className="mr-2 h-4 w-4" />
                  Prerequisites
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle() + (currentStep === "services" ? " bg-accent" : "")}
                  onClick={() => setCurrentStep("services")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Services
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle() + (currentStep === "guided" ? " bg-accent" : "")}
                  onClick={() => setCurrentStep("guided")}
                >
                  <Book className="mr-2 h-4 w-4" />
                  Guide
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <DummyModeToggle />
        </div>

        {/* Progress bar showing onboarding completion */}
        <Progress value={getProgressPercentage()} className="h-1 mt-2" />
      </div>
    </header>
  );
};

export default OnboardingNavigation;
