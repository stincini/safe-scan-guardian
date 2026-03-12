import { ArrowLeft, Users, UserPlus, Activity, Bell, BellRing, Shield, Eye, FileText, MessageSquare, Phone, ChevronRight, CreditCard, Landmark, BadgeAlert, Clock, BarChart3, Repeat, ToggleLeft, X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

interface CaregiverSettingsScreenProps {
  onBack: () => void;
}

const Toggle = ({ on, onToggle, label }: { on: boolean; onToggle: () => void; label?: string }) => (
  <button
    onClick={onToggle}
    aria-label={label}
    className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ${on ? "bg-primary" : "bg-muted"}`}
  >
    <div className={`w-5 h-5 bg-primary-foreground rounded-full absolute top-1 shadow-sm transition-transform ${on ? "right-1" : "left-1"}`} />
  </button>
);

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5 px-1">{children}</h2>
);

const SettingsCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card rounded-xl shadow-card overflow-hidden mb-4">{children}</div>
);

const SettingsRow = ({ icon: Icon, title, subtitle, right, onClick, border = true, compact = false }: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onClick?: () => void;
  border?: boolean;
  compact?: boolean;
}) => {
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper
      onClick={onClick}
      className={`${compact ? "px-3 py-2.5" : "px-3 py-3"} flex items-center justify-between w-full ${onClick ? "active:bg-muted/50 transition-colors" : ""} ${border ? "border-b border-border last:border-b-0" : ""}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <Icon className="w-4 h-4 text-primary shrink-0" />
        <div className="text-left min-w-0">
          <p className="text-[13px] font-semibold text-foreground">{title}</p>
          {subtitle && <p className="text-[11px] text-muted-foreground leading-snug">{subtitle}</p>}
        </div>
      </div>
      {right || (onClick && <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />)}
    </Wrapper>
  );
};

