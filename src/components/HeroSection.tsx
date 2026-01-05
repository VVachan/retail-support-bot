import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Headphones, Clock, Zap, ShieldCheck } from "lucide-react";
import ChatbotModal from "./ChatbotModal";

const HeroSection = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const features = [
    { icon: Clock, text: "24/7 Availability" },
    { icon: Zap, text: "Instant Responses" },
    { icon: ShieldCheck, text: "Secure Support" },
    { icon: Headphones, text: "Human Backup" },
  ];

  return (
    <>
      <section className="relative min-h-screen gradient-hero overflow-hidden pt-20 lg:pt-24">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center pt-16 lg:pt-24 pb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-card border border-border/50 mb-8 animate-slide-up">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                AI-Powered Support Available Now
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground max-w-5xl leading-tight mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              24/7 AI-Powered{" "}
              <span className="text-gradient">Customer Support</span>
              {" "}for Retail
            </h1>

            {/* Subheading */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Instant answers to your retail queries with seamless human support when needed. Reduce wait times and enhance customer satisfaction.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Button
                size="xl"
                onClick={() => setIsChatOpen(true)}
                className="group"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with Support Bot
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link to="/auth">
                <Button variant="hero" size="xl">
                  Login to Dashboard
                </Button>
              </Link>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-card/80 rounded-full border border-border/50 shadow-sm"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 mt-20 w-full max-w-4xl animate-slide-up" style={{ animationDelay: "0.5s" }}>
              {[
                { value: "95%", label: "Query Resolution" },
                { value: "<5s", label: "Response Time" },
                { value: "24/7", label: "Availability" },
                { value: "10K+", label: "Happy Customers" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-card rounded-2xl shadow-card border border-border/50"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default HeroSection;
