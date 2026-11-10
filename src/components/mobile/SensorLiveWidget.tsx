import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, Compass, Navigation, Footprints, Gauge, ChevronDown, ChevronUp, Radio } from 'lucide-react';

export const SensorLiveWidget: React.FC = () => {
  const { sensorData, setActivityMode, isSensorsLive, toggleSensorsLive, isDarkMode } = useApp();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div
      className={`rounded-2xl border transition-all ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800 text-slate-100'
          : 'bg-white border-slate-200 text-slate-800 shadow-sm'
      } p-3.5 mb-4`}
    >
      {/* Header with live indicator */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isSensorsLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
              }`}
            />
            {isSensorsLive && (
              <span className="absolute w-4 h-4 rounded-full bg-emerald-500/30 animate-ping" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-tight">5 Sensores de Hardware</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20">
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Sincronización en la nube activa · Expo Sensors
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleSensorsLive}
            className={`px-2 py-1 text-[10px] font-semibold rounded-lg border transition-colors ${
              isSensorsLive
                ? 'bg-slate-800 text-emerald-400 border-slate-700'
                : 'bg-slate-800/40 text-slate-400 border-slate-700'
            }`}
            title="Pausar o reanudar telemetría"
          >
            {isSensorsLive ? 'Pausar' : 'Reanudar'}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg hover:bg-slate-800/40 text-slate-400 transition-colors"
            aria-label={isExpanded ? 'Colapsar sensores' : 'Expandir sensores'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Simulator mode chips */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-950/40 dark:bg-slate-950/60 rounded-xl mb-3 border border-slate-800/40">
        <span className="text-[10px] font-medium text-slate-400 px-1.5">Simular:</span>
        <button
          onClick={() => setActivityMode('resting')}
          className={`flex-1 py-1 text-[11px] font-semibold rounded-lg transition-all ${
            sensorData.activityMode === 'resting'
              ? 'bg-emerald-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Reposo
        </button>
        <button
          onClick={() => setActivityMode('walking')}
          className={`flex-1 py-1 text-[11px] font-semibold rounded-lg transition-all ${
            sensorData.activityMode === 'walking'
              ? 'bg-emerald-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🚶 Caminando
        </button>
        <button
          onClick={() => setActivityMode('running')}
          className={`flex-1 py-1 text-[11px] font-semibold rounded-lg transition-all ${
            sensorData.activityMode === 'running'
              ? 'bg-emerald-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🏃 Corriendo
        </button>
      </div>

      {/* Primary compact glance */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-slate-950/30 p-2 rounded-xl border border-slate-800/50">
          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
            <Footprints className="w-3 h-3 text-emerald-400" />
            <span>Cadencia</span>
          </div>
          <div className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
            {sensorData.pedometer.currentCadenceSpm}{' '}
            <span className="text-[9px] font-normal text-slate-400">spm</span>
          </div>
        </div>

        <div className="bg-slate-950/30 p-2 rounded-xl border border-slate-800/50">
          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
            <Navigation className="w-3 h-3 text-cyan-400" />
            <span>Velocidad</span>
          </div>
          <div className="text-sm font-bold font-mono text-cyan-400 tabular-nums">
            {sensorData.gps.speedKmh}{' '}
            <span className="text-[9px] font-normal text-slate-400">km/h</span>
          </div>
        </div>

        <div className="bg-slate-950/30 p-2 rounded-xl border border-slate-800/50">
          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
            <Gauge className="w-3 h-3 text-purple-400" />
            <span>Altitud</span>
          </div>
          <div className="text-sm font-bold font-mono text-purple-400 tabular-nums">
            {sensorData.barometer.altitudeM}{' '}
            <span className="text-[9px] font-normal text-slate-400">m</span>
          </div>
        </div>
      </div>

      {/* Expanded breakdown of all 5 sensors */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-800/70 space-y-2 text-xs animate-in fade-in duration-200">
          {/* 1. Accelerometer */}
          <div className="flex items-center justify-between bg-slate-950/40 p-2 rounded-lg">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-lime-400" />
              <span className="font-semibold text-slate-300">1. Acelerómetro</span>
            </div>
            <div className="font-mono text-[11px] text-slate-300 tabular-nums">
              X:{sensorData.accelerometer.x} Y:{sensorData.accelerometer.y} Z:{sensorData.accelerometer.z}{' '}
              <span className="text-[9px] text-slate-400">m/s²</span>
            </div>
          </div>

          {/* 2. Gyroscope */}
          <div className="flex items-center justify-between bg-slate-950/40 p-2 rounded-lg">
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-slate-300">2. Giroscopio</span>
            </div>
            <div className="font-mono text-[11px] text-slate-300 tabular-nums">
              α:{sensorData.gyroscope.alpha} β:{sensorData.gyroscope.beta} γ:{sensorData.gyroscope.gamma}{' '}
              <span className="text-[9px] text-slate-400">rad/s</span>
            </div>
          </div>

          {/* 3. GPS */}
          <div className="flex items-center justify-between bg-slate-950/40 p-2 rounded-lg">
            <div className="flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-semibold text-slate-300">3. GPS en Vivo</span>
            </div>
            <div className="font-mono text-[11px] text-slate-300 tabular-nums">
              {sensorData.gps.latitude.toFixed(4)}, {sensorData.gps.longitude.toFixed(4)}{' '}
              <span className="text-[9px] text-slate-400">±{sensorData.gps.accuracyM}m</span>
            </div>
          </div>

          {/* 4. Pedometer */}
          <div className="flex items-center justify-between bg-slate-950/40 p-2 rounded-lg">
            <div className="flex items-center gap-1.5">
              <Footprints className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-slate-300">4. Podómetro</span>
            </div>
            <div className="font-mono text-[11px] text-slate-300 tabular-nums">
              {sensorData.pedometer.totalStepsToday.toLocaleString()} pasos acumulados
            </div>
          </div>

          {/* 5. Barometer */}
          <div className="flex items-center justify-between bg-slate-950/40 p-2 rounded-lg">
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-violet-400" />
              <span className="font-semibold text-slate-300">5. Barómetro</span>
            </div>
            <div className="font-mono text-[11px] text-slate-300 tabular-nums">
              {sensorData.barometer.pressureHpa} hPa · {sensorData.barometer.altitudeM} m s.n.m.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
