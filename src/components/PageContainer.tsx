
import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MessageCircle } from "lucide-react";
import ChatAssistant from "@/components/ChatAssistant";

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
  showAskButton?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  title, 
  children, 
  showAskButton = true 
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
        <div className="border-b p-4 flex justify-between items-center bg-muted/20">
          <h1 className="text-xl font-medium">{title}</h1>
          
          {showAskButton && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Ask AI Assistant</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>AI Assistant</SheetTitle>
                </SheetHeader>
                <ChatAssistant />
              </SheetContent>
            </Sheet>
          )}
        </div>
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
