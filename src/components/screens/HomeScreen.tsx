import { Camera, Image, ChevronRight, AlertTriangle, TrendingUp, HandMetal } from "lucide-react";
import PappyAssistant from "@/components/PappyAssistant";

interface HomeScreenProps {
  onScan: () => void;
  onEducation: () => void;
  onCaregiver: () => void;
  onDashboard: () => void;
}

const recentScans = [
  { id: 1, source: "Text Message", verdict: "safe" as const, summary: "Message from your bank — verified", time: "2 hrs ago" },
  { id: 2, source: "Email", verdict: "danger" as const, summary: "Fake IRS notice asking for payment", time: "Yesterday" },
  { id: 3, source: "Facebook", verdict: "suspicious" as const, summary: "Unknown friend request with link", time: "2 days ago" },
];

const verdictStyles = {
  safe: "bg-safe-light text-safe",
  suspicious: "bg-suspicious-light text-suspicious",
  danger: "bg-danger-light text-danger",
};

const verdictLabels = {
  safe: "Safe",
  suspicious: "Suspicious",
  danger: "Scam",
};

const trendingScams = [
  "IRS impersonation emails",
  "Gift card payment requests",
  "Grandchild emergency calls",
];

const HomeScreen = ({ onScan, onEducation, onCaregiver, onDashboard }: HomeScreenProps) => {
  return (
    <div className="px-6 pb-6">
      {/* Header */}
      <div className="pt-4 pb-4">
        <div>
          <h1 className="text-xl font-bold font-display text-foreground">Pappy</h1>
          <p className="text-sm text-muted-foreground">You're protected</p>
        </div>
      </div>

      {/* Pappy Assistant */}
      <div className="mb-4">
        <PappyAssistant state="greeting" size="md" />
      </div>

      {/* Before You Click — Primary CTA */}
      <button
        onClick={onScan}
        className="w-full bg-primary text-primary-foreground rounded-2xl p-6 shadow-soft active:scale-[0.98] transition-transform mb-4"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <HandMetal className="w-8 h-8" />
          </div>
          <span className="text-xl font-bold font-display">Before You Click, Check Here</span>
          <span className="text-sm opacity-80">No rush. Let's make sure it's safe first.</span>
        </div>
      </button>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button onClick={onScan} className="bg-card rounded-xl p-4 shadow-card flex flex-col items-center gap-2 active:scale-[0.98] transition-transform">
          <Camera className="w-6 h-6 text-primary" />
          <span className="text-sm font-semibold text-foreground">Take Photo</span>
        </button>
        <button onClick={onScan} className="bg-card rounded-xl p-4 shadow-card flex flex-col items-center gap-2 active:scale-[0.98] transition-transform">
          <Image className="w-6 h-6 text-primary" />
          <span className="text-sm font-semibold text-foreground">From Photos</span>
        </button>
      </div>

      {/* Risk Intelligence Dashboard Card */}
      <button
        onClick={onDashboard}
        className="w-full bg-card rounded-2xl p-4 shadow-card mb-4 active:scale-[0.98] transition-transform text-left"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold font-display text-foreground">Today's Scam Risk</h2>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-suspicious-light text-suspicious">
            Medium
          </span>
        </div>
        <div className="flex items-start gap-3 mb-3">
          <AlertTriangle className="w-5 h-5 text-suspicious shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            IRS-themed scams are surging this week. Stay alert for emails claiming you owe back taxes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-1.5">
            {trendingScams.map((scam) => (
              <span key={scam} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {scam}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end mt-2">
          <span className="text-xs font-semibold text-primary">View full dashboard</span>
          <ChevronRight className="w-3.5 h-3.5 text-primary" />
        </div>
      </button>

      {/* Recent Scans */}
      <div className="mb-4">
        <h2 className="text-base font-bold font-display text-foreground mb-3">Recent Scans</h2>
        <div className="space-y-2">
          {recentScans.map((scan) => (
            <div
              key={scan.id}
              className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${verdictStyles[scan.verdict]}`}>
                {verdictLabels[scan.verdict]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{scan.summary}</p>
                <p className="text-xs text-muted-foreground">{scan.source} · {scan.time}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="space-y-2">
        <button onClick={onEducation} className="w-full bg-card rounded-xl p-4 shadow-card flex items-center justify-between active:scale-[0.98] transition-transform">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">Learn About Scams</p>
              <p className="text-xs text-muted-foreground">Short, easy lessons</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
        <button onClick={onCaregiver} className="w-full bg-card rounded-xl p-4 shadow-card flex items-center justify-between active:scale-[0.98] transition-transform">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👨‍👩‍👧</span>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">Family Dashboard</p>
              <p className="text-xs text-muted-foreground">Keep your loved ones safe</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