const ThresholdChip = ({ value, active, onSelect }: { value: string; active: boolean; onSelect: () => void }) => (
  <button
    onClick={onSelect}
    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
      active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
    }`}
  >
    {value}
  </button>
);

const CaregiverSettingsScreen = ({ onBack }: CaregiverSettingsScreenProps) => {
  const [showInviteFlow, setShowInviteFlow] = useState(false);
  const [inviteStep, setInviteStep] = useState<"phone" | "sending" | "sent">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [threshold, setThreshold] = useState<number>(75);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [giftCard, setGiftCard] = useState(true);
  const [bankImpersonation, setBankImpersonation] = useState(true);
  const [govImpersonation, setGovImpersonation] = useState(true);
  const [callShortcut, setCallShortcut] = useState(false);
  const [viewFullMessage, setViewFullMessage] = useState(false);

  const riskEvents = [
    { day: "Mon", count: 2, category: "Gift card" },
    { day: "Tue", count: 0, category: null },
    { day: "Wed", count: 1, category: "Bank scam" },
    { day: "Thu", count: 3, category: "Phishing" },
    { day: "Fri", count: 0, category: null },
    { day: "Sat", count: 1, category: "Gov impersonation" },
    { day: "Sun", count: 0, category: null },
  ];

  const templates = [
    "Don't send any money — I'll look into this for you.",
    "This looks like a scam. Please don't click any links.",
    "I'm checking with the bank. Don't share any info yet.",
  ];

  return (
    <div className="px-4 pb-6">
      {/* Header */}
      <div className="pt-4 pb-3 flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-card shadow-card flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div>
          <h1 className="text-base font-bold font-display text-foreground">Caregiver Settings</h1>
          <p className="text-[11px] text-muted-foreground">Monitor and protect your loved ones</p>
        </div>
      </div>

      {/* Linked Accounts */}
      <SectionHeader>Linked Accounts</SectionHeader>
      <SettingsCard>
        <SettingsRow
          icon={Users}
          title="Margaret J."
          subtitle="Last active: 2 hours ago"
          onClick={() => {}}
          compact
        />
        <SettingsRow
          icon={UserPlus}
          title="Add Protected Account"
          subtitle="Link another family member"
          onClick={() => { setShowInviteFlow(true); setInviteStep("phone"); setPhoneNumber(""); setRecipientName(""); }}
          compact
          border={false}
        />
      </SettingsCard>

      {/* Alert Threshold Controls */}
      <SectionHeader>Alert Thresholds</SectionHeader>
      <SettingsCard>
        <div className="px-3 py-3">
          <div className="flex items-center gap-2 mb-2">
            <BellRing className="w-4 h-4 text-primary" />
            <p className="text-[13px] font-semibold text-foreground">Notify when risk exceeds</p>
          </div>
          <div className="flex gap-2 mb-3">
            <ThresholdChip value="60+" active={threshold === 60} onSelect={() => setThreshold(60)} />
            <ThresholdChip value="75+" active={threshold === 75} onSelect={() => setThreshold(75)} />
            <ThresholdChip value="90+" active={threshold === 90} onSelect={() => setThreshold(90)} />
          </div>
          <div className="flex items-center gap-4 pt-1 border-t border-border">
            <label className="flex items-center gap-2 text-[12px] text-foreground">
              <input type="checkbox" checked={pushNotifs} onChange={() => setPushNotifs(!pushNotifs)} className="rounded border-border accent-primary w-3.5 h-3.5" />
              Push
            </label>
            <label className="flex items-center gap-2 text-[12px] text-foreground">
              <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} className="rounded border-border accent-primary w-3.5 h-3.5" />
              Email
            </label>
          </div>
        </div>
      </SettingsCard>

      {/* Risk Monitoring — 7-day mini view */}
      <SectionHeader>Risk Monitoring (7 Days)</SectionHeader>
      <SettingsCard>
        <div className="px-3 py-3">
          <div className="flex items-end gap-1.5 mb-2">
            {riskEvents.map((e) => (
              <div key={e.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-sm transition-all ${e.count > 0 ? "bg-destructive/70" : "bg-muted"}`}
                  style={{ height: `${Math.max(e.count * 10, 4)}px` }}
                />
                <span className="text-[9px] text-muted-foreground">{e.day}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 pt-2 border-t border-border">
            {["Gift card", "Bank scam", "Phishing", "Gov impersonation"].map((cat) => (
              <span key={cat} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{cat}</span>
            ))}
          </div>
        </div>
        <SettingsRow
          icon={Repeat}
          title="Repeat Sender Flags"
          subtitle="3 flagged this week"
          onClick={() => {}}
          compact
          border={false}
        />
      </SettingsCard>

      {/* Intervention Settings */}
      <SectionHeader>Intervention Settings</SectionHeader>
      <SettingsCard>
        <SettingsRow icon={CreditCard} title="Gift Card Requests" right={<Toggle on={giftCard} onToggle={() => setGiftCard(!giftCard)} label="Gift card alerts" />} compact />
        <SettingsRow icon={Landmark} title="Bank Impersonation" right={<Toggle on={bankImpersonation} onToggle={() => setBankImpersonation(!bankImpersonation)} label="Bank impersonation" />} compact />
        <SettingsRow icon={BadgeAlert} title="Gov. Impersonation" right={<Toggle on={govImpersonation} onToggle={() => setGovImpersonation(!govImpersonation)} label="Gov impersonation" />} compact />
        <SettingsRow icon={Phone} title="Call Immediately Shortcut" subtitle="Speed-dial when urgent" right={<Toggle on={callShortcut} onToggle={() => setCallShortcut(!callShortcut)} label="Call shortcut" />} compact border={false} />
      </SettingsCard>

      {/* Data Permissions */}
      <SectionHeader>Data Permissions</SectionHeader>
      <SettingsCard>
        <SettingsRow
          icon={Eye}
          title="View Full Message Text"
          subtitle="Requires protected user's consent"
          right={<Toggle on={viewFullMessage} onToggle={() => setViewFullMessage(!viewFullMessage)} label="View full message" />}
          compact
        />
        <SettingsRow
          icon={Shield}
          title="Consent History"
          subtitle="View audit log of permissions"
          onClick={() => {}}
          compact
          border={false}
        />
      </SettingsCard>

      {/* Communication Templates */}
      <SectionHeader>Quick Responses</SectionHeader>
      <SettingsCard>
        {templates.map((t, i) => (
          <div key={i} className={`px-3 py-2.5 flex items-start gap-2.5 ${i < templates.length - 1 ? "border-b border-border" : ""}`}>
            <MessageSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[12px] text-foreground leading-snug">{t}</p>
          </div>
        ))}
        <button className="px-3 py-2.5 w-full text-left text-[12px] font-semibold text-primary active:bg-muted/50 transition-colors">
          + Add custom template
        </button>
      </SettingsCard>

      {/* Invite via SMS Overlay */}
      {showInviteFlow && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowInviteFlow(false)} />
          <div className="relative bg-card rounded-t-2xl w-full max-w-md p-5 pb-8 shadow-xl animate-in slide-in-from-bottom duration-300">
            {inviteStep === "phone" && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold font-display text-foreground">Invite via Text Message</h3>
                  <button onClick={() => setShowInviteFlow(false)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-[12px] text-muted-foreground mb-4">
                  Send an invite to your loved one's phone. They'll receive a link to download and set up Pappy.
                </p>
                <div className="space-y-3 mb-5">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Their Name</label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Mom, Dad, Grandma"
                      className="w-full px-3 py-2.5 rounded-xl bg-muted text-[13px] text-foreground placeholder:text-muted-foreground border-none outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Phone Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2.5 rounded-xl bg-muted text-[13px] text-foreground placeholder:text-muted-foreground border-none outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
                <button
                  disabled={phoneNumber.length < 7 || recipientName.length < 1}
                  onClick={() => {
                    setInviteStep("sending");
                    setTimeout(() => setInviteStep("sent"), 2000);
                  }}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-40 active:scale-[0.98] transition-all"
                >
                  <Send className="w-4 h-4" />
                  Send Invite
                </button>
              </>
            )}

            {inviteStep === "sending" && (
              <div className="flex flex-col items-center py-8 gap-3">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm font-semibold text-foreground">Sending invite to {recipientName}…</p>
                <p className="text-[11px] text-muted-foreground">{phoneNumber}</p>
              </div>
            )}

            {inviteStep === "sent" && (
              <div className="flex flex-col items-center py-6 gap-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-primary" />
                </div>
                <p className="text-base font-bold text-foreground">Invite Sent!</p>
                <p className="text-[12px] text-muted-foreground text-center leading-snug max-w-[260px]">
                  {recipientName} will receive a text at {phoneNumber} with a link to set up Pappy.
                </p>
                <button
                  onClick={() => setShowInviteFlow(false)}
                  className="mt-3 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold active:scale-[0.98] transition-transform"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CaregiverSettingsScreen;
