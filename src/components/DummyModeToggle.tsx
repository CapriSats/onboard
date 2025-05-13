
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/context/OnboardingContext";
import { Eye } from "lucide-react";

const DummyModeToggle: React.FC = () => {
  const { isDummyMode, setIsDummyMode } = useOnboarding();

  return (
    <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
      <Eye className="h-4 w-4 text-muted-foreground" />
      <Label htmlFor="dummy-mode" className="text-sm">Experience / What to Expect</Label>
      <Switch
        id="dummy-mode"
        checked={isDummyMode}
        onCheckedChange={setIsDummyMode}
      />
    </div>
  );
};

export default DummyModeToggle;
