import { Shield, X, ImageIcon } from "lucide-react";

interface ScreenshotDetectionSheetProps {
  onScan: () => void;
  onDismiss: () => void;
}

const ScreenshotDetectionSheet = ({ onScan, onDismiss }: ScreenshotDetectionSheetProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/30 animate-fade-in" onClick={onDismiss} />

      {/* Sheet */}
      <div className="relative w-full max-w-[390px] bg-card rounded-t-3xl p-6 pb-10 shadow-elevated animate-slide-up z-10">
        {/* Handle */}
        <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />

        {/* Close */}
        <button onClick={onDismiss} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-primary" />
          </div>
        </div>

        <h2 className="text-lg font-bold font-display text-foreground text-center mb-2">
          New Screenshot Detected
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">
          We noticed you saved a new screenshot. Would you like us to check if it's safe?
        </p>

        <button
          onClick={onScan}
          className="w-full bg-primary text-primary-foreground rounded-xl p-4 flex items-center justify-center gap-2 font-bold text-base active:scale-[0.98] transition-transform shadow-soft mb-3"
        >
          <Shield className="w-5 h-5" />
          Check for Scams
        </button>

        <button
          onClick={onDismiss}
          className="w-full bg-muted text-muted-foreground rounded-xl p-3 font-semibold text-sm active:scale-[0.98] transition-transform"
        >
          Not now
        </button>
      </div>
    </div>
  );
};

export default ScreenshotDetectionSheet;
