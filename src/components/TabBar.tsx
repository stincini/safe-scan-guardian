import { Home, BookOpen, Users, Shield } from "lucide-react";

type Tab = "home" | "scan-result" | "education" | "caregiver";

interface TabBarProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "scan-result" as const, label: "Scan", icon: Shield },
  { id: "education" as const, label: "Learn", icon: BookOpen },
  { id: "caregiver" as const, label: "Family", icon: Users },
];

const TabBar = ({ active, onChange }: TabBarProps) => {
  return (
    <div className="sticky bottom-0 bg-card/95 backdrop-blur-md border-t border-border px-2 pb-6 pt-2 shrink-0">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] ${isActive ? "font-bold" : "font-medium"}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
