import { Shield, Eye, EyeOff, Smartphone, Cloud, Lock } from "lucide-react";

interface PrivacyOnboardingScreenProps {
  onComplete: () => void;
}

const privacyPoints = [
  {
    icon: Smartphone,
    title: "On-device scanning",
    description: "Text extraction happens right on your phone. Your messages never leave your device unless needed.",
  },
  {
    icon: EyeOff,
    title: "No message storage",
    description: "We never save the content of your messages. Analysis is done in real-time and discarded.",
  },
  {
    icon: Cloud,
    title: "Minimal cloud use",
    description: "We only use the cloud for advanced threat analysis. Basic checks happen entirely offline.",
  },
  {
    icon: Lock,
    title: "You're always in control",
    description: "You choose what to scan. We never access your messages, email, or social media directly.",
  },
];

const PrivacyOnboardingScreen = ({ onComplete }: PrivacyOnboardingScreenProps) => {
  return (
    <div className="px-6 pb-6 flex flex-col h-full">
      {/* Top section */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-scale-in">
          <Shield className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold font-display text-foreground text-center mb-2">
          Your Privacy Comes First
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-[280px] leading-relaxed">
          ScamShield is designed to protect you without invading your privacy. Here's how:
        </p>

        <div className="w-full space-y-3 mb-8">
          {privacyPoints.map((point, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-4 shadow-card flex items-start gap-3 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <point.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{point.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="shrink-0">
        <button
          onClick={onComplete}
          className="w-full bg-primary text-primary-foreground rounded-xl p-4 font-bold text-base active:scale-[0.98] transition-transform shadow-soft mb-2"
        >
          I Understand, Let's Go
        </button>
        <p className="text-[10px] text-muted-foreground text-center">
          <Eye className="w-3 h-3 inline mr-1" />
          Read our full privacy policy
        </p>
      </div>
    </div>
  );
};

export default PrivacyOnboardingScreen;
