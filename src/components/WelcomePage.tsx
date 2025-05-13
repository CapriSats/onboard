
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ChatBubble from "./ChatBubble";
import PageContainer from "./PageContainer";
import { useOnboarding } from "@/context/OnboardingContext";
import { CheckCircle, Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { mockApiServices } from "@/services/mockServices";
import { useToast } from "@/hooks/use-toast";

const WelcomePage: React.FC = () => {
  const { setCurrentStep, projectDescription, setProjectDescription } = useOnboarding();
  const [showChat, setShowChat] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch initial project info when component mounts
    const fetchProjectInfo = async () => {
      try {
        const projectInfo = await mockApiServices.getProjectInfo();
        if (!projectDescription) {
          // Only set description if it's not already set
          setProjectDescription(projectInfo.description);
        }
      } catch (error) {
        console.error("Error fetching project info:", error);
        toast({
          title: "Error",
          description: "Failed to load project information",
          variant: "destructive"
        });
      }
    };

    fetchProjectInfo();
  }, [projectDescription, setProjectDescription, toast]);

  const handleContinue = async () => {
    if (projectDescription) {
      setIsSubmitting(true);
      try {
        // Update the project description before navigating
        await mockApiServices.updateProjectDescription(projectDescription);
        setCurrentStep("prerequisites");
      } catch (error) {
        console.error("Error updating project description:", error);
        toast({
          title: "Error",
          description: "Failed to update project information",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <PageContainer title="Welcome Page">
      {/* Hero Section */}
      <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-2 text-black">Welcome to Awesome AI Onboarding</h1>
        <p className="text-lg mb-4 text-gray-600">Your journey to harnessing the power of AI starts here</p>
        
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="flex items-start gap-2">
            <div className="bg-black rounded-full p-2 text-white mt-1">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Describe Your Project</h3>
              <p className="text-sm text-gray-600">Tell us about your AI goals and challenges</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="bg-black rounded-full p-2 text-white mt-1">
              <CheckCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Complete Prerequisites</h3>
              <p className="text-sm text-gray-600">Ensure you have everything needed to get started</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="bg-black rounded-full p-2 text-white mt-1">
              <ArrowRight className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Get Guided Assistance</h3>
              <p className="text-sm text-gray-600">Follow our step-by-step guide to implementation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {showChat && (
            <div className="mb-4">
              <ChatBubble 
                message="Let's determine if this is a Gen AI Project That we will help take through to the deployment" 
                isAI={true} 
              />
            </div>
          )}

          <div className="mt-6">
            <Button 
              onClick={handleContinue}
              disabled={!projectDescription || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Processing..." : "Continue to Prerequisites"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="border rounded p-4 mb-4">
            <label className="block mb-2 font-medium">Describe me your project</label>
            <Textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Tell us about your AI project..."
              className="mb-4"
              rows={5}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      {/* Footer navigation - no back button on first page */}
      <div className="mt-8 pt-6 border-t flex justify-end">
        <Button 
          onClick={handleContinue}
          disabled={!projectDescription || isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Continue to Prerequisites"}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </PageContainer>
  );
};

export default WelcomePage;
