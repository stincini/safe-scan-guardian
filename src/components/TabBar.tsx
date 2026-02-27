import { Home, BookOpen, Users, Settings, BarChart3 } from "lucide-react";
import type { AppMode } from "@/components/screens/PrivacyOnboardingScreen";

type Tab = "home" | "scanning" | "scan-result" | "education" | "caregiver" | "dashboard" | "privacy-onboarding" | "caregiver-onboarding" | "settings" | "quiz" | "lesson";

interface TabBarProps {
  active: Tab;
  onChange: (tab: Tab) => void;
  mode: AppMode;
}

const protectedTabs = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "dashboard" as const, label: "Risk", icon: BarChart3 },
  { id: "education" as const, label: "Learn", icon: BookOpen },
  { id: "caregiver" as const, label: "Caregiver", icon: Users },
  { id: "settings" as const, label: "Settings", icon: Settings },
];

const caregiverTabs = [
  { id: "caregiver" as const, label: "Dashboard", icon: Home },
  { id: "dashboard" as const, label: "Risk", icon: BarChart3 },
  { id: "settings" as const, label: "Settings", icon: Settings },
];

const TabBar = ({ active, onChange, mode }: TabBarProps) => {
  const tabs = mode === "caregiver" ? caregiverTabs : protectedTabs;

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
