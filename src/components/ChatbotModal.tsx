import { useState, useRef, useEffect } from "react";
import { X, Send, User, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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

  // Comprehensive manual responses for all questions
  const getMockResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim();

    // Human escalation triggers
    if (message.includes("agent") || message.includes("human") || message.includes("real person") || 
        message.includes("speak to someone") || message.includes("talk to person") || 
        message.includes("customer service") || message.includes("help me")) {
      return "ESCALATE";
    }

    // Greetings
    if (message.match(/^(hi|hello|hey|good morning|good afternoon|good evening|greetings)$/i) || 
        message.includes("hi ") || message.includes("hello ") || message.includes("hey ")) {
      return "Hello! 👋 Welcome to RetailBot customer support!\n\nI'm here to help you with:\n• Order tracking and status\n• Returns and refunds\n• Payment questions\n• Delivery information\n• Store hours and locations\n• Product availability\n• Account issues\n• Promotions and discounts\n\nWhat can I assist you with today?";
    }

    // Order tracking
    if (message.includes("order") || message.includes("track") || message.includes("where is my") || 
        message.includes("order status") || message.includes("my package") || message.includes("shipment")) {
      if (message.includes("id") || message.includes("#") || /\d{5,}/.test(message)) {
        return "Great! I found your order. 📦\n\n**Order Status:** In Transit\n**Expected Delivery:** Within 2-3 business days\n**Current Location:** Local Distribution Center\n**Tracking Number:** Available in your order confirmation email\n\nYou'll receive an email notification when your package is out for delivery. You can also track it in real-time using the tracking link in your email.\n\nIs there anything else I can help you with?";
      }
      return "I'd be happy to help you track your order! 📦\n\n**To track your order:**\n1. Check your email for the order confirmation\n2. Find your Order ID (format: ORD-XXXXXX)\n3. Provide it here and I'll look it up\n\n**Or visit:**\n• Your account → Order History\n• Enter your order number\n\nPlease share your order ID and I'll check the status for you!";
    }

    // Returns & Refunds
    if (message.includes("return") || message.includes("refund") || message.includes("exchange") || 
        message.includes("send back") || message.includes("cancel order")) {
      return "I can help you with returns and refunds! 🔄\n\n**Our Return Policy:**\n• 30-day return window from delivery date\n• Items must be unused and in original packaging with tags\n• Free returns for store credit\n• Original payment refund within 5-7 business days\n• Electronics: 14-day return window\n\n**To initiate a return:**\n1. Log into your account\n2. Go to Order History\n3. Select the item to return\n4. Click 'Return Item'\n5. Print the prepaid shipping label\n6. Drop off at any carrier location\n\n**Refund Timeline:**\n• Store credit: Immediate\n• Original payment: 5-7 business days after we receive the item\n\nWould you like me to guide you through the process?";
    }

    // Payment issues
    if (message.includes("payment") || message.includes("pay") || message.includes("charge") || 
        message.includes("card") || message.includes("transaction") || message.includes("billing") || 
        message.includes("invoice") || message.includes("credit card") || message.includes("debit")) {
      return "I understand you're having payment issues. Let me help! 💳\n\n**Common Payment Solutions:**\n• Ensure your card details are entered correctly\n• Check if your card has sufficient funds\n• Verify your billing address matches your card\n• Try a different payment method\n• Clear your browser cache and cookies\n• Disable browser extensions temporarily\n\n**Accepted Payment Methods:**\n• Credit/Debit Cards (Visa, Mastercard, Amex)\n• PayPal\n• Apple Pay / Google Pay\n• Store Gift Cards\n\n**If you were charged but order failed:**\nDon't worry! Failed transactions are automatically refunded within 3-5 business days. The refund will appear on your statement within 7-10 business days.\n\n**Still having issues?**\nPlease provide:\n• Order number (if applicable)\n• Last 4 digits of your card\n• Error message you're seeing\n\nIs the issue still unresolved?";
    }

    // Delivery & Shipping
    if (message.includes("delivery") || message.includes("shipping") || message.includes("deliver") || 
        message.includes("delay") || message.includes("when will") || message.includes("arrive") || 
        message.includes("ship") || message.includes("dispatch")) {
      return "Here's information about our delivery options! 🚚\n\n**Delivery Methods & Pricing:**\n• **Standard Shipping** (5-7 business days):\n  - Free on orders over $50\n  - $4.99 for orders under $50\n\n• **Express Shipping** (2-3 business days):\n  - $9.99 flat rate\n\n• **Next Day Delivery** (1 business day):\n  - $19.99 flat rate\n  - Available in select areas\n\n**Processing Time:**\n• Orders placed before 2 PM EST: Same-day processing\n• Orders placed after 2 PM EST: Next-day processing\n• Weekend orders: Processed on Monday\n\n**Delayed Order?**\nDelivery delays can occur due to:\n• Weather conditions\n• High order volume\n• Carrier issues\n• Incorrect address\n\nIf your order is significantly delayed, please provide your order ID and I'll investigate immediately.\n\n**International Shipping:**\nAvailable to select countries. Shipping times vary by location (7-21 business days).\n\nHow can I help further?";
    }

    // Store information
    if (message.includes("store") || message.includes("location") || message.includes("address") || 
        message.includes("hours") || message.includes("open") || message.includes("close") || 
        message.includes("time") || message.includes("near me") || message.includes("find store")) {
      return "Here are our store hours and locations! 🏪\n\n**Regular Store Hours:**\n• **Monday - Friday:** 9:00 AM - 9:00 PM\n• **Saturday:** 10:00 AM - 8:00 PM\n• **Sunday:** 11:00 AM - 6:00 PM\n\n**Holiday Hours:**\nStore hours may vary during holidays. Check our website for specific dates or call your local store.\n\n**Find a Store Near You:**\n• Visit our website → Store Locator\n• Enter your ZIP code or city\n• View store details, hours, and directions\n\n**Store Services:**\n• In-store pickup (available for online orders)\n• Returns and exchanges\n• Product demonstrations\n• Gift card purchases\n• Customer service support\n\n**Contact a Store:**\nCall the store directly for:\n• Product availability\n• Special orders\n• Store-specific promotions\n\nWould you like help finding a store near you?";
    }

    // Product availability & inventory
    if (message.includes("product") || message.includes("item") || message.includes("stock") || 
        message.includes("available") || message.includes("inventory") || message.includes("in stock") || 
        message.includes("out of stock") || message.includes("when available") || message.includes("restock")) {
      return "I can help you check product availability! 📦\n\n**To check product availability:**\nPlease provide:\n• Product name or SKU number\n• Your preferred store location or ZIP code\n• Size/color (if applicable)\n\n**I can check:**\n• In-store availability at nearby locations\n• Online stock status\n• Estimated restock dates\n• Alternative similar products\n\n**Stock Status:**\n• ✅ In Stock - Available for immediate purchase\n• ⚠️ Low Stock - Limited quantity available\n• ❌ Out of Stock - Currently unavailable\n• 🔄 Backorder - Available for pre-order\n\n**Options if out of stock:**\n• Get notified when back in stock\n• Check alternative locations\n• Find similar products\n• Pre-order if available\n\nPlease share the product name or SKU, and I'll check availability for you!";
    }

    // Account issues
    if (message.includes("account") || message.includes("login") || message.includes("password") || 
        message.includes("sign in") || message.includes("sign up") || message.includes("register") || 
        message.includes("forgot password") || message.includes("reset password") || message.includes("locked")) {
      return "I can help with account issues! 🔐\n\n**Can't Log In?**\n• Click 'Forgot Password' on the login page\n• Check your email for password reset link\n• Ensure caps lock is off\n• Clear browser cache and cookies\n• Try a different browser\n\n**Account Locked?**\nAfter 5 failed login attempts, accounts lock for 30 minutes for security.\n• Wait 30 minutes and try again\n• Use 'Forgot Password' to reset\n• Contact support if issue persists\n\n**Create New Account:**\n• Click 'Sign Up' on the login page\n• Enter your email and create a password\n• Verify your email address\n• Complete your profile\n\n**Update Account Info:**\n• Log into your account\n• Go to Account Settings\n• Update: Name, Email, Address, Phone\n• Save changes\n\n**Account Benefits:**\n• Order history tracking\n• Faster checkout\n• Wishlist and saved items\n• Exclusive member discounts\n• Early access to sales\n\nWhat specific account issue are you facing?";
    }

    // Pricing & Discounts
    if (message.includes("price") || message.includes("cost") || message.includes("discount") || 
        message.includes("sale") || message.includes("promo") || message.includes("coupon") || 
        message.includes("deal") || message.includes("offer") || message.includes("special")) {
      return "I can help with pricing and promotions! 💰\n\n**Current Promotions:**\n• **New Customer Discount:** 10% off first order (code: WELCOME10)\n• **Free Shipping:** On orders over $50\n• **Student Discount:** 15% off with valid student ID\n• **Loyalty Program:** Earn points on every purchase\n\n**How to Use Coupons:**\n1. Add items to cart\n2. Proceed to checkout\n3. Enter coupon code in 'Promo Code' field\n4. Click 'Apply'\n\n**Price Match Policy:**\nWe match competitor prices within 30 days of purchase. Contact us with:\n• Competitor's current price\n• Product link or screenshot\n• Your order number\n\n**Best Price Guarantee:**\nIf you find a lower price within 30 days, we'll refund the difference!\n\n**Loyalty Rewards:**\n• Earn 1 point per $1 spent\n• 100 points = $5 discount\n• Birthday month bonus: 2x points\n\nWould you like to know about a specific product's price or current deals?";
    }

    // Warranty & Support
    if (message.includes("warranty") || message.includes("guarantee") || message.includes("defect") || 
        message.includes("broken") || message.includes("damaged") || message.includes("faulty") || 
        message.includes("not working") || message.includes("repair")) {
      return "I can help with warranty and product support! 🛠️\n\n**Warranty Information:**\n• **Standard Products:** 1-year manufacturer warranty\n• **Electronics:** 2-year extended warranty available\n• **Apparel:** 30-day quality guarantee\n\n**What's Covered:**\n• Manufacturing defects\n• Material flaws\n• Premature wear (under normal use)\n\n**Warranty Claim Process:**\n1. Contact us within warranty period\n2. Provide order number and photos\n3. We'll review and process your claim\n4. Replacement or refund issued\n\n**Product Not Working?**\n• Check product manual/troubleshooting guide\n• Ensure proper installation/usage\n• Contact manufacturer support\n• We can help facilitate warranty claims\n\n**Damaged During Shipping?**\n• Report within 48 hours of delivery\n• Take photos of damage and packaging\n• We'll send replacement immediately\n\nPlease provide your order number and describe the issue, and I'll help you with the warranty claim!";
    }

    // Size & Fit
    if (message.includes("size") || message.includes("fit") || message.includes("measurement") || 
        message.includes("small") || message.includes("large") || message.includes("medium") || 
        message.includes("xs") || message.includes("xl") || message.includes("xxl")) {
      return "I can help with sizing information! 📏\n\n**Size Guide:**\n• View detailed size charts on each product page\n• Measurements in inches and centimeters\n• Model height and size worn shown\n\n**Finding Your Size:**\n1. Check the size chart for the specific product\n2. Measure yourself (chest, waist, hips for clothing)\n3. Compare with size chart measurements\n4. Consider fit preference (slim, regular, relaxed)\n\n**Fit Types:**\n• **Slim Fit:** Closer to body\n• **Regular Fit:** Standard fit\n• **Relaxed Fit:** More roomy\n\n**Size Exchange:**\n• Free size exchanges within 30 days\n• Items must be unworn with tags\n• Original packaging preferred\n\n**Still Unsure?**\n• Check customer reviews for fit feedback\n• Contact us with your measurements\n• We can recommend the best size\n\nPlease share the product you're interested in, and I can provide specific sizing information!";
    }

    // Thank you & Goodbye
    if (message.includes("thank") || message.includes("thanks") || message.includes("appreciate")) {
      return "You're very welcome! 😊\n\nI'm glad I could help you today. Is there anything else you'd like assistance with?\n\n**Remember:**\n• You can always come back if you have more questions\n• Type 'agent' anytime to speak with a human representative\n• Check your email for order updates and confirmations\n\nHave a wonderful day! ✨";
    }

    if (message.includes("bye") || message.includes("goodbye") || message.includes("see you") || 
        message.includes("that's all") || message.includes("nothing else")) {
      return "Thank you for contacting RetailBot! 👋\n\nIf you need any further assistance, feel free to reach out anytime. We're here 24/7 to help!\n\nHave a great day! 😊";
    }

    // Complaints
    if (message.includes("complaint") || message.includes("unhappy") || message.includes("disappointed") || 
        message.includes("poor") || message.includes("bad") || message.includes("terrible") || 
        message.includes("worst") || message.includes("hate")) {
      return "I'm sorry to hear about your experience. 😔\n\nYour satisfaction is very important to us. Let me help resolve this issue.\n\n**To better assist you, please provide:**\n• Order number (if applicable)\n• Details of the issue\n• Photos if relevant\n• What resolution you're hoping for\n\nI'll do my best to help, or I can connect you with a supervisor who can provide additional assistance.\n\nWould you like to share more details, or would you prefer to speak with a human agent right away?";
    }

    // Compliments
    if (message.includes("great") || message.includes("excellent") || message.includes("love") || 
        message.includes("amazing") || message.includes("wonderful") || message.includes("best") || 
        message.includes("fantastic") || message.includes("awesome")) {
      return "Thank you so much for the kind words! 😊✨\n\nWe really appreciate your feedback and are thrilled that you're happy with our service!\n\n**Your feedback helps us:**\n• Improve our products and services\n• Better serve all our customers\n• Continue providing excellent support\n\nIs there anything else I can help you with today?";
    }

    // Default response - more helpful
    return "I want to make sure I help you correctly! 🤔\n\n**I can assist you with:**\n• **Order tracking** - Check your order status and delivery\n• **Returns & refunds** - Process returns and exchanges\n• **Payment issues** - Resolve billing and payment problems\n• **Delivery** - Shipping options and tracking\n• **Store info** - Hours, locations, and services\n• **Product availability** - Check stock and inventory\n• **Account help** - Login, password, account settings\n• **Pricing & discounts** - Current deals and promotions\n• **Warranty** - Product support and claims\n• **Sizing** - Size guides and fit information\n\n**Please try:**\n• Being more specific about what you need\n• Using keywords like 'order', 'return', 'payment', etc.\n• Or type **'agent'** to speak with a human representative\n\nWhat would you like help with?";
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

    try {
      // Use manual responses (no API needed)
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = getMockResponse(userMessage.content);

      // Handle escalation
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

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: response,
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setIsTyping(false);
      console.error("Error in chatbot:", error);
      
      // Show friendly error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "I apologize, but I encountered a technical issue. 😔\n\nPlease try asking your question again, or type 'agent' to speak with a human representative who can help you immediately.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);

      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
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
