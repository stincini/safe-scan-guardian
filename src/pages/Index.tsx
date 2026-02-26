import { useState, useCallback, useEffect, useRef } from "react";
import IPhoneFrame from "@/components/IPhoneFrame";
import TabBar from "@/components/TabBar";
import HomeScreen from "@/components/screens/HomeScreen";
import ScanningScreen from "@/components/screens/ScanningScreen";
import ScanResultScreen from "@/components/screens/ScanResultScreen";
import EducationScreen from "@/components/screens/EducationScreen";
import CaregiverScreen from "@/components/screens/CaregiverScreen";
import RiskDashboardScreen from "@/components/screens/RiskDashboardScreen";
import PrivacyOnboardingScreen from "@/components/screens/PrivacyOnboardingScreen";
import CaregiverOnboardingScreen from "@/components/screens/CaregiverOnboardingScreen";
import SettingsScreen from "@/components/screens/SettingsScreen";
import ScreenshotDetectionSheet from "@/components/screens/ScreenshotDetectionSheet";

type Tab = "home" | "scanning" | "scan-result" | "education" | "caregiver" | "dashboard" | "privacy-onboarding" | "caregiver-onboarding" | "settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("privacy-onboarding");
  const [showScreenshotSheet, setShowScreenshotSheet] = useState(false);

  const handleScanComplete = useCallback(() => {
    setActiveTab("scan-result");
  }, []);

  // Simulate screenshot detection after 8 seconds on home
  const hasShownSheet = useRef(false);
  useEffect(() => {
    if (activeTab === "home" && !hasShownSheet.current) {
      const timeout = setTimeout(() => {
        setShowScreenshotSheet(true);
        hasShownSheet.current = true;
      }, 8000);
      return () => clearTimeout(timeout);
    }
  }, [activeTab]);


  const renderScreen = () => {
    switch (activeTab) {
      case "privacy-onboarding":
        return <PrivacyOnboardingScreen onComplete={() => setActiveTab("home")} />;
      case "home":
        return (
          <HomeScreen
            onScan={() => setActiveTab("scanning")}
            onEducation={() => setActiveTab("education")}
            onCaregiver={() => setActiveTab("caregiver")}
            onDashboard={() => setActiveTab("dashboard")}
          />
        );
      case "scanning":
        return <ScanningScreen onComplete={handleScanComplete} />;
      case "scan-result":
        return <ScanResultScreen onBack={() => setActiveTab("home")} />;
      case "education":
        return <EducationScreen onBack={() => setActiveTab("home")} />;
      case "caregiver":
        return <CaregiverScreen onBack={() => setActiveTab("home")} />;
      case "dashboard":
        return <RiskDashboardScreen onBack={() => setActiveTab("home")} />;
      case "caregiver-onboarding":
        return <CaregiverOnboardingScreen onBack={() => setActiveTab("caregiver")} onComplete={() => setActiveTab("caregiver")} />;
      case "settings":
        return <SettingsScreen onBack={() => setActiveTab("home")} onCaregiverOnboarding={() => setActiveTab("caregiver-onboarding")} />;
      default:
        return null;
    }
  };

  const showTabBar = !["privacy-onboarding", "caregiver-onboarding"].includes(activeTab);

  return (
    <IPhoneFrame>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">{renderScreen()}</div>
        {showTabBar && <TabBar active={activeTab} onChange={setActiveTab} />}
      </div>
      {showScreenshotSheet && (
        <ScreenshotDetectionSheet
          onScan={() => {
            setShowScreenshotSheet(false);
            setActiveTab("scanning");
          }}
          onDismiss={() => setShowScreenshotSheet(false)}
        />
      )}
    </IPhoneFrame>
  );
};

export default Index;
