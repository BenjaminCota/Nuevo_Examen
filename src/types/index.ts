export type Gender = 'male' | 'female' | 'other';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very_active' | 'athlete';
export type FitnessGoal = 'lose_weight' | 'gain_muscle' | 'maintain' | 'endurance';
export type UnitSystem = 'metric' | 'imperial';

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  gender: Gender;
  height: number; // in cm
  currentWeight: number; // in kg
  targetWeight: number; // in kg
  activityLevel: ActivityLevel;
  fitnessGoal: FitnessGoal;
  medicalConditions: string[];
  avatarUrl?: string;
  unitSystem: UnitSystem;
  dailyStepGoal: number;
  dailyCalorieGoal: number;
  notificationsEnabled: {
    meals: boolean;
    steps: boolean;
    weeklyWeight: boolean;
    coachMessages: boolean;
  };
  subscription: {
    status: 'active' | 'free';
    planName: string;
    priceMonthly: number;
    renewalDate: string;
    cardLast4: string;
    cardBrand: string;
    coachChangeUsedThisMonth: boolean;
    coachChangeNextFreeDate: string;
  };
}

export interface SensorData {
  accelerometer: { x: number; y: number; z: number }; // m/s²
  gyroscope: { alpha: number; beta: number; gamma: number }; // rad/s
  gps: { latitude: number; longitude: number; speedKmh: number; accuracyM: number };
  pedometer: { currentCadenceSpm: number; totalStepsToday: number };
  barometer: { pressureHpa: number; altitudeM: number };
  status: 'active' | 'simulated' | 'calibrating';
  activityMode: 'walking' | 'running' | 'resting';
}

export interface Coach {
  id: string;
  name: string;
  gender: 'male' | 'female';
  rating: number;
  reviewCount: number;
  specialty: string;
  experienceYears: number;
  hourlyRateMonthly: number; // 1500
  bio: string;
  certifications: string[];
  photoUrl: string;
  availableSlots: string;
  clientCount: number;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface WeightLogEntry {
  id: string;
  date: string;
  weight: number;
  note?: string;
}

export interface MacroNutrient {
  name: string;
  currentGrams: number;
  targetGrams: number;
  calories: number;
  color: string;
}

export interface PushNotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  type: 'workout' | 'nutrition' | 'coach' | 'weight' | 'sensor' | 'steps';
  read: boolean;
}
