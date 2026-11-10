export interface DesignToken {
  category: string;
  name: string;
  value: string;
  previewColor?: string;
  description: string;
}

export const COLOR_PALETTE = {
  primary: [
    { name: 'Volt Mint (Primary Accent)', hex: '#10B981', rgb: 'rgb(16, 185, 129)', role: 'CTAs principales, anillos de progreso completado, badges activos' },
    { name: 'Lime Energetic (Highlight)', hex: '#84CC16', rgb: 'rgb(132, 204, 22)', role: 'Gradientes de aceleración, métricas de alta energía' },
    { name: 'Mint Light Tint (Soft Surface)', hex: 'rgba(16, 185, 129, 0.12)', rgb: 'rgba(16, 185, 129, 0.12)', role: 'Fondos de chips activos, halos de gráficos' },
  ],
  secondary: [
    { name: 'Flame Orange (Calorías)', hex: '#F97316', rgb: 'rgb(249, 115, 22)', role: 'Ícono de calorías quemadas, métricas metabólicas, avisos' },
    { name: 'Electric Cyan (Velocidad/GPS)', hex: '#06B6D4', rgb: 'rgb(6, 182, 212)', role: 'Telemetría de GPS, sensores de movimiento, hidratación' },
    { name: 'Deep Purple / Violet (Grasas)', hex: '#8B5CF6', rgb: 'rgb(139, 92, 246)', role: 'Macronutriente grasas, métricas de recuperación y sueño' },
  ],
  darkTheme: [
    { name: 'Midnight Navy Background', hex: '#080D1A', rgb: 'rgb(8, 13, 26)', role: 'Lienzo principal en Modo Oscuro (60% canvas)' },
    { name: 'Slate Deep Surface 1', hex: '#0F172A', rgb: 'rgb(15, 23, 42)', role: 'Fondo de tarjetas, modales y barras de navegación' },
    { name: 'Slate Surface 2 (Elevated)', hex: '#1E293B', rgb: 'rgb(30, 41, 59)', role: 'Contenedores de inputs, chips inactivos, divisores' },
    { name: 'Border Subdued (Hairline)', hex: 'rgba(255, 255, 255, 0.08)', rgb: 'rgba(255, 255, 255, 0.08)', role: 'Bordes limpios de 1px en tarjetas y modales' },
    { name: 'Text Primary Dark', hex: '#F8FAFC', rgb: 'rgb(248, 250, 252)', role: 'Títulos H1-H3, números de métricas destacados' },
    { name: 'Text Secondary Dark', hex: '#94A3B8', rgb: 'rgb(148, 163, 184)', role: 'Subtítulos, etiquetas, texto descriptivo' },
    { name: 'Text Muted Dark', hex: '#64748B', rgb: 'rgb(100, 116, 139)', role: 'Metadatos desglosados, unidades (km, kcal)' },
  ],
  lightTheme: [
    { name: 'Canvas Snow White', hex: '#F8FAFC', rgb: 'rgb(248, 250, 252)', role: 'Lienzo principal en Modo Claro' },
    { name: 'Surface Pure White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', role: 'Tarjetas con elevación suave y modales' },
    { name: 'Border Light Hairline', hex: '#E2E8F0', rgb: 'rgb(226, 232, 240)', role: 'Bordes de separación y cajas de entrada' },
    { name: 'Text Primary Light', hex: '#0F172A', rgb: 'rgb(15, 23, 42)', role: 'Títulos con alto contraste AA+' },
    { name: 'Text Secondary Light', hex: '#475569', rgb: 'rgb(71, 85, 105)', role: 'Cuerpo de texto legible en exteriores' },
    { name: 'Text Muted Light', hex: '#94A3B8', rgb: 'rgb(148, 163, 184)', role: 'Microtextos informativos y fechas' },
  ],
};

