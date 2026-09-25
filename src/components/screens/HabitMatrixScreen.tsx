import React, { useState } from 'react';
import { HabitItem } from '../../types';

interface HabitMatrixScreenProps {
  habits: HabitItem[];
  onToggleHabitDay: (habitId: string, dayIndex: number) => void;
  onOpenNewHabitModal: () => void;
  onNavigateToTab: (tab: 'cockpit' | 'habits' | 'timer' | 'analytics' | 'syllabi') => void;
  onExportAudit: () => void;
}

export const HabitMatrixScreen: React.FC<HabitMatrixScreenProps> = ({
  habits,
  onToggleHabitDay,
  onOpenNewHabitModal,
  onNavigateToTab,
  onExportAudit,
}) => {
  const [domainFilter, setDomainFilter] = useState<'all' | 'study' | 'health' | 'morning'>('all');
  const [cadence, setCadence] = useState<'daily' | 'weekdays' | 'custom'>('daily');

  const filteredHabits = habits.filter((h) => {
    if (domainFilter === 'all') return true;
    return h.category === domainFilter;
  });

  // Calculate live completion stats
  let totalChecked = 0;
  let totalSlots = 0;
  habits.forEach((h) => {
    h.completedDays.slice(0, 6).forEach((day) => {
      totalSlots++;
      if (day) totalChecked++;
    });
  });
  const completionPercent = Math.round((totalChecked / (totalSlots || 1)) * 100);

  const daysHeader = [
    { label: 'MON', date: 'Oct 21' },
    { label: 'TUE', date: 'Oct 22' },
    { label: 'WED', date: 'Oct 23' },
    { label: 'THU', date: 'Oct 24', isToday: true },
    { label: 'FRI', date: 'Oct 25' },
    { label: 'SAT', date: 'Oct 26' },
  ];

  return (
    <div className="space-y-6 max-w-[1700px] w-full mx-auto">
      {/* HERO COCKPIT BAR */}
      <section className="rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 p-space-lg flex flex-col lg:flex-row justify-between lg:items-center gap-6 relative overflow-hidden shadow-sm">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-primary/10 text-primary border border-primary/20 tracking-wider font-semibold">
              WEEK 11 • FALL TERM
            </span>
            <span className="flex items-center gap-1 text-label-sm font-label-sm text-tertiary font-semibold">
              <span className="material-symbols-outlined text-xs" data-icon="bolt">
                bolt
              </span>
              High Focus Velocity
            </span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight font-bold">
            Weekly Habit Matrix &amp; Protocol
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl">
            Atomic stacking: Execute disciplined daily triggers to solidify automatic neuro-academic performance.
          </p>
        </div>

        {/* Metric Cluster & Controls */}
        <div className="flex flex-wrap items-center gap-4 z-10">
          {/* Weekly Completion Gauge Card */}
          <div className="bg-surface-container/80 backdrop-blur-md px-4 py-2.5 rounded-DEFAULT border border-outline-variant/30 flex items-center gap-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-outline-variant/20 stroke-current"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3.5"
                />
                <path
                  className="text-secondary stroke-current transition-all duration-500"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeDasharray={`${completionPercent}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="absolute font-label-md text-label-md font-bold text-on-surface">
                {completionPercent}%
              </span>
            </div>
            <div>
              <div className="text-label-md font-label-md text-on-surface font-bold">
                {totalChecked}/{totalSlots} Done
              </div>
              <div className="text-body-sm font-body-sm text-on-surface-variant">Weekly Batch Target</div>
            </div>
          </div>

          {/* Cadence Segmented Toggle */}
          <div className="bg-surface-container-highest/60 p-1 rounded-full border border-outline-variant/30 flex items-center">
            <button
              onClick={() => setCadence('daily')}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                cadence === 'daily'
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setCadence('weekdays')}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                cadence === 'weekdays'
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Weekdays
            </button>
            <button
              onClick={() => setCadence('custom')}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                cadence === 'custom'
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Custom
            </button>
          </div>

          {/* Create Habit Modal Button */}
          <button
            onClick={onOpenNewHabitModal}
            className="px-4 py-2.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20 font-semibold"
          >
            <span className="material-symbols-outlined text-lg" data-icon="add_circle">
              add_circle
            </span>
            New Habit
          </button>
        </div>
      </section>

      {/* FILTER TABS & STATUS LEGEND */}
      <section className="flex flex-wrap items-center justify-between gap-4 pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDomainFilter('all')}
            className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${
              domainFilter === 'all'
                ? 'bg-primary-container/20 text-primary border border-primary/30'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/30'
            }`}
          >
            All Domains ({habits.length})
          </button>
          <button
            onClick={() => setDomainFilter('study')}
            className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${
              domainFilter === 'study'
                ? 'bg-primary-container/20 text-primary border border-primary/30'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/30'
            }`}
          >
            Study Protocol ({habits.filter((h) => h.category === 'study').length})
          </button>
          <button
            onClick={() => setDomainFilter('health')}
            className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${
              domainFilter === 'health'
                ? 'bg-primary-container/20 text-primary border border-primary/30'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/30'
            }`}
          >
            Health &amp; Mindset ({habits.filter((h) => h.category === 'health').length})
          </button>
          <button
            onClick={() => setDomainFilter('morning')}
            className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${
              domainFilter === 'morning'
                ? 'bg-primary-container/20 text-primary border border-primary/30'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/30'
            }`}
          >
            Morning Routines ({habits.filter((h) => h.category === 'morning').length})
          </button>
        </div>

        <div className="flex items-center gap-3 text-body-sm font-body-sm text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary" /> Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-outline-variant" /> Pending
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary" /> Today (Thursday)
          </span>
        </div>
      </section>

      {/* THE HABIT MATRIX 7-DAY GRID WORKSPACE */}
      <div className="bg-surface-container-low rounded-DEFAULT border border-outline-variant/30 overflow-hidden shadow-2xl">
        {/* Table Column Headers */}
        <div className="grid grid-cols-12 bg-surface-container/70 border-b border-outline-variant/30 px-6 py-3.5 items-center text-label-md font-label-md text-on-surface-variant">
          <div className="col-span-5 flex items-center gap-2">
            <span>HABIT PROTOCOL &amp; ATOMIC TRIGGER</span>
            <span className="material-symbols-outlined text-sm text-outline" data-icon="help">
              help
            </span>
          </div>
          {daysHeader.map((d, idx) => (
            <div
              key={idx}
              className={`col-span-1 text-center ${
                d.isToday
                  ? 'text-primary font-bold bg-primary-container/10 py-1 rounded-DEFAULT border border-primary/20'
                  : ''
              }`}
            >
              {d.label}
              <span className={`block text-label-sm font-label-sm ${d.isToday ? 'text-primary' : 'text-outline'}`}>
                {d.date} {d.isToday ? '(Today)' : ''}
              </span>
            </div>
          ))}
          <div className="col-span-1 text-right pr-2">VELOCITY &amp; RATE</div>
        </div>

        {/* Categories & Habit Rows */}
        {(['study', 'health', 'morning'] as const).map((catKey) => {
          const categoryHabits = filteredHabits.filter((h) => h.category === catKey);
          if (categoryHabits.length === 0) return null;

          const categoryTitle =
            catKey === 'study'
              ? 'Deep Work & Study Protocol'
              : catKey === 'health'
              ? 'Health, Biometrics & Mindset'
              : 'Morning Launch Routines';
          const icon =
            catKey === 'study' ? 'menu_book' : catKey === 'health' ? 'self_improvement' : 'wb_sunny';
          const colorClass =
            catKey === 'study'
              ? 'text-primary'
              : catKey === 'health'
              ? 'text-secondary'
              : 'text-tertiary';
          const badgeBg =
            catKey === 'study'
              ? 'bg-primary/10 text-primary border-primary/20'
              : catKey === 'health'
              ? 'bg-secondary/10 text-secondary border-secondary/20'
              : 'bg-tertiary/10 text-tertiary border-tertiary/20';

          const subMeta =
            catKey === 'study' ? (
              <span>Target: <strong className="text-on-surface">28 Hours Cumulative</strong></span>
            ) : catKey === 'health' ? (
              <span>Recovery Score: <strong className="text-secondary">92% Optimal</strong></span>
            ) : (
              <span>Wake Consistency: <strong className="text-tertiary">06:30 AM ± 10m</strong></span>
            );

          return (
            <div key={catKey} className="border-b border-outline-variant/20 last:border-b-0">
              {/* Category Sub-Header */}
              <div className="bg-surface-container-lowest/80 px-6 py-2.5 flex items-center justify-between border-y border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-lg ${colorClass}`} data-icon={icon}>
                    {icon}
                  </span>
                  <span className={`font-headline-sm text-headline-sm font-bold ${colorClass}`}>
                    {categoryTitle}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-label-sm font-label-sm border ml-2 ${badgeBg}`}>
                    {categoryHabits.length} Active Routines
                  </span>
                </div>
                <div className="text-body-sm font-body-sm text-on-surface-variant">{subMeta}</div>
              </div>

              {/* Habit Rows */}
              {categoryHabits.map((habit) => (
                <div
                  key={habit.id}
                  className="grid grid-cols-12 px-6 py-4 items-center hover:bg-surface-container/40 transition-colors border-b border-outline-variant/10 group last:border-b-0"
                >
                  <div className="col-span-5 space-y-1.5 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-on-surface font-headline-sm text-headline-sm font-medium group-hover:text-primary transition-colors">
                        {habit.title}
                      </span>
                      {habit.timeOfDay && (
                        <span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-primary/10 text-primary border border-primary/30">
                          {habit.timeOfDay}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-body-sm font-body-sm text-outline flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-primary" data-icon="link">
                          link
                        </span>
                        Stack:{' '}
                        <span className="text-on-surface-variant font-medium">
                          {habit.atomicTrigger}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* 6 Day Circles (Mon-Sat) */}
                  {habit.completedDays.slice(0, 6).map((isComplete, dayIndex) => {
                    const isToday = dayIndex === 3;
                    return (
                      <div
                        key={dayIndex}
                        className={`col-span-1 flex justify-center ${
                          isToday ? 'bg-primary-container/5 py-2 rounded-lg' : ''
                        }`}
                      >
                        <button
                          onClick={() => onToggleHabitDay(habit.id, dayIndex)}
                          title={`${daysHeader[dayIndex].label} - Click to toggle completion`}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                            isComplete
                              ? 'check-ring-active'
                              : 'border-outline-variant/60 hover:border-primary bg-surface-container'
                          } ${isToday && !isComplete ? 'ring-2 ring-primary/20 border-primary/60' : ''}`}
                        >
                          <span
                            className={`material-symbols-outlined text-white text-base transition-opacity ${
                              isComplete ? 'opacity-100' : 'opacity-0 hover:opacity-40'
                            }`}
                            data-icon="check"
                          >
                            check
                          </span>
                        </button>
                      </div>
                    );
                  })}

                  {/* Stats Column */}
                  <div className="col-span-1 flex items-center justify-end gap-3 pr-2">
                    <div className="text-right">
                      <div className="text-label-md font-label-md text-secondary font-bold">
                        {habit.wtdPercentage}% WTD
                      </div>
                      <div className="text-body-sm font-body-sm text-outline">{habit.completedLogged}</div>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-tertiary-container/30 border border-tertiary/30 text-tertiary flex items-center gap-1 text-label-sm font-label-sm">
                      <span
                        className="material-symbols-outlined text-xs"
                        data-icon="local_fire_department"
                      >
                        local_fire_department
                      </span>
                      {habit.streakDays}d
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* BOTTOM ANALYTICS BENTO TILES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Tile 1: Habit Stacking Velocity Card */}
        <div className="rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 p-space-md flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-label-md font-label-md text-primary flex items-center gap-1.5 font-semibold">
                <span className="material-symbols-outlined text-sm" data-icon="psychology">
                  psychology
                </span>
                Trigger Efficiency
              </span>
              <span className="text-label-sm font-label-sm px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary border border-secondary/30 font-semibold">
                +14% vs Last Week
              </span>
            </div>
            <div className="text-headline-md font-headline-md font-bold text-on-surface">
              94.2% Anchor Rate
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              When study sessions are anchored to physical triggers (e.g. coffee brew), friction is reduced by 62%.
            </p>
          </div>
          <div className="pt-4 flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-surface-container-highest overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: '94%' }} />
            </div>
            <span className="text-label-sm font-label-sm text-on-surface font-semibold">94%</span>
          </div>
        </div>

        {/* Tile 2: Academic Exam Countdown Anchor */}
        <div className="rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 p-space-md flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-label-md font-label-md text-tertiary flex items-center gap-1.5 font-semibold">
                <span className="material-symbols-outlined text-sm" data-icon="alarm">
                  alarm
                </span>
                Urgent Milestones
              </span>
              <span className="text-label-sm font-label-sm px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary border border-tertiary/30 font-semibold">
                3 Days Left
              </span>
            </div>
            <div className="text-headline-md font-headline-md font-bold text-on-surface">Calculus II Midterm</div>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Completed 14/15 practice sets. 3 deep work blocks remaining on your weekly flight plan.
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between border-t border-outline-variant/20">
            <span className="text-body-sm font-body-sm text-on-surface-variant">Syllabus Coverage</span>
            <span className="text-label-md font-label-md text-secondary font-bold">93% Complete</span>
          </div>
        </div>

        {/* Tile 3: Weekly Batch Reward Badge */}
        <div className="rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 p-space-md flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-1 z-10">
            <div className="flex items-center justify-between">
              <span className="text-label-md font-label-md text-secondary flex items-center gap-1.5 font-semibold">
                <span className="material-symbols-outlined text-sm" data-icon="workspace_premium">
                  workspace_premium
                </span>
                Streak Fortress
              </span>
              <span className="text-label-sm font-label-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                Tier 4 Scholar
              </span>
            </div>
            <div className="text-headline-md font-headline-md font-bold text-on-surface">14 Days Clean Sheet</div>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Zero unexcused habit breaks across 9 protocols. Eligible for weekend deep rest unlock.
            </p>
          </div>
          <div className="pt-4 flex items-center gap-3 z-10">
            <button
              onClick={onExportAudit}
              className="w-full py-2 rounded-full bg-surface-container-high border border-outline-variant/40 hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-sm text-primary" data-icon="share">
                share
              </span>
              Export Weekly Audit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
