import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  UserProfile,
  SensorData,
  Coach,
  ChatMessage,
  WeightLogEntry,
  PushNotificationItem,
  UnitSystem
} from '../types';
import { INITIAL_COACHES } from '../data/coachesData';

interface AppContextType {
  // Navigation & View Mode
  activeTab: 'dashboard' | 'goals' | 'coach' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'goals' | 'coach' | 'profile') => void;
  viewMode: 'mobile-app' | 'design-system';
  setViewMode: (mode: 'mobile-app' | 'design-system') => void;
  deviceType: 'iphone' | 'android' | 'fluid';
  setDeviceType: (type: 'iphone' | 'android' | 'fluid') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;

  // User Profile & reactive updates
  profile: UserProfile;
  updateProfile: (partial: Partial<UserProfile>) => void;
  toggleUnitSystem: () => void;
  setDailyStepGoal: (goal: number) => void;

  // Weight logs & calculations
  weightLogs: WeightLogEntry[];
  addWeightLog: (weight: number, date?: string, note?: string) => void;
  weightDelta: { difference: number; improved: boolean; percent: number };

  // Sensors
  sensorData: SensorData;
  setActivityMode: (mode: 'walking' | 'running' | 'resting') => void;
  isSensorsLive: boolean;
  toggleSensorsLive: () => void;

  // Coach & Subscription
  coaches: Coach[];
  selectedCoachId: string | null;
  activeCoach: Coach | null;
  selectCoachForSubscription: (coachId: string) => void;
  cancelSubscription: () => void;
  changeCoach: (newCoachId: string) => { success: boolean; message: string };
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;

  // Push Notifications
  notifications: PushNotificationItem[];
  activeBanner: PushNotificationItem | null;
  triggerPushNotification: (title: string, body: string, type?: PushNotificationItem['type']) => void;
  dismissBanner: () => void;

  // Reset to initial
  resetDemoData: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Alejandro Morales',
  email: 'alejandro.morales@fittrack.app',
  age: 32,
  gender: 'male',
  height: 178, // cm
  currentWeight: 78.4, // kg
  targetWeight: 74.0, // kg
  activityLevel: 'moderate',
  fitnessGoal: 'lose_weight',
  medicalConditions: ['Sin restricciones severas', 'Leve sobrecarga lumbar ocasional'],
  unitSystem: 'metric',
  dailyStepGoal: 10000,
  dailyCalorieGoal: 2350,
  notificationsEnabled: {
    meals: true,
    steps: true,
    weeklyWeight: true,
    coachMessages: true,
  },
  subscription: {
    status: 'active',
    planName: 'FitTrack Personal Pro Coaching',
    priceMonthly: 1500,
    renewalDate: '15 de Noviembre, 2026',
    cardLast4: '4821',
    cardBrand: 'Visa Signature',
    coachChangeUsedThisMonth: false,
    coachChangeNextFreeDate: '01 de Noviembre, 2026',
  },
};