export const TYPOGRAPHY_SCALE = [
  { level: 'Display Hero', size: '32pt / 40px', lineHeight: '38pt / 46px', weight: '800 ExtraBold', tracking: '-0.02em', usage: 'Números de pasos gigantes, titulares de bienvenida' },
  { level: 'Heading 1 (H1)', size: '24pt / 30px', lineHeight: '30pt / 36px', weight: '700 Bold', tracking: '-0.015em', usage: 'Títulos de módulos principales (Resumen, Metas, Entrenador)' },
  { level: 'Heading 2 (H2)', size: '20pt / 25px', lineHeight: '26pt / 32px', weight: '700 Bold', tracking: '-0.01em', usage: 'Nombres de tarjetas principales, headers de modales' },
  { level: 'Heading 3 (H3)', size: '17pt / 21px', lineHeight: '22pt / 27px', weight: '600 SemiBold', tracking: '0em', usage: 'Subsecciones, nombres de entrenadores' },
  { level: 'Body Large', size: '15pt / 19px', lineHeight: '22pt / 28px', weight: '500 Medium', tracking: '0em', usage: 'Párrafos de bio, explicaciones de onboarding' },
  { level: 'Body Regular', size: '14pt / 17px', lineHeight: '20pt / 24px', weight: '400 Regular', tracking: '0em', usage: 'Descripciones, inputs de formularios' },
  { level: 'Caption / Label', size: '12pt / 15px', lineHeight: '16pt / 20px', weight: '600 SemiBold', tracking: '+0.01em', usage: 'Etiquetas de sensores, micro-métricas (km, kcal)' },
  { level: 'Tabular Telemetry', size: '13pt / 16px', lineHeight: '16pt / 20px', weight: '500 JetBrains Mono', tracking: '0 tabular-nums', usage: 'Coordenadas GPS, presión hPa, giroscopio rad/s' },
];

export const SPACING_GRID_8PT = [
  { name: 'spacing-2', value: '8pt / 8px', usage: 'Gaps compactos internos, márgenes entre icono y texto' },
  { name: 'spacing-3', value: '12pt / 12px', usage: 'Padding interno en chips y badges de micro-estados' },
  { name: 'spacing-4', value: '16pt / 16px', usage: 'Padding estándar de tarjetas, gutter lateral de pantalla en móvil' },
  { name: 'spacing-5', value: '20pt / 20px', usage: 'Gaps entre cards en feeds verticales' },
  { name: 'spacing-6', value: '24pt / 24px', usage: 'Separación entre secciones primarias' },
  { name: 'spacing-8', value: '32pt / 32px', usage: 'Espacio superior del header, separación antes de CTAs fijos' },
];

