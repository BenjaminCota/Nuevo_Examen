import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Smartphone,
  Palette,
  Sun,
  Moon,
  RotateCcw,
  Bell,
  Sparkles,
  Layers
} from 'lucide-react';

export const HeaderNav: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    deviceType,
    setDeviceType,
    isDarkMode,
    toggleDarkMode,
    setIsOnboardingOpen,
    triggerPushNotification,
    resetDemoData,
  } = useApp();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#080D1A]/90 backdrop-blur-md px-4 py-3 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 p-0.5 shadow-md flex items-center justify-center text-slate-950 font-black text-base">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-white">FitTrack Pulse</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.2 rounded-full border border-emerald-500/20">
                UX/UI Pro
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              5 Sensores · Nutrición · Coaching $1,500/mes
            </p>
          </div>
        </div>

        {/* Center: Main View Switch (Mobile App Prototype vs Design System Studio) */}
        <div className="flex items-center p-1 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setViewMode('mobile-app')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              viewMode === 'mobile-app'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Prototipo Móvil (App)
          </button>
          <button
            onClick={() => setViewMode('design-system')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              viewMode === 'design-system'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            Sistema de Diseño & Wireframes
          </button>
        </div>

        {/* Right Actions: Frame selector, Dark/Light, Push simulation, Onboarding trigger */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Device skin switcher (when on mobile view) */}
          {viewMode === 'mobile-app' && (
            <div className="flex items-center p-0.5 bg-slate-900 rounded-xl border border-slate-800 text-[11px]">
              <button
                onClick={() => setDeviceType('iphone')}
                className={`px-2 py-1 rounded-lg font-semibold transition-colors ${
                  deviceType === 'iphone' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="iPhone 16 Pro Frame"
              >
                iPhone
              </button>
              <button
                onClick={() => setDeviceType('android')}
                className={`px-2 py-1 rounded-lg font-semibold transition-colors ${
                  deviceType === 'android' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Android Frame"
              >
                Android
              </button>
              <button
                onClick={() => setDeviceType('fluid')}
                className={`px-2 py-1 rounded-lg font-semibold transition-colors ${
                  deviceType === 'fluid' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Sin Bisel (Fluido)"
              >
                Canvas
              </button>
            </div>
          )}

          {/* Test Push trigger */}
          <button
            onClick={() =>
              triggerPushNotification(
                '¡Hora de hidratarte!',
                'Has quemado 612 kcal hoy. Mantén tus electrolitos balanceados para la sesión de pierna.',
                'nutrition'
              )
            }
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-orange-400 border border-slate-800 transition-colors"
            title="Disparar Push Notification de prueba"
            aria-label="Simular notificación push"
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* Launch Onboarding Stepper */}
          <button
            onClick={() => {
              setViewMode('mobile-app');
              setIsOnboardingOpen(true);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Ver flujo de Onboarding y Registro"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Onboarding
          </button>

          {/* Light/Dark Mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            title={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            aria-label="Cambiar tema"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Reset button */}
          <button
            onClick={resetDemoData}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Reiniciar datos de demo"
            aria-label="Reiniciar datos"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
