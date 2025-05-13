
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PageContainer from "./PageContainer";
import { useOnboarding } from "@/context/OnboardingContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mockApiServices, Service } from "@/services/mockServices";
import { useToast } from "@/hooks/use-toast";

const ServicesPage: React.FC = () => {
  const { setCurrentStep, projectDescription } = useOnboarding();
  const [services, setServices] = useState<Service[]>([]);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Fetch services when component mounts
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const servicesData = await mockApiServices.getServices();
        setServices(servicesData);
        
        // Generate a simple AI summary based on the project description
        if (projectDescription) {
          const summary = `Based on your project description, we recommend using these services to build your AI solution. ${
            projectDescription.substring(0, 100)
          }${projectDescription.length > 100 ? '...' : ''}`;
          setAiSummary(summary);
        } else {
          setAiSummary("We've analyzed your project and recommend these services for your AI application.");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        toast({
          title: "Error",
          description: "Failed to load services information",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [projectDescription, toast]);
  
  return (
    <PageContainer title="Services Page">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Services & Components</h1>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className={`p-3 border rounded-md transition-colors ${
                    service.status === 'available' 
                      ? 'hover:bg-muted/20 cursor-pointer' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{service.id} - {service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      service.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : service.status === 'coming_soon' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.status === 'available' ? 'Available' : 
                       service.status === 'coming_soon' ? 'Coming Soon' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="border rounded p-4 h-full">
            <h2 className="text-lg font-medium mb-4">
              AI Summary Of the project
            </h2>
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                {aiSummary}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer navigation with back button */}
      <div className="mt-8 pt-6 border-t flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep("prerequisites")}
          className="flex items-center"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Prerequisites
        </Button>
        
        <Button 
          onClick={() => setCurrentStep("guided")}
          className="flex items-center"
          disabled={isLoading}
        >
          Start Guided Setup
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </PageContainer>
  );
};

export default ServicesPage;
