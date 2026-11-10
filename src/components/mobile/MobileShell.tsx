import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NotificationBanner } from './NotificationBanner';
import { BottomTabBar } from './BottomTabBar';
import { DashboardModule } from './DashboardModule';
import { GoalsNutritionalModule } from './GoalsNutritionalModule';
import { CoachModule } from './CoachModule';
import { ProfileModule } from './ProfileModule';
import { OnboardingFlow } from './OnboardingFlow';
import { Wifi, Battery, Signal, Sparkles } from 'lucide-react';

export const MobileShell: React.FC = () => {
  const {
    activeTab,
    deviceType,
    isDarkMode,
    isOnboardingOpen,
    setIsOnboardingOpen,
  } = useApp();

  const [currentTime, setCurrentTime] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderActiveScreen = () => {
    if (isOnboardingOpen) {
      return <OnboardingFlow onClose={() => setIsOnboardingOpen(false)} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardModule />;
      case 'goals':
        return <GoalsNutritionalModule />;
      case 'coach':
        return <CoachModule />;
      case 'profile':
        return <ProfileModule />;
      default:
        return <DashboardModule />;
    }
  };

  const isFluid = deviceType === 'fluid';

  return (
    <div className="flex items-center justify-center w-full min-h-full py-4 px-2">
      {/* Device Frame Wrapper */}
      <div
        className={`relative transition-all duration-300 flex flex-col ${
          isFluid
            ? 'w-full max-w-md h-[880px] rounded-3xl shadow-2xl'
            : deviceType === 'iphone'
            ? 'w-[390px] h-[844px] rounded-[52px] ring-[12px] ring-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]'
            : 'w-[400px] h-[850px] rounded-[36px] ring-[10px] ring-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]'
        } overflow-hidden border border-slate-700/50 ${
          isDarkMode ? 'bg-[#080D1A]' : 'bg-[#F8FAFC]'
        }`}
      >
        {/* Hardware details: Side buttons for iPhone mode */}
        {!isFluid && deviceType === 'iphone' && (
          <>
            {/* Volume buttons */}
            <div className="absolute -left-[14px] top-28 w-1 h-12 bg-slate-700 rounded-l-sm" />
            <div className="absolute -left-[14px] top-44 w-1 h-12 bg-slate-700 rounded-l-sm" />
            {/* Power button */}
            <div className="absolute -right-[14px] top-36 w-1 h-16 bg-slate-700 rounded-r-sm" />
          </>
        )}

        {/* 1. STATUS BAR */}
        <div className="relative z-40 px-6 pt-3 pb-1 flex items-center justify-between text-xs select-none">
          {/* Clock */}
          <span className="font-semibold text-xs tracking-tight text-slate-300 font-mono">
            {currentTime}
          </span>

          {/* Dynamic Island / Notch */}
          {deviceType === 'iphone' && !isFluid ? (
            <div className="w-24 h-6 bg-black rounded-full flex items-center justify-center gap-2 px-2 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
              <span className="w-2 h-2 rounded-full bg-[#12243d]" />
            </div>
          ) : (
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800 shadow-inner" />
          )}

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Notification Banner Container */}
        <NotificationBanner />

        {/* 2. MAIN SCROLLABLE CONTENT VIEW */}
        <div className="flex-1 overflow-y-auto px-4 pt-1 pb-4 relative custom-scrollbar">
          {renderActiveScreen()}
        </div>

        {/* 3. BOTTOM TAB BAR (Hidden during onboarding) */}
        {!isOnboardingOpen && <BottomTabBar />}

        {/* 4. HOME INDICATOR BAR (iOS) */}
        <div className="w-full py-1.5 flex justify-center shrink-0">
          <div className="w-32 h-1 bg-slate-600/70 hover:bg-slate-400 rounded-full transition-colors" />
        </div>
      </div>
    </div>
  );
};
