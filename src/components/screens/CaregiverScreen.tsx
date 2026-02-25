import { ArrowLeft, Shield, ShieldX, ShieldAlert, Bell, User } from "lucide-react";

interface CaregiverScreenProps {
  onBack: () => void;
}

const familyMembers = [
  { name: "Mom (Margaret)", lastScan: "2 hours ago", scansThisWeek: 5, threats: 1, avatar: "M" },
  { name: "Dad (Robert)", lastScan: "1 day ago", scansThisWeek: 2, threats: 0, avatar: "R" },
];

const alertsFeed = [
  {
    id: 1,
    type: "danger" as const,
    person: "Mom (Margaret)",
    message: "High-risk scam detected: Fake IRS email asking for payment via gift cards",
    time: "Yesterday, 3:24 PM",
    resolved: true,
  },
  {
    id: 2,
    type: "suspicious" as const,
    person: "Mom (Margaret)",
    message: "Suspicious Facebook message with shortened URL from unknown sender",
    time: "2 days ago, 11:15 AM",
    resolved: false,
  },
  {
    id: 3,
    type: "safe" as const,
    person: "Dad (Robert)",
    message: "Bank notification verified as legitimate",
    time: "3 days ago, 9:42 AM",
    resolved: true,
  },
];

const alertStyles = {
  safe: { icon: Shield, bg: "bg-safe-light", color: "text-safe" },
  suspicious: { icon: ShieldAlert, bg: "bg-suspicious-light", color: "text-suspicious" },
  danger: { icon: ShieldX, bg: "bg-danger-light", color: "text-danger" },
};

const CaregiverScreen = ({ onBack }: CaregiverScreenProps) => {
  return (
    <div className="px-6 pb-6">
      {/* Header */}
      <div className="pt-4 pb-2 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display text-foreground">Family Dashboard</h1>
      </div>

      {/* Family Members */}
      <div className="mb-5">
        <h2 className="text-base font-bold font-display text-foreground mb-3">Protected Family Members</h2>
        <div className="space-y-2">
          {familyMembers.map((member) => (
            <div key={member.name} className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-primary">{member.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground">{member.name}</p>
                <p className="text-xs text-muted-foreground">Last scan: {member.lastScan}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground">{member.scansThisWeek} scans this week</span>
                  {member.threats > 0 && (
                    <span className="text-xs font-bold text-danger">{member.threats} threat found</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-2 border-2 border-dashed border-border rounded-xl p-3 text-sm font-semibold text-muted-foreground flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          <User className="w-4 h-4" />
          Add Family Member
        </button>
      </div>

      {/* Alert Settings */}
      <div className="bg-card rounded-xl p-4 shadow-card mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm font-bold text-foreground">Alert Notifications</p>
            <p className="text-xs text-muted-foreground">Get notified of high-risk scams</p>
          </div>
        </div>
        <div className="w-12 h-7 bg-primary rounded-full relative cursor-pointer">
          <div className="w-5 h-5 bg-primary-foreground rounded-full absolute right-1 top-1 shadow-sm" />
        </div>
      </div>

      {/* Alerts Feed */}
      <div>
        <h2 className="text-base font-bold font-display text-foreground mb-3">Recent Alerts</h2>
        <div className="space-y-2">
          {alertsFeed.map((alert) => {
            const style = alertStyles[alert.type];
            const AlertIcon = style.icon;
            return (
              <div key={alert.id} className="bg-card rounded-xl p-4 shadow-card">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full ${style.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <AlertIcon className={`w-4 h-4 ${style.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground">{alert.person}</p>
                    <p className="text-sm text-foreground mt-0.5">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                      {alert.resolved && (
                        <span className="text-xs font-semibold text-safe">✓ Resolved</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CaregiverScreen;