const INITIAL_WEIGHT_LOGS: WeightLogEntry[] = [
  { id: '1', date: '08 Sep', weight: 81.2, note: 'Inicio de plan' },
  { id: '2', date: '15 Sep', weight: 80.5, note: 'Semana 1 con Marcos' },
  { id: '3', date: '22 Sep', weight: 79.8, note: 'Semana 2 - mayor déficit' },
  { id: '4', date: '29 Sep', weight: 79.1, note: 'Semana 3' },
  { id: '5', date: '05 Oct', weight: 78.4, note: 'Registro actual' },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'coach',
    text: '¡Hola Alejandro! Revisé tu telemetría de ayer: tus 9,450 pasos y la cadencia de trote estuvieron excelentes. ¿Cómo sentiste la sobrecarga lumbar?',
    timestamp: '10:14 AM',
    isRead: true,
  },
  {
    id: 'm2',
    sender: 'user',
    text: 'Hola Marcos. La zona lumbar estuvo impecable, los estiramientos que me mandaste al terminar funcionaron perfecto.',
    timestamp: '10:20 AM',
    isRead: true,
  },
  {
    id: 'm3',
    sender: 'coach',
    text: 'Fantástico. Hoy nos toca sesión de tren superior y mantén tu meta de agua y 10,000 pasos. Ya ajusté tu ingesta de proteína a 160g.',
    timestamp: '10:22 AM',
    isRead: true,
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'goals' | 'coach' | 'profile'>('dashboard');
  const [viewMode, setViewMode] = useState<'mobile-app' | 'design-system'>('mobile-app');
  const [deviceType, setDeviceType] = useState<'iphone' | 'android' | 'fluid'>('iphone');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [weightLogs, setWeightLogs] = useState<WeightLogEntry[]>(INITIAL_WEIGHT_LOGS);
  const [coaches] = useState<Coach[]>(INITIAL_COACHES);
  const [selectedCoachId, setSelectedCoachId] = useState<string | null>('coach-1');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);

  const [isSensorsLive, setIsSensorsLive] = useState<boolean>(true);
  const [sensorData, setSensorData] = useState<SensorData>({
    accelerometer: { x: 0.18, y: 9.78, z: 1.12 },
    gyroscope: { alpha: 0.04, beta: -0.12, gamma: 0.08 },
    gps: { latitude: 19.4326, longitude: -99.1332, speedKmh: 4.8, accuracyM: 3.2 },
    pedometer: { currentCadenceSpm: 114, totalStepsToday: 7420 },
    barometer: { pressureHpa: 1013.25, altitudeM: 2240 },
    status: 'active',
    activityMode: 'walking',
  });

  const [notifications, setNotifications] = useState<PushNotificationItem[]>([
    {
      id: 'n1',
      title: 'Meta de Pasos Cerca',
      body: 'Llevas 7,420 pasos hoy. ¡Solo 2,580 para cumplir tus 10,000!',
      time: 'Hace 12 min',
      type: 'steps',
      read: false,
    },
    {
      id: 'n2',
      title: 'Mensaje de tu Coach',
      body: 'Marcos Benítez actualizó tu plan de fuerza de mañana.',
      time: 'Hace 45 min',
      type: 'coach',
      read: true,
    },
  ]);
  const [activeBanner, setActiveBanner] = useState<PushNotificationItem | null>(null);

  // Toggle Dark Mode
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  // Update Profile
  const updateProfile = useCallback((partial: Partial<UserProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...partial,
      subscription: partial.subscription ? { ...prev.subscription, ...partial.subscription } : prev.subscription,
      notificationsEnabled: partial.notificationsEnabled
        ? { ...prev.notificationsEnabled, ...partial.notificationsEnabled }
        : prev.notificationsEnabled,
    }));
  }, []);

  // Toggle Units
  const toggleUnitSystem = useCallback(() => {
    setProfile((prev) => {
      const nextUnit: UnitSystem = prev.unitSystem === 'metric' ? 'imperial' : 'metric';
      return { ...prev, unitSystem: nextUnit };
    });
  }, []);

  // Set Step Goal
  const setDailyStepGoal = useCallback((goal: number) => {
    setProfile((prev) => ({ ...prev, dailyStepGoal: goal }));
  }, []);

  // Weight Logging
  const addWeightLog = useCallback((weight: number, date?: string, note?: string) => {
    const entryDate = date || new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    const newEntry: WeightLogEntry = {
      id: Date.now().toString(),
      date: entryDate,
      weight,
      note: note || 'Registro manual',
    };
    setWeightLogs((prev) => [...prev, newEntry]);
    setProfile((prev) => ({ ...prev, currentWeight: weight }));
  }, []);

  // Calculate weight difference from initial
  const initialWeight = weightLogs.length > 0 ? weightLogs[0].weight : profile.currentWeight;
  const currentWeight = profile.currentWeight;
  const diff = currentWeight - initialWeight;
  const weightDelta = {
    difference: Math.abs(Number(diff.toFixed(1))),
    improved: profile.fitnessGoal === 'lose_weight' ? diff <= 0 : diff >= 0,
    percent: Math.abs(Number(((diff / initialWeight) * 100).toFixed(1))),
  };

  // Sensor Simulation Loop
  useEffect(() => {
    if (!isSensorsLive) return;

    const interval = setInterval(() => {
      setSensorData((prev) => {
        let stepInc = 0;
        let speed = prev.gps.speedKmh;
        let cadence = prev.pedometer.currentCadenceSpm;
        let ax = prev.accelerometer.x;
        let ay = prev.accelerometer.y;

        if (prev.activityMode === 'walking') {
          stepInc = Math.random() > 0.4 ? 1 : 0;
          speed = Number((4.2 + (Math.random() * 0.8 - 0.4)).toFixed(1));
          cadence = Math.round(110 + (Math.random() * 8 - 4));
          ax = Number((Math.sin(Date.now() / 400) * 0.4).toFixed(2));
          ay = Number((9.8 + Math.cos(Date.now() / 400) * 0.6).toFixed(2));
        } else if (prev.activityMode === 'running') {
          stepInc = Math.random() > 0.2 ? 2 : 1;
          speed = Number((9.5 + (Math.random() * 1.2 - 0.6)).toFixed(1));
          cadence = Math.round(162 + (Math.random() * 10 - 5));
          ax = Number((Math.sin(Date.now() / 250) * 1.8).toFixed(2));
          ay = Number((9.8 + Math.cos(Date.now() / 250) * 2.2).toFixed(2));
        } else {
          // resting
          stepInc = 0;
          speed = 0.0;
          cadence = 0;
          ax = Number((Math.sin(Date.now() / 2000) * 0.05).toFixed(2));
          ay = 9.81;
        }

        const newSteps = prev.pedometer.totalStepsToday + stepInc;
        const jitterAlpha = Number((Math.sin(Date.now() / 600) * 0.15).toFixed(2));

        return {
          ...prev,
          accelerometer: {
            x: ax,
            y: ay,
            z: Number((1.05 + Math.random() * 0.1).toFixed(2)),
          },
          gyroscope: {
            alpha: jitterAlpha,
            beta: Number((-0.1 + Math.random() * 0.04).toFixed(2)),
            gamma: Number((0.08 + Math.random() * 0.03).toFixed(2)),
          },
          gps: {
            ...prev.gps,
            speedKmh: speed,
          },
          pedometer: {
            currentCadenceSpm: cadence,
            totalStepsToday: newSteps,
          },
          barometer: {
            pressureHpa: Number((1013.2 + Math.sin(Date.now() / 5000) * 0.3).toFixed(2)),
            altitudeM: Number((2240 + Math.sin(Date.now() / 5000) * 2).toFixed(1)),
          },
        };
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isSensorsLive]);

  const setActivityMode = useCallback((mode: 'walking' | 'running' | 'resting') => {
    setSensorData((prev) => ({ ...prev, activityMode: mode }));
  }, []);

  const toggleSensorsLive = useCallback(() => {
    setIsSensorsLive((prev) => !prev);
  }, []);

  // Coach Selection & Subscription
  const activeCoach = coaches.find((c) => c.id === selectedCoachId) || null;

  const selectCoachForSubscription = useCallback((coachId: string) => {
    setSelectedCoachId(coachId);
    setProfile((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        status: 'active',
        coachChangeUsedThisMonth: false,
      },
    }));
  }, []);

  const cancelSubscription = useCallback(() => {
    setProfile((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        status: 'free',
        planName: 'Plan Gratuito (Sin Asesoría)',
        priceMonthly: 0,
      },
    }));
  }, []);

  const changeCoach = useCallback((newCoachId: string): { success: boolean; message: string } => {
    if (profile.subscription.coachChangeUsedThisMonth) {
      return {
        success: false,
        message: 'Ya has utilizado tu cambio gratuito de entrenador este mes. Se renovará el 01 del próximo mes.',
      };
    }

    setSelectedCoachId(newCoachId);
    setProfile((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        coachChangeUsedThisMonth: true,
      },
    }));

    // Add coach greeting message
    const newCoach = coaches.find((c) => c.id === newCoachId);
    if (newCoach) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'coach',
          text: `¡Hola ${profile.name}! Soy ${newCoach.name}, tu nuevo entrenador personal. Estoy revisando tu historial y datos de sensores. ¿Tienes alguna prioridad para empezar?`,
          timestamp: 'Ahora',
          isRead: true,
        },
      ]);
    }

    return {
      success: true,
      message: '¡Entrenador cambiado con éxito sin costo adicional!',
    };
  }, [profile.subscription.coachChangeUsedThisMonth, profile.name, coaches]);

  const sendChatMessage = useCallback((text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: 'Ahora',
      isRead: true,
    };
    setChatMessages((prev) => [...prev, userMsg]);

    // Simulated coach response after 1.5 seconds
    setTimeout(() => {
      const coachMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'coach',
        text: 'Excelente observación. Lo tomo en cuenta en tu registro. ¡Sigue así con la constancia de hoy!',
        timestamp: 'Ahora',
        isRead: true,
      };
      setChatMessages((prev) => [...prev, coachMsg]);
    }, 1500);
  }, []);

  // Notifications
  const dismissBanner = useCallback(() => {
    setActiveBanner(null);
  }, []);

  const triggerPushNotification = useCallback(
    (title: string, body: string, type: PushNotificationItem['type'] = 'workout') => {
      const newNotif: PushNotificationItem = {
        id: Date.now().toString(),
        title,
        body,
        time: 'Ahora',
        type,
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
      setActiveBanner(newNotif);

      // Auto dismiss after 5s
      setTimeout(() => {
        setActiveBanner((current) => (current?.id === newNotif.id ? null : current));
      }, 5000);
    },
    []
  );

  const resetDemoData = useCallback(() => {
    setProfile(DEFAULT_PROFILE);
    setWeightLogs(INITIAL_WEIGHT_LOGS);
    setSelectedCoachId('coach-1');
    setChatMessages(INITIAL_MESSAGES);
    setActiveTab('dashboard');
  }, []);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        deviceType,
        setDeviceType,
        isDarkMode,
        toggleDarkMode,
        isOnboardingOpen,
        setIsOnboardingOpen,
        profile,
        updateProfile,
        toggleUnitSystem,
        setDailyStepGoal,
        weightLogs,
        addWeightLog,
        weightDelta,
        sensorData,
        setActivityMode,
        isSensorsLive,
        toggleSensorsLive,
        coaches,
        selectedCoachId,
        activeCoach,
        selectCoachForSubscription,
        cancelSubscription,
        changeCoach,
        chatMessages,
        sendChatMessage,
        notifications,
        activeBanner,
        triggerPushNotification,
        dismissBanner,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
