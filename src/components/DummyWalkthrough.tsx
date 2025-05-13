
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

type WalkthroughStep = {
  title: string;
  description: string;
  content: React.ReactNode;
};

const DummyWalkthrough: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const walkthroughSteps: WalkthroughStep[] = [
    {
      title: "Step 1: Describe Your Project",
      description: "Helping us understand your AI needs",
      content: (
        <div className="space-y-4">
          <p>In this first step, you'll describe your AI project to us. This helps our system:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Identify the type of AI solution you need</li>
            <li>Determine technical requirements</li>
            <li>Suggest appropriate services and components</li>
            <li>Prepare a tailored onboarding experience</li>
          </ul>
          <div className="p-3 border rounded-md bg-muted/20">
            <p className="italic text-sm">Example: "We want to build a customer support chatbot that can answer product questions based on our documentation."</p>
          </div>
        </div>
      )
    },
    {
      title: "Step 2: Technical Prerequisites",
      description: "Setting up for success",
      content: (
        <div className="space-y-4">
          <p>Based on your project description, we identify what you'll need:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 border rounded-md bg-green-50">
              <p className="font-medium">Development Environment</p>
              <p className="text-sm text-gray-600">Code editor, runtime environments</p>
            </div>
            <div className="p-3 border rounded-md bg-amber-50">
              <p className="font-medium">API Access Keys</p>
              <p className="text-sm text-gray-600">Authentication for AI services</p>
            </div>
            <div className="p-3 border rounded-md bg-blue-50">
              <p className="font-medium">Data Sources</p>
              <p className="text-sm text-gray-600">Information for training/fine-tuning</p>
            </div>
            <div className="p-3 border rounded-md bg-purple-50">
              <p className="font-medium">Project Repository</p>
              <p className="text-sm text-gray-600">Version control setup</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 3: Services & Components",
      description: "Building blocks of your AI solution",
      content: (
        <div className="space-y-4">
          <p>We'll recommend AI services and components tailored to your needs:</p>
          <div className="space-y-3">
            <div className="p-3 border rounded-md hover:bg-muted/20 transition-colors">
              <p className="font-medium">Natural Language Processing</p>
              <p className="text-sm text-gray-600">For understanding user queries</p>
            </div>
            <div className="p-3 border rounded-md hover:bg-muted/20 transition-colors">
              <p className="font-medium">Knowledge Base Integration</p>
              <p className="text-sm text-gray-600">Connect to your documentation</p>
            </div>
            <div className="p-3 border rounded-md hover:bg-muted/20 transition-colors">
              <p className="font-medium">Conversation Management</p>
              <p className="text-sm text-gray-600">Handle multi-turn dialogues</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 4: Guided Implementation",
      description: "Step-by-step setup assistance",
      content: (
        <div className="space-y-4">
          <p>We'll guide you through each component's implementation:</p>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <p className="font-medium">Set up your development environment</p>
              <p className="text-sm text-gray-600">Install dependencies and configure tools</p>
            </li>
            <li>
              <p className="font-medium">Integrate AI services</p>
              <p className="text-sm text-gray-600">Connect APIs and implement functionality</p>
            </li>
            <li>
              <p className="font-medium">Test your implementation</p>
              <p className="text-sm text-gray-600">Verify that everything works correctly</p>
            </li>
            <li>
              <p className="font-medium">Deploy your solution</p>
              <p className="text-sm text-gray-600">Guidelines for production deployment</p>
            </li>
          </ol>
        </div>
      )
    }
  ];
  
  const currentStep = walkthroughSteps[currentStepIndex];
  
  const handleNext = () => {
    if (currentStepIndex < walkthroughSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{currentStep.title}</CardTitle>
            <CardDescription>{currentStep.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep.content}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrev} 
              disabled={currentStepIndex === 0}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              {currentStepIndex + 1} of {walkthroughSteps.length}
            </div>
            <Button 
              onClick={handleNext} 
              disabled={currentStepIndex === walkthroughSteps.length - 1}
              className="flex items-center"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DummyWalkthrough;
