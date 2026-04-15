// src/app/core/models/models.ts

export interface User {
  id: number;
  username: string;
  email: string;
  displayName: string;
  streakDays?: number;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  displayName: string;
}

export interface Dhikr {
  id: number;
  name: string;
  arabicText: string;
  transliteration: string;
  meaning: string;
  defaultTarget: number;
  reference: string;
}

export interface DhikrSession {
  id?: number;
  dhikrId: number;
  count: number;
  target: number;
  completed: boolean;
}

export interface Audio {
  id: number;
  title: string;
  arabicTitle: string;
  category: string;
  reciter: string;
  duration: string;
  url: string;
  icon: string;
  surahNumber?: number;
}

export interface Lesson {
  id: number;
  title: string;
  arabicTitle: string;
  lessonType: string;
  content: string;
  level: string;
  orderIndex: number;
  icon: string;
}

export interface UserProgress {
  id: number;
  lesson: Lesson;
  completed: boolean;
  completedAt?: string;
  score?: number;
}

export interface DayStats {
  day: string;
  count: number;
}

export interface StatsResponse {
  totalDhikrs: number;
  completedSessions: number;
  learnedLetters: number;
  completedLessons: number;
  streakDays: number;
  weeklyStats: DayStats[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}
