import { ArrowLeft, Users, UserPlus, Phone, Bell, Eye, Clock, Shield, Trash2, Info, Type, Contrast, Volume2, HelpCircle, AlertTriangle, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ProtectedSettingsScreenProps {
  onBack: () => void;
  onCaregiverOnboarding: () => void;
}

const Toggle = ({ on, onToggle, label }: { on: boolean; onToggle: () => void; label?: string }) => (
  <button
    onClick={onToggle}
    aria-label={label}
    className={`w-14 h-8 rounded-full relative transition-colors shrink-0 ${on ? "bg-primary" : "bg-muted"}`}
  >
    <div className={`w-6 h-6 bg-primary-foreground rounded-full absolute top-1 shadow-sm transition-transform ${on ? "right-1" : "left-1"}`} />
  </button>
);

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">{children}</h2>
);

const SettingsCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card rounded-2xl shadow-card overflow-hidden mb-5">{children}</div>
);

const SettingsRow = ({ icon: Icon, title, subtitle, right, onClick, border = true }: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onClick?: () => void;
  border?: boolean;
}) => {
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper
      onClick={onClick}
      className={`p-4 flex items-center justify-between w-full ${onClick ? "active:bg-muted/50 transition-colors" : ""} ${border ? "border-b border-border last:border-b-0" : ""}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="text-left min-w-0">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{subtitle}</p>}
        </div>
      </div>
      {right || (onClick && <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />)}
    </Wrapper>
  );
};

const ProtectedSettingsScreen = ({ onBack, onCaregiverOnboarding }: ProtectedSettingsScreenProps) => {
  const [notifyTrusted, setNotifyTrusted] = useState(true);
  const [scamAlerts, setScamAlerts] = useState(true);
  const [screenshotDetection, setScreenshotDetection] = useState(true);
  const [safetyReminders, setSafetyReminders] = useState(false);
  const [doNotStore, setDoNotStore] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [voiceReadAloud, setVoiceReadAloud] = useState(false);

  return (
    <div className="px-5 pb-8">
      {/* Header */}
      <div className="pt-4 pb-5 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-lg font-bold font-display text-foreground">Settings</h1>
          <p className="text-xs text-muted-foreground">Your preferences, your control</p>
        </div>
      </div>

      {/* Trusted People */}
      <SectionHeader>My Trusted People</SectionHeader>
      <SettingsCard>
        <SettingsRow
          icon={Users}
          title="Linked Caregiver"
          subtitle="Sarah M. is watching over you"
          onClick={() => {}}
        />
        <SettingsRow
          icon={UserPlus}
          title="Add a Trusted Contact"
          subtitle="Someone you can call for help"
          onClick={onCaregiverOnboarding}
        />
        <SettingsRow
          icon={Bell}
          title="Notify my trusted person"
          subtitle="If a serious scam is detected"
          right={<Toggle on={notifyTrusted} onToggle={() => setNotifyTrusted(!notifyTrusted)} label="Notify trusted person" />}
          border={false}
        />
      </SettingsCard>

      {/* Notifications */}
      <SectionHeader>Notifications</SectionHeader>
      <SettingsCard>
        <SettingsRow
          icon={Bell}
          title="Scam Alerts"
          subtitle="Get warned about dangerous messages"
          right={<Toggle on={scamAlerts} onToggle={() => setScamAlerts(!scamAlerts)} label="Scam alerts" />}
        />
        <SettingsRow
          icon={Eye}
          title="Screenshot Detection"
          subtitle="Offer to scan new screenshots"
          right={<Toggle on={screenshotDetection} onToggle={() => setScreenshotDetection(!screenshotDetection)} label="Screenshot detection" />}
        />
        <SettingsRow
          icon={Clock}
          title="Safety Reminders"
          subtitle="Gentle tips to stay safe online"
          right={<Toggle on={safetyReminders} onToggle={() => setSafetyReminders(!safetyReminders)} label="Safety reminders" />}
          border={false}
        />
      </SettingsCard>

      {/* Privacy */}
      <SectionHeader>Privacy</SectionHeader>
      <SettingsCard>
        <SettingsRow
          icon={Trash2}
          title="Delete Scan History"
          subtitle="Remove all past scan results"
          onClick={() => {}}
        />
        <SettingsRow
          icon={Shield}
          title="Don't Store Past Scans"
          subtitle="Scans are checked but never saved"
          right={<Toggle on={doNotStore} onToggle={() => setDoNotStore(!doNotStore)} label="Do not store scans" />}
        />
        <SettingsRow
          icon={Info}
          title="How Your Data Is Used"
          subtitle="We never sell or share your info"
          onClick={() => {}}
          border={false}
        />
      </SettingsCard>

      {/* Accessibility */}
      <SectionHeader>Accessibility</SectionHeader>
      <SettingsCard>
        <SettingsRow
          icon={Type}
          title="Larger Text"
          subtitle="Make everything easier to read"
          right={<Toggle on={largeText} onToggle={() => setLargeText(!largeText)} label="Large text" />}
        />
        <SettingsRow
          icon={Contrast}
          title="High Contrast"
          subtitle="Bolder colors for better visibility"
          right={<Toggle on={highContrast} onToggle={() => setHighContrast(!highContrast)} label="High contrast" />}
        />
        <SettingsRow
          icon={Volume2}
          title="Voice Read-Aloud"
          subtitle="Hear results spoken to you"
          right={<Toggle on={voiceReadAloud} onToggle={() => setVoiceReadAloud(!voiceReadAloud)} label="Voice read aloud" />}
          border={false}
        />
      </SettingsCard>

      {/* Help */}
      <SectionHeader>Help</SectionHeader>
      <SettingsCard>
        <SettingsRow
          icon={HelpCircle}
          title="Contact Support"
          subtitle="We're here to help"
          onClick={() => {}}
        />
        <SettingsRow
          icon={AlertTriangle}
          title="Report a Scam"
          subtitle="Help protect others too"
          onClick={() => {}}
        />
        <SettingsRow
          icon={Phone}
          title="Call Trusted Contact"
          subtitle="Quick dial your safe person"
          onClick={() => {}}
          border={false}
        />
      </SettingsCard>
    </div>
  );
};

export default ProtectedSettingsScreen;
