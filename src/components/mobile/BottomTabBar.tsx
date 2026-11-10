import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Target, Dumbbell, User, Sparkles } from 'lucide-react';

export const BottomTabBar: React.FC = () => {
  const { activeTab, setActiveTab, isDarkMode, profile } = useApp();

  const tabs = [
    {
      id: 'dashboard' as const,
      label: 'Resumen',
      icon: LayoutDashboard,
      badge: false,
    },
    {
      id: 'goals' as const,
      label: 'Metas',
      icon: Target,
      badge: false,
    },
    {
      id: 'coach' as const,
      label: 'Entrenador',
      icon: Dumbbell,
      badge: profile.subscription.status === 'active',
    },
    {
      id: 'profile' as const,
      label: 'Mi Perfil',
      icon: User,
      badge: false,
    },
  ];

  return (
    <nav
      aria-label="Navegación principal inferior"
      className={`relative z-40 border-t ${
        isDarkMode
          ? 'bg-slate-900/95 border-slate-800/80 backdrop-blur-lg'
          : 'bg-white/95 border-slate-200/80 backdrop-blur-lg shadow-lg'
      } px-3 py-1.5`}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-w-[56px] min-h-[48px] flex flex-col items-center justify-center relative transition-all duration-200 rounded-xl group ${
                isActive
                  ? 'text-emerald-500 font-semibold'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {/* Icon Container with active highlight */}
              <div
                className={`relative p-1 rounded-xl transition-all ${
                  isActive ? 'bg-emerald-500/10' : 'group-hover:bg-slate-800/20'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />

                {/* Badge if active coach */}
                {tab.badge && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
                )}
              </div>

              {/* Label */}
              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>

              {/* Active pill dot */}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-0.5 transition-all" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
