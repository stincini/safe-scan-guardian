import { ArrowLeft, Shield, TrendingUp, AlertTriangle, BookOpen, ChevronRight } from "lucide-react";

interface RiskDashboardScreenProps {
  onBack: () => void;
}

const riskLevel = {
  level: "medium" as const,
  label: "Medium Risk",
  description: "There's been a spike in IRS-themed scam emails this week. Be extra cautious with any message about taxes or payments.",
};

const riskStyles = {
  low: { bg: "bg-safe-light", text: "text-safe", barWidth: "33%" },
  medium: { bg: "bg-suspicious-light", text: "text-suspicious", barWidth: "60%" },
  high: { bg: "bg-danger-light", text: "text-danger", barWidth: "90%" },
};

const trendingThreats = [
  {
    id: 1,
    title: "IRS Tax Refund Emails",
    type: "Authority Impersonation",
    change: "+45%",
    risk: "danger" as const,
  },
  {
    id: 2,
    title: "Gift Card Payment Requests",
    type: "Financial Manipulation",
    change: "+22%",
    risk: "danger" as const,
  },
  {
    id: 3,
    title: "Package Delivery Texts",
    type: "Phishing Link",
    change: "+18%",
    risk: "suspicious" as const,
  },
  {
    id: 4,
    title: "Grandchild Emergency Calls",
    type: "Emotional Manipulation",
    change: "+12%",
    risk: "danger" as const,
  },
];

const safetyTips = [
  { emoji: "🔗", tip: "Never click links in unexpected messages, even if they look official." },
  { emoji: "📞", tip: "If someone claims to be from your bank, hang up and call the number on your card." },
  { emoji: "🎁", tip: "No real company or government agency asks for gift cards as payment." },
  { emoji: "⏰", tip: "Scammers create urgency. Real deadlines give you time to verify." },
];

const threatRiskStyles = {
  suspicious: "bg-suspicious-light text-suspicious",
  danger: "bg-danger-light text-danger",
};

const RiskDashboardScreen = ({ onBack }: RiskDashboardScreenProps) => {
  const style = riskStyles[riskLevel.level];

  return (
    <div className="px-6 pb-6">
      {/* Header */}
      <div className="pt-4 pb-2 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display text-foreground">Risk Intelligence</h1>
      </div>

      {/* Risk Level Card */}
      <div className={`${style.bg} rounded-2xl p-5 mb-4 animate-scale-in`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center">
            <Shield className="w-6 h-6 text-suspicious" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Today's Risk Level</p>
            <h2 className={`text-xl font-bold font-display ${style.text}`}>{riskLevel.label}</h2>
          </div>
        </div>
        <div className="h-2.5 bg-card rounded-full overflow-hidden mb-3">
          <div className="h-full bg-suspicious rounded-full transition-all duration-1000" style={{ width: style.barWidth }} />
        </div>
        <p className="text-sm text-foreground leading-relaxed">{riskLevel.description}</p>
      </div>

      {/* Trending Threats */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-base font-bold font-display text-foreground">Trending This Week</h2>
        </div>
        <div className="space-y-2">
          {trendingThreats.map((threat) => (
            <div key={threat.id} className="bg-card rounded-xl p-3.5 shadow-card flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${threatRiskStyles[threat.risk]}`}>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{threat.title}</p>
                <p className="text-xs text-muted-foreground">{threat.type}</p>
              </div>
              <span className="text-xs font-bold text-danger shrink-0">{threat.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-base font-bold font-display text-foreground">Safety Tips</h2>
        </div>
        <div className="space-y-2">
          {safetyTips.map((item, i) => (
            <div key={i} className="bg-card rounded-xl p-3.5 shadow-card flex items-start gap-3">
              <span className="text-xl shrink-0">{item.emoji}</span>
              <p className="text-sm text-foreground leading-relaxed">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskDashboardScreen;
