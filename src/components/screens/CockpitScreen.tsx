import React, { useState } from 'react';
import { HabitItem, MilestoneItem } from '../../types';
import { ACADEMIC_WISDOM_QUOTES, WisdomQuote } from '../../data/wisdomQuotes';

interface CockpitScreenProps {
  habits: HabitItem[];
  milestones: MilestoneItem[];
  onToggleHabit: (habitId: string) => void;
  onLaunchFocusBlock: (title?: string) => void;
  timerSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSkipTimer: () => void;
  selectedSoundCompanion: string;
  onSelectSoundCompanion: (type: string) => void;
  onNavigateToTab: (tab: 'cockpit' | 'habits' | 'timer' | 'analytics' | 'syllabi') => void;
}

export const CockpitScreen: React.FC<CockpitScreenProps> = ({
  habits,
  milestones,
  onToggleHabit,
  onLaunchFocusBlock,
  timerSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  onSkipTimer,
  selectedSoundCompanion,
  onSelectSoundCompanion,
  onNavigateToTab,
}) => {
  const [wisdomIndex, setWisdomIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const currentWisdom: WisdomQuote = ACADEMIC_WISDOM_QUOTES[wisdomIndex % ACADEMIC_WISDOM_QUOTES.length];

  const handleNextWisdom = () => {
    setWisdomIndex((prev) => (prev + 1) % ACADEMIC_WISDOM_QUOTES.length);
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(`"${currentWisdom.quote}" — ${currentWisdom.author} (${currentWisdom.affiliationOrRole})`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const doneCount = habits.filter((h) => h.isTodayDone).length;
  const totalCount = habits.length;

  return (
    <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-gutter">
      {/* LEFT / CENTER AREA (8 COLS) */}
      <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">
        {/* WEEKLY CALENDAR & COCKPIT BRIEFING BAR */}
        <section className="p-space-lg rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-label-sm font-label-sm text-primary uppercase tracking-wider font-semibold">
                Session Briefing • Week 9
              </span>
              <h2 className="text-headline-sm font-headline-sm text-on-surface font-bold">Today's Deep Work Matrix</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-label-md font-label-md text-on-surface-variant font-medium">November 2024</span>
              <div className="flex items-center gap-1">
                <button
                  className="w-7 h-7 rounded-full bg-surface-container border border-outline-variant/30 flex items-center justify-center hover:bg-surface-bright transition-colors"
                  title="Previous week"
                >
                  <span className="material-symbols-outlined text-[16px]" data-icon="chevron_left">
                    chevron_left
                  </span>
                </button>
                <button
                  className="w-7 h-7 rounded-full bg-surface-container border border-outline-variant/30 flex items-center justify-center hover:bg-surface-bright transition-colors"
                  title="Next week"
                >
                  <span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 7-Day Micro Calendar Strip */}
          <div className="grid grid-cols-7 gap-2">
            {/* Mon */}
            <div className="flex flex-col items-center py-2.5 px-1 rounded-DEFAULT bg-surface-container/60 border border-outline-variant/20 text-center">
              <span className="text-label-sm font-label-sm text-outline">MON</span>
              <span className="text-label-lg font-label-lg text-on-surface mt-1 font-semibold">18</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shadow-[0_0_8px_rgba(78,222,163,0.5)]" />
            </div>
            {/* Tue */}
            <div className="flex flex-col items-center py-2.5 px-1 rounded-DEFAULT bg-surface-container/60 border border-outline-variant/20 text-center">
              <span className="text-label-sm font-label-sm text-outline">TUE</span>
              <span className="text-label-lg font-label-lg text-on-surface mt-1 font-semibold">19</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shadow-[0_0_8px_rgba(78,222,163,0.5)]" />
            </div>
            {/* Wed (TODAY ACTIVE) */}
            <div className="flex flex-col items-center py-2.5 px-1 rounded-DEFAULT bg-primary-container/20 border border-primary/50 text-center shadow-[0_0_16px_rgba(91,77,255,0.2)]">
              <span className="text-label-sm font-label-sm text-primary font-bold">WED</span>
              <span className="text-label-lg font-label-lg text-on-primary-container font-bold mt-1">20</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shadow-[0_0_8px_rgba(196,192,255,0.8)]" />
            </div>
            {/* Thu */}
            <div className="flex flex-col items-center py-2.5 px-1 rounded-DEFAULT bg-surface-container/60 border border-outline-variant/20 text-center">
              <span className="text-label-sm font-label-sm text-outline">THU</span>
              <span className="text-label-lg font-label-lg text-on-surface mt-1">21</span>
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40 mt-1.5" />
            </div>
            {/* Fri */}
            <div className="flex flex-col items-center py-2.5 px-1 rounded-DEFAULT bg-surface-container/60 border border-outline-variant/20 text-center">
              <span className="text-label-sm font-label-sm text-outline">FRI</span>
              <span className="text-label-lg font-label-lg text-on-surface mt-1">22</span>
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40 mt-1.5" />
            </div>
            {/* Sat */}
            <div className="flex flex-col items-center py-2.5 px-1 rounded-DEFAULT bg-surface-container/60 border border-outline-variant/20 text-center">
              <span className="text-label-sm font-label-sm text-outline">SAT</span>
              <span className="text-label-lg font-label-lg text-on-surface mt-1">23</span>
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40 mt-1.5" />
            </div>
            {/* Sun */}
            <div className="flex flex-col items-center py-2.5 px-1 rounded-DEFAULT bg-surface-container/60 border border-outline-variant/20 text-center">
              <span className="text-label-sm font-label-sm text-outline">SUN</span>
              <span className="text-label-lg font-label-lg text-on-surface mt-1">24</span>
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40 mt-1.5" />
            </div>
          </div>
        </section>

        {/* DUAL HERO METRIC CARDS (Calculus Exam Study + XP Ring) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Priority Exam Focus Block */}
          <div className="p-space-lg rounded-DEFAULT bg-surface-container border border-outline-variant/30 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary-container/10 filter blur-2xl pointer-events-none" />
            <div className="flex items-start justify-between">
              <div>
                <span className="text-label-sm font-label-sm px-2.5 py-1 rounded-full bg-primary-container/20 text-primary border border-primary/30">
                  Target Midterm
                </span>
                <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface mt-2.5">
                  Calculus II: Series &amp; Convergence
                </h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">
                  Review Taylor polynomials &amp; ratio tests before Friday's exam session.
                </p>
              </div>
              <span className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]" data-icon="functions">
                  functions
                </span>
              </span>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between">
              <div>
                <div className="text-label-sm font-label-sm text-outline">RECOMMENDED TARGET</div>
                <div className="text-label-lg font-label-lg text-secondary font-bold">2.5 hrs remaining today</div>
              </div>
              <button
                onClick={() => onLaunchFocusBlock('Calculus II: Series & Convergence')}
                className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20"
              >
                Launch Block
              </button>
            </div>
          </div>

          {/* Quick Level & XP Ring Progress */}
          <div className="p-space-lg rounded-DEFAULT bg-surface-container border border-outline-variant/30 flex items-center justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="text-label-sm font-label-sm text-secondary bg-secondary-container/20 px-2.5 py-1 rounded-full border border-secondary/30 w-fit">
                Daily Mastery Goal
              </span>
              <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface">3h 45m / 5h 00m</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                75% of your target deep work threshold cleared today.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-label-sm font-label-sm text-tertiary">⚡ +450 Deep XP Earned</span>
              </div>
            </div>

            {/* SVG Circular Gauge */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="text-surface-variant/40 fill-none"
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle
                  className="fill-none transition-all duration-1000"
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#xpGradient)"
                  strokeDasharray="251.2"
                  strokeDashoffset="62.8"
                  strokeLinecap="round"
                  strokeWidth="8"
                />
                <defs>
                  <linearGradient id="xpGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#5B4DFF" />
                    <stop offset="100%" stopColor="#4EDEA3" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-headline-sm font-headline-sm font-bold text-on-surface">75%</span>
                <span className="text-label-sm font-label-sm text-outline">STAMINA</span>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE HABIT MATRIX & STREAK CHECKLIST */}
        <section className="p-space-lg rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(78,222,163,0.8)]" />
              <h2 className="text-headline-sm font-headline-sm text-on-surface font-bold">Daily Habit Stack</h2>
              <span className="text-label-sm font-label-sm px-2 py-0.5 rounded-full bg-surface-variant text-on-surface-variant font-semibold">
                {doneCount} / {totalCount} Done
              </span>
            </div>
            <button
              onClick={() => onNavigateToTab('habits')}
              className="text-label-sm font-label-sm text-primary hover:text-on-primary-container flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]" data-icon="tune">
                tune
              </span>
              <span>Edit Protocol</span>
            </button>
          </div>

          {/* Habit Checklist Items */}
          <div className="flex flex-col gap-2.5" id="habitList">
            {habits.slice(0, 4).map((habit) => {
              const isDone = habit.isTodayDone;
              return (
                <div
                  key={habit.id}
                  className={`p-space-md rounded-DEFAULT flex items-center justify-between transition-all hover:bg-surface-container ${
                    isDone
                      ? 'bg-surface-container/60 border border-secondary/30'
                      : 'bg-surface-container border border-outline-variant/40 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <button
                      onClick={() => onToggleHabit(habit.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isDone
                          ? 'bg-secondary text-surface shadow-[inset_0_0_6px_rgba(0,0,0,0.3)]'
                          : 'border-2 border-outline-variant/60 hover:border-primary'
                      }`}
                    >
                      {isDone && (
                        <span className="material-symbols-outlined text-[16px] font-bold" data-icon="check">
                          check
                        </span>
                      )}
                    </button>
                    <div>
                      <h4
                        className={`text-body-md font-body-md font-semibold text-on-surface transition-all ${
                          isDone ? 'line-through opacity-75' : ''
                        }`}
                      >
                        {habit.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-label-sm font-label-sm px-2 py-0.5 rounded-full bg-primary-container/20 text-primary border border-primary/30">
                          {habit.tag}
                        </span>
                        <span className="text-body-sm font-body-sm text-outline">
                          {isDone ? `Completed at ${habit.scheduledTime || '08:45 AM'}` : `Scheduled ${habit.scheduledTime || '04:00 PM'}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-label-md font-label-md px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                        isDone
                          ? 'bg-tertiary-container/30 text-tertiary border-tertiary/20'
                          : 'bg-surface-bright text-on-surface-variant border-outline-variant/30'
                      }`}
                    >
                      <span>🔥</span> {habit.streakDays}d
                    </span>
                    <button
                      onClick={() => onToggleHabit(habit.id)}
                      className="material-symbols-outlined text-outline text-[18px] cursor-pointer hover:text-on-surface"
                      data-icon="more_vert"
                    >
                      more_vert
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* RIGHT PANEL (4 COLS) */}
      <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
        {/* MINI FOCUS TIMER WIDGET */}
        <section className="p-space-lg rounded-DEFAULT bg-surface-container border border-primary/30 flex flex-col items-center text-center relative overflow-hidden shadow-[0_8px_24px_-4px_rgba(0,0,0,0.45)]">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-label-sm font-label-sm px-2.5 py-1 rounded-full bg-primary-container/20 text-primary border border-primary/30 flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full bg-primary ${isTimerRunning ? 'animate-pulse' : ''}`} />
              DEEP WORK BLOCK
            </span>
            <button
              onClick={() => onNavigateToTab('timer')}
              className="text-on-surface-variant hover:text-on-surface transition-colors"
              title="Open Full Focus Chamber"
            >
              <span className="material-symbols-outlined text-[18px]" data-icon="open_in_full">
                open_in_full
              </span>
            </button>
          </div>

          {/* Circular Time Countdown Display */}
          <div className="relative w-44 h-44 my-2 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-surface-variant/40 fill-none"
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="6"
              />
              <circle
                className="fill-none shadow-[0_0_12px_#5B4DFF]"
                cx="50"
                cy="50"
                r="42"
                stroke="#5B4DFF"
                strokeDasharray="263.8"
                strokeDashoffset={263.8 * (1 - timerSeconds / (25 * 60))}
                strokeLinecap="round"
                strokeWidth="6"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-display-mobile font-display-mobile text-on-surface font-extrabold tracking-tight">
                {formatTime(timerSeconds)}
              </span>
              <span className="text-label-sm font-label-sm text-outline uppercase">POMODORO 3 OF 4</span>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center gap-3 mt-4 w-full">
            <button
              onClick={onToggleTimer}
              className="flex-1 py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]" data-icon={isTimerRunning ? 'pause' : 'play_arrow'}>
                {isTimerRunning ? 'pause' : 'play_arrow'}
              </span>
              <span>{isTimerRunning ? 'Pause Block' : 'Start Block'}</span>
            </button>
            <button
              onClick={onSkipTimer}
              className="p-2.5 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface hover:bg-surface-bright active:scale-95 transition-all"
              title="Skip Session"
            >
              <span className="material-symbols-outlined text-[18px]" data-icon="skip_next">
                skip_next
              </span>
            </button>
            <button
              onClick={onResetTimer}
              className="p-2.5 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface hover:bg-surface-bright active:scale-95 transition-all"
              title="Reset Session"
            >
              <span className="material-symbols-outlined text-[18px]" data-icon="restart_alt">
                restart_alt
              </span>
            </button>
          </div>

          {/* LO-FI SOUNDSCAPES QUICK-SELECTOR */}
          <div className="w-full mt-6 pt-4 border-t border-outline-variant/20 flex flex-col gap-2">
            <div className="flex items-center justify-between text-left">
              <span className="text-label-sm font-label-sm text-outline">AUDIO COMPANION</span>
              <span className="text-label-sm font-label-sm text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]" data-icon="graphic_eq">
                  graphic_eq
                </span>
                Nocturnal Rain 65bpm
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onSelectSoundCompanion('lofi')}
                className={`py-1.5 px-2 rounded-full border text-label-sm font-label-sm flex items-center justify-center gap-1 transition-all ${
                  selectedSoundCompanion === 'lofi'
                    ? 'bg-primary-container/20 border-primary text-primary'
                    : 'bg-surface-container-high border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]" data-icon="headphones">
                  headphones
                </span>
                Lo-Fi
              </button>
              <button
                onClick={() => onSelectSoundCompanion('rain')}
                className={`py-1.5 px-2 rounded-full border text-label-sm font-label-sm flex items-center justify-center gap-1 transition-all ${
                  selectedSoundCompanion === 'rain'
                    ? 'bg-secondary-container/20 border-secondary/40 text-secondary'
                    : 'bg-surface-container-high border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]" data-icon="rainy">
                  rainy
                </span>
                Rain
              </button>
              <button
                onClick={() => onSelectSoundCompanion('binaural')}
                className={`py-1.5 px-2 rounded-full border text-label-sm font-label-sm flex items-center justify-center gap-1 transition-all ${
                  selectedSoundCompanion === 'binaural'
                    ? 'bg-primary-container/20 border-primary text-primary'
                    : 'bg-surface-container-high border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]" data-icon="waves">
                  waves
                </span>
                Binaural
              </button>
            </div>
          </div>
        </section>

        {/* UPCOMING ACADEMIC DEADLINES CARD */}
        <section className="p-space-lg rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface">Critical Milestones</h3>
            <button
              onClick={() => onNavigateToTab('syllabi')}
              className="text-label-sm font-label-sm text-primary cursor-pointer hover:underline"
            >
              Syllabi Feed
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {milestones.map((m) => (
              <div
                key={m.id}
                onClick={() => onNavigateToTab('syllabi')}
                className="p-3 rounded-DEFAULT bg-surface-container border border-outline-variant/20 flex items-center justify-between hover:border-primary/40 transition-colors cursor-pointer"
              >
                <div>
                  <span
                    className={`text-label-sm font-label-sm px-2 py-0.5 rounded-full border font-semibold ${
                      m.urgency === 'critical'
                        ? 'text-error bg-error-container/30 border-error/30'
                        : m.urgency === 'warning'
                        ? 'text-tertiary bg-tertiary-container/30 border-tertiary/30'
                        : 'text-secondary bg-secondary-container/20 border-secondary/30'
                    }`}
                  >
                    {m.dueText}
                  </span>
                  <p className="text-body-sm font-body-sm font-semibold text-on-surface mt-1.5">{m.title}</p>
                  <span className="text-body-sm font-body-sm text-outline">{m.locationOrDetails}</span>
                </div>
                <span className="material-symbols-outlined text-outline text-[20px]" data-icon={m.icon}>
                  {m.icon}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* QUICK HABIT STACK FORMULA REMINDER CARD */}
        <section className="p-space-md rounded-DEFAULT bg-surface-container/60 border border-outline-variant/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary-container/20 border border-secondary/30 text-secondary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]" data-icon="psychology">
              psychology
            </span>
          </div>
          <div className="flex-1">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider font-semibold">
              Formula Protocol
            </span>
            <p className="text-body-sm font-body-sm text-on-surface leading-tight mt-0.5">
              <span className="text-secondary font-semibold">After I</span> close my lecture notes, <br />
              <span className="text-primary font-semibold">I will</span> do 3 active recall proofs immediately.
            </p>
          </div>
        </section>

        {/* DAILY ACADEMIC WISDOM CARD */}
        <section className="p-space-lg rounded-DEFAULT bg-surface-container-low border border-primary/30 flex flex-col gap-3 relative overflow-hidden shadow-sm">
          {/* Subtle violet ambient glow */}
          <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-primary-container/15 blur-2xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[16px]" data-icon="auto_stories">
                  auto_stories
                </span>
              </div>
              <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface">Daily Academic Wisdom</h3>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleCopyQuote}
                title="Copy quote to clipboard"
                className="w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]" data-icon={isCopied ? 'check' : 'content_copy'}>
                  {isCopied ? 'check' : 'content_copy'}
                </span>
              </button>

              <button
                onClick={handleNextWisdom}
                title="Cycle to next inspiring quote"
                className="w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[15px]" data-icon="cached">
                  cached
                </span>
              </button>
            </div>
          </div>

          {/* Quote Body */}
          <div className="relative pl-3 border-l-2 border-primary/50 my-1">
            <p className="text-body-sm font-body-sm text-on-surface italic leading-relaxed">
              "{currentWisdom.quote}"
            </p>
          </div>

          {/* Author Attribution & Concept */}
          <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
            <div>
              <p className="text-label-md font-label-md font-semibold text-primary">{currentWisdom.author}</p>
              <span className="text-[11px] text-outline font-body-sm">{currentWisdom.affiliationOrRole}</span>
            </div>

            <span className="text-label-sm font-label-sm px-2 py-0.5 rounded-full bg-primary-container/15 text-primary border border-primary/25 font-semibold shrink-0">
              {currentWisdom.concept}
            </span>
          </div>

          {/* CTA: Adopt as Focus Intention */}
          <button
            onClick={() => onLaunchFocusBlock(`Intention: ${currentWisdom.concept} (${currentWisdom.author})`)}
            className="w-full mt-1 py-2 px-3 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-sm text-label-sm font-semibold border border-outline-variant/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[15px]" data-icon="bolt">
              bolt
            </span>
            <span>Adopt as Focus Intention</span>
          </button>
        </section>
      </div>
    </div>
  );
};
