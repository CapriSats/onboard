
import React from "react";
import { cn } from "@/lib/utils";
import { useOnboarding, ServiceStep } from "@/context/OnboardingContext";

interface ProgressIndicatorProps {
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ className }) => {
  const { currentServiceStep, setCurrentServiceStep } = useOnboarding();
  
  const steps: { id: ServiceStep; label: string }[] = [
    { id: "s1", label: "S/C One" },
    { id: "s2", label: "S/C Two" },
    { id: "s3", label: "S/C 3" },
    { id: "ready", label: "Ready" }
  ];
  
  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex justify-between items-center">
        {/* Progress Line */}
        <div className="absolute left-0 right-0 h-px bg-gray-300" />
        
        {/* Steps */}
        {steps.map((step, index) => {
          const isActive = currentServiceStep === step.id;
          const isPast = steps.findIndex(s => s.id === currentServiceStep) > index;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              {/* Step Circle */}
              <div 
                className={cn(
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                  isActive 
                    ? "bg-brand-blue border-brand-blue" 
                    : isPast 
                      ? "bg-gray-400 border-gray-400" 
                      : "bg-white border-gray-300"
                )}
                onClick={() => setCurrentServiceStep(step.id)}
              />
              
              {/* Step Label */}
              <span 
                className={cn(
                  "mt-2 text-sm",
                  isActive 
                    ? "text-brand-blue font-medium" 
                    : "text-gray-500"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
