import { useState } from "react";
import { Bot } from "lucide-react";
import ChatbotModal from "./ChatbotModal";

const FloatingChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsChatOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full gradient-primary shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        aria-label="Open chat support"
      >
        <Bot className="w-6 h-6 text-primary-foreground" />
        
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full gradient-primary animate-ping opacity-30" />
        
        {/* Tooltip */}
        <span
          className={`absolute right-full mr-3 px-3 py-2 bg-card text-foreground text-sm font-medium rounded-lg shadow-card whitespace-nowrap transition-all duration-200 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
          }`}
        >
          Need help? Chat with us!
        </span>
      </button>

      <ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default FloatingChatButton;
