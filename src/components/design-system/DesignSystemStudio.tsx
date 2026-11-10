import React, { useState } from 'react';
import {
  COLOR_PALETTE,
  TYPOGRAPHY_SCALE,
  SPACING_GRID_8PT,
  REACT_NATIVE_STACK_RECOMMENDATIONS,
  ACCESSIBILITY_GUIDELINES
} from '../../data/designSystemSpec';
import {
  Copy,
  Check,
  Code,
  Palette,
  Layers,
  Smartphone,
  Shield,
  FileText,
  Sparkles,
  ExternalLink,
  Sliders,
  ToggleLeft,
  ChevronRight,
  Info
} from 'lucide-react';

export const DesignSystemStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'style-guide' | 'wireframes' | 'components' | 'navigation' | 'react-native' | 'accessibility'
  >('style-guide');

  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedAllMarkdown, setCopiedAllMarkdown] = useState<boolean>(false);

  // Component state playground
  const [buttonState, setButtonState] = useState<'normal' | 'loading' | 'disabled'>('normal');
  const [toggleState, setToggleState] = useState<boolean>(true);
  const [sliderValue, setSliderValue] = useState<number>(10000);
  const [selectedChip, setSelectedChip] = useState<string>('Fuerza');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(id);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleCopyFullMarkdown = () => {
    const markdownDoc = `# FITTRACK PULSE - GUÍA DE ESTILO, WIREFRAMES & SISTEMA DE DISEÑO
Diseñado por: Diseñador Senior UX/UI para React Native / Figma (2024-2025)

## 1. GUÍA DE ESTILO Y TOKENS VISUALES
- Volt Mint (Primary Accent): #10B981 (CTAs, anillos de actividad, badges activos)
- Energetic Lime (Highlight): #84CC16 (Gradientes de aceleración, métricas)
- Flame Orange (Metabolismo): #F97316 (Calorías quemadas, alertas)
- Electric Cyan (GPS / Sensores): #06B6D4 (Telemetría de velocidad y ruta)
- Midnight Navy (Canvas Dark): #080D1A (Fondo 60% en Modo Oscuro)
- Slate Deep Surface: #0F172A (Tarjetas y modales en Modo Oscuro)
- Pure White (Light Canvas): #FFFFFF / #F8FAFC
- Tipografía Principal: Plus Jakarta Sans / SF Pro (Display: 32pt, H1: 24pt, H2: 20pt, Body: 14pt, Caption: 12pt)
- Tipografía Tabular: JetBrains Mono (Telemetría de sensores, coordenadas, números)

## 2. WIREFRAMES PANTALLA POR PANTALLA
[Módulo 1: Onboarding & Registro Multi-Paso]
- Pantalla de bienvenida con hero 4:3, social login (Apple, Google, Email)
- Stepper de 5 pasos: Biometría (nombre, edad, sexo, altura) -> Peso actual vs deseado -> Nivel de actividad -> Meta fitness -> Restricciones médicas.

[Módulo 2: Resumen / Dashboard Principal]
- Header: Saludo personalizado + Avatar con estado Pro.
- Card Principal: Anillo SVG circular animado de pasos diarios (progreso actual/meta).
- Grid 2x2: Calorías (Flame Orange), Distancia km (Cyan), Meta Peso (Verde con delta), Racha de días.
- Widget de 5 Sensores Live: Acelerómetro (m/s²), Giroscopio (rad/s), GPS (lat/lng, km/h), Podómetro (spm) y Barómetro (hPa/altitud).
- Gráfico Semanal: 7 barras interactivas con detalle diario.

[Módulo 3: Módulo Meta & Nutrición]
- Donut y barra segmentada de macronutrientes diarios (Proteínas, Carbos, Grasas).
- Calculadora metabólica TDEE/BMR (Mifflin-St Jeor) con balance calórico.
- CTA Destacado: "Actualizar mi peso semanal" con modal interactivo.
- Comparativa "Cómo mejoré / Cómo empeoré": Indicador de variación y composición corporal.
- Slider de meta de pasos diaria ajustable en tiempo real.
- Timeline de registros con filtro Semana / Mes.

[Módulo 4: Módulo Entrenador Personalizado ($1,500/mes)]
- Tarjeta "Mi Entrenador Actual": Avatar, estado en línea, botón Chat Directo, botón "Cambiar Entrenador" (con badge "Gratis 1 vez al mes") y opción "Cancelar suscripción".
- Directorio de entrenadores: Filtros por Sexo (Chips: Todos / Hombres / Mujeres) y Especialidades.
- Modal de perfil completo con certificaciones avaladas, bio y reseñas.
- Flujo de checkout con botón de cobro recurrente de 1,500 $/mes.

[Módulo 5: Módulo Mi Perfil]
- Foto editable y datos biométricos generales editables.
- Nota de diseño: Sincronización reactiva instantánea en toda la aplicación.
- Preferencias: Unidades (kg/lb), Notificaciones push, Idioma (ES/EN).
- Suscripción y tarjeta de pago con fecha de renovación.
`;
    navigator.clipboard.writeText(markdownDoc);
    setCopiedAllMarkdown(true);
    setTimeout(() => setCopiedAllMarkdown(false), 2500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 text-slate-100">
      {/* Top Banner with Copy Full Doc */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#0c182f] border border-slate-800 shadow-xl mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Senior UX/UI Design Blueprint
            </span>
            <span className="text-xs text-slate-400">· React Native & Figma Ready</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            FitTrack Pulse — Sistema de Diseño & Wireframes
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Especificación técnica integral con guía de estilo, tokens atómicos en grid de 8pt, wireframes exhaustivos de los 5 módulos, arquitectura React Native (Expo Sensors) y accesibilidad WCAG AA.
          </p>
        </div>

        <button
          onClick={handleCopyFullMarkdown}
          className="h-11 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 shrink-0 transition-transform active:scale-95"
        >
          {copiedAllMarkdown ? (
            <>
              <Check className="w-4 h-4" /> ¡Especificación Copiada!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copiar Documentación en Markdown
            </>
          )}
        </button>
      </div>

      {/* Navigation tabs for studio */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-slate-800">
        {[
          { id: 'style-guide', label: '1. Guía de Estilo & Tokens', icon: Palette },
          { id: 'wireframes', label: '2. Wireframes de Pantallas', icon: Layers },
          { id: 'components', label: '3. Sistema de Componentes', icon: Sliders },
          { id: 'navigation', label: '4. Flujo de Navegación', icon: Smartphone },
          { id: 'react-native', label: '5. Stack React Native & Expo', icon: Code },
          { id: 'accessibility', label: '6. Accesibilidad (WCAG AA)', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-800 text-emerald-400 shadow-md border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: GUÍA DE ESTILO & TOKENS */}
      {activeTab === 'style-guide' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Color Palette section */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
            <h2 className="text-base font-extrabold text-white mb-1 flex items-center gap-2">
              <Palette className="w-5 h-5 text-emerald-400" />
              Paleta Cromática (Regla 60-30-10)
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              60% Lienzo neutro oscuro/claro, 30% Superficies estructurales y tarjetas con bordes hairline de 1px, 10% Acentos energéticos de alta intención (Volt Mint, Flame Orange, Electric Cyan).
            </p>

            <div className="space-y-4">
              {/* Primary Accents */}
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Colores Primarios de Marca & Acentos
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {COLOR_PALETTE.primary.map((col) => (
                    <div
                      key={col.hex}
                      className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl shrink-0 shadow-md border border-white/10"
                          style={{ backgroundColor: col.hex }}
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white">{col.name}</h4>
                          <span className="text-[11px] font-mono text-emerald-400">{col.hex}</span>
                          <p className="text-[10px] text-slate-400 mt-0.5">{col.role}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(col.hex, col.hex)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Copiar código HEX"
                      >
                        {copiedHex === col.hex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Accents */}
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Acentos Secundarios de Métricas Específicas
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {COLOR_PALETTE.secondary.map((col) => (
                    <div
                      key={col.hex}
                      className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl shrink-0 shadow-md border border-white/10"
                          style={{ backgroundColor: col.hex }}
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white">{col.name}</h4>
                          <span className="text-[11px] font-mono text-cyan-400">{col.hex}</span>
                          <p className="text-[10px] text-slate-400 mt-0.5">{col.role}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(col.hex, col.hex)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Copiar código HEX"
                      >
                        {copiedHex === col.hex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dark Theme Neutrals */}
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Neutros de Modo Oscuro (Midnight Navy)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {COLOR_PALETTE.darkTheme.map((col) => (
                    <div
                      key={col.name}
                      onClick={() => copyToClipboard(col.hex, col.name)}
                      className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/80 cursor-pointer hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-4 h-4 rounded-md border border-slate-700"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span className="text-[11px] font-mono font-bold text-slate-300">{col.hex}</span>
                      </div>
                      <h5 className="text-[11px] font-bold text-white truncate">{col.name}</h5>
                      <p className="text-[10px] text-slate-400 truncate">{col.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Typography Scale Section */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
            <h2 className="text-base font-extrabold text-white mb-1">
              Escala Tipográfica (Plus Jakarta Sans & JetBrains Mono)
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Jerarquía visual estructurada con proporción armónica para pantallas Retina y AMOLED.
            </p>

            <div className="space-y-3">
              {TYPOGRAPHY_SCALE.map((type) => (
                <div
                  key={type.level}
                  className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-emerald-400">{type.level}</span>
                    <h3 className="text-base font-bold text-white leading-tight">
                      FitTrack Pulse: Rendimiento & Salud
                    </h3>
                    <p className="text-[11px] text-slate-400">{type.usage}</p>
                  </div>
                  <div className="text-right sm:text-right text-[11px] font-mono text-slate-400 shrink-0">
                    <div>{type.size} · Line: {type.lineHeight}</div>
                    <div className="text-slate-300 font-bold">{type.weight}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8pt Grid & Spacing */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
            <h2 className="text-base font-extrabold text-white mb-1">
              Cuadrícula Espacial de 8pt (8-Point Grid)
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Todos los márgenes, paddings internos y alturas de botones se basan en múltiplos de 8 (con excepción de 12pt para micro-chips).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SPACING_GRID_8PT.map((sp) => (
                <div key={sp.name} className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white font-mono">{sp.name}</span>
                    <span className="text-xs font-extrabold text-emerald-400 font-mono">{sp.value}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{sp.usage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WIREFRAMES PANTALLA POR PANTALLA */}
      {activeTab === 'wireframes' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <p className="text-xs text-slate-300">
              Esta sección contiene los <strong className="text-emerald-400">wireframes estructurados en texto y jerarquía espacial</strong> listos para crear los frames en Figma y mapear en código React Native.
            </p>
          </div>

          {/* Módulo 1 */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Módulo 1 · Onboarding & Registro Multi-Paso
              </span>
              <span className="text-[10px] text-slate-400 font-mono">5 Pasos + Bienvenida</span>
            </div>
            <h3 className="text-base font-bold text-white mb-3">
              Estructura Wireframe de Registro Biométrico
            </h3>

            <div className="bg-slate-950 p-4 rounded-2xl font-mono text-xs text-slate-300 leading-relaxed space-y-3 overflow-x-auto">
              <div>
                <strong className="text-emerald-400">[FRAME: 01_ONBOARDING_WELCOME] (390 x 844 pt)</strong>
                <p>├── Top Safe Area (44 pt): Status bar, Signal, Wifi, Battery</p>
                <p>├── Hero Media Container (342 x 220 pt): Imagen 4:3 con scrim inferior degradado a negro</p>
                <p>├── Value Proposition Block: H1 "Telemetría en tiempo real & Coaching humano" + 3 rows de beneficios (5 Sensores, Nutrición, Entrenador)</p>
                <p>├── Primary Action CTA (342 x 48 pt): Botón Volt Mint "Comenzar Evaluación"</p>
                <p>├── Divider con texto "o iniciar sesión con"</p>
                <p>└── Social Auth Grid (2 columnas, 44 pt altura): Apple ID y Google Sign-In</p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <strong className="text-cyan-400">[FRAME: 02_STEPPER_REGISTER] (Paso 1 al 5)</strong>
                <p>├── Header (56 pt): Botón Atrás (44x44pt hitbox) + Indicador numérico "Paso X de 5" + Botón X cerrar</p>
                <p>├── Segmented Progress Bar (342 x 6 pt): Relleno dinámico 20%, 40%, 60%, 80%, 100% con gradiente mint-lime</p>
                <p>├── Paso 1: Inputs de Nombre (Text Input), Edad (Number), Altura (cm) y Sexo (Segmented 3-Way Buttons)</p>
                <p>├── Paso 2: Sliders continuos de Peso Actual (40-150 kg) y Peso Objetivo + Preview de variación delta</p>
                <p>├── Paso 3: Selector de lista interactiva (5 niveles de actividad física con check icon)</p>
                <p>├── Paso 4: Grid 2x2 de objetivos (Perder Grasa, Ganar Músculo, Mantenerse, Resistencia)</p>
                <p>├── Paso 5: Lista de verificación médica (Restricciones articulares, lumbalgia, cardiovasculares, etc.)</p>
                <p>└── Bottom Sticky Action CTA: Botón de ancho completo "Continuar" / "Finalizar & Entrar"</p>
              </div>
            </div>
          </div>

          {/* Módulo 2 */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Módulo 2 · Dashboard Principal (Resumen)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Home View</span>
            </div>
            <h3 className="text-base font-bold text-white mb-3">
              Estructura Wireframe de Telemetría Diaria
            </h3>

            <div className="bg-slate-950 p-4 rounded-2xl font-mono text-xs text-slate-300 leading-relaxed space-y-3 overflow-x-auto">
              <div>
                <strong className="text-emerald-400">[FRAME: 03_DASHBOARD_SUMMARY] (390 x 844 pt)</strong>
                <p>├── Header Row (64 pt): Avatar 44x44pt con borde Volt Mint + Saludo dinámico "¡Buenos días, Alejandro!" + Botón Campana</p>
                <p>├── Hero Card: Anillo Radial de Pasos (150x150 pt SVG circle) con strokeDashoffset animado, conteo 7,420 / 10,000 pasos y porcentaje central</p>
                <p>├── Grid 2x2 Cards Secundarias (Gap: 12 pt, Padding: 16 pt):</p>
                <p>│   ├── Card 1: Calorías Quemadas (Icono fuego #F97316, 612 kcal, gasto activo)</p>
                <p>│   ├── Card 2: Distancia (Icono ruta #06B6D4, 5.4 km, odómetro GPS)</p>
                <p>│   ├── Card 3: Meta Peso (Icono balanza #10B981, 78.4 vs 74.0 kg, -2.8 kg logrados)</p>
                <p>│   └── Card 4: Racha Activa (Icono rayo #FBBF24, 14 días, Nivel Bronce Pro)</p>
                <p>├── Live Sensor Telemetry Widget: Indicador pulsante LIVE + Toggle 3 modos (Reposo, Caminando, Corriendo) + Telemetría de los 5 sensores</p>
                <p>├── Weekly Activity Bar Chart: 7 barras verticales (Lun a Dom) con estado interactivo y highlight del día actual</p>
                <p>└── Fixed Bottom Tab Bar: 4 pestañas accesibles (Resumen, Metas, Entrenador, Perfil)</p>
              </div>
            </div>
          </div>

          {/* Módulo 3 */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Módulo 3 · Nutrición & Metas
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Nutritional & Goals</span>
            </div>
            <h3 className="text-base font-bold text-white mb-3">
              Estructura Wireframe de Macronutrientes y Peso Semanal
            </h3>

            <div className="bg-slate-950 p-4 rounded-2xl font-mono text-xs text-slate-300 leading-relaxed space-y-3 overflow-x-auto">
              <div>
                <strong className="text-emerald-400">[FRAME: 04_GOALS_NUTRITION] (390 x 844 pt)</strong>
                <p>├── Top Action Banner: CTA "Check-in Semanal: ¿Te pesaste esta mañana?" → dispara Modal Elegante</p>
                <p>├── Daily Macros Card: Barra segmentada de calorías totales + 3 micro-cards de Proteína (g), Carbos (g) y Grasas (g) con barras de progreso</p>
                <p>├── Metabolic Calculator: Display BMR (Basal) + TDEE (Gasto Total) + Meta calórica según objetivo de déficit/superávit</p>
                <p>├── Tendencia "Cómo mejoré / Cómo empeoré": Variación -2.8 kg (-3.4%), ícono de tendencia y análisis textual</p>
                <p>├── Daily Step Goal Slider: Control deslizante continuo (5,000 a 20,000) con sincronización reactiva al Dashboard</p>
                <p>├── Timeline de Registros Históricos: Selector de pestañas Semana / Mes + Lista de logs con fecha y peso</p>
                <p>├── Push Notifications Config: 3 toggles para comidas, pasos e inactividad</p>
                <p>└── Modal Input Semanal de Peso: Bottom sheet con stepper numérico (- / +), input de nota y botón de guardar</p>
              </div>
            </div>
          </div>

          {/* Módulo 4 */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Módulo 4 · Entrenador Personalizado ($1,500/mes)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Coaching & Live Chat</span>
            </div>
            <h3 className="text-base font-bold text-white mb-3">
              Estructura Wireframe de Directorio, Contratación y Chat
            </h3>

            <div className="bg-slate-950 p-4 rounded-2xl font-mono text-xs text-slate-300 leading-relaxed space-y-3 overflow-x-auto">
              <div>
                <strong className="text-emerald-400">[FRAME: 05_COACH_HUB] (390 x 844 pt)</strong>
                <p>├── Active Coach Card: Tarjeta destacada con avatar, nombre, rating, botón "Chat Directo" y botón "Cambiar Entrenador"</p>
                <p>├── Badge de Política: "Gratis 1 vez al mes" con aviso del estado (Disponible vs Usado y fecha de renovación)</p>
                <p>├── Filter Chips: Selector por sexo (Todos / Hombres / Mujeres) + Especialidades (Fuerza, Nutrición, Running, HIIT)</p>
                <p>├── Directory Cards: Foto de estudio 80x96pt, rating con estrellas, cupos disponibles, precio "$1,500 / mes" y botones "Ver Perfil" / "Contratar"</p>
                <p>├── Modal Perfil Coach: Bio extendida, 3 certificaciones verificadas (CSCS, ISSA, ACE) y reseñas de clientes</p>
                <p>├── Modal Checkout: Resumen de cobro recurrente mensual de $1,500, tarjeta Visa vinculada y confirmación</p>
                <p>├── Modal Chat Directo: Interfaz de mensajería en tiempo real con burbujas de texto, hora e input con botón de enviar</p>
                <p>└── Modal Cancelación: Confirmación con aviso de pérdida de beneficios antes de degradar a Plan Gratuito</p>
              </div>
            </div>
          </div>

          {/* Módulo 5 */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Módulo 5 · Mi Perfil & Preferencias
              </span>
              <span className="text-[10px] text-slate-400 font-mono">User Settings</span>
            </div>
            <h3 className="text-base font-bold text-white mb-3">
              Estructura Wireframe de Configuración y Sincronización
            </h3>

            <div className="bg-slate-950 p-4 rounded-2xl font-mono text-xs text-slate-300 leading-relaxed space-y-3 overflow-x-auto">
              <div>
                <strong className="text-emerald-400">[FRAME: 06_USER_PROFILE] (390 x 844 pt)</strong>
                <p>├── Profile Header: Avatar con botón de edición fotográfica + Nombre + Badge "PRO" + Email + Métricas rápidas</p>
                <p>├── Architecture Callout Banner: Nota de diseño sobre la propagación reactiva instantánea a Dashboard, Metas y Coach</p>
                <p>├── Biometric Data Editor: Formulario con campos de Nombre, Edad, Altura, Peso Actual, Peso Deseado, etc.</p>
                <p>├── System Preferences: Toggle de Sistema de Unidades (Métrico kg/cm vs Imperial lb/in) y Selector de Idioma</p>
                <p>├── Billing & Subscription: Resumen de plan activo ($1,500/mes), fecha de renovación y método de pago Visa Signature</p>
                <p>└── Account Actions: Botón Cerrar Sesión (con modal de confirmación) y Botón Eliminar Cuenta</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SISTEMA DE COMPONENTES INTERACTIVOS */}
      {activeTab === 'components' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
            <h2 className="text-base font-extrabold text-white mb-1">
              Catálogo de Componentes & Estados Táctiles
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Cada componente cumple con el tamaño mínimo de contacto de 44x44pt y cuenta con estados Normal, Hover, Pressed y Disabled.
            </p>

            <div className="space-y-6">
              {/* 1. Botones */}
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                  1. Botones (Primary, Secondary, Ghost, Danger)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {/* Primary */}
                  <div className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-emerald-400">Primary (Volt Mint)</span>
                    <button className="w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold text-xs shadow-md transition-all">
                      Continuar
                    </button>
                    <button disabled className="w-full h-11 rounded-xl bg-emerald-500/40 text-slate-950/60 font-bold text-xs cursor-not-allowed">
                      Deshabilitado
                    </button>
                  </div>

                  {/* Secondary */}
                  <div className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-300">Secondary (Slate 800)</span>
                    <button className="w-full h-11 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-100 font-bold text-xs border border-slate-700 transition-all">
                      Ver Detalles
                    </button>
                    <button disabled className="w-full h-11 rounded-xl bg-slate-800/40 text-slate-500 font-bold text-xs border border-slate-800 cursor-not-allowed">
                      Deshabilitado
                    </button>
                  </div>

                  {/* Ghost */}
                  <div className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-300">Ghost / Subtle</span>
                    <button className="w-full h-11 rounded-xl bg-transparent hover:bg-slate-800/60 active:scale-95 text-slate-300 font-semibold text-xs border border-slate-800 transition-all">
                      Cancelar
                    </button>
                    <button disabled className="w-full h-11 rounded-xl bg-transparent text-slate-600 font-semibold text-xs border border-slate-900 cursor-not-allowed">
                      Deshabilitado
                    </button>
                  </div>

                  {/* Danger */}
                  <div className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-red-400">Danger</span>
                    <button className="w-full h-11 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold text-xs shadow-md transition-all">
                      Cancelar Plan
                    </button>
                    <button disabled className="w-full h-11 rounded-xl bg-red-900/30 text-red-400/40 font-bold text-xs cursor-not-allowed">
                      Deshabilitado
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Inputs & Toggles & Sliders */}
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                  2. Entradas de Datos, Toggles & Sliders
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Text Input */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
                    <label className="text-[11px] font-bold text-slate-300">Input con Icono & Foco</label>
                    <input
                      type="text"
                      placeholder="Ej. 10,000 pasos"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    <span className="text-[10px] text-slate-400">Hitbox táctil: 44 pt</span>
                  </div>

                  {/* Toggle */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
                    <label className="text-[11px] font-bold text-slate-300">Toggle Switch Táctil</label>
                    <div
                      onClick={() => setToggleState(!toggleState)}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-900 cursor-pointer"
                    >
                      <span className="text-xs text-slate-300">
                        {toggleState ? 'Activo' : 'Inactivo'}
                      </span>
                      <div
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                          toggleState ? 'bg-emerald-500' : 'bg-slate-800'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            toggleState ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">Microanimación 150ms spring</span>
                  </div>

                  {/* Slider */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-bold text-slate-300">Slider Continuo</label>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {sliderValue.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="20000"
                      step="500"
                      value={sliderValue}
                      onChange={(e) => setSliderValue(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400">Rango: 5,000 a 20,000 pasos</span>
                  </div>
                </div>
              </div>

              {/* 3. Filter Chips & Cards */}
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                  3. Chips Interactivos & Jerarquía de Tarjetas
                </span>
                <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {['Todos', 'Fuerza', 'Nutrición', 'Running', 'HIIT'].map((chip) => (
                      <button
                        key={chip}
                        onClick={() => setSelectedChip(chip)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                          selectedChip === chip
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                            : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* Card normal */}
                    <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-xs font-bold text-white block mb-1">Tarjeta Estándar (Elevación 1)</span>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        Fondo #0F172A, borde hairline 1px rgba(255,255,255,0.08), radio 16-24pt.
                      </p>
                    </div>

                    {/* Skeleton state */}
                    <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="w-24 h-3 bg-slate-800 rounded animate-pulse" />
                      <div className="w-full h-8 bg-slate-800/60 rounded-xl animate-pulse" />
                      <div className="w-1/2 h-2.5 bg-slate-800/40 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FLUJO DE NAVEGACIÓN */}
      {activeTab === 'navigation' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
            <h2 className="text-base font-extrabold text-white mb-1">
              Arquitectura de Navegación (React Navigation Tree)
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Estructura jerárquica para React Navigation v6/v7 con flujo de autenticación condicional y bottom tabs ergonómicas.
            </p>

            <div className="bg-slate-950 p-5 rounded-2xl font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
              <p className="text-emerald-400 font-bold">AppNavigationContainer</p>
              <p>└── RootStackNavigator</p>
              <p className="pl-4">├── AuthFlow (Condicional si user === null)</p>
              <p className="pl-8">│   ├── WelcomeScreen (Social login Apple/Google)</p>
              <p className="pl-8">│   └── OnboardingStepperScreen (5 Pasos biometría y metas)</p>
              <p className="pl-4">├── MainTabNavigator (Condicional si user !== null)</p>
              <p className="pl-8">│   ├── Tab 1: DashboardScreen (Resumen, Anillo de pasos, 5 Sensores LIVE)</p>
              <p className="pl-8">│   ├── Tab 2: GoalsScreen (Nutrición, TDEE, Historial, Slider de pasos)</p>
              <p className="pl-8">│   ├── Tab 3: CoachScreen (Directorio, Mi coach activo, Chat, Cambio gratis 1x/mes)</p>
              <p className="pl-8">│   └── Tab 4: ProfileScreen (Datos editables, Unidades, Cobro, Logout)</p>
              <p className="pl-4">└── Modals & Overlays Stack (Presentation: 'modal' o 'containedModal')</p>
              <p className="pl-8">├── WeightLoggingModal (Bottom sheet con num-picker)</p>
              <p className="pl-8">├── CoachDetailModal (Bio, certificados y reviews)</p>
              <p className="pl-8">├── CoachCheckoutModal (Flujo Stripe 1,500 $/mes)</p>
              <p className="pl-8">├── ChangeCoachModal (Validación de cambio gratuito 1x al mes)</p>
              <p className="pl-8">└── LiveChatModal (Mensajería en tiempo real con entrenador)</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: REACT NATIVE & EXPO */}
      {activeTab === 'react-native' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
            <h2 className="text-base font-extrabold text-white mb-1">
              Stack Tecnológico Recomendado para React Native / Expo
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Librerías de grado de producción seleccionadas para rendimiento a 60/120 FPS y consumo mínimo de batería.
            </p>

            <div className="space-y-4">
              {REACT_NATIVE_STACK_RECOMMENDATIONS.map((item) => (
                <div key={item.category} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-xs font-bold text-white">{item.category}</h3>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                      {item.library}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{item.description}</p>
                  <pre className="p-3 bg-slate-900 rounded-xl text-[11px] font-mono text-emerald-300/90 overflow-x-auto border border-slate-800/80">
                    <code>{item.codeSnippet}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ACCESIBILIDAD */}
      {activeTab === 'accessibility' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
            <h2 className="text-base font-extrabold text-white mb-1">
              Estándares de Accesibilidad (WCAG AA & Ergonomía Táctil)
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Cumplimiento riguroso de directrices de accesibilidad digital para iOS (Human Interface Guidelines) y Android (Material 3).
            </p>

            <div className="space-y-3">
              {ACCESSIBILITY_GUIDELINES.map((item) => (
                <div key={item.topic} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-xs font-bold text-white">{item.topic}</h3>
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold bg-cyan-500/10 px-2 py-0.5 rounded">
                      {item.requirement}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
