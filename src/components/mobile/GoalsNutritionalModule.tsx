import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Scale,
  PieChart,
  Sliders,
  TrendingDown,
  TrendingUp,
  Calendar,
  Clock,
  Plus,
  X,
  Check,
  Bell,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';

export const GoalsNutritionalModule: React.FC = () => {
  const {
    profile,
    updateProfile,
    weightLogs,
    addWeightLog,
    weightDelta,
    setDailyStepGoal,
    isDarkMode,
    triggerPushNotification,
  } = useApp();

  // Modals & Tabs
  const [isWeightModalOpen, setIsWeightModalOpen] = useState<boolean>(false);
  const [newWeightInput, setNewWeightInput] = useState<number>(profile.currentWeight);
  const [weightNote, setWeightNote] = useState<string>('Control semanal domingo');
  const [timelineFilter, setTimelineFilter] = useState<'week' | 'month'>('week');

  // Interactive slider for step goal
  const [localStepGoal, setLocalStepGoal] = useState<number>(profile.dailyStepGoal);

  // Metabolic calculations (Mifflin-St Jeor Formula)
  const isMale = profile.gender === 'male';
  // BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age + (male ? 5 : -161)
  const bmr = Math.round(
    10 * profile.currentWeight + 6.25 * profile.height - 5 * profile.age + (isMale ? 5 : -161)
  );

  // Activity multiplier
  const activityMultiplier =
    profile.activityLevel === 'sedentary'
      ? 1.2
      : profile.activityLevel === 'light'
      ? 1.375
      : profile.activityLevel === 'moderate'
      ? 1.55
      : profile.activityLevel === 'very_active'
      ? 1.725
      : 1.9;

  const tdee = Math.round(bmr * activityMultiplier);
  // Deficit / Surplus based on goal
  const targetCalories =
    profile.fitnessGoal === 'lose_weight'
      ? tdee - 450
      : profile.fitnessGoal === 'gain_muscle'
      ? tdee + 350
      : tdee;

  // Macros (Proteins 2.0g/kg, Fats 0.9g/kg, Rest carbs)
  const targetProteinGrams = Math.round(profile.currentWeight * 2.0);
  const targetFatGrams = Math.round(profile.currentWeight * 0.9);
  const targetCarbGrams = Math.max(
    80,
    Math.round((targetCalories - targetProteinGrams * 4 - targetFatGrams * 9) / 4)
  );

  // Current logged macros for today
  const currentProtein = 135;
  const currentCarbs = 180;
  const currentFat = 48;
  const currentTotalCalories = currentProtein * 4 + currentCarbs * 4 + currentFat * 9;

  const handleSaveWeight = (e: React.FormEvent) => {
    e.preventDefault();
    addWeightLog(newWeightInput, undefined, weightNote);
    setIsWeightModalOpen(false);
    triggerPushNotification(
      'Peso semanal registrado',
      `Nuevo peso: ${newWeightInput} kg. Tu entrenador ha sido notificado para calibrar tu plan.`,
      'weight'
    );
  };

  const handleStepSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLocalStepGoal(val);
    setDailyStepGoal(val);
  };

  return (
    <div className="space-y-4 pb-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
            Módulo Nutrición & Metas
          </span>
          <h1 className="text-xl font-extrabold text-white">Objetivos & Balance</h1>
        </div>
        <button
          onClick={() => setIsWeightModalOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> Registrar Peso
        </button>
      </div>

      {/* CTA Destacado: "Actualizar mi peso semanal" */}
      <div className="relative overflow-hidden p-4 rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-lg">
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full uppercase">
              Check-in Semanal
            </span>
            <h3 className="text-sm font-extrabold mt-1">¿Te pesaste esta mañana?</h3>
            <p className="text-[11px] text-emerald-100 mt-0.5 max-w-[210px]">
              Mantén informados a los sensores y a tu coach con tu registro de domingo.
            </p>
          </div>
          <button
            onClick={() => setIsWeightModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white text-emerald-900 font-extrabold text-xs shadow-md hover:bg-emerald-50 active:scale-95 transition-transform shrink-0"
          >
            Actualizar peso
          </button>
        </div>
      </div>

      {/* 1. Resumen de Macronutrientes Diarios */}
      <div
        className={`p-4 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs font-bold text-white">Macronutrientes de Hoy</h3>
            <p className="text-[10px] text-slate-400">
              {currentTotalCalories} / {targetCalories} kcal consumidas
            </p>
          </div>
          <span className="text-[10px] font-semibold text-emerald-400 font-mono">
            {Math.round((currentTotalCalories / targetCalories) * 100)}% de tu meta
          </span>
        </div>

        {/* Segmented Macro Progress Bar */}
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex mb-3">
          <div
            className="bg-emerald-500 transition-all duration-500"
            style={{ width: `${(currentProtein * 4 / currentTotalCalories) * 100}%` }}
            title="Proteína"
          />
          <div
            className="bg-orange-500 transition-all duration-500"
            style={{ width: `${(currentCarbs * 4 / currentTotalCalories) * 100}%` }}
            title="Carbohidratos"
          />
          <div
            className="bg-purple-500 transition-all duration-500"
            style={{ width: `${(currentFat * 9 / currentTotalCalories) * 100}%` }}
            title="Grasas"
          />
        </div>

        {/* 3 Macro breakdown cards */}
        <div className="grid grid-cols-3 gap-2">
          {/* Proteína */}
          <div className="p-2.5 rounded-2xl bg-slate-950/40 border border-slate-800/60">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-emerald-400">Proteína</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="text-sm font-extrabold text-white font-mono tabular-nums">
              {currentProtein}{' '}
              <span className="text-[10px] font-normal text-slate-400 font-sans">/ {targetProteinGrams}g</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-emerald-500"
                style={{ width: `${Math.min(100, (currentProtein / targetProteinGrams) * 100)}%` }}
              />
            </div>
          </div>

          {/* Carbos */}
          <div className="p-2.5 rounded-2xl bg-slate-950/40 border border-slate-800/60">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-orange-400">Carbos</span>
              <span className="w-2 h-2 rounded-full bg-orange-500" />
            </div>
            <div className="text-sm font-extrabold text-white font-mono tabular-nums">
              {currentCarbs}{' '}
              <span className="text-[10px] font-normal text-slate-400 font-sans">/ {targetCarbGrams}g</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-orange-500"
                style={{ width: `${Math.min(100, (currentCarbs / targetCarbGrams) * 100)}%` }}
              />
            </div>
          </div>

          {/* Grasas */}
          <div className="p-2.5 rounded-2xl bg-slate-950/40 border border-slate-800/60">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-purple-400">Grasas</span>
              <span className="w-2 h-2 rounded-full bg-purple-500" />
            </div>
            <div className="text-sm font-extrabold text-white font-mono tabular-nums">
              {currentFat}{' '}
              <span className="text-[10px] font-normal text-slate-400 font-sans">/ {targetFatGrams}g</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-purple-500"
                style={{ width: `${Math.min(100, (currentFat / targetFatGrams) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Calculadora Visual Basada en Datos Corporales (TDEE/BMR) */}
      <div
        className={`p-4 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white">Calculadora Metabólica Dinámica</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Mifflin-St Jeor</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center mb-3">
          <div className="p-2 bg-slate-950/40 rounded-xl border border-slate-800/60">
            <span className="text-[9px] text-slate-400 block">Basal (BMR)</span>
            <span className="text-xs font-bold font-mono text-slate-200">{bmr} kcal</span>
          </div>
          <div className="p-2 bg-slate-950/40 rounded-xl border border-slate-800/60">
            <span className="text-[9px] text-slate-400 block">Gasto Total (TDEE)</span>
            <span className="text-xs font-bold font-mono text-cyan-400">{tdee} kcal</span>
          </div>
          <div className="p-2 bg-slate-950/40 rounded-xl border border-slate-800/60">
            <span className="text-[9px] text-slate-400 block">Meta Diaria</span>
            <span className="text-xs font-bold font-mono text-emerald-400">{targetCalories} kcal</span>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 leading-snug">
          Calculado con tus parámetros ({profile.height} cm, {profile.currentWeight} kg, {profile.age} años) para un objetivo de{' '}
          <strong className="text-emerald-400">
            {profile.fitnessGoal === 'lose_weight' ? 'pérdida de grasa (-450 kcal)' : 'mantenimiento'}
          </strong>.
        </p>
      </div>

      {/* 3. Comparativa "Cómo mejoré / Cómo empeoré" */}
      <div
        className={`p-4 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-white">Tendencia & Comparativa de Progreso</h3>
          <span className="text-[10px] text-slate-400">Desde inicio (08 Sep)</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                weightDelta.improved ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'
              }`}
            >
              {weightDelta.improved ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold text-white font-mono">
                  {weightDelta.improved ? `-${weightDelta.difference}` : `+${weightDelta.difference}`} kg
                </span>
                <span className="text-[10px] font-semibold text-emerald-400">
                  ({weightDelta.percent}% de cambio)
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                {weightDelta.improved
                  ? '¡Excelente ritmo! Has mejorado tu composición sin perder masa magra.'
                  : 'Ligero estancamiento. Tu coach ajustará el déficit de macros.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Meta de Pasos Diaria Ajustable con Slider */}
      <div
        className={`p-4 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">Meta Diaria de Pasos</span>
          </div>
          <span className="text-sm font-extrabold text-emerald-400 font-mono tabular-nums">
            {localStepGoal.toLocaleString()} pasos
          </span>
        </div>

        <input
          type="range"
          min="5000"
          max="20000"
          step="500"
          value={localStepGoal}
          onChange={handleStepSliderChange}
          className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer my-2"
        />

        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>5,000 (Mínimo saludable)</span>
          <span>10,000 (Estándar)</span>
          <span>20,000 (Atleta)</span>
        </div>
      </div>

      {/* 5. Historial en Timeline con Filtros por Semana/Mes */}
      <div
        className={`p-4 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-white">Historial de Registros</h3>
          <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => setTimelineFilter('week')}
              className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all ${
                timelineFilter === 'week' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setTimelineFilter('month')}
              className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all ${
                timelineFilter === 'month' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400'
              }`}
            >
              Mes
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {weightLogs.slice().reverse().map((entry, idx) => (
            <div
              key={entry.id}
              className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-semibold text-slate-300">{entry.date}</span>
                {entry.note && (
                  <span className="text-[10px] text-slate-400 truncate max-w-[130px]">
                    · {entry.note}
                  </span>
                )}
              </div>
              <span className="font-mono font-bold text-white">{entry.weight} kg</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Configuración de Notificaciones Push */}
      <div
        className={`p-4 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-2.5">
          <Bell className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold text-white">Recordatorios Push Inteligentes</h3>
        </div>

        <div className="space-y-2">
          {[
            { key: 'meals' as const, label: 'Recordatorio de comidas y macros (13:00 / 20:00)' },
            { key: 'steps' as const, label: 'Alerta de inactividad si faltan pasos (>3h sin moverte)' },
            { key: 'weeklyWeight' as const, label: 'Check-in semanal de peso (Domingo 8:00 AM)' },
          ].map((item) => {
            const enabled = profile.notificationsEnabled[item.key];

            return (
              <div
                key={item.key}
                onClick={() =>
                  updateProfile({
                    notificationsEnabled: {
                      ...profile.notificationsEnabled,
                      [item.key]: !enabled,
                    },
                  })
                }
                className="p-2.5 rounded-xl bg-slate-950/30 border border-slate-800/60 flex items-center justify-between cursor-pointer"
              >
                <span className="text-xs text-slate-300">{item.label}</span>
                <div
                  className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                    enabled ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      enabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL ELEGANTE: Input Semanal de Peso */}
      {isWeightModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            className={`w-full max-w-sm rounded-3xl p-5 border shadow-2xl ${
              isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Registrar Peso Semanal</h3>
                  <span className="text-[10px] text-slate-400">Domingo de control</span>
                </div>
              </div>
              <button
                onClick={() => setIsWeightModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveWeight} className="space-y-4">
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block mb-1">Peso en ayunas</span>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setNewWeightInput((prev) => Math.max(40, Number((prev - 0.2).toFixed(1))))}
                    className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 font-bold text-base hover:bg-slate-700"
                  >
                    -
                  </button>
                  <span className="text-3xl font-black font-mono text-emerald-400">
                    {newWeightInput.toFixed(1)}
                  </span>
                  <span className="text-sm font-bold text-slate-400">kg</span>
                  <button
                    type="button"
                    onClick={() => setNewWeightInput((prev) => Math.min(150, Number((prev + 0.2).toFixed(1))))}
                    className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 font-bold text-base hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nota o sensación</label>
                <input
                  type="text"
                  value={weightNote}
                  onChange={(e) => setWeightNote(e.target.value)}
                  placeholder="Ej. Buena energía, menor retención de líquidos"
                  className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsWeightModalOpen(false)}
                  className="flex-1 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
                >
                  Guardar & Sincronizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
