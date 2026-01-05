import { useState, useRef, useEffect } from "react";
import { X, Send, User, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal = ({ isOpen, onClose }: ChatbotModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: "Hello 👋 I'm your AI customer support assistant. How can I help you today?\n\nI can assist you with:\n• Order tracking\n• Returns & refunds\n• Payment issues\n• Delivery information\n• Store timings\n• Product availability",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isEscalating, setIsEscalating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const getMockResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Human escalation triggers
    if (message.includes("agent") || message.includes("human") || message.includes("support") || message.includes("help me") || message.includes("real person")) {
      return "ESCALATE";
    }

    // Order tracking
    if (message.includes("order") || message.includes("track") || message.includes("where is my")) {
      if (message.includes("id") || message.includes("#") || /\d{5,}/.test(message)) {
        return "Great! I found your order. 📦\n\n**Order Status:** In Transit\n**Expected Delivery:** Within 2-3 business days\n**Current Location:** Local Distribution Center\n\nYou'll receive an email notification when your package is out for delivery. Is there anything else I can help you with?";
      }
      return "I'd be happy to help you track your order! 📦\n\nPlease provide your order ID (you can find it in your confirmation email), and I'll look it up for you.";
    }

    // Returns & Refunds
    if (message.includes("return") || message.includes("refund") || message.includes("exchange")) {
      return "I can help you with returns and refunds! 🔄\n\n**Our Return Policy:**\n• 30-day return window from delivery date\n• Items must be unused and in original packaging\n• Free returns for store credit\n• Original payment refund within 5-7 business days\n\n**To initiate a return:**\n1. Go to your order history\n2. Select the item to return\n3. Print the prepaid shipping label\n\nWould you like me to guide you through the process?";
    }

    // Payment issues
    if (message.includes("payment") || message.includes("pay") || message.includes("charge") || message.includes("card") || message.includes("transaction")) {
      return "I understand you're having payment issues. Let me help! 💳\n\n**Common solutions:**\n• Ensure your card details are entered correctly\n• Check if your card has sufficient funds\n• Try a different payment method\n• Clear your browser cache and try again\n\n**If you were charged but order failed:**\nDon't worry! Failed transactions are automatically refunded within 3-5 business days.\n\nIs the issue still unresolved?";
    }

    // Delivery
    if (message.includes("delivery") || message.includes("shipping") || message.includes("deliver") || message.includes("delay")) {
      return "Here's information about our delivery options! 🚚\n\n**Delivery Methods:**\n• Standard (5-7 days): Free on orders over $50\n• Express (2-3 days): $9.99\n• Next Day: $19.99\n\n**Delayed Order?**\nDelivery delays can occur due to weather or high demand. If your order is significantly delayed, please provide your order ID and I'll investigate.\n\nHow can I help further?";
    }

    // Store timings
    if (message.includes("store") || message.includes("time") || message.includes("hour") || message.includes("open") || message.includes("close")) {
      return "Here are our store hours! 🏪\n\n**Regular Hours:**\n• Monday - Friday: 9:00 AM - 9:00 PM\n• Saturday: 10:00 AM - 8:00 PM\n• Sunday: 11:00 AM - 6:00 PM\n\n**Holiday Hours:**\nStore hours may vary during holidays. Check our website for specific dates.\n\nWould you like help finding a store near you?";
    }

    // Product availability
    if (message.includes("product") || message.includes("stock") || message.includes("available") || message.includes("inventory")) {
      return "I can help you check product availability! 📦\n\nPlease provide:\n• Product name or SKU\n• Your preferred store location or ZIP code\n\nI'll check our inventory and let you know if it's in stock nearby or available for shipping.";
    }

    // Account issues
    if (message.includes("account") || message.includes("login") || message.includes("password") || message.includes("sign in")) {
      return "I can help with account issues! 🔐\n\n**Can't log in?**\n• Use 'Forgot Password' to reset\n• Check your email for verification\n• Ensure caps lock is off\n\n**Account locked?**\nAfter 5 failed attempts, accounts lock for 30 minutes for security.\n\n**Need to update info?**\nGo to Account Settings after logging in.\n\nWhat specific issue are you facing?";
    }

    // Greetings
    if (message.includes("hi") || message.includes("hello") || message.includes("hey") || message === "hi" || message === "hello") {
      return "Hello! 👋 Welcome to our customer support!\n\nI'm here to help you with:\n• Order tracking and status\n• Returns and refunds\n• Payment questions\n• Delivery information\n• Store hours and locations\n• Product availability\n\nWhat can I assist you with today?";
    }

    // Thank you
    if (message.includes("thank") || message.includes("thanks")) {
      return "You're welcome! 😊\n\nI'm glad I could help. Is there anything else you'd like assistance with today?\n\nIf you need further support, just type 'agent' to connect with a human representative.";
    }

    // Default response
    return "I'm not quite sure I understand your question. 🤔\n\nHere are some things I can help with:\n• **Order tracking** - Check your order status\n• **Returns** - Start a return or exchange\n• **Payment** - Resolve payment issues\n• **Delivery** - Shipping information\n• **Store info** - Hours and locations\n\nOr type **'agent'** to speak with a human representative.";
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping || isEscalating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = getMockResponse(userMessage.content);

    if (response === "ESCALATE") {
      setIsTyping(false);
      setIsEscalating(true);

      const escalateMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "I understand you'd like to speak with a human agent. Let me transfer your request... 🔄",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, escalateMessage]);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const waitMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "bot",
        content: "**Connecting you to a support agent...**\n\n⏱️ Estimated wait time: 2-3 minutes\n\nA human support representative will be with you shortly. Your conversation history has been shared with them for context.\n\n*Thank you for your patience!*",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, waitMessage]);
      return;
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "bot",
      content: response,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl h-[85vh] max-h-[700px] bg-card rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 gradient-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground">
                RetailBot Support
              </h3>
              <p className="text-sm text-primary-foreground/80">
                {isEscalating ? "Connecting to agent..." : "Online • Typically replies instantly"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-primary-foreground/20 transition-smooth"
          >
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-slide-up ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "user"
                    ? "bg-primary"
                    : "bg-accent"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <Bot className="w-4 h-4 text-accent-foreground" />
                )}
              </div>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "gradient-primary text-primary-foreground rounded-tr-sm"
                    : "bg-muted text-foreground rounded-tl-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {message.content.split('\n').map((line, i) => (
                    <span key={i}>
                      {line.startsWith('**') && line.endsWith('**') ? (
                        <strong>{line.slice(2, -2)}</strong>
                      ) : line.startsWith('• ') ? (
                        <span className="block ml-2">{line}</span>
                      ) : line.startsWith('*') && line.endsWith('*') && !line.startsWith('**') ? (
                        <em>{line.slice(1, -1)}</em>
                      ) : (
                        line
                      )}
                      {i < message.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full typing-dot" />
                </div>
              </div>
            </div>
          )}

          {/* Escalation loading */}
          {isEscalating && !isTyping && (
            <div className="flex justify-center py-4 animate-fade-in">
              <div className="flex items-center gap-3 bg-accent/50 rounded-full px-6 py-3">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                <span className="text-sm font-medium text-foreground">
                  Connecting to support agent...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isEscalating ? "Agent will respond shortly..." : "Type your message..."}
              disabled={isEscalating}
              className="flex-1 px-4 py-3 bg-muted rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping || isEscalating}
              size="icon"
              className="h-12 w-12 rounded-xl"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Type <span className="font-medium text-primary">'agent'</span> to connect with a human representative
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
