
import React from "react";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isAI?: boolean;
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isAI = true, className }) => {
  return (
    <div
      className={cn(
        "p-4 rounded-lg max-w-[80%] mb-3 animate-fade-in",
        isAI
          ? "bg-muted text-muted-foreground mr-auto rounded-tl-none"
          : "bg-black text-white ml-auto rounded-tr-none",
        className
      )}
    >
      {message}
    </div>
  );
};

export default ChatBubble;
