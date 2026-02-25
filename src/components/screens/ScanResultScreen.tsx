import { Shield, ShieldAlert, ShieldX, AlertTriangle, Phone, Ban, Flag, ArrowLeft, ExternalLink } from "lucide-react";

type Verdict = "safe" | "suspicious" | "danger";

interface ScanResultScreenProps {
  onBack: () => void;
  verdict?: Verdict;
}

const verdictConfig = {
  safe: {
    icon: Shield,
    label: "This looks safe",
    color: "text-safe",
    bg: "bg-safe",
    bgLight: "bg-safe-light",
    explanation: "We checked this message and didn't find any signs of a scam. The sender appears legitimate and no suspicious links were detected.",
    riskScore: 12,
  },
  suspicious: {
    icon: ShieldAlert,
    label: "Be careful",
    color: "text-suspicious",
    bg: "bg-suspicious",
    bgLight: "bg-suspicious-light",
    explanation: "This message has some warning signs. It uses urgency language and contains a shortened URL that we couldn't fully verify. Proceed with caution.",
    riskScore: 62,
  },
  danger: {
    icon: ShieldX,
    label: "Likely a scam",
    color: "text-danger",
    bg: "bg-danger",
    bgLight: "bg-danger-light",
    explanation: 'This message is likely a scam because it impersonates the IRS, creates urgency ("act within 24 hours"), and asks you to send money via gift cards. The IRS never contacts people this way.',
    riskScore: 94,
  },
};

const flags = [
  { icon: AlertTriangle, label: "Uses urgency language", detail: '"Act now or your account will be closed"' },
  { icon: Flag, label: "Impersonates authority", detail: "Claims to be from the IRS" },
  { icon: ExternalLink, label: "Suspicious link detected", detail: "ir5-gov.payment-verify.com" },
  { icon: Ban, label: "Asks for gift card payment", detail: "Legitimate agencies never ask for gift cards" },
];

const ScanResultScreen = ({ onBack, verdict = "danger" }: ScanResultScreenProps) => {
  const config = verdictConfig[verdict];
  const Icon = config.icon;

  return (
    <div className="px-6 pb-6">
      {/* Header */}
      <div className="pt-4 pb-2 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display text-foreground">Scan Result</h1>
      </div>

      {/* Verdict Card */}
      <div className={`${config.bgLight} rounded-2xl p-6 mb-4 animate-scale-in`}>
        <div className="flex flex-col items-center text-center gap-3">
          <div className={`w-20 h-20 rounded-full ${config.bg} flex items-center justify-center`}>
            <Icon className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className={`text-2xl font-bold font-display ${config.color}`}>{config.label}</h2>
          
          {/* Risk meter */}
          <div className="w-full max-w-[200px]">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Low risk</span>
              <span>High risk</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${config.bg} rounded-full transition-all duration-1000`}
                style={{ width: `${config.riskScore}%` }}
              />
            </div>
            <p className={`text-sm font-bold mt-1 ${config.color}`}>Risk score: {config.riskScore}/100</p>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-card rounded-xl p-4 shadow-card mb-4 animate-slide-up">
        <h3 className="text-base font-bold font-display text-foreground mb-2">What we found</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{config.explanation}</p>
      </div>

      {/* Warning flags */}
      {verdict !== "safe" && (
        <div className="mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h3 className="text-base font-bold font-display text-foreground mb-3">Warning signs</h3>
          <div className="space-y-2">
            {flags.map((flag, i) => (
              <div key={i} className="bg-card rounded-xl p-3 shadow-card flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-danger-light flex items-center justify-center shrink-0 mt-0.5">
                  <flag.icon className="w-4 h-4 text-danger" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{flag.label}</p>
                  <p className="text-xs text-muted-foreground">{flag.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What to do */}
      <div className="bg-card rounded-xl p-4 shadow-card mb-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <h3 className="text-base font-bold font-display text-foreground mb-3">What to do next</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-danger-light flex items-center justify-center shrink-0 mt-0.5">
              <Ban className="w-3 h-3 text-danger" />
            </div>
            <p className="text-sm text-foreground"><strong>Do not click</strong> any links in this message</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-danger-light flex items-center justify-center shrink-0 mt-0.5">
              <Ban className="w-3 h-3 text-danger" />
            </div>
            <p className="text-sm text-foreground"><strong>Do not send</strong> money or gift cards</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-safe-light flex items-center justify-center shrink-0 mt-0.5">
              <Flag className="w-3 h-3 text-safe" />
            </div>
            <p className="text-sm text-foreground"><strong>Block</strong> the sender</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-safe-light flex items-center justify-center shrink-0 mt-0.5">
              <Flag className="w-3 h-3 text-safe" />
            </div>
            <p className="text-sm text-foreground"><strong>Report</strong> to FTC at reportfraud.ftc.gov</p>
          </div>
        </div>
      </div>

      {/* Call trusted contact */}
      <button className="w-full bg-primary text-primary-foreground rounded-xl p-4 flex items-center justify-center gap-2 font-bold text-base active:scale-[0.98] transition-transform shadow-soft">
        <Phone className="w-5 h-5" />
        Call My Trusted Contact
      </button>
    </div>
  );
};

export default ScanResultScreen;
