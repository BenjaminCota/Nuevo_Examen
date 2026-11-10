import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Settings,
  Scale,
  Shield,
  CreditCard,
  LogOut,
  Trash2,
  Check,
  Edit2,
  Globe,
  Bell,
  Sparkles,
  Info,
  ChevronRight,
  X
} from 'lucide-react';
import { ActivityLevel, FitnessGoal, Gender } from '../../types';

export const ProfileModule: React.FC = () => {
  const {
    profile,
    updateProfile,
    toggleUnitSystem,
    isDarkMode,
    setIsOnboardingOpen,
    triggerPushNotification,
    resetDemoData,
  } = useApp();

  const [isEditingData, setIsEditingData] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'es' | 'en'>('es');

  // Local form state
  const [formName, setFormName] = useState(profile.name);
  const [formAge, setFormAge] = useState(profile.age);
  const [formHeight, setFormHeight] = useState(profile.height);
  const [formCurrentWeight, setFormCurrentWeight] = useState(profile.currentWeight);
  const [formTargetWeight, setFormTargetWeight] = useState(profile.targetWeight);
  const [formGender, setFormGender] = useState<Gender>(profile.gender);
  const [formActivityLevel, setFormActivityLevel] = useState<ActivityLevel>(profile.activityLevel);
  const [formFitnessGoal, setFormFitnessGoal] = useState<FitnessGoal>(profile.fitnessGoal);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formName,
      age: formAge,
      height: formHeight,
      currentWeight: formCurrentWeight,
      targetWeight: formTargetWeight,
      gender: formGender,
      activityLevel: formActivityLevel,
      fitnessGoal: formFitnessGoal,
    });
    setIsEditingData(false);
    triggerPushNotification(
      'Perfil Actualizado',
      'Tus nuevos parámetros corporales se han sincronizado en tiempo real en Dashboard y Metas.',
      'workout'
    );
  };

  return (
    <div className="space-y-4 pb-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pt-1">
        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
          Módulo de Configuración
        </span>
        <h1 className="text-xl font-extrabold text-white">Mi Perfil</h1>
      </div>

      {/* 1. Foto de Perfil & Tarjeta de Identidad */}
      <div
        className={`p-4 rounded-3xl border transition-all ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-900 to-[#0e1a30] border-slate-800'
            : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-lime-500 p-0.5 shadow-lg">
              <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center text-xl font-extrabold text-white">
                {profile.name.charAt(0)}
              </div>
            </div>
            <button
              onClick={() => alert('Selector de foto de perfil activado (Cámara o Galería en dispositivo nativo)')}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              aria-label="Cambiar foto de perfil"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-extrabold text-white truncate">{profile.name}</h2>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate">{profile.email}</p>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
              <span>{profile.age} años</span>
              <span>·</span>
              <span>{profile.height} cm</span>
              <span>·</span>
              <span className="font-mono text-emerald-400 font-bold">{profile.currentWeight} kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* NOTA DE DISEÑO UX/UI EXPLICITA */}
      <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-emerald-200/90 leading-relaxed">
          <strong className="text-emerald-300 font-bold">Nota de Sincronización en Tiempo Real:</strong> Todos los cambios en tus datos biométricos (peso actual, peso deseado, altura, nivel de actividad) se sincronizan de inmediato en los 5 módulos: actualizan el anillo de progreso del Dashboard, recalibran las calorías basales (TDEE/BMR) en Metas y notifican a tu entrenador asignado.
        </p>
      </div>

      {/* 2. DATOS GENERALES EDITABLES */}
      <div
        className={`p-4 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-white">Datos Biométricos</h3>
          <button
            onClick={() => setIsEditingData(!isEditingData)}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            {isEditingData ? 'Cancelar' : 'Editar Datos'}
          </button>
        </div>

        {isEditingData ? (
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 mb-1">Nombre</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">Edad</label>
                <input
                  type="number"
                  value={formAge}
                  onChange={(e) => setFormAge(Number(e.target.value))}
                  className="w-full h-9 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">Altura (cm)</label>
                <input
                  type="number"
                  value={formHeight}
                  onChange={(e) => setFormHeight(Number(e.target.value))}
                  className="w-full h-9 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">Peso Actual (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formCurrentWeight}
                  onChange={(e) => setFormCurrentWeight(Number(e.target.value))}
                  className="w-full h-9 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">Peso Objetivo (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formTargetWeight}
                  onChange={(e) => setFormTargetWeight(Number(e.target.value))}
                  className="w-full h-9 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md mt-2"
            >
              Guardar & Sincronizar en Toda la App
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-950/40 rounded-xl border border-slate-800/60">
              <span className="text-[10px] text-slate-400 block">Objetivo Fitness</span>
              <span className="font-semibold text-white">
                {profile.fitnessGoal === 'lose_weight'
                  ? 'Perder Grasa'
                  : profile.fitnessGoal === 'gain_muscle'
                  ? 'Ganar Músculo'
                  : 'Mantenimiento'}
              </span>
            </div>
            <div className="p-2.5 bg-slate-950/40 rounded-xl border border-slate-800/60">
              <span className="text-[10px] text-slate-400 block">Nivel de Actividad</span>
              <span className="font-semibold text-white capitalize">{profile.activityLevel}</span>
            </div>
            <div className="p-2.5 bg-slate-950/40 rounded-xl border border-slate-800/60">
              <span className="text-[10px] text-slate-400 block">Restricciones Médicas</span>
              <span className="font-semibold text-white">
                {profile.medicalConditions[0] || 'Ninguna'}
              </span>
            </div>
            <div className="p-2.5 bg-slate-950/40 rounded-xl border border-slate-800/60">
              <span className="text-[10px] text-slate-400 block">Meta Pasos Diaria</span>
              <span className="font-semibold text-emerald-400 font-mono">
                {profile.dailyStepGoal.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. PREFERENCIAS: UNIDADES, NOTIFICACIONES, IDIOMA */}
      <div
        className={`p-4 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <h3 className="text-xs font-bold text-white mb-2.5">Preferencias del Sistema</h3>

        <div className="space-y-2">
          {/* Unidades */}
          <div
            onClick={toggleUnitSystem}
            className="p-2.5 rounded-xl bg-slate-950/30 border border-slate-800/60 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-300">Sistema de Unidades</span>
            </div>
            <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
              {profile.unitSystem === 'metric' ? 'Métrico (kg / cm)' : 'Imperial (lb / in)'}
            </span>
          </div>

          {/* Idioma */}
          <div className="p-2.5 rounded-xl bg-slate-950/30 border border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-300">Idioma de la App</span>
            </div>
            <div className="flex gap-1 text-[10px]">
              <button
                onClick={() => setSelectedLanguage('es')}
                className={`px-2 py-0.5 rounded font-semibold ${
                  selectedLanguage === 'es' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                Español
              </button>
              <button
                onClick={() => setSelectedLanguage('en')}
                className={`px-2 py-0.5 rounded font-semibold ${
                  selectedLanguage === 'en' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SUSCRIPCIÓN ACTUAL & MÉTODO DE PAGO */}
      <div
        className={`p-4 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <h3 className="text-xs font-bold text-white mb-2.5">Suscripción & Facturación</h3>

        <div className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800/70 space-y-2 mb-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">{profile.subscription.planName}</span>
            <span className="text-xs font-black font-mono text-emerald-400">
              {profile.subscription.priceMonthly} $/mes
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Próxima renovación</span>
            <span>{profile.subscription.renewalDate}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-300">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>{profile.subscription.cardBrand} •••• {profile.subscription.cardLast4}</span>
            </div>
            <span className="text-emerald-400 font-semibold">Al día</span>
          </div>
        </div>
      </div>

      {/* 5. CERRAR SESIÓN / ELIMINAR CUENTA */}
      <div className="space-y-2 pt-2">
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4 text-slate-400" />
          Cerrar Sesión
        </button>

        <button
          onClick={() => alert('Flujo de eliminación de cuenta con periodo de gracia de 30 días según GDPR / LOPD.')}
          className="w-full py-2 text-center text-[11px] font-medium text-red-400/70 hover:text-red-400 transition-colors"
        >
          Eliminar mi cuenta y datos biométricos
        </button>
      </div>

      {/* MODAL: CERRAR SESIÓN */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            className={`w-full max-w-sm rounded-3xl p-5 border shadow-2xl ${
              isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2 text-slate-100 mb-2">
              <LogOut className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold">¿Deseas cerrar tu sesión?</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Podrás volver a ingresar en cualquier momento con tus credenciales de FitTrack o redes sociales.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  setIsOnboardingOpen(true);
                }}
                className="flex-1 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
