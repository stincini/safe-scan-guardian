import { Shield } from "lucide-react";
import { useEffect, useState } from "react";

interface ScanningScreenProps {
  onComplete: () => void;
}

const steps = [
  "Extracting text from image…",
  "Checking URLs for threats…",
  "Analyzing language patterns…",
  "Cross-referencing scam database…",
  "Generating risk assessment…",
];

const ScanningScreen = ({ onComplete }: ScanningScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 70);

    const timeout = setTimeout(onComplete, 3800);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="px-6 pb-6 flex flex-col items-center justify-center h-full">
      {/* Pulsing shield */}
      <div className="relative mb-8">
        <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <Shield className="w-10 h-10 text-primary animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
          </div>
        </div>
        {/* Scanning ring */}
        <div className="absolute inset-0 w-28 h-28 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
      </div>

      <h2 className="text-xl font-bold font-display text-foreground mb-2">
        Scanning for threats…
      </h2>
      <p className="text-sm text-muted-foreground mb-8 text-center">
        We're analyzing this for scam signals
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-[260px] mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          {progress}% complete
        </p>
      </div>

      {/* Steps */}
      <div className="w-full max-w-[280px] space-y-2">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 text-sm transition-all duration-300 ${
              i < currentStep
                ? "text-safe opacity-100"
                : i === currentStep
                ? "text-foreground opacity-100"
                : "text-muted-foreground opacity-40"
            }`}
          >
            <span className="w-5 text-center">
              {i < currentStep ? "✓" : i === currentStep ? "●" : "○"}
            </span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScanningScreen;
