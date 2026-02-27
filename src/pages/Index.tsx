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
import ProtectedSettingsScreen from "@/components/screens/ProtectedSettingsScreen";
import CaregiverSettingsScreen from "@/components/screens/CaregiverSettingsScreen";
import ScreenshotDetectionSheet from "@/components/screens/ScreenshotDetectionSheet";
import QuizOfTheDayScreen from "@/components/screens/QuizOfTheDayScreen";
import LessonDetailScreen from "@/components/screens/LessonDetailScreen";
import type { AppMode } from "@/components/screens/PrivacyOnboardingScreen";

type Tab = "home" | "scanning" | "scan-result" | "education" | "caregiver" | "dashboard" | "privacy-onboarding" | "caregiver-onboarding" | "settings" | "quiz" | "lesson";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("privacy-onboarding");
  const [appMode, setAppMode] = useState<AppMode>("protected");
  const [activeLessonId, setActiveLessonId] = useState<number>(1);
  const [showScreenshotSheet, setShowScreenshotSheet] = useState(false);

  const handleScanComplete = useCallback(() => {
    setActiveTab("scan-result");
  }, []);

  const handleOnboardingComplete = useCallback((mode: AppMode) => {
    setAppMode(mode);
    setActiveTab(mode === "caregiver" ? "caregiver" : "home");
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
        return <PrivacyOnboardingScreen onComplete={handleOnboardingComplete} />;
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
        return <EducationScreen onBack={() => setActiveTab(appMode === "caregiver" ? "caregiver" : "home")} onQuiz={() => setActiveTab("quiz")} onLesson={(id) => { setActiveLessonId(id); setActiveTab("lesson"); }} />;
      case "quiz":
        return <QuizOfTheDayScreen onBack={() => setActiveTab("education")} />;
      case "lesson":
        return <LessonDetailScreen lessonId={activeLessonId} onBack={() => setActiveTab("education")} onComplete={() => {}} />;
      case "caregiver":
        return appMode === "caregiver" ? <CaregiverScreen /> : <CaregiverScreen onBack={() => setActiveTab("home")} />;
      case "dashboard":
        return <RiskDashboardScreen onBack={() => setActiveTab("home")} />;
      case "caregiver-onboarding":
        return <CaregiverOnboardingScreen onBack={() => setActiveTab("caregiver")} onComplete={() => setActiveTab("caregiver")} />;
      case "settings":
        return appMode === "caregiver"
          ? <CaregiverSettingsScreen onBack={() => setActiveTab("caregiver")} />
          : <ProtectedSettingsScreen onBack={() => setActiveTab("home")} onCaregiverOnboarding={() => setActiveTab("caregiver-onboarding")} />;
      default:
        return null;
    }
  };

  const showTabBar = !["privacy-onboarding", "caregiver-onboarding"].includes(activeTab);

  return (
    <IPhoneFrame>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">{renderScreen()}</div>
        {showTabBar && <TabBar active={activeTab} onChange={setActiveTab} mode={appMode} />}
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
