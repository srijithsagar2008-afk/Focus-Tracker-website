export type NavigationTab = 'cockpit' | 'habits' | 'timer' | 'analytics' | 'syllabi';

export interface HabitItem {
  id: string;
  title: string;
  tag: string;
  tagColor?: string;
  category: 'study' | 'health' | 'morning';
  timeOfDay?: string;
  scheduledTime?: string;
  atomicTrigger: string;
  completedDays: boolean[]; // Mon-Sun (indices 0..6)
  wtdPercentage: number;
  completedLogged: string;
  streakDays: number;
  isTodayDone?: boolean;
}

export interface DirectiveItem {
  id: string;
  title: string;
  timeLogged?: string;
  status: 'completed' | 'in_progress' | 'pending';
  pomodorosEst?: string;
}

export interface SoundChannel {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  volume: number; // 0 to 100
  enabled: boolean;
  color?: string;
}

export interface MilestoneItem {
  id: string;
  title: string;
  course: string;
  locationOrDetails: string;
  daysRemaining: number;
  dueText: string;
  urgency: 'critical' | 'warning' | 'normal';
  icon: string;
}

export interface RiskAlert {
  id: string;
  title: string;
  statusTag: string;
  description: string;
  actionLabel: string;
  secondaryAction?: string;
  icon: string;
  type: 'critical' | 'warning';
}

export interface GamifiedReward {
  id: string;
  title: string;
  badgeStatus: 'unlocked' | 'in_progress';
  progressText: string;
  xpText: string;
  description: string;
  icon: string;
  percentComplete?: number;
}
