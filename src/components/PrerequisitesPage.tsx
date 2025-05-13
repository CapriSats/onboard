
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PageContainer from "./PageContainer";
import { useOnboarding } from "@/context/OnboardingContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mockApiServices } from "@/services/mockServices";
import { Prerequisite } from "@/services/api"; // Import from api.ts
import { useToast } from "@/hooks/use-toast";

const PrerequisitesPage: React.FC = () => {
  const { setCurrentStep, projectDescription } = useOnboarding();
  const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch prerequisites and project info when component mounts
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [prerequsitesData, projectInfo] = await Promise.all([
          mockApiServices.getPrerequisites(),
          mockApiServices.getProjectInfo()
        ]);
        
        setPrerequisites(prerequsitesData);
        setRecommendations(projectInfo.aiRecommendations);
      } catch (error) {
        console.error("Error fetching prerequisites data:", error);
        toast({
          title: "Error",
          description: "Failed to load prerequisites information",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handlePrerequisiteChange = async (id: string) => {
    // Find the prerequisite and toggle its status
    const updatedPrerequisites = prerequisites.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    
    // Update local state immediately for better UX
    setPrerequisites(updatedPrerequisites);
    
    try {
      // Call API to update prerequisite status
      const checked = updatedPrerequisites.find(item => item.id === id)?.checked || false;
      await mockApiServices.updatePrerequisite(id, checked);
    } catch (error) {
      console.error("Error updating prerequisite:", error);
      toast({
        title: "Error",
        description: "Failed to update prerequisite status",
        variant: "destructive"
      });
      
      // Revert the local state change if API call fails
      setPrerequisites(prerequisites);
    }
  };

  const allChecked = prerequisites.every((item) => item.checked);

  return (
    <PageContainer title="Prerequisites Page">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Prerequisites Checklist</h1>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {prerequisites.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`prerequisite-${item.id}`}
                    checked={item.checked}
                    onCheckedChange={() => handlePrerequisiteChange(item.id)}
                  />
                  <div>
                    <label
                      htmlFor={`prerequisite-${item.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.id} - {item.label}
                    </label>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="border rounded p-4 h-full">
            <h2 className="text-lg font-medium mb-4">
              AI Recommendations Based on your project
            </h2>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {recommendations.map((item, index) => (
                  <div key={index} className="p-2 border rounded bg-muted/20">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer navigation with back button */}
      <div className="mt-8 pt-6 border-t flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep("welcome")}
          className="flex items-center"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Welcome
        </Button>
        
        <Button 
          onClick={() => setCurrentStep("services")}
          className="flex items-center"
          disabled={!allChecked || isLoading}
        >
          Continue to Services
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </PageContainer>
  );
};

export default PrerequisitesPage;
