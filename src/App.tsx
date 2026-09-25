/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { NavigationTab, HabitItem, DirectiveItem, SoundChannel, MilestoneItem, RiskAlert, GamifiedReward } from './types';
import {
  INITIAL_HABITS,
  INITIAL_DIRECTIVES,
  INITIAL_SOUND_CHANNELS,
  MILESTONES,
  RISK_ALERTS,
  GAMIFIED_REWARDS,
} from './data/mockData';
import { soundEngine } from './utils/audioSynth';
import { SideNavBar } from './components/layout/SideNavBar';
import { TopNavBar } from './components/layout/TopNavBar';
import { CockpitScreen } from './components/screens/CockpitScreen';
import { HabitMatrixScreen } from './components/screens/HabitMatrixScreen';
import { FocusTimerScreen } from './components/screens/FocusTimerScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { CourseSyllabiScreen } from './components/screens/CourseSyllabiScreen';
import { NewHabitModal } from './components/modals/NewHabitModal';
import { QuickLogModal } from './components/modals/QuickLogModal';
import { ZenModeOverlay } from './components/modals/ZenModeOverlay';
import { SettingsModal } from './components/modals/SettingsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('cockpit');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Domain Data States
  const [habits, setHabits] = useState<HabitItem[]>(INITIAL_HABITS);
  const [directives, setDirectives] = useState<DirectiveItem[]>(INITIAL_DIRECTIVES);
  const [soundChannels, setSoundChannels] = useState<SoundChannel[]>(INITIAL_SOUND_CHANNELS);
  const [milestones] = useState<MilestoneItem[]>(MILESTONES);
  const [riskAlerts, setRiskAlerts] = useState<RiskAlert[]>(RISK_ALERTS);
  const [gamifiedRewards, setGamifiedRewards] = useState<GamifiedReward[]>(GAMIFIED_REWARDS);
  const [selectedCourseCode, setSelectedCourseCode] = useState<string | undefined>();

  // Focus Timer States (matches screen 3: 21m 48s default)
  const [timerSeconds, setTimerSeconds] = useState(21 * 60 + 48);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'pomodoro' | 'short_break' | 'deep_block'>('pomodoro');
  const [activeFocusTopic, setActiveFocusTopic] = useState('Deep Work: Organic Chemistry Reaction Mechanisms');
  const [selectedSoundCompanion, setSelectedSoundCompanion] = useState('rain');

  // Modals
  const [isNewHabitModalOpen, setIsNewHabitModalOpen] = useState(false);
  const [isQuickLogModalOpen, setIsQuickLogModalOpen] = useState(false);
  const [isZenModeOpen, setIsZenModeOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Settings
  const [studentName, setStudentName] = useState('Alex Rivera');
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Timer Tick
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            showToast('Focus session complete! Take a restorative break.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  // Handle Timer Controls
  const handleToggleTimer = () => {
    setIsTimerRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    const secs =
      timerMode === 'pomodoro' ? pomodoroMinutes * 60 : timerMode === 'short_break' ? 5 * 60 : 50 * 60;
    setTimerSeconds(secs);
  };

  const handleSkipTimer = () => {
    if (timerMode === 'pomodoro') {
      setTimerMode('short_break');
      setTimerSeconds(5 * 60);
      showToast('Advancing to 5-minute Short Break');
    } else {
      setTimerMode('pomodoro');
      setTimerSeconds(pomodoroMinutes * 60);
      showToast('Starting Pomodoro Focus Chamber');
    }
    setIsTimerRunning(false);
  };

  const handleSetTimerMode = (mode: 'pomodoro' | 'short_break' | 'deep_block') => {
    setTimerMode(mode);
    setIsTimerRunning(false);
    const secs = mode === 'pomodoro' ? pomodoroMinutes * 60 : mode === 'short_break' ? 5 * 60 : 50 * 60;
    setTimerSeconds(secs);
  };

  // Habit Actions
  const handleToggleHabit = (habitId: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const nextDone = !h.isTodayDone;
          const updatedDays = [...h.completedDays];
          updatedDays[3] = nextDone; // Today is Thursday (index 3)
          const completedCount = updatedDays.filter(Boolean).length;
          const wtd = Math.round((completedCount / updatedDays.length) * 100);
          return {
            ...h,
            isTodayDone: nextDone,
            completedDays: updatedDays,
            streakDays: nextDone ? h.streakDays + 1 : Math.max(0, h.streakDays - 1),
            wtdPercentage: wtd,
          };
        }
        return h;
      })
    );
  };

  const handleToggleHabitDay = (habitId: string, dayIndex: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const updatedDays = [...h.completedDays];
          updatedDays[dayIndex] = !updatedDays[dayIndex];
          const isTodayUpdated = dayIndex === 3 ? updatedDays[3] : h.isTodayDone;
          const completedCount = updatedDays.filter(Boolean).length;
          const wtd = Math.round((completedCount / updatedDays.length) * 100);
          return {
            ...h,
            completedDays: updatedDays,
            isTodayDone: isTodayUpdated,
            wtdPercentage: wtd,
          };
        }
        return h;
      })
    );
  };

  const handleAddHabit = (
    newHabitData: Omit<HabitItem, 'id' | 'completedDays' | 'wtdPercentage' | 'completedLogged' | 'streakDays'>
  ) => {
    const newHabit: HabitItem = {
      ...newHabitData,
      id: `h_${Date.now()}`,
      completedDays: [false, false, false, false, false, false, false],
      wtdPercentage: 0,
      completedLogged: '0 of 4 logged',
      streakDays: 1,
    };
    setHabits((prev) => [newHabit, ...prev]);
    showToast(`Locked "${newHabit.title}" into matrix!`);
  };

  // Directives
  const handleToggleDirective = (id: string) => {
    setDirectives((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          return {
            ...d,
            status: d.status === 'completed' ? 'pending' : 'completed',
          };
        }
        return d;
      })
    );
  };

  const handleAddDirective = (title: string) => {
    const newDir: DirectiveItem = {
      id: `d_${Date.now()}`,
      title,
      status: 'pending',
      pomodorosEst: 'Est. 1 Pomodoro',
    };
    setDirectives((prev) => [...prev, newDir]);
    showToast(`Appended directive: ${title}`);
  };

  // Soundscape Mixer
  const handleUpdateSoundVolume = (channelId: string, volume: number) => {
    setSoundChannels((prev) =>
      prev.map((ch) => {
        if (ch.id === channelId) {
          const updated = { ...ch, volume, enabled: volume > 0 };
          soundEngine.setChannelVolume(channelId, volume, updated.enabled);
          return updated;
        }
        return ch;
      })
    );
  };

  const handleToggleSoundChannel = (channelId: string) => {
    setSoundChannels((prev) =>
      prev.map((ch) => {
        if (ch.id === channelId) {
          const nextEnabled = !ch.enabled;
          const nextVolume = nextEnabled ? (ch.volume === 0 ? 50 : ch.volume) : 0;
          soundEngine.setChannelVolume(channelId, nextVolume, nextEnabled);
          return { ...ch, enabled: nextEnabled, volume: nextVolume };
        }
        return ch;
      })
    );
  };

  const handleSetMasterPreset = (preset: 'quiet' | 'immersion' | 'mute') => {
    if (preset === 'mute') {
      soundEngine.setMasterMute(true);
      showToast('Atmosphere muted');
    } else {
      soundEngine.setMasterMute(false);
      const mult = preset === 'quiet' ? 0.4 : 1.0;
      soundChannels.forEach((ch) => {
        if (ch.enabled) {
          soundEngine.setChannelVolume(ch.id, ch.volume * mult, true);
        }
      });
      showToast(`Master atmosphere set to ${preset}`);
    }
  };

  // Launch Focus Block
  const handleLaunchFocusBlock = (topic?: string) => {
    if (topic) setActiveFocusTopic(topic);
    setActiveTab('timer');
    setTimerMode('pomodoro');
    setTimerSeconds(pomodoroMinutes * 60);
    setIsTimerRunning(true);
    showToast(`Focus Chamber launched: ${topic || activeFocusTopic}`);
  };

  // Risk Alert Actions
  const handleLockEveningAlarm = () => {
    setRiskAlerts((prev) =>
      prev.map((a) =>
        a.id === 'r1'
          ? {
              ...a,
              title: 'Sleep Alarm Locked: 11:15 PM Bedtime Buffer Active',
              statusTag: 'Shielded',
              type: 'warning',
            }
          : a
      )
    );
    showToast('Evening Alarm locked at 11:15 PM! Bedtime buffer secured.');
  };

  const handleAddHydration = () => {
    setRiskAlerts((prev) =>
      prev.map((a) =>
        a.id === 'r2'
          ? {
              ...a,
              title: 'Hydration Target: 1.9L / 2.5L Logged',
              statusTag: 'On Track',
              type: 'warning',
            }
          : a
      )
    );
    // Also toggle the hydration habit
    handleToggleHabit('h6');
    showToast('+500ml water logged! Hydration shield bolstered.');
  };

  const handleExportAudit = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(
        JSON.stringify(
          {
            student: studentName,
            term: 'Spring 2026',
            week: 7,
            consistencyRatio: '84%',
            streak: '14 Days',
            habits: habits.map((h) => ({ title: h.title, wtd: h.wtdPercentage, streak: h.streakDays })),
            exportedAt: new Date().toISOString(),
          },
          null,
          2
        )
      );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `FocusTrack_Audit_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Weekly audit exported successfully.');
  };

  const handleLogStudySession = (minutes: number, course: string) => {
    // Add XP reward progress
    setGamifiedRewards((prev) =>
      prev.map((r) => {
        if (r.id === 'g2') {
          return {
            ...r,
            percentComplete: Math.min(100, (r.percentComplete || 66.6) + 4.5),
          };
        }
        return r;
      })
    );
    showToast(`Logged ${minutes}m focus session for ${course}! (+120 XP)`);
  };

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container flex">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-DEFAULT bg-surface-container border border-primary/40 shadow-2xl text-on-surface text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="material-symbols-outlined text-primary text-[18px]" data-icon="check_circle">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Side Navigation Rail */}
      <SideNavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        onStartFocus={() => handleLaunchFocusBlock()}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        isTimerRunning={isTimerRunning}
      />

      {/* Main Viewport */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isCollapsed ? 'pl-20' : 'pl-64'}`}>
        {/* Top Header */}
        <TopNavBar
          isCollapsed={isCollapsed}
          onOpenQuickLog={() => setIsQuickLogModalOpen(true)}
          onToggleZenMode={() => setIsZenModeOpen(true)}
          onSelectCourse={(courseCode) => {
            setSelectedCourseCode(courseCode);
            setActiveTab('syllabi');
          }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Dynamic Screen View */}
        <main className="flex-1 p-6 md:p-8">
          {activeTab === 'cockpit' && (
            <CockpitScreen
              habits={habits}
              milestones={milestones}
              onToggleHabit={handleToggleHabit}
              onLaunchFocusBlock={handleLaunchFocusBlock}
              timerSeconds={timerSeconds}
              isTimerRunning={isTimerRunning}
              onToggleTimer={handleToggleTimer}
              onResetTimer={handleResetTimer}
              onSkipTimer={handleSkipTimer}
              selectedSoundCompanion={selectedSoundCompanion}
              onSelectSoundCompanion={(type) => {
                setSelectedSoundCompanion(type);
                if (type === 'rain') handleUpdateSoundVolume('rain', 60);
                if (type === 'binaural') handleUpdateSoundVolume('binaural', 75);
                showToast(`Audio companion set to: ${type}`);
              }}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'habits' && (
            <HabitMatrixScreen
              habits={habits}
              onToggleHabitDay={handleToggleHabitDay}
              onOpenNewHabitModal={() => setIsNewHabitModalOpen(true)}
              onNavigateToTab={setActiveTab}
              onExportAudit={handleExportAudit}
            />
          )}

          {activeTab === 'timer' && (
            <FocusTimerScreen
              timerSeconds={timerSeconds}
              isTimerRunning={isTimerRunning}
              onToggleTimer={handleToggleTimer}
              onResetTimer={handleResetTimer}
              onSkipTimer={handleSkipTimer}
              timerMode={timerMode}
              onSetTimerMode={handleSetTimerMode}
              directives={directives}
              onToggleDirective={handleToggleDirective}
              onAddDirective={handleAddDirective}
              soundChannels={soundChannels}
              onUpdateSoundVolume={handleUpdateSoundVolume}
              onToggleSoundChannel={handleToggleSoundChannel}
              onSetMasterPreset={handleSetMasterPreset}
              activeFocusTopic={activeFocusTopic}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsScreen
              riskAlerts={riskAlerts}
              gamifiedRewards={gamifiedRewards}
              onLockAlarm={handleLockEveningAlarm}
              onAddHydration={handleAddHydration}
              onExportAudit={handleExportAudit}
            />
          )}

          {activeTab === 'syllabi' && (
            <CourseSyllabiScreen
              onLaunchFocusBlock={handleLaunchFocusBlock}
              selectedCourseCode={selectedCourseCode}
            />
          )}
        </main>
      </div>

      {/* Modals & Overlays */}
      <NewHabitModal
        isOpen={isNewHabitModalOpen}
        onClose={() => setIsNewHabitModalOpen(false)}
        onAddHabit={handleAddHabit}
      />

      <QuickLogModal
        isOpen={isQuickLogModalOpen}
        onClose={() => setIsQuickLogModalOpen(false)}
        habits={habits}
        onToggleHabit={handleToggleHabit}
        onAddHydration={handleAddHydration}
        onLogStudySession={handleLogStudySession}
      />

      <ZenModeOverlay
        isOpen={isZenModeOpen}
        onClose={() => setIsZenModeOpen(false)}
        timerSeconds={timerSeconds}
        isTimerRunning={isTimerRunning}
        onToggleTimer={handleToggleTimer}
        onResetTimer={handleResetTimer}
        onSkipTimer={handleSkipTimer}
        activeTopic={activeFocusTopic}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        pomodoroMinutes={pomodoroMinutes}
        onUpdatePomodoroMinutes={(mins) => {
          setPomodoroMinutes(mins);
          if (!isTimerRunning && timerMode === 'pomodoro') {
            setTimerSeconds(mins * 60);
          }
        }}
        studentName={studentName}
        onUpdateStudentName={setStudentName}
      />
    </div>
  );
}
