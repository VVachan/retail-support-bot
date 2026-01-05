import { Bot, Users, Clock, BarChart3, Shield, Sparkles } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Responses",
      description: "Intelligent chatbot trained on retail-specific queries provides accurate, instant answers to customer questions.",
    },
    {
      icon: Users,
      title: "Seamless Human Handoff",
      description: "Complex issues are smoothly escalated to human agents with full conversation context preserved.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Never miss a customer query. Our AI support is always available, even outside business hours.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track customer satisfaction, response times, and common queries to continuously improve service.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security ensures customer data is protected and conversations remain confidential.",
    },
    {
      icon: Sparkles,
      title: "Continuous Learning",
      description: "AI improves over time, learning from interactions to provide better responses and solutions.",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-accent rounded-full text-sm font-semibold text-accent-foreground mb-4">
            Features
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
            Everything You Need for{" "}
            <span className="text-gradient">Exceptional Support</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform combines intelligent automation with human expertise to deliver outstanding customer experiences.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-background rounded-2xl border border-border/50 shadow-sm hover:shadow-card hover:border-primary/20 transition-smooth"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth shadow-soft">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
