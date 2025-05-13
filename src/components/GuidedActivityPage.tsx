
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PageContainer from "./PageContainer";
import ProgressIndicator from "./ProgressIndicator";
import { useOnboarding, ServiceStep } from "@/context/OnboardingContext";
import { ChevronLeft, ChevronRight, Code } from "lucide-react";
import { mockApiServices, GuidedStep } from "@/services/mockServices";
import { useToast } from "@/hooks/use-toast";

const GuidedActivityPage: React.FC = () => {
  const { currentServiceStep, setCurrentServiceStep, setCurrentStep } = useOnboarding();
  const [currentStepData, setCurrentStepData] = useState<GuidedStep | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Fetch current step data when component mounts or step changes
    const fetchStepData = async () => {
      setIsLoading(true);
      try {
        const stepData = await mockApiServices.getGuidedStep(currentServiceStep);
        setCurrentStepData(stepData);
      } catch (error) {
        console.error("Error fetching guided step data:", error);
        toast({
          title: "Error",
          description: "Failed to load step information",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStepData();
  }, [currentServiceStep, toast]);
  
  const handleNext = () => {
    const steps: ServiceStep[] = ["s1", "s2", "s3", "ready"];
    const currentIndex = steps.indexOf(currentServiceStep);
    if (currentIndex < steps.length - 1) {
      setCurrentServiceStep(steps[currentIndex + 1]);
    }
  };
  
  const handlePrev = () => {
    const steps: ServiceStep[] = ["s1", "s2", "s3", "ready"];
    const currentIndex = steps.indexOf(currentServiceStep);
    if (currentIndex > 0) {
      setCurrentServiceStep(steps[currentIndex - 1]);
    }
  };
  
  return (
    <PageContainer title="Steps - Guided Activity">
      <div className="mb-8">
        <ProgressIndicator className="mb-4" />
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : (
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">{currentStepData?.title || "Loading..."}</h1>
          <p className="text-muted-foreground mb-8">{currentStepData?.content || "Loading content..."}</p>
          
          {currentStepData?.instructions && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Instructions</h2>
              <div className="bg-muted/20 p-4 rounded-md">
                {currentStepData.instructions}
              </div>
            </div>
          )}
          
          {currentStepData?.codeSnippet && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <Code className="mr-2 h-5 w-5" />
                Code Example
              </h2>
              <div className="bg-black text-white p-4 rounded-md overflow-x-auto">
                <pre><code>{currentStepData.codeSnippet}</code></pre>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-8 pt-6 border-t flex justify-between">
        <div className="flex space-x-3">
          {/* Back to Services option */}
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep("services")}
            className="flex items-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
          
          {/* Previous step within guided activity */}
          <Button 
            variant="outline" 
            onClick={handlePrev}
            disabled={currentServiceStep === "s1" || isLoading}
            className="flex items-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous Step
          </Button>
        </div>
        
        <Button 
          onClick={handleNext}
          disabled={currentServiceStep === "ready" || isLoading}
          className="flex items-center"
        >
          {currentServiceStep === "s3" ? "Finish" : "Next Step"}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </PageContainer>
  );
};

export default GuidedActivityPage;
