import { ArrowLeft, Type, Phone, ShieldCheck, Bell, Eye, ChevronRight, Users } from "lucide-react";
import { useState } from "react";

interface SettingsScreenProps {
  onBack: () => void;
  onCaregiverOnboarding: () => void;
}

const SettingsScreen = ({ onBack, onCaregiverOnboarding }: SettingsScreenProps) => {
  const [largeText, setLargeText] = useState(false);
  const [screenshotDetection, setScreenshotDetection] = useState(true);
  const [caregiverAlerts, setCaregiverAlerts] = useState(true);

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`w-12 h-7 rounded-full relative transition-colors ${on ? "bg-primary" : "bg-muted"}`}
    >
      <div className={`w-5 h-5 bg-primary-foreground rounded-full absolute top-1 shadow-sm transition-transform ${on ? "right-1" : "left-1"}`} />
    </button>
  );

  return (
    <div className="px-6 pb-6">
      {/* Header */}
      <div className="pt-4 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display text-foreground">Settings</h1>
      </div>

      {/* Accessibility */}
      <div className="mb-5">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Accessibility</h2>
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Type className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-bold text-foreground">Large Text Mode</p>
                <p className="text-xs text-muted-foreground">Increase text size throughout the app</p>
              </div>
            </div>
            <Toggle on={largeText} onToggle={() => setLargeText(!largeText)} />
          </div>
        </div>
      </div>

      {/* Scanning */}
      <div className="mb-5">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Scanning</h2>
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-bold text-foreground">Screenshot Detection</p>
                <p className="text-xs text-muted-foreground">Prompt when new screenshots are saved</p>
              </div>
            </div>
            <Toggle on={screenshotDetection} onToggle={() => setScreenshotDetection(!screenshotDetection)} />
          </div>
        </div>
      </div>

      {/* Family */}
      <div className="mb-5">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Family</h2>
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-bold text-foreground">Caregiver Alerts</p>
                <p className="text-xs text-muted-foreground">Notify caregiver on high-risk scams</p>
              </div>
            </div>
            <Toggle on={caregiverAlerts} onToggle={() => setCaregiverAlerts(!caregiverAlerts)} />
          </div>
          <button onClick={onCaregiverOnboarding} className="p-4 flex items-center justify-between w-full active:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">Link a Caregiver</p>
                <p className="text-xs text-muted-foreground">Add a trusted family member</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Trusted Contact */}
      <div className="mb-5">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Safety</h2>
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <button className="p-4 flex items-center justify-between w-full active:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">Trusted Contact</p>
                <p className="text-xs text-muted-foreground">Set who to call for help</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Privacy */}
      <div className="mb-5">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Privacy</h2>
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <button className="p-4 flex items-center justify-between w-full active:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">Privacy Policy</p>
                <p className="text-xs text-muted-foreground">How we protect your data</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
