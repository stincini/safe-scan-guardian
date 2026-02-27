import { useState, useEffect } from "react";
import pappyMascot from "@/assets/pappy-mascot.png";

export type PappyState = "idle" | "greeting" | "scanning" | "safe" | "suspicious" | "danger" | "teaching" | "celebrating";

interface PappyAssistantProps {
  state: PappyState;
  message?: string;
  riskScore?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const defaultMessages: Record<PappyState, string> = {
  idle: "I'm here if you need me!",
  greeting: "Hey there! Let's stay safe today.",
  scanning: "Hmm, let me take a look…",
  safe: "All clear! This one looks safe. ✅",
  suspicious: "Hold on — something seems off here.",
  danger: "🚨 Don't click that! This looks like a scam.",
  teaching: "Did you know? Let's learn something new!",
  celebrating: "Great job! You're getting scam-smart! 🎉",
};

const stateAnimations: Record<PappyState, string> = {
  idle: "animate-[bounce_3s_ease-in-out_infinite]",
  greeting: "animate-[wave_1s_ease-in-out_2]",
  scanning: "animate-[pulse_1.5s_ease-in-out_infinite]",
  safe: "animate-scale-in",
  suspicious: "animate-[shake_0.5s_ease-in-out_2]",
  danger: "animate-[shake_0.3s_ease-in-out_3]",
  teaching: "animate-fade-in",
  celebrating: "animate-[bounce_0.6s_ease-in-out_3]",
};

const stateBubbleStyles: Record<PappyState, string> = {
  idle: "bg-muted text-muted-foreground",
  greeting: "bg-primary/10 text-primary",
  scanning: "bg-muted text-muted-foreground",
  safe: "bg-safe-light text-safe",
  suspicious: "bg-suspicious-light text-suspicious",
  danger: "bg-danger-light text-danger",
  teaching: "bg-primary/10 text-primary",
  celebrating: "bg-safe-light text-safe",
};

const sizeClasses = {
  sm: { image: "w-12 h-12", bubble: "text-xs max-w-[180px]", wrapper: "gap-2" },
  md: { image: "w-16 h-16", bubble: "text-sm max-w-[220px]", wrapper: "gap-3" },
  lg: { image: "w-20 h-20", bubble: "text-sm max-w-[260px]", wrapper: "gap-3" },
};

const PappyAssistant = ({
  state,
  message,
  riskScore,
  size = "md",
  className = "",
}: PappyAssistantProps) => {
  const [displayMessage, setDisplayMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timeout = setTimeout(() => {
      // If risk score is provided, override message based on score
      if (riskScore !== undefined && !message) {
        if (riskScore >= 80) setDisplayMessage("🚨 This is very dangerous. Don't respond!");
        else if (riskScore >= 60) setDisplayMessage("⚠️ Be careful — I see some red flags.");
        else if (riskScore >= 30) setDisplayMessage("Hmm, not sure about this one. Let me check.");
        else setDisplayMessage("Looks good to me! You're safe. ✅");
      } else {
        setDisplayMessage(message || defaultMessages[state]);
      }
      setIsVisible(true);
    }, 150);
    return () => clearTimeout(timeout);
  }, [state, message, riskScore]);

  const s = sizeClasses[size];

  return (
    <div className={`flex items-end ${s.wrapper} ${className} ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
      {/* Mascot image */}
      <div className={`${s.image} rounded-full overflow-hidden shrink-0 ${stateAnimations[state]}`}>
        <img
          src={pappyMascot}
          alt="Pappy assistant"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Speech bubble */}
      <div className={`${stateBubbleStyles[state]} ${s.bubble} rounded-2xl rounded-bl-md px-3 py-2 font-semibold shadow-card`}>
        {displayMessage}
      </div>
    </div>
  );
};

export default PappyAssistant;
