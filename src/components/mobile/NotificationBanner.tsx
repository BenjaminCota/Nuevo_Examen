import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, X, Flame, Dumbbell, Scale, Activity } from 'lucide-react';

export const NotificationBanner: React.FC = () => {
  const { activeBanner, dismissBanner, setActiveTab } = useApp();

  if (!activeBanner) return null;

  const getIcon = () => {
    switch (activeBanner.type) {
      case 'workout':
        return <Flame className="w-4 h-4 text-orange-400" />;
      case 'coach':
        return <Dumbbell className="w-4 h-4 text-emerald-400" />;
      case 'weight':
        return <Scale className="w-4 h-4 text-cyan-400" />;
      case 'sensor':
        return <Activity className="w-4 h-4 text-lime-400" />;
      case 'steps':
        return <Activity className="w-4 h-4 text-emerald-400" />;
      default:
        return <Bell className="w-4 h-4 text-emerald-400" />;
    }
  };

  const handleClick = () => {
    if (activeBanner.type === 'coach') {
      setActiveTab('coach');
    } else if (activeBanner.type === 'weight') {
      setActiveTab('goals');
    } else {
      setActiveTab('dashboard');
    }
    dismissBanner();
  };

  return (
    <div className="absolute top-12 left-3 right-3 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div
        onClick={handleClick}
        className="bg-slate-900/95 text-slate-100 p-3.5 rounded-2xl border border-slate-700/60 shadow-2xl backdrop-blur-md flex items-start gap-3 cursor-pointer hover:border-emerald-500/40 transition-colors"
      >
        <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className="text-[11px] font-semibold tracking-wide text-emerald-400 uppercase">
              FitTrack · Ahora
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dismissBanner();
              }}
              className="text-slate-400 hover:text-slate-200 p-1 rounded-md"
              aria-label="Cerrar notificación"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <h4 className="text-xs font-bold text-white truncate">{activeBanner.title}</h4>
          <p className="text-[11px] text-slate-300 leading-tight mt-0.5 line-clamp-2">
            {activeBanner.body}
          </p>
        </div>
      </div>
    </div>
  );
};
