import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  ArrowRight,
  ArrowLeft,
  Check,
  Flame,
  Scale,
  Heart,
  ShieldCheck,
  Sparkles,
  Zap,
  TrendingUp,
  User,
  X
} from 'lucide-react';
import onboardingHeroImg from '../../assets/images/app_onboarding_hero_1791261009917.jpg';
import { FitnessGoal, ActivityLevel, Gender } from '../../types';

export const OnboardingFlow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { profile, updateProfile, isDarkMode } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Stepper local state
  const [formData, setFormData] = useState({
    name: profile.name,
    age: profile.age,
    gender: profile.gender,
    height: profile.height,
    currentWeight: profile.currentWeight,
    targetWeight: profile.targetWeight,
    activityLevel: profile.activityLevel,
    fitnessGoal: profile.fitnessGoal,
    medicalConditions: profile.medicalConditions,
  });

  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    profile.medicalConditions.length > 0 ? profile.medicalConditions : ['Ninguna restricción']
  );

  const totalSteps = 5; // Steps 1 to 5

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finalize and save
      updateProfile({
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        height: formData.height,
        currentWeight: formData.currentWeight,
        targetWeight: formData.targetWeight,
        activityLevel: formData.activityLevel,
        fitnessGoal: formData.fitnessGoal,
        medicalConditions: selectedConditions,
      });
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleCondition = (condition: string) => {
    if (condition === 'Ninguna restricción') {
      setSelectedConditions(['Ninguna restricción']);
      return;
    }

    const filtered = selectedConditions.filter((c) => c !== 'Ninguna restricción');
    if (filtered.includes(condition)) {
      const next = filtered.filter((c) => c !== condition);
      setSelectedConditions(next.length === 0 ? ['Ninguna restricción'] : next);
    } else {
      setSelectedConditions([...filtered, condition]);
    }
  };

  return (
    <div className={`h-full flex flex-col justify-between overflow-y-auto ${isDarkMode ? 'bg-[#080D1A] text-slate-100' : 'bg-slate-50 text-slate-900'} p-5 relative select-none`}>
      {/* Top Bar with Step Indicator or Close */}
      <div className="flex items-center justify-between pt-2 pb-3">
        {currentStep > 0 ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-slate-100 p-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Atrás
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
              ⚡
            </div>
            <span className="font-bold text-base tracking-tight text-white">FitTrack Pulse</span>
          </div>
        )}

        <button
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-slate-200 p-1.5 rounded-lg"
          aria-label="Saltar o cerrar onboarding"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar (Visible in Steps 1 to 5) */}
      {currentStep > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1.5">
            <span>Paso {currentStep} de {totalSteps}</span>
            <span className="text-emerald-400 font-mono">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 0: Welcome Screen & Social Login */}
      {currentStep === 0 && (
        <div className="flex-1 flex flex-col justify-between py-2 animate-in fade-in duration-300">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl mb-4 group">
            <img
              src={onboardingHeroImg}
              alt="FitTrack Pulse Onboarding"
              referrerPolicy="no-referrer"
              className="w-full h-48 object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-[#080D1A]/50 to-transparent flex flex-col justify-end p-4">
              <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase mb-1">
                La nueva era del fitness inteligente
              </span>
              <h2 className="text-xl font-extrabold text-white leading-tight">
                Telemetría en tiempo real & Coaching humano
              </h2>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex items-start gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300">
                <strong className="text-white">5 Sensores Activos:</strong> GPS, podómetro, acelerómetro, giroscopio y barómetro para precisión absoluta.
              </p>
            </div>
            <div className="flex items-start gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <Flame className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300">
                <strong className="text-white">Nutrición & Metas:</strong> Cálculo metabólico automático y seguimiento de macronutrientes en vivo.
              </p>
            </div>
            <div className="flex items-start gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300">
                <strong className="text-white">Entrenador Certificado:</strong> Planes personalizados y chat directo por $1,500/mes.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => setCurrentStep(1)}
              className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
            >
              Comenzar Evaluación Personalizada
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="relative py-1 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <span className="relative px-3 text-[11px] font-medium text-slate-400 bg-[#080D1A]">
                o iniciar sesión con
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onClose()}
                className="h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-800 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
                Apple ID
              </button>
              <button
                onClick={() => onClose()}
                className="h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-800 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.053 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  />
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 1: Datos Personales */}
      {currentStep === 1 && (
        <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Paso 1 · Biometría Inicial
            </span>
            <h2 className="text-xl font-bold text-white mt-1 mb-1">¿Cómo te llamas y cuáles son tus datos?</h2>
            <p className="text-xs text-slate-400 mb-5">
              Utilizamos estos parámetros para calibrar tu consumo calórico basal.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nombre completo</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. Alejandro Morales"
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Edad (años)</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Altura (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Sexo biológico</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['male', 'female', 'other'] as Gender[]).map((genderOption) => (
                    <button
                      key={genderOption}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: genderOption })}
                      className={`h-10 rounded-xl text-xs font-semibold border transition-all ${
                        formData.gender === genderOption
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {genderOption === 'male' ? 'Hombre' : genderOption === 'female' ? 'Mujer' : 'Otro'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 mt-6 shadow-lg shadow-emerald-500/20"
          >
            Continuar
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Peso actual y peso deseado */}
      {currentStep === 2 && (
        <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Paso 2 · Composición y Peso
            </span>
            <h2 className="text-xl font-bold text-white mt-1 mb-1">Define tu punto de partida y tu meta</h2>
            <p className="text-xs text-slate-400 mb-5">
              Estableceremos un ritmo seguro y progresivo de 0.5 kg por semana.
            </p>

            <div className="space-y-5">
              {/* Peso actual */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300">Peso Actual</span>
                  <span className="text-xs text-emerald-400 font-mono font-bold">{formData.currentWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="150"
                  step="0.2"
                  value={formData.currentWeight}
                  onChange={(e) => setFormData({ ...formData, currentWeight: Number(e.target.value) })}
                  className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Peso deseado */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300">Peso Deseado (Objetivo)</span>
                  <span className="text-xs text-cyan-400 font-mono font-bold">{formData.targetWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="150"
                  step="0.2"
                  value={formData.targetWeight}
                  onChange={(e) => setFormData({ ...formData, targetWeight: Number(e.target.value) })}
                  className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Delta preview */}
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Variación proyectada:</span>
                <span className="font-bold text-white font-mono">
                  {Number((formData.targetWeight - formData.currentWeight).toFixed(1))} kg (
                  {formData.targetWeight < formData.currentWeight ? 'Déficit saludable' : 'Superávit muscular'})
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 mt-6 shadow-lg shadow-emerald-500/20"
          >
            Continuar
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 3: Nivel de actividad actual */}
      {currentStep === 3 && (
        <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Paso 3 · Actividad Diaria
            </span>
            <h2 className="text-xl font-bold text-white mt-1 mb-1">¿Qué tan activo eres hoy?</h2>
            <p className="text-xs text-slate-400 mb-4">
              Nuestros 5 sensores afinarán esto automáticamente, pero dinos tu promedio semanal.
            </p>

            <div className="space-y-2.5">
              {[
                { id: 'sedentary' as ActivityLevel, title: 'Sedentario', desc: 'Poco o ningún ejercicio formal, trabajo de oficina' },
                { id: 'light' as ActivityLevel, title: 'Actividad Ligera', desc: '1 a 3 días por semana de caminatas o deporte suave' },
                { id: 'moderate' as ActivityLevel, title: 'Moderada (Recomendado)', desc: '3 a 5 días de entrenamiento de fuerza o cardio' },
                { id: 'very_active' as ActivityLevel, title: 'Muy Activo', desc: '6 a 7 días de entrenamiento intenso' },
                { id: 'athlete' as ActivityLevel, title: 'Atleta Competitivo', desc: 'Doble sesión diaria o trabajo físico de alta demanda' },
              ].map((lvl) => (
                <div
                  key={lvl.id}
                  onClick={() => setFormData({ ...formData, activityLevel: lvl.id })}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.activityLevel === lvl.id
                      ? 'bg-emerald-500/10 border-emerald-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{lvl.title}</span>
                    {formData.activityLevel === lvl.id && (
                      <Check className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{lvl.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 mt-6 shadow-lg shadow-emerald-500/20"
          >
            Continuar
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 4: Objetivo Fitness */}
      {currentStep === 4 && (
        <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Paso 4 · Propósito Principal
            </span>
            <h2 className="text-xl font-bold text-white mt-1 mb-1">¿Cuál es tu meta principal?</h2>
            <p className="text-xs text-slate-400 mb-4">
              Tu entrenador y la app estructurarán tu programación y macros en base a esto.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'lose_weight' as FitnessGoal, title: 'Perder Grasa', icon: Flame, color: 'text-orange-400', desc: 'Déficit calórico y mayor NEAT diario' },
                { id: 'gain_muscle' as FitnessGoal, title: 'Ganar Músculo', icon: Zap, color: 'text-emerald-400', desc: 'Hipertrofia progresiva y alta proteína' },
                { id: 'maintain' as FitnessGoal, title: 'Mantenerse', icon: Heart, color: 'text-blue-400', desc: 'Salud cardiovascular y hábitos consistentes' },
                { id: 'endurance' as FitnessGoal, title: 'Resistencia', icon: Activity, color: 'text-purple-400', desc: 'Running y rendimiento de larga duración' },
              ].map((g) => {
                const Icon = g.icon;
                const isSelected = formData.fitnessGoal === g.id;

                return (
                  <div
                    key={g.id}
                    onClick={() => setFormData({ ...formData, fitnessGoal: g.id })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <Icon className={`w-6 h-6 ${g.color} mb-2`} />
                      <h4 className="text-xs font-bold text-white">{g.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 leading-snug">{g.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 mt-2">
                        <Check className="w-3 h-3" /> Seleccionado
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 mt-6 shadow-lg shadow-emerald-500/20"
          >
            Continuar
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 5: Condiciones Médicas o Restricciones */}
      {currentStep === 5 && (
        <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Paso 5 · Seguridad Médica
            </span>
            <h2 className="text-xl font-bold text-white mt-1 mb-1">¿Alguna restricción o lesión?</h2>
            <p className="text-xs text-slate-400 mb-4">
              Garantizamos que los ejercicios prescritos sean 100% seguros para tus articulaciones.
            </p>

            <div className="space-y-2">
              {[
                'Ninguna restricción',
                'Molestias en espalda baja / lumbar',
                'Lesión previa en rodilla o tobillo',
                'Hipertensión o condición cardiovascular',
                'Molestias en hombro o manguito rotador',
                'Asma o capacidad respiratoria reducida',
              ].map((cond) => {
                const isSelected = selectedConditions.includes(cond);

                return (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => toggleCondition(cond)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500 text-white font-semibold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{cond}</span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 mt-6 shadow-lg shadow-emerald-500/25"
          >
            Finalizar & Entrar a FitTrack
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
