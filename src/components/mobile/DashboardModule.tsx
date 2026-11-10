import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SensorLiveWidget } from './SensorLiveWidget';
import {
  Flame,
  Route,
  Scale,
  Zap,
  TrendingDown,
  TrendingUp,
  Bell,
  Sparkles,
  ChevronRight,
  Award
} from 'lucide-react';

export const DashboardModule: React.FC = () => {
  const {
    profile,
    sensorData,
    isDarkMode,
    setActiveTab,
    triggerPushNotification,
    weightDelta,
  } = useApp();

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(6); // Default: Domingo / Hoy

  // Dynamic calculations
  const steps = sensorData.pedometer.totalStepsToday;
  const goalSteps = profile.dailyStepGoal;
  const stepPercentage = Math.min(Math.round((steps / goalSteps) * 100), 100);

  // SVG Circular progress math
  const size = 150;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * stepPercentage) / 100;

  // Approximate metrics derived from sensor steps
  const caloriesBurned = Math.round(steps * 0.043 + 310); // kcal
  const distanceKm = Number(((steps * 0.75) / 1000).toFixed(2)); // km

  // Weekly bar data
  const weeklyActivity = [
    { day: 'L', full: 'Lun 29', steps: 8420, active: false },
    { day: 'M', full: 'Mar 30', steps: 10150, active: false },
    { day: 'X', full: 'Mié 01', steps: 9200, active: false },
    { day: 'J', full: 'Jue 02', steps: 11400, active: false },
    { day: 'V', full: 'Vie 03', steps: 8900, active: false },
    { day: 'S', full: 'Sáb 04', steps: 12300, active: false },
    { day: 'D', full: 'Hoy 05', steps: steps, active: true },
  ];

  const maxWeeklySteps = 13000;

  return (
    <div className="space-y-4 pb-6 animate-in fade-in duration-300">
      {/* 1. Header con saludo personalizado + avatar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-500 p-0.5 shadow-md">
              <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center font-bold text-base text-white">
                {profile.name.charAt(0)}
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium">¡Buenos días!</span>
              <span className="text-[10px] text-emerald-400 font-semibold px-1.5 py-0.2 bg-emerald-500/10 rounded">
                Plan Pro
              </span>
            </div>
            <h1 className="text-base font-extrabold text-white tracking-tight truncate max-w-[170px]">
              {profile.name}
            </h1>
          </div>
        </div>

        {/* Demo push trigger */}
        <button
          onClick={() =>
            triggerPushNotification(
              '¡Excelente ritmo hoy!',
              `Llevas ${steps.toLocaleString()} pasos y 612 kcal. Tu coach Marcos está monitoreando tu sesión en vivo.`,
              'workout'
            )
          }
          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors relative"
          title="Probar notificación push"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
        </button>
      </div>

      {/* 2. Tarjeta principal: Pasos del día con Anillo de Progreso Circular */}
      <div
        className={`relative overflow-hidden rounded-3xl p-5 border transition-all ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-[#0c162c] border-slate-800/80 shadow-xl'
            : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pasos del Día
            </span>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
              Podómetro Activo
            </span>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Meta: <strong className="text-slate-200">{goalSteps.toLocaleString()}</strong>
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Circular SVG Progress */}
          <div className="relative shrink-0 flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Background track */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke={isDarkMode ? '#1e293b' : '#e2e8f0'}
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Foreground progress */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke="url(#stepGradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
              <defs>
                <linearGradient id="stepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#84CC16" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-white font-mono tabular-nums leading-none tracking-tight">
                {steps.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400 font-medium mt-1">pasos</span>
              <span className="text-[11px] font-bold text-emerald-400 mt-0.5">
                {stepPercentage}%
              </span>
            </div>
          </div>

          {/* Quick Stats Column */}
          <div className="flex-1 space-y-2.5">
            <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
              <span className="text-[10px] text-slate-400 block mb-0.5">Ritmo promedio</span>
              <span className="text-xs font-bold text-slate-200">
                {sensorData.pedometer.currentCadenceSpm} pasos/min
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
              <span className="text-[10px] text-slate-400 block mb-0.5">Faltan para meta</span>
              <span className="text-xs font-bold text-emerald-400">
                {Math.max(0, goalSteps - steps).toLocaleString()} pasos
              </span>
            </div>

            <button
              onClick={() => setActiveTab('goals')}
              className="w-full py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              Ajustar meta <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Cards secundarias en Grid 2x2 */}
      <div className="grid grid-cols-2 gap-3">
        {/* Card 1: Calorías quemadas */}
        <div
          className={`p-3.5 rounded-2xl border transition-all ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400">Calorías</span>
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-white font-mono tabular-nums leading-none mb-1">
            {caloriesBurned}{' '}
            <span className="text-xs font-normal text-slate-400 font-sans">kcal</span>
          </div>
          <p className="text-[10px] text-slate-400">
            Gasto activo monitoreado
          </p>
        </div>

        {/* Card 2: Distancia recorrida */}
        <div
          className={`p-3.5 rounded-2xl border transition-all ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400">Distancia</span>
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Route className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-white font-mono tabular-nums leading-none mb-1">
            {distanceKm}{' '}
            <span className="text-xs font-normal text-slate-400 font-sans">km</span>
          </div>
          <p className="text-[10px] text-slate-400">
            GPS + Odómetro calibrado
          </p>
        </div>

        {/* Card 3: Peso actual vs peso deseado */}
        <div
          onClick={() => setActiveTab('goals')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer group ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400">Meta Peso</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-base font-black text-white font-mono tabular-nums">
              {profile.currentWeight}
            </span>
            <span className="text-[10px] text-slate-400">vs</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              {profile.targetWeight} kg
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
            <TrendingDown className="w-3 h-3" /> -{weightDelta.difference} kg logrados
          </div>
        </div>

        {/* Card 4: Racha de días activos */}
        <div
          className={`p-3.5 rounded-2xl border transition-all ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400">Racha</span>
            <div className="w-7 h-7 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-white font-mono tabular-nums leading-none mb-1">
            14 <span className="text-xs font-normal text-slate-400 font-sans">días</span>
          </div>
          <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <Award className="w-3 h-3" /> Nivel Bronce Pro
          </p>
        </div>
      </div>

      {/* 4. Widget de sensores activos (Indicador en vivo de GPS/Podómetro/etc) */}
      <SensorLiveWidget />

      {/* 5. Gráfico semanal de actividad */}
      <div
        className={`p-4 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs font-bold text-white">Actividad Semanal</h3>
            <p className="text-[10px] text-slate-400">Promedio: 9,880 pasos / día</p>
          </div>
          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
            +18% vs semana pasada
          </span>
        </div>

        {/* Bar chart container */}
        <div className="flex items-end justify-between gap-2 h-28 pt-4 pb-2 px-1">
          {weeklyActivity.map((item, index) => {
            const heightPercent = Math.min(Math.round((item.steps / maxWeeklySteps) * 100), 100);
            const isSelected = selectedDayIndex === index;

            return (
              <div
                key={item.day}
                onClick={() => setSelectedDayIndex(index)}
                className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                {/* Bar */}
                <div className="w-full flex items-end justify-center h-20">
                  <div
                    className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-t from-emerald-500 to-lime-400 shadow-lg shadow-emerald-500/20'
                        : item.active
                        ? 'bg-emerald-500/70'
                        : 'bg-slate-800 group-hover:bg-slate-700'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                {/* Day label */}
                <span
                  className={`text-[10px] font-bold ${
                    isSelected ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected day tooltip */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">
            Detalle ({weeklyActivity[selectedDayIndex].full}):
          </span>
          <span className="font-bold text-white font-mono">
            {weeklyActivity[selectedDayIndex].steps.toLocaleString()} pasos registrados
          </span>
        </div>
      </div>
    </div>
  );
};
