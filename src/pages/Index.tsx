import { useState, useCallback } from "react";
import IPhoneFrame from "@/components/IPhoneFrame";
import TabBar from "@/components/TabBar";
import HomeScreen from "@/components/screens/HomeScreen";
import ScanningScreen from "@/components/screens/ScanningScreen";
import ScanResultScreen from "@/components/screens/ScanResultScreen";
import EducationScreen from "@/components/screens/EducationScreen";
import CaregiverScreen from "@/components/screens/CaregiverScreen";

type Tab = "home" | "scanning" | "scan-result" | "education" | "caregiver";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const handleScanComplete = useCallback(() => {
    setActiveTab("scan-result");
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            onScan={() => setActiveTab("scanning")}
            onEducation={() => setActiveTab("education")}
            onCaregiver={() => setActiveTab("caregiver")}
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
      default:
        return null;
    }
  };

  return (
    <IPhoneFrame>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">{renderScreen()}</div>
        <TabBar active={activeTab} onChange={setActiveTab} />
      </div>
    </IPhoneFrame>
  );
};

export default Index;
