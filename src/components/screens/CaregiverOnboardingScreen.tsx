import { ArrowLeft, Users, Mail, Shield, Check } from "lucide-react";
import { useState } from "react";

interface CaregiverOnboardingScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

const CaregiverOnboardingScreen = ({ onBack, onComplete }: CaregiverOnboardingScreenProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [inviteCode, setInviteCode] = useState("");

  return (
    <div className="px-6 pb-6 flex flex-col h-full">
      {/* Header */}
      <div className="pt-4 pb-2 flex items-center gap-3 shrink-0">
        <button
          onClick={step === 1 ? onBack : () => setStep((s) => (s - 1) as 1 | 2 | 3)}
          className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display text-foreground">Link a Caregiver</h1>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-6 shrink-0">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              s <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        {step === 1 && (
          <div className="animate-slide-up">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-xl font-bold font-display text-foreground text-center mb-3">
              Protect Together
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">
              Link a trusted family member so they can receive alerts when we detect a high-risk scam. They'll never see your private messages — only a safety summary.
            </p>
            <div className="space-y-3 mb-6">
              <div className="bg-card rounded-xl p-4 shadow-card flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-safe-light flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-safe" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Alerts, not surveillance</p>
                  <p className="text-xs text-muted-foreground">Only high-risk scam detections are shared</p>
                </div>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-card flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-safe-light flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-safe" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Privacy protected</p>
                  <p className="text-xs text-muted-foreground">Message content is never shared without your approval</p>
                </div>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-card flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-safe-light flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-safe" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Easy to remove</p>
                  <p className="text-xs text-muted-foreground">Unlink your caregiver anytime in settings</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-primary text-primary-foreground rounded-xl p-4 font-bold text-base active:scale-[0.98] transition-transform shadow-soft"
            >
              Get Started
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-slide-up">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-xl font-bold font-display text-foreground text-center mb-3">
              Enter Invite Code
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">
              Ask your family member to share their Pappy caregiver invite code with you.
            </p>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              placeholder="e.g. SHIELD-4829"
              className="w-full bg-card border border-border rounded-xl p-4 text-center text-lg font-bold font-display tracking-widest text-foreground placeholder:text-muted-foreground mb-6"
              maxLength={12}
            />
            <button
              onClick={() => setStep(3)}
              disabled={inviteCode.length < 4}
              className="w-full bg-primary text-primary-foreground rounded-xl p-4 font-bold text-base active:scale-[0.98] transition-transform shadow-soft disabled:opacity-40"
            >
              Link Caregiver
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-scale-in flex flex-col items-center justify-center flex-1">
            <div className="w-20 h-20 rounded-full bg-safe-light flex items-center justify-center mb-6">
              <Shield className="w-10 h-10 text-safe" />
            </div>
            <h2 className="text-xl font-bold font-display text-foreground text-center mb-2">
              Caregiver Linked!
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-8 leading-relaxed max-w-[260px]">
              Your trusted contact will now receive alerts when we detect high-risk scams. You can manage this anytime in Settings.
            </p>
            <button
              onClick={onComplete}
              className="w-full bg-primary text-primary-foreground rounded-xl p-4 font-bold text-base active:scale-[0.98] transition-transform shadow-soft"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaregiverOnboardingScreen;
