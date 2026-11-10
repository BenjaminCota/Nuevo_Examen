import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Coach } from '../../types';
import {
  Star,
  ShieldCheck,
  MessageCircle,
  RefreshCw,
  X,
  Check,
  Send,
  AlertCircle,
  CreditCard,
  ChevronRight,
  Clock,
  Sparkles,
  Users
} from 'lucide-react';

export const CoachModule: React.FC = () => {
  const {
    coaches,
    activeCoach,
    profile,
    cancelSubscription,
    changeCoach,
    selectCoachForSubscription,
    chatMessages,
    sendChatMessage,
    isDarkMode,
    triggerPushNotification,
  } = useApp();

  // Filters
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');

  // Modals & Chat
  const [selectedCoachDetail, setSelectedCoachDetail] = useState<Coach | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [coachToSubscribe, setCoachToSubscribe] = useState<Coach | null>(null);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatInputText, setChatInputText] = useState<string>('');
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState<boolean>(false);

  // Filtered coaches
  const filteredCoaches = coaches.filter((coach) => {
    if (genderFilter !== 'all' && coach.gender !== genderFilter) return false;
    if (specialtyFilter !== 'all') {
      if (!coach.specialty.toLowerCase().includes(specialtyFilter.toLowerCase())) return false;
    }
    return true;
  });

  const handleHireClick = (coach: Coach) => {
    setCoachToSubscribe(coach);
    setIsCheckoutOpen(true);
  };

  const handleConfirmSubscription = () => {
    if (coachToSubscribe) {
      selectCoachForSubscription(coachToSubscribe.id);
      setIsCheckoutOpen(false);
      triggerPushNotification(
        '¡Suscripción Activada!',
        `Has contratado a ${coachToSubscribe.name} por $1,500/mes. Tu plan ya está disponible.`,
        'coach'
      );
    }
  };

  const handleChangeCoachConfirm = (newCoachId: string) => {
    const result = changeCoach(newCoachId);
    if (result.success) {
      setIsChangeModalOpen(false);
      triggerPushNotification(
        'Entrenador Actualizado',
        result.message,
        'coach'
      );
    } else {
      alert(result.message);
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    sendChatMessage(chatInputText.trim());
    setChatInputText('');
  };

  const isSubscribed = profile.subscription.status === 'active' && activeCoach;
  const changeUsed = profile.subscription.coachChangeUsedThisMonth;

  return (
    <div className="space-y-4 pb-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pt-1">
        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
          Módulo Coaching Personal
        </span>
        <h1 className="text-xl font-extrabold text-white">Entrenadores de Élite</h1>
      </div>

      {/* 1. SECCIÓN: MI ENTRENADOR ACTUAL (Si tiene suscripción) */}
      {isSubscribed ? (
        <div
          className={`p-4 rounded-3xl border transition-all ${
            isDarkMode
              ? 'bg-gradient-to-br from-slate-900 via-slate-900/95 to-[#0b1b2f] border-emerald-500/40 shadow-lg'
              : 'bg-emerald-50/50 border-emerald-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Mi Entrenador Actual
            </span>
            <span className="text-[10px] text-slate-400 font-mono">1,500 $/mes activo</span>
          </div>

          <div className="flex items-center gap-3 mb-3.5">
            <img
              src={activeCoach.photoUrl}
              alt={activeCoach.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-2xl object-cover object-top border-2 border-emerald-500/60 shadow-md"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-extrabold text-white truncate">{activeCoach.name}</h3>
              <p className="text-[11px] text-emerald-400 font-medium truncate">{activeCoach.specialty}</p>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                <span className="flex items-center gap-0.5 text-yellow-400 font-bold">
                  <Star className="w-3 h-3 fill-yellow-400" /> {activeCoach.rating}
                </span>
                <span>·</span>
                <span>{activeCoach.experienceYears} años de exp.</span>
              </div>
            </div>
          </div>

          {/* Action buttons row */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => setIsChatOpen(true)}
              className="h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4" /> Chat Directo
            </button>

            <button
              onClick={() => setIsChangeModalOpen(true)}
              className="h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 active:scale-95 transition-all relative overflow-hidden"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Cambiar</span>
              <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                changeUsed ? 'bg-slate-700 text-slate-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {changeUsed ? 'Usado' : '1x mes gratis'}
              </span>
            </button>
          </div>

          {/* Estado de cambio mensual */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
            <span>
              {changeUsed
                ? '⚠️ Cambio gratuito ya utilizado este mes.'
                : '✓ Tienes 1 cambio gratuito disponible este mes.'}
            </span>
            <button
              onClick={() => setIsCancelConfirmOpen(true)}
              className="text-red-400/80 hover:text-red-400 underline font-medium"
            >
              Cancelar plan
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-2">
          <Sparkles className="w-6 h-6 text-emerald-400 mx-auto" />
          <h3 className="text-sm font-bold text-white">Sin entrenador activo</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Elige un especialista para tener rutinas a medida, calibración de sensores y chat diario por 1,500 $/mes.
          </p>
        </div>
      )}

      {/* 2. FILTROS DE LISTADO */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-300">Explorar Entrenadores (1,500 $/mes)</h2>
          <span className="text-[10px] text-slate-400">{filteredCoaches.length} disponibles</span>
        </div>

        {/* Filtro por Sexo (Chips) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/60 rounded-xl border border-slate-800">
          <button
            onClick={() => setGenderFilter('all')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              genderFilter === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setGenderFilter('male')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              genderFilter === 'male'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hombres
          </button>
          <button
            onClick={() => setGenderFilter('female')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              genderFilter === 'female'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Mujeres
          </button>
        </div>

        {/* Filtros adicionales por especialidad */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'Todas las especialidades' },
            { id: 'Fuerza', label: 'Fuerza & Músculo' },
            { id: 'Nutrición', label: 'Nutrición' },
            { id: 'Resistencia', label: 'Running / Fondo' },
            { id: 'HIIT', label: 'HIIT Metabólico' },
          ].map((sp) => (
            <button
              key={sp.id}
              onClick={() => setSpecialtyFilter(sp.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap border text-[11px] font-semibold transition-all ${
                specialtyFilter === sp.id
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {sp.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. LISTADO DE CARDS DE ENTRENADORES */}
      <div className="space-y-3">
        {filteredCoaches.map((coach) => {
          const isCurrentActive = activeCoach?.id === coach.id;

          return (
            <div
              key={coach.id}
              className={`p-3.5 rounded-3xl border transition-all ${
                isCurrentActive
                  ? 'bg-slate-900 border-emerald-500/40 ring-1 ring-emerald-500/30'
                  : isDarkMode
                  ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex gap-3">
                {/* Photo */}
                <div
                  onClick={() => setSelectedCoachDetail(coach)}
                  className="cursor-pointer relative shrink-0"
                >
                  <img
                    src={coach.photoUrl}
                    alt={coach.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 rounded-2xl object-cover object-top border border-slate-700 shadow-md"
                  />
                  <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded-md flex items-center gap-0.5 text-[9px] font-bold text-yellow-400">
                    <Star className="w-2.5 h-2.5 fill-yellow-400" /> {coach.rating}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h3
                          onClick={() => setSelectedCoachDetail(coach)}
                          className="text-xs font-bold text-white hover:text-emerald-400 cursor-pointer truncate"
                        >
                          {coach.name}
                        </h3>
                        <p className="text-[11px] text-emerald-400 font-medium truncate">
                          {coach.specialty}
                        </p>
                      </div>
                      <span className="text-xs font-black text-white font-mono shrink-0">
                        1,500 $/m
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                      {coach.bio}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[9px] text-slate-400 font-medium">
                      {coach.availableSlots}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedCoachDetail(coach)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800/80 rounded-lg transition-colors"
                      >
                        Ver Perfil
                      </button>
                      {!isCurrentActive && (
                        <button
                          onClick={() => handleHireClick(coach)}
                          className="px-3 py-1 text-[11px] font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg shadow-sm active:scale-95 transition-all"
                        >
                          Contratar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL 1: PERFIL DETALLADO DEL ENTRENADOR */}
      {selectedCoachDetail && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            className={`w-full max-w-sm max-h-[85vh] overflow-y-auto rounded-3xl p-5 border shadow-2xl ${
              isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Perfil Profesional
              </span>
              <button
                onClick={() => setSelectedCoachDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3.5 mb-4">
              <img
                src={selectedCoachDetail.photoUrl}
                alt={selectedCoachDetail.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-emerald-500 shadow-md"
              />
              <div>
                <h3 className="text-base font-extrabold text-white">{selectedCoachDetail.name}</h3>
                <p className="text-xs text-emerald-400 font-semibold">{selectedCoachDetail.specialty}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-mono">
                  <span className="flex items-center text-yellow-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" /> {selectedCoachDetail.rating}
                  </span>
                  <span>({selectedCoachDetail.reviewCount} clientes)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <h4 className="font-bold text-slate-200 mb-1">Biografía & Metodología</h4>
                <p className="text-slate-400 leading-relaxed">{selectedCoachDetail.bio}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 mb-1.5">Certificaciones Verificadas</h4>
                <div className="space-y-1">
                  {selectedCoachDetail.certifications.map((c, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Tarifa mensual todo incluido</span>
                  <span className="text-base font-extrabold text-white font-mono">1,500 $/mes</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded">
                  {selectedCoachDetail.availableSlots}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <button
                onClick={() => {
                  setSelectedCoachDetail(null);
                  handleHireClick(selectedCoachDetail);
                }}
                className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-98 transition-all"
              >
                Contratar por 1,500 $/mes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CHECKOUT & SUSCRIPCIÓN (1,500 $/mes) */}
      {isCheckoutOpen && coachToSubscribe && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            className={`w-full max-w-sm rounded-3xl p-5 border shadow-2xl ${
              isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Confirmar Suscripción Pro</h3>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 mb-3 flex items-center gap-3">
              <img
                src={coachToSubscribe.photoUrl}
                alt={coachToSubscribe.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover object-top border border-emerald-500"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{coachToSubscribe.name}</h4>
                <p className="text-[11px] text-emerald-400 truncate">{coachToSubscribe.specialty}</p>
                <span className="text-xs font-black font-mono text-white">1,500 $/mes</span>
              </div>
            </div>

            <div className="space-y-2 text-xs mb-4">
              <div className="flex justify-between text-slate-400">
                <span>Asesoría personalizada</span>
                <span className="text-slate-200">Incluido</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Monitoreo en vivo de 5 sensores</span>
                <span className="text-slate-200">Incluido</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Cambio de coach gratis 1 vez/mes</span>
                <span className="text-emerald-400 font-semibold">Garantizado</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-white">
                <span>Total a debitar hoy:</span>
                <span className="text-emerald-400 font-mono text-sm">1,500.00 $</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Visa •••• 4821</span>
                <span className="text-[10px] text-slate-400">Exp 08/28</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">Predeterminada</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="flex-1 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Volver
              </button>
              <button
                onClick={handleConfirmSubscription}
                className="flex-1 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20"
              >
                Pagar 1,500 $/mes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CAMBIAR ENTRENADOR (Con validación Gratis 1 vez al mes) */}
      {isChangeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            className={`w-full max-w-sm rounded-3xl p-5 border shadow-2xl ${
              isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Cambiar de Entrenador</h3>
              </div>
              <button
                onClick={() => setIsChangeModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {changeUsed ? (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs text-red-300 space-y-1.5 my-3">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Límite de cambio alcanzado</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  Ya has realizado un cambio este mes de ciclo. Podrás realizar un nuevo cambio gratuito a partir del{' '}
                  <strong className="text-white">{profile.subscription.coachChangeNextFreeDate}</strong>.
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 mb-3">
                Tienes <strong className="text-emerald-400">1 cambio gratuito disponible</strong>. Selecciona a quién deseas transferir tu plan actual de 1,500 $/mes sin cargos extras.
              </p>
            )}

            {!changeUsed && (
              <div className="space-y-2 max-h-60 overflow-y-auto my-2">
                {coaches
                  .filter((c) => c.id !== activeCoach?.id)
                  .map((coach) => (
                    <div
                      key={coach.id}
                      onClick={() => handleChangeCoachConfirm(coach.id)}
                      className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500 flex items-center justify-between cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={coach.photoUrl}
                          alt={coach.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white group-hover:text-emerald-400">
                            {coach.name}
                          </h4>
                          <span className="text-[10px] text-slate-400">{coach.specialty}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
                    </div>
                  ))}
              </div>
            )}

            <button
              onClick={() => setIsChangeModalOpen(false)}
              className="w-full h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 mt-2"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* MODAL 4: CHAT DIRECTO CON EL ENTRENADOR */}
      {isChatOpen && activeCoach && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            className={`w-full max-w-sm h-[80vh] flex flex-col justify-between rounded-3xl border shadow-2xl ${
              isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Chat Header */}
            <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src={activeCoach.photoUrl}
                    alt={activeCoach.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-xl object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">{activeCoach.name}</h3>
                  <span className="text-[10px] text-emerald-400 font-medium">En línea · Coach Pro</span>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat messages stream */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 text-xs">
              {chatMessages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-2.5 rounded-2xl ${
                        isUser
                          ? 'bg-emerald-500 text-slate-950 font-medium rounded-br-xs'
                          : 'bg-slate-800 text-slate-100 rounded-bl-xs border border-slate-700/60'
                      }`}
                    >
                      <p className="leading-snug">{msg.text}</p>
                      <span
                        className={`text-[9px] block text-right mt-1 ${
                          isUser ? 'text-slate-800' : 'text-slate-400'
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input form */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={chatInputText}
                onChange={(e) => setChatInputText(e.target.value)}
                placeholder="Escribe a tu entrenador..."
                className="flex-1 h-10 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: CANCELAR SUSCRIPCIÓN */}
      {isCancelConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            className={`w-full max-w-sm rounded-3xl p-5 border shadow-2xl ${
              isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <AlertCircle className="w-5 h-5" />
              <h3 className="text-sm font-bold">¿Cancelar suscripción de 1,500 $/mes?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Perderás el chat directo diario con {activeCoach?.name} y la calibración personalizada de sensores. Podrás reactivarla cuando gustes.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsCancelConfirmOpen(false)}
                className="flex-1 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Mantener Plan
              </button>
              <button
                onClick={() => {
                  cancelSubscription();
                  setIsCancelConfirmOpen(false);
                  triggerPushNotification(
                    'Suscripción cancelada',
                    'Has pasado al Plan Gratuito. Tus datos de sensores continuarán registrándose.',
                    'coach'
                  );
                }}
                className="flex-1 h-10 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
              >
                Sí, Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