export const REACT_NATIVE_STACK_RECOMMENDATIONS = [
  {
    category: 'Monitoreo de Sensores en Tiempo Real (5 Sensores)',
    library: 'expo-sensors',
    packages: 'expo-sensors, expo-location',
    description: 'Provee acceso nativo desacoplado en background/foreground a: Accelerometer, Gyroscope, Pedometer, Barometer, y Location (GPS). Permite definir updateInterval a 500ms para balancear batería y precisión.',
    codeSnippet: `import { Accelerometer, Gyroscope, Pedometer, Barometer } from 'expo-sensors';
import * as Location from 'expo-location';

// Configurar frecuencia de actualización para optimizar consumo de batería
Accelerometer.setUpdateInterval(600);
const sub = Accelerometer.addListener(data => {
  // data: { x, y, z }
});`
  },
  {
    category: 'Navegación & Bottom Tab Bar Ergónoma',
    library: 'React Navigation v6 / v7',
    packages: '@react-navigation/native, @react-navigation/bottom-tabs, @react-navigation/native-stack',
    description: 'Stack principal con Tab Navigator inferior adaptado al Safe Area (`react-native-safe-area-context`). Soporta transición nativa fluida con Reanimated.',
    codeSnippet: `const Tab = createBottomTabNavigator();
<Tab.Navigator
  screenOptions={{
    headerShown: false,
    tabBarStyle: {
      position: 'absolute',
      height: 72,
      borderTopWidth: 0,
      backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
      borderRadius: 24,
      marginHorizontal: 16,
      marginBottom: 24,
    }
  }}
/>`
  },
  {
    category: 'Animaciones de Alto Rendimiento (60/120 FPS)',
    library: 'React Native Reanimated 3',
    packages: 'react-native-reanimated, react-native-gesture-handler',
    description: 'Imprescindible para el anillo circular de pasos, transiciones de modales bottom-sheet y gráficos en vivo ejecutados 100% en el UI Thread sin saturar el JS Thread.',
    codeSnippet: `import Animated, { useSharedValue, useAnimatedProps, withTiming } from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const strokeDashoffset = useDerivedValue(() => (1 - progress.value) * circumference);`
  },
  {
    category: 'Gráficos Médicos & Fitness de Alta Precisión',
    library: '@shopify/react-native-skia + Victory Native XL',
    packages: '@shopify/react-native-skia, victory-native',
    description: 'Renderizado vectorial acelerado por hardware para curvas de peso semanal, barras de actividad de lunes a domingo y gráficos sparkline fluidos.',
    codeSnippet: `import { CartesianChart, Line, Bar } from 'victory-native';
<CartesianChart data={weeklySteps} xKey="day" yKeys={["steps"]}>
  {({ points, chartBounds }) => (
    <Bar points={points.steps} chartBounds={chartBounds} color="#10B981" roundedCorners={{ topLeft: 6, topRight: 6 }} />
  )}
</CartesianChart>`
  },
  {
    category: 'Gestión de Estado & Sincronización en Tiempo Real',
    library: 'Zustand + TanStack Query (React Query) + Firebase / Supabase',
    packages: 'zustand, @tanstack/react-query',
    description: 'Zustand para estado atómico ultra-rápido en cliente (sensores, filtros, UI). React Query para sincronización de base de datos en tiempo real y revalidación en segundo plano.',
    codeSnippet: `export const useFitnessStore = create((set) => ({
  dailySteps: 7420,
  weightGoal: 74.0,
  updateSensors: (telemetry) => set({ telemetry }),
}));`
  },
  {
    category: 'Pagos recurrentes de $1,500/mes para Entrenadores',
    library: 'Stripe React Native SDK / RevenueCat',
    packages: '@stripe/stripe-react-native',
    description: 'Manejo seguro de PaymentSheet nativo de Apple Pay / Google Pay y tarjetas tokenizadas, cumpliendo normativa PCI DSS.',
    codeSnippet: `import { useStripe } from '@stripe/stripe-react-native';
const { initPaymentSheet, presentPaymentSheet } = useStripe();
// Abre el bottom sheet nativo con precio de 1,500 $/mes`
  }
];

export const ACCESSIBILITY_GUIDELINES = [
  {
    topic: 'Áreas Táctiles Mínimas (Thumb Hitboxes)',
    requirement: 'Mínimo 44 × 44 pt (Recomendado 48 × 48 pt)',
    detail: 'Todos los botones, chips interactivos, toggles e iconos con acción táctil cuentan con un hitbox de mínimo 48pt para evitar errores de pulsación y fatiga del pulgar en movimiento.'
  },
  {
    topic: 'Contraste Cromático WCAG AA / AAA',
    requirement: 'Ratio ≥ 4.5:1 para texto normal, ≥ 3.0:1 para métricas grandes',
    detail: 'En Modo Oscuro el fondo #080D1A con texto #F8FAFC genera contraste de 17.2:1. El texto secundario #94A3B8 genera contraste de 6.4:1 superando el estándar AA.'
  },
  {
    topic: 'Soporte para Dynamic Type y Escalado de Fuentes',
    requirement: 'React Native `allowFontScaling={true}` con topes `maxFontSizeMultiplier={1.3}`',
    detail: 'Las tarjetas principales usan auto-layout flexible para permitir que usuarios con visión reducida amplíen la fuente sin romper la cuadrícula ni cortar las métricas.'
  },
  {
    topic: 'Lectores de Pantalla (VoiceOver iOS / TalkBack Android)',
    requirement: 'Atributos `accessibilityLabel`, `accessibilityRole`, y `accessibilityValue`',
    detail: 'El anillo de pasos se expone como un medidor porcentual accesible: `accessibilityLabel="Progreso diario de pasos: 7,420 de 10,000 pasos, 74 por ciento completado"`. Los chips de filtro declaran su estado seleccionado.'
  },
  {
    topic: 'No Depender Exclusivamente del Color',
    requirement: 'Textos explicativos + Iconografía semántica',
    detail: 'Las mejoras o empeoramientos de peso se acompañan de flechas direccionales (▲ / ▼), signos (+ / -) y etiquetas textuales explícitas para personas con daltonismo.'
  }
];
