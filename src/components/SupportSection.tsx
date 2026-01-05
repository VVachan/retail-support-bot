import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import ChatbotModal from "./ChatbotModal";

const SupportSection = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Mon-Fri, 9AM-6PM EST",
      value: "1-800-RETAIL-AI",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Response within 24 hours",
      value: "support@retailbot.com",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Schedule an appointment",
      value: "New York, NY 10001",
    },
  ];

  return (
    <>
      <section id="support" className="py-20 lg:py-32 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left content */}
            <div>
              <span className="inline-block px-4 py-2 bg-accent rounded-full text-sm font-semibold text-accent-foreground mb-4">
                Get Support
              </span>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
                We're Here to{" "}
                <span className="text-gradient">Help You</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you prefer AI assistance or human support, we've got multiple ways to help you get the answers you need.
              </p>

              <div className="space-y-4 mb-8">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border/50 hover:shadow-card transition-smooth"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {method.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {method.description}
                      </p>
                      <p className="text-sm font-medium text-primary mt-1">
                        {method.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                onClick={() => setIsChatOpen(true)}
                className="group"
              >
                <MessageCircle className="w-5 h-5" />
                Start Live Chat
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right content - FAQ */}
            <div className="bg-card p-8 lg:p-10 rounded-2xl shadow-card border border-border/50">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                {[
                  {
                    q: "How does the AI chatbot work?",
                    a: "Our AI is trained on thousands of retail-specific queries to provide accurate, instant responses. It understands context and can handle complex conversations.",
                  },
                  {
                    q: "Can I speak to a human agent?",
                    a: "Absolutely! Simply type 'agent' or 'human' in the chat, and you'll be connected to a live support representative.",
                  },
                  {
                    q: "What are your support hours?",
                    a: "AI support is available 24/7. Human agents are available Monday-Friday, 9AM-6PM EST, and Saturday 10AM-4PM EST.",
                  },
                  {
                    q: "Is my data secure?",
                    a: "Yes, we use enterprise-grade encryption and follow strict data protection protocols to keep your information safe.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                    <h4 className="font-semibold text-foreground mb-2">
                      {faq.q}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default SupportSection;
