import { useState } from "react";
import { ArrowLeft, Shield, TrendingUp, AlertTriangle, BookOpen, Radio, ChevronDown, ChevronUp } from "lucide-react";

interface RiskDashboardScreenProps {
  onBack: () => void;
}

type SourceId = "ftc" | "aarp" | "reddit" | "ic3" | "app";

const sourceLabels: Record<SourceId, { name: string; color: string }> = {
  ftc: { name: "FTC", color: "text-blue-500" },
  aarp: { name: "AARP", color: "text-red-500" },
  reddit: { name: "Reddit", color: "text-orange-500" },
  ic3: { name: "IC3", color: "text-purple-500" },
  app: { name: "Pappy", color: "text-primary" },
};

const riskLevel = {
  level: "medium" as const,
  label: "Medium Risk",
  score: 62,
  description: "IRS-themed scam emails are surging this week. Be extra cautious with any message about taxes or payments.",
};

const riskStyles = {
  low: { bg: "bg-safe-light", text: "text-safe", barColor: "bg-safe" },
  medium: { bg: "bg-suspicious-light", text: "text-suspicious", barColor: "bg-suspicious" },
  high: { bg: "bg-danger-light", text: "text-danger", barColor: "bg-danger" },
};

const pulseFeeds = [
  { id: "ftc" as SourceId, status: "live" as const, lastUpdate: "12 min ago", items: 847 },
  { id: "aarp" as SourceId, status: "live" as const, lastUpdate: "34 min ago", items: 23 },
  { id: "reddit" as SourceId, status: "live" as const, lastUpdate: "3 min ago", items: 156 },
  { id: "ic3" as SourceId, status: "synced" as const, lastUpdate: "2 days ago", items: 12 },
  { id: "app" as SourceId, status: "live" as const, lastUpdate: "Just now", items: 38 },
];

const trendingThreats = [
  {
    id: 1,
    title: "IRS Tax Refund Emails",
    type: "Authority Impersonation",
    change: "+45%",
    risk: "danger" as const,
    sources: ["ftc", "aarp", "app"] as SourceId[],
  },
  {
    id: 2,
    title: "Gift Card Payment Requests",
    type: "Financial Manipulation",
    change: "+22%",
    risk: "danger" as const,
    sources: ["ftc", "reddit"] as SourceId[],
  },
  {
    id: 3,
    title: "Package Delivery Texts",
    type: "Phishing Link",
    change: "+18%",
    risk: "suspicious" as const,
    sources: ["reddit", "app"] as SourceId[],
  },
  {
    id: 4,
    title: "Grandchild Emergency Calls",
    type: "Emotional Manipulation",
    change: "+12%",
    risk: "danger" as const,
    sources: ["aarp", "ic3", "ftc"] as SourceId[],
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
  const [showSources, setShowSources] = useState(false);

  return (
    <div className="px-6 pb-6">
      {/* Header */}
      <div className="pt-4 pb-2 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display text-foreground">Risk Intelligence</h1>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safe opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-safe" />
          </span>
          <span className="text-[10px] font-semibold text-safe uppercase tracking-wide">Live</span>
        </div>
      </div>

      {/* Risk Level Card */}
      <div className={`${style.bg} rounded-2xl p-5 mb-3 animate-scale-in`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center">
            <Shield className="w-6 h-6 text-suspicious" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Combined Risk Level</p>
            <h2 className={`text-xl font-bold font-display ${style.text}`}>{riskLevel.label}</h2>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-bold font-display ${style.text}`}>{riskLevel.score}</span>
            <p className="text-[10px] text-muted-foreground">/100</p>
          </div>
        </div>
        <div className="h-2.5 bg-card rounded-full overflow-hidden mb-3">
          <div className={`h-full ${style.barColor} rounded-full transition-all duration-1000`} style={{ width: `${riskLevel.score}%` }} />
        </div>
        <p className="text-sm text-foreground leading-relaxed">{riskLevel.description}</p>
      </div>

      {/* Live Pulse Monitor - Collapsible */}
      <button
        onClick={() => setShowSources(!showSources)}
        className="w-full bg-card rounded-xl p-3 shadow-card mb-3 active:scale-[0.99] transition-transform"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold font-display text-foreground">Live Pulse Monitor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              {pulseFeeds.map((feed) => (
                <span
                  key={feed.id}
                  className={`w-5 h-5 rounded-full bg-card border-2 border-card flex items-center justify-center text-[7px] font-bold ${sourceLabels[feed.id].color}`}
                  title={sourceLabels[feed.id].name}
                >
                  {sourceLabels[feed.id].name.charAt(0)}
                </span>
              ))}
            </div>
            {showSources ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>

        {showSources && (
          <div className="mt-3 space-y-2 text-left" onClick={(e) => e.stopPropagation()}>
            {pulseFeeds.map((feed) => (
              <div key={feed.id} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <span className={`relative flex h-1.5 w-1.5 ${feed.status === "live" ? "" : "opacity-50"}`}>
                    {feed.status === "live" && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safe opacity-75" />}
                    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${feed.status === "live" ? "bg-safe" : "bg-muted-foreground"}`} />
                  </span>
                  <span className={`text-xs font-semibold ${sourceLabels[feed.id].color}`}>
                    {sourceLabels[feed.id].name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground">{feed.items} signals</span>
                  <span className="text-[10px] text-muted-foreground">{feed.lastUpdate}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </button>

      {/* Trending Threats */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-base font-bold font-display text-foreground">Trending This Week</h2>
        </div>
        <div className="space-y-2">
          {trendingThreats.map((threat) => (
            <div key={threat.id} className="bg-card rounded-xl p-3.5 shadow-card">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${threatRiskStyles[threat.risk]}`}>
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{threat.title}</p>
                  <p className="text-xs text-muted-foreground">{threat.type}</p>
                </div>
                <span className="text-xs font-bold text-danger shrink-0">{threat.change}</span>
              </div>
              <div className="flex items-center gap-1 mt-2 ml-12">
                {threat.sources.map((src) => (
                  <span key={src} className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-muted ${sourceLabels[src].color}`}>
                    {sourceLabels[src].name}
                  </span>
                ))}
              </div>
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
