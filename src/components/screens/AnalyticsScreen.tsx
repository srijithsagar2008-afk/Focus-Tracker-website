import React, { useState } from 'react';
import { RiskAlert, GamifiedReward } from '../../types';

interface AnalyticsScreenProps {
  riskAlerts: RiskAlert[];
  gamifiedRewards: GamifiedReward[];
  onLockAlarm: () => void;
  onAddHydration: () => void;
  onExportAudit: () => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({
  riskAlerts,
  gamifiedRewards,
  onLockAlarm,
  onAddHydration,
  onExportAudit,
}) => {
  const [timeRange, setTimeRange] = useState<'7D' | '28D' | 'Term'>('28D');
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  // 28 days mock matrix data matching design
  const matrixDays = [
    // Week 1
    { day: 1, ratio: '2/4', level: 1, label: 'Day 1' },
    { day: 2, ratio: '3/4', level: 2, label: 'Day 2' },
    { day: 3, ratio: '4/4', level: 3, label: 'Day 3' },
    { day: 4, ratio: 'Peak', level: 4, label: 'Day 4' },
    { day: 5, ratio: '3/4', level: 2, label: 'Day 5' },
    { day: 6, ratio: '2/4', level: 1, label: 'Day 6' },
    { day: 7, ratio: '4/4', level: 4, label: 'Day 7' },
    // Week 2
    { day: 8, ratio: '3/4', level: 3, label: 'Day 8' },
    { day: 9, ratio: 'Peak', level: 4, label: 'Day 9' },
    { day: 10, ratio: '4/4', level: 3, label: 'Day 10' },
    { day: 11, ratio: '3/4', level: 2, label: 'Day 11' },
    { day: 12, ratio: '2/4', level: 1, label: 'Day 12' },
    { day: 13, ratio: '3/4', level: 3, label: 'Day 13' },
    { day: 14, ratio: 'Streak!', level: 4, label: 'Day 14' },
    // Week 3
    { day: 15, ratio: '4/4', level: 3, label: 'Day 15' },
    { day: 16, ratio: '4/4', level: 3, label: 'Day 16' },
    { day: 17, ratio: 'Peak', level: 4, label: 'Day 17' },
    { day: 18, ratio: '3/4', level: 2, label: 'Day 18' },
    { day: 19, ratio: '2/4', level: 1, label: 'Day 19' },
    { day: 20, ratio: 'Peak', level: 4, label: 'Day 20' },
    { day: 21, ratio: '4/4', level: 3, label: 'Day 21' },
    // Week 4
    { day: 22, ratio: 'Peak', level: 4, label: 'Day 22' },
    { day: 23, ratio: '4/4', level: 3, label: 'Day 23' },
    { day: 24, ratio: '3/4', level: 2, label: 'Day 24' },
    { day: 25, ratio: 'Peak', level: 4, label: 'Day 25' },
    { day: 26, ratio: '3/4', level: 3, label: 'Day 26' },
    { day: 27, ratio: '4/4', level: 3, label: 'Day 27', isYesterday: true },
    { day: 28, ratio: '4/4', level: 4, label: 'Today', isToday: true },
  ];

  return (
    <div className="space-y-8 max-w-[1700px] w-full mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-label-sm font-label-sm px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary border border-primary/30 uppercase font-semibold">
              Academic Cockpit
            </span>
            <span className="text-label-sm font-label-sm text-outline">Spring Term 2026 • Week 7</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight font-bold">
            Academic Analytics &amp; Streak Insights
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant mt-0.5">
            High-frequency habit retention, time telemetry, and risk mitigation index.
          </p>
        </div>

        {/* Filter Range & Actions */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 rounded-full bg-surface-container-low border border-outline-variant/30">
            {(['7D', '28D', 'Term'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3.5 py-1 rounded-full text-label-md font-label-md transition-colors ${
                  timeRange === r
                    ? 'bg-surface-container-high text-primary shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={onExportAudit}
            className="px-3 py-1.5 rounded-full border border-outline-variant/40 hover:bg-surface-container-high text-label-md font-label-md text-on-surface flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]" data-icon="download">
              download
            </span>
            Export Audit
          </button>
        </div>
      </div>

      {/* Level 1 / Executive Metric Hero Trio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Metric 1: Weekly Completion Rate */}
        <div className="p-space-lg rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 relative overflow-hidden flex flex-col justify-between group hover:border-outline-variant/60 transition-all duration-200">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-label-sm font-label-sm text-on-surface-variant tracking-wider uppercase font-semibold">
                Consistency Ratio
              </span>
              <div className="text-display font-display text-on-surface mt-1 tracking-tight font-extrabold">
                84<span className="text-headline-md font-headline-md text-primary">%</span>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-secondary-container/20 border border-secondary-container/40 text-secondary text-label-sm font-label-sm flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]" data-icon="trending_up">
                trending_up
              </span>
              +6.2% vs W6
            </div>
          </div>

          {/* Trend Sparkline Graphic */}
          <div className="mt-6 pt-4 border-t border-outline-variant/20">
            <div className="flex items-center justify-between text-label-sm font-label-sm text-outline mb-2">
              <span>Weekly Completion Trend</span>
              <span className="text-on-surface font-medium">Target: 80%</span>
            </div>
            <div className="h-12 flex items-end gap-2 pt-2">
              <div className="flex-1 bg-surface-container-high rounded-t hover:bg-primary-container/60 transition-all h-[65%]" title="Mon: 65%" />
              <div className="flex-1 bg-surface-container-high rounded-t hover:bg-primary-container/60 transition-all h-[75%]" title="Tue: 75%" />
              <div className="flex-1 bg-surface-container-high rounded-t hover:bg-primary-container/60 transition-all h-[90%]" title="Wed: 90%" />
              <div className="flex-1 bg-surface-container-high rounded-t hover:bg-primary-container/60 transition-all h-[80%]" title="Thu: 80%" />
              <div className="flex-1 bg-surface-container-high rounded-t hover:bg-primary-container/60 transition-all h-[88%]" title="Fri: 88%" />
              <div className="flex-1 bg-surface-container-high rounded-t hover:bg-primary-container/60 transition-all h-[94%]" title="Sat: 94%" />
              <div className="flex-1 bg-primary rounded-t shadow-sm shadow-primary/30 h-[84%]" title="Today: 84%" />
            </div>
            <div className="flex justify-between text-[10px] text-outline mt-1 font-label-sm font-semibold">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span className="text-primary font-bold">Today</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Study Hours vs Goal */}
        <div className="p-space-lg rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between group hover:border-outline-variant/60 transition-all duration-200">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-label-sm font-label-sm text-on-surface-variant tracking-wider uppercase font-semibold">
                Weekly Focus Volume
              </span>
              <div className="text-display font-display text-on-surface mt-1 tracking-tight font-extrabold">
                18.5
                <span className="text-headline-md font-headline-md text-on-surface-variant font-normal"> / 20h</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-container/10 border border-primary-container/30 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" data-icon="pace">
                pace
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-outline-variant/20">
            <div className="flex justify-between text-body-sm font-body-sm mb-2">
              <span className="text-on-surface-variant">92.5% of Weekly Objective</span>
              <span className="text-secondary font-label-md text-label-md font-semibold">1.5h to target</span>
            </div>
            <div className="w-full h-3 rounded-full bg-surface-container-lowest overflow-hidden p-0.5 border border-outline-variant/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary transition-all duration-500 shadow-sm shadow-secondary/30"
                style={{ width: '92.5%' }}
              />
            </div>
            <div className="flex items-center justify-between text-label-sm font-label-sm text-outline mt-2">
              <span>Avg Pace: 2.6h / day</span>
              <span className="text-primary font-medium">Midterm prep cycle</span>
            </div>
          </div>
        </div>

        {/* Metric 3: 14-Day Streak */}
        <div className="p-space-lg rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between group hover:border-outline-variant/60 transition-all duration-200 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-tertiary-container/20 blur-2xl pointer-events-none" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <span className="text-label-sm font-label-sm text-on-surface-variant tracking-wider uppercase font-semibold">
                Current Study Streak
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-display font-display text-on-surface tracking-tight font-extrabold">14</span>
                <span className="text-headline-md font-headline-md text-tertiary font-bold">Days 🔥</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-tertiary-container/30 border border-tertiary/40 text-tertiary font-label-sm text-label-sm font-semibold">
              All-Time Personal Best
            </span>
          </div>

          <div className="mt-6 pt-4 border-t border-outline-variant/20 relative z-10">
            <div className="flex items-center justify-between text-label-sm font-label-sm text-outline mb-2">
              <span>Milestone: 21-Day Titan</span>
              <span className="text-tertiary font-label-sm font-semibold">7 days remaining</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 flex-1 rounded-full bg-secondary" />
              <div className="h-2 flex-1 rounded-full bg-secondary" />
              <div className="h-2 flex-1 rounded-full bg-secondary" />
              <div className="h-2 flex-1 rounded-full bg-surface-container-high border border-outline-variant/30" />
              <div className="h-2 flex-1 rounded-full bg-surface-container-high border border-outline-variant/30" />
            </div>
            <div className="flex justify-between text-[11px] font-label-sm text-on-surface-variant mt-2 font-semibold">
              <span className="text-secondary">7D Locked</span>
              <span className="text-secondary font-bold">14D Unlocked</span>
              <span className="text-outline">21D Goal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Center Section: 28-Day Consistency Heatmap + Time Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* 28-Day Habit Consistency Heatmap (8 columns) */}
        <div className="lg:col-span-8 p-space-lg rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-outline-variant/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" data-icon="calendar_month">
                  calendar_month
                </span>
                <h2 className="text-headline-sm font-headline-sm text-on-surface font-bold">
                  28-Day Habit Consistency Matrix
                </h2>
              </div>
              <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                Micro-block frequency across 4 cohort weeks.
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 text-label-sm font-label-sm text-outline font-medium">
              <span>Less</span>
              <div className="w-3 h-3 rounded-sm bg-surface-container-highest" />
              <div className="w-3 h-3 rounded-sm bg-primary-container/30" />
              <div className="w-3 h-3 rounded-sm bg-primary-container/60" />
              <div className="w-3 h-3 rounded-sm bg-primary-container" />
              <div className="w-3 h-3 rounded-sm bg-secondary" />
              <span>Peak</span>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="py-5 overflow-x-auto">
            <div className="min-w-[540px]">
              <div className="grid grid-cols-7 gap-2 mb-2 text-center text-label-sm font-label-sm text-outline font-semibold">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
              </div>

              {/* 4 Weeks of 7 Days */}
              <div className="grid grid-cols-7 gap-2.5">
                {matrixDays.map((d) => {
                  let bgStyle = 'bg-surface-container-highest/60 border-outline-variant/20';
                  let dotColor = 'bg-primary-container/40';
                  let labelColor = 'text-outline';

                  if (d.isToday) {
                    bgStyle = 'bg-secondary-container/50 border-secondary ring-2 ring-secondary/30';
                    dotColor = 'bg-secondary';
                    labelColor = 'text-secondary font-bold';
                  } else if (d.isYesterday) {
                    bgStyle = 'bg-primary-container/70 border-primary ring-1 ring-primary/40';
                    dotColor = 'bg-secondary';
                    labelColor = 'text-primary font-bold';
                  } else if (d.level === 4) {
                    bgStyle = 'bg-secondary-container/30 border-secondary/40';
                    dotColor = 'bg-secondary';
                    labelColor = 'text-secondary';
                  } else if (d.level === 3) {
                    bgStyle = 'bg-primary-container/60 border-primary/50';
                    dotColor = 'bg-primary';
                    labelColor = 'text-on-primary-container';
                  } else if (d.level === 2) {
                    bgStyle = 'bg-primary-container/30 border-primary-container/40';
                    dotColor = 'bg-primary-container/70';
                    labelColor = 'text-primary';
                  }

                  const isSelected = selectedCell === d.day;

                  return (
                    <div
                      key={d.day}
                      onClick={() => setSelectedCell(isSelected ? null : d.day)}
                      className={`h-14 p-2 rounded-DEFAULT border flex flex-col justify-between hover:border-primary transition-all group cursor-pointer ${bgStyle} ${
                        isSelected ? 'ring-2 ring-white scale-105' : ''
                      }`}
                    >
                      <span className={`text-label-sm font-label-sm ${labelColor}`}>
                        {d.label}
                      </span>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-label-md text-on-surface font-medium">
                          {d.ratio}
                        </span>
                        {d.isToday ? (
                          <span
                            className="material-symbols-outlined text-[14px] text-secondary"
                            data-icon="check_circle"
                          >
                            check_circle
                          </span>
                        ) : (
                          <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Matrix Micro Summary */}
          <div className="pt-3 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-2 text-label-sm font-label-sm text-on-surface-variant">
            <span>
              Current Period: <strong className="text-on-surface font-semibold">26 of 28 Days Active (92.8%)</strong>
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span>Longest Continuous Streak: 14 Consecutive Days</span>
            </div>
          </div>
        </div>

        {/* Time Distribution Category Breakdown Chart (4 columns) */}
        <div className="lg:col-span-4 p-space-lg rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" data-icon="pie_chart">
                  pie_chart
                </span>
                <h2 className="text-headline-sm font-headline-sm text-on-surface font-bold">Time Distribution</h2>
              </div>
              <span className="text-label-sm font-label-sm text-outline font-medium">41.2h Total</span>
            </div>

            {/* Segmented Stacked Bar */}
            <div className="mt-5 space-y-2">
              <div className="h-5 w-full rounded-full bg-surface-container-lowest p-0.5 flex gap-1 overflow-hidden border border-outline-variant/30">
                <div className="h-full rounded-full bg-primary-container" style={{ width: '45%' }} title="Study: 45%" />
                <div className="h-full rounded-full bg-secondary" style={{ width: '25%' }} title="Wellness: 25%" />
                <div className="h-full rounded-full bg-tertiary" style={{ width: '20%' }} title="Fitness: 20%" />
                <div className="h-full rounded-full bg-outline" style={{ width: '10%' }} title="Sleep: 10%" />
              </div>
              <p className="text-label-sm font-label-sm text-outline text-right">
                Categorical study &amp; restorative allocation
              </p>
            </div>

            {/* Breakdown Legend & Stats */}
            <div className="mt-6 space-y-3.5">
              {/* Study 45% */}
              <div className="flex items-center justify-between p-2.5 rounded-DEFAULT bg-surface-container-high/40 border border-outline-variant/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-primary-container" />
                  <div>
                    <div className="text-label-md font-label-md text-on-surface font-semibold">Study</div>
                    <div className="text-[11px] text-outline">Math, Physics, Labs</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-label-lg font-label-lg text-primary font-bold">45%</div>
                  <div className="text-[11px] text-on-surface-variant font-label-sm">18.5 hrs</div>
                </div>
              </div>

              {/* Wellness 25% */}
              <div className="flex items-center justify-between p-2.5 rounded-DEFAULT bg-surface-container-high/40 border border-outline-variant/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <div>
                    <div className="text-label-md font-label-md text-on-surface font-semibold">Wellness</div>
                    <div className="text-[11px] text-outline">Meditation, Journaling</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-label-lg font-label-lg text-secondary font-bold">25%</div>
                  <div className="text-[11px] text-on-surface-variant font-label-sm">10.3 hrs</div>
                </div>
              </div>

              {/* Fitness 20% */}
              <div className="flex items-center justify-between p-2.5 rounded-DEFAULT bg-surface-container-high/40 border border-outline-variant/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-tertiary" />
                  <div>
                    <div className="text-label-md font-label-md text-on-surface font-semibold">Fitness</div>
                    <div className="text-[11px] text-outline">Gym, Running, Mobility</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-label-lg font-label-lg text-tertiary font-bold">20%</div>
                  <div className="text-[11px] text-on-surface-variant font-label-sm">8.2 hrs</div>
                </div>
              </div>

              {/* Sleep 10% */}
              <div className="flex items-center justify-between p-2.5 rounded-DEFAULT bg-surface-container-high/40 border border-outline-variant/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-outline" />
                  <div>
                    <div className="text-label-md font-label-md text-on-surface font-semibold">Sleep Hygiene</div>
                    <div className="text-[11px] text-outline">Wind-down &amp; Reading</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-label-lg font-label-lg text-on-surface-variant font-bold">10%</div>
                  <div className="text-[11px] text-on-surface-variant font-label-sm">4.2 hrs</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-between items-center text-label-sm font-label-sm text-outline">
            <span>Optimal ratio index:</span>
            <span className="text-secondary font-label-md font-semibold">Optimal Balance (0.94)</span>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Habit Adherence Risk Alerts & Gamified Milestone Rewards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Habit Adherence Risk Alerts (6 columns) */}
        <div className="lg:col-span-6 p-space-lg rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error" data-icon="warning">
                  warning
                </span>
                <h2 className="text-headline-sm font-headline-sm text-on-surface font-bold">
                  Habit Adherence Risk Alerts
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-error-container/40 border border-error/30 text-error text-label-sm font-label-sm font-semibold">
                {riskAlerts.length} Items Flagged
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {riskAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-DEFAULT border flex items-start gap-3 relative overflow-hidden ${
                    alert.type === 'critical'
                      ? 'bg-surface-container-high/50 border-error/40'
                      : 'bg-surface-container-high/30 border-outline-variant/30'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      alert.type === 'critical'
                        ? 'bg-error-container/40 text-error'
                        : 'bg-tertiary-container/30 text-tertiary'
                    }`}
                  >
                    <span className="material-symbols-outlined" data-icon={alert.icon}>
                      {alert.icon}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-label-lg font-label-lg text-on-surface font-bold truncate">{alert.title}</h3>
                      <span
                        className={`text-label-sm font-label-sm px-2 py-0.5 rounded-full shrink-0 font-semibold ${
                          alert.type === 'critical'
                            ? 'text-error bg-error-container/30'
                            : 'text-tertiary bg-tertiary-container/20'
                        }`}
                      >
                        {alert.statusTag}
                      </span>
                    </div>

                    <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">{alert.description}</p>

                    <div className="mt-2.5 flex items-center gap-2">
                      <button
                        onClick={alert.id === 'r1' ? onLockAlarm : onAddHydration}
                        className={`px-3 py-1 rounded-full text-label-sm font-label-sm active:scale-95 transition-all font-semibold ${
                          alert.type === 'critical'
                            ? 'bg-primary-container text-on-primary-container hover:brightness-110'
                            : 'bg-surface-container-highest border border-outline-variant/40 text-on-surface hover:bg-surface-bright'
                        }`}
                      >
                        {alert.actionLabel}
                      </button>

                      {alert.secondaryAction && (
                        <button className="px-3 py-1 rounded-full border border-outline-variant/40 text-on-surface-variant hover:text-on-surface text-label-sm font-label-sm transition-colors">
                          {alert.secondaryAction}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-label-sm font-label-sm text-outline">
            <span>
              Automated telemetry checks: <strong className="text-on-surface">Active</strong>
            </span>
            <button className="text-primary hover:underline cursor-pointer">Configure triggers</button>
          </div>
        </div>

        {/* Gamified Milestone Rewards (6 columns) */}
        <div className="lg:col-span-6 p-space-lg rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary" data-icon="military_tech">
                  military_tech
                </span>
                <h2 className="text-headline-sm font-headline-sm text-on-surface font-bold">
                  Gamified Milestone Rewards
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 border border-primary/30 text-primary text-label-sm font-label-sm font-semibold">
                Level 18 Scholar
              </span>
            </div>

            <div className="mt-4 space-y-3.5">
              {gamifiedRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="p-3.5 rounded-DEFAULT bg-surface-container-high/40 border border-secondary/30 flex flex-col gap-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                          reward.badgeStatus === 'unlocked'
                            ? 'bg-secondary-container/20 border border-secondary text-secondary shadow-lg shadow-secondary/10'
                            : 'bg-primary-container/20 border border-primary-container text-primary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[26px]" data-icon={reward.icon}>
                          {reward.icon}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-label-lg font-label-lg text-on-surface font-bold">{reward.title}</h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-label-sm border font-semibold ${
                              reward.badgeStatus === 'unlocked'
                                ? 'bg-secondary-container/30 text-secondary border-secondary/40'
                                : 'bg-surface-container-highest text-primary border-primary/20'
                            }`}
                          >
                            {reward.badgeStatus === 'unlocked' ? 'UNLOCKED' : reward.xpText}
                          </span>
                        </div>
                        <p className="text-body-sm font-body-sm text-on-surface-variant">{reward.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-label-sm font-label-sm font-bold ${
                          reward.badgeStatus === 'unlocked' ? 'text-secondary' : 'text-primary'
                        }`}
                      >
                        {reward.badgeStatus === 'unlocked' ? reward.xpText : reward.progressText}
                      </span>
                    </div>
                  </div>

                  {reward.percentComplete !== undefined && (
                    <div className="w-full bg-surface-container-lowest h-2.5 rounded-full overflow-hidden p-0.5 border border-outline-variant/30 mt-1">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                        style={{ width: `${reward.percentComplete}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-label-sm font-label-sm text-outline">
            <span>
              Next prestige tier: <strong className="text-on-surface">Zenith Researcher</strong>
            </span>
            <span className="text-secondary font-label-md font-semibold">1,240 XP to Level 19</span>
          </div>
        </div>
      </div>
    </div>
  );
};
