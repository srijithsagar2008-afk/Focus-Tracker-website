import React, { useState } from 'react';
import { DirectiveItem, SoundChannel } from '../../types';

interface FocusTimerScreenProps {
  timerSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSkipTimer: () => void;
  timerMode: 'pomodoro' | 'short_break' | 'deep_block';
  onSetTimerMode: (mode: 'pomodoro' | 'short_break' | 'deep_block') => void;
  directives: DirectiveItem[];
  onToggleDirective: (directiveId: string) => void;
  onAddDirective: (title: string) => void;
  soundChannels: SoundChannel[];
  onUpdateSoundVolume: (channelId: string, volume: number) => void;
  onToggleSoundChannel: (channelId: string) => void;
  onSetMasterPreset: (preset: 'quiet' | 'immersion' | 'mute') => void;
  activeFocusTopic: string;
}

export const FocusTimerScreen: React.FC<FocusTimerScreenProps> = ({
  timerSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  onSkipTimer,
  timerMode,
  onSetTimerMode,
  directives,
  onToggleDirective,
  onAddDirective,
  soundChannels,
  onUpdateSoundVolume,
  onToggleSoundChannel,
  onSetMasterPreset,
  activeFocusTopic,
}) => {
  const [newDirectiveInput, setNewDirectiveInput] = useState('');
  const [isAddingDirective, setIsAddingDirective] = useState(false);
  const [flipToFocus, setFlipToFocus] = useState(true);
  const [fullDnd, setFullDnd] = useState(true);
  const [activePreset, setActivePreset] = useState<'quiet' | 'immersion' | 'mute'>('immersion');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const tracks = [
    { title: 'Midnight Study Session #42', subtitle: 'Komorebi & Chillhop Beats' },
    { title: 'Tokyo Rain Reflection', subtitle: 'Lofi Coffee Shop Session' },
    { title: 'Library Stacks 2:00 AM', subtitle: 'Atmospheric Binaural Vibes' },
  ];

  const currentTrack = tracks[currentTrackIndex % tracks.length];

  const totalDuration =
    timerMode === 'pomodoro' ? 25 * 60 : timerMode === 'short_break' ? 5 * 60 : 50 * 60;
  const progressRatio = Math.max(0, Math.min(1, timerSeconds / totalDuration));
  const dashOffset = 880 * (1 - progressRatio);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDirectiveInput.trim()) {
      onAddDirective(newDirectiveInput.trim());
      setNewDirectiveInput('');
      setIsAddingDirective(false);
    }
  };

  const handlePresetSelect = (preset: 'quiet' | 'immersion' | 'mute') => {
    setActivePreset(preset);
    onSetMasterPreset(preset);
  };

  const completedDirectives = directives.filter((d) => d.status === 'completed').length;

  return (
    <div className="flex-1 flex flex-col gap-space-sm h-full">
      {/* Sub-header Context / Breadcrumb */}
      <div className="flex items-center gap-3 px-2 py-1 mb-2">
        <span className="px-2.5 py-1 rounded-full bg-primary-container/20 border border-primary/30 font-label-sm text-label-sm text-primary flex items-center gap-1.5 font-semibold">
          <span className={`w-1.5 h-1.5 rounded-full bg-primary ${isTimerRunning ? 'animate-ping' : ''}`} />
          ACTIVE PROTOCOL
        </span>
        <div className="h-4 w-px bg-outline-variant/30" />
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
          {activeFocusTopic || 'Deep Work: Organic Chemistry Reaction Mechanisms'}
        </h2>
      </div>

      {/* 3-Panel Bento Interior */}
      <div className="grid grid-cols-12 gap-gutter h-full">
        {/* LEFT PANEL: Task Protocol & Strict Shield (3 cols) */}
        <section className="col-span-12 lg:col-span-3 flex flex-col gap-space-md">
          {/* Target Directives */}
          <div className="bg-surface-container-low border border-white/[0.06] rounded-DEFAULT p-space-md flex flex-col flex-1 shadow-sm">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20 mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary text-[20px]"
                  data-icon="check_circle"
                >
                  check_circle
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Target Directives</h3>
              </div>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/25 font-semibold">
                {completedDirectives}/{directives.length} Done
              </span>
            </div>

            {/* Directive items list */}
            <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[380px] pr-1">
              {directives.map((dir) => {
                const isDone = dir.status === 'completed';
                const isInProgress = dir.status === 'in_progress';

                return (
                  <div
                    key={dir.id}
                    onClick={() => onToggleDirective(dir.id)}
                    className={`group flex items-start gap-3 p-2.5 rounded-DEFAULT transition-all cursor-pointer ${
                      isInProgress
                        ? 'bg-surface-container-high border border-primary/40 glow-violet'
                        : isDone
                        ? 'bg-surface-container border border-white/[0.04] hover:border-secondary/30'
                        : 'bg-surface-container border border-white/[0.04] hover:border-outline-variant/50'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                        isDone
                          ? 'bg-secondary text-surface-container-lowest glow-cyan'
                          : isInProgress
                          ? 'border-2 border-primary'
                          : 'border-2 border-outline-variant/60 group-hover:border-primary'
                      }`}
                    >
                      {isDone && (
                        <span className="material-symbols-outlined text-[14px] font-bold" data-icon="check">
                          check
                        </span>
                      )}
                      {isInProgress && <div className="w-2 h-2 rounded-full bg-primary animate-ping" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-label-md text-label-md transition-colors ${
                          isDone
                            ? 'text-on-surface line-through opacity-60'
                            : isInProgress
                            ? 'text-primary font-semibold'
                            : 'text-on-surface-variant group-hover:text-on-surface'
                        }`}
                      >
                        {dir.title}
                      </p>
                      {dir.timeLogged && (
                        <span className="font-label-sm text-label-sm text-secondary block mt-0.5">
                          {dir.timeLogged}
                        </span>
                      )}
                      {isInProgress && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-label-sm text-label-sm px-2 py-0.2 rounded-full bg-primary/20 text-primary border border-primary/30 font-medium">
                            In Progress
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            {dir.pomodorosEst || 'Est. 2 Pomodoros'}
                          </span>
                        </div>
                      )}
                      {!isDone && !isInProgress && (
                        <span className="font-label-sm text-label-sm text-on-surface-variant/70 block mt-0.5">
                          Up Next
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Append Directive Form / Button */}
            <div className="pt-3 mt-2 border-t border-outline-variant/20">
              {isAddingDirective ? (
                <form onSubmit={handleAddSubmit} className="space-y-2">
                  <input
                    type="text"
                    value={newDirectiveInput}
                    onChange={(e) => setNewDirectiveInput(e.target.value)}
                    placeholder="Enter directive title..."
                    autoFocus
                    className="w-full px-3 py-1.5 text-xs bg-surface-container rounded-lg border border-primary/50 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingDirective(false)}
                      className="px-2.5 py-1 text-xs text-on-surface-variant hover:text-on-surface"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 text-xs rounded-full bg-primary-container text-on-primary font-medium"
                    >
                      Add
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsAddingDirective(true)}
                  className="w-full py-2 px-3 rounded-full border border-dashed border-outline-variant/50 text-on-surface-variant hover:text-on-surface hover:border-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]" data-icon="add">
                    add
                  </span>
                  <span>Append Directive</span>
                </button>
              )}
            </div>
          </div>

          {/* Strict Shield & Hardware Toggles */}
          <div className="bg-surface-container-low border border-white/[0.06] rounded-DEFAULT p-space-md flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]" data-icon="shield">
                  shield
                </span>
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">Strict Shield</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-sm text-label-sm border border-secondary/30 font-semibold">
                LOCKED
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              32 websites &amp; 4 desktop apps barred. Emergency breakout cooldown: 90s.
            </p>
            <div className="space-y-2 pt-1">
              {/* Toggle 1: Flip-to-Focus */}
              <label className="flex items-center justify-between p-2 rounded-DEFAULT bg-surface-container border border-outline-variant/20 cursor-pointer hover:bg-surface-container-high transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px]" data-icon="screen_rotation">
                    screen_rotation
                  </span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-medium">Flip-to-Focus</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Phone face-down sensor synced</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFlipToFocus(!flipToFocus)}
                  className={`w-10 h-5 rounded-full relative p-0.5 transition-colors ${
                    flipToFocus ? 'bg-primary-container' : 'bg-surface-variant'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      flipToFocus ? 'ml-auto' : 'ml-0'
                    }`}
                  />
                </button>
              </label>

              {/* Toggle 2: DND Auto-Relay */}
              <label className="flex items-center justify-between p-2 rounded-DEFAULT bg-surface-container border border-outline-variant/20 cursor-pointer hover:bg-surface-container-high transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]" data-icon="do_not_disturb_on">
                    do_not_disturb_on
                  </span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-medium">Full DND Broadcast</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Slack, Discord &amp; Mail muted</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFullDnd(!fullDnd)}
                  className={`w-10 h-5 rounded-full relative p-0.5 transition-colors ${
                    fullDnd ? 'bg-primary-container' : 'bg-surface-variant'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      fullDnd ? 'ml-auto' : 'ml-0'
                    }`}
                  />
                </button>
              </label>
            </div>
          </div>
        </section>

        {/* CENTER PANEL: Hero Glowing Pomodoro Chamber (6 cols) */}
        <section className="col-span-12 lg:col-span-6 flex flex-col justify-between items-center gap-6">
          {/* Mode Selector Capsule */}
          <div className="w-full flex items-center justify-between px-space-md py-2 rounded-full bg-surface-container-low border border-white/[0.08] shadow-sm">
            <div className="flex items-center gap-1.5 p-1 bg-surface-container-lowest rounded-full">
              <button
                onClick={() => onSetTimerMode('pomodoro')}
                className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                  timerMode === 'pomodoro'
                    ? 'bg-primary-container text-on-primary-container glow-violet'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Pomodoro (25m)
              </button>
              <button
                onClick={() => onSetTimerMode('short_break')}
                className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                  timerMode === 'short_break'
                    ? 'bg-secondary-container text-on-secondary-container glow-cyan'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Short Break (5m)
              </button>
              <button
                onClick={() => onSetTimerMode('deep_block')}
                className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                  timerMode === 'deep_block'
                    ? 'bg-primary-container text-on-primary-container glow-violet'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Deep Block (50m)
              </button>
            </div>

            {/* Session Progress Indicator */}
            <div className="flex items-center gap-3 pr-2">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">Cycle 3 of 4</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary glow-cyan" title="Completed" />
                <span className="w-2.5 h-2.5 rounded-full bg-secondary glow-cyan" title="Completed" />
                <span
                  className="w-3 h-3 rounded-full bg-primary animate-pulse border border-primary-container glow-violet"
                  title="Current Active"
                />
                <span
                  className="w-2.5 h-2.5 rounded-full bg-surface-variant border border-outline-variant/40"
                  title="Upcoming"
                />
              </div>
            </div>
          </div>

          {/* MAIN GLOWING CIRCULAR TIMER */}
          <div className="relative flex items-center justify-center my-auto py-4">
            {/* Ambient Halo Rings */}
            <div className="absolute w-[360px] h-[360px] rounded-full bg-primary-container/10 filter blur-3xl pointer-events-none" />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-primary/20 pointer-events-none" />
            <div className="absolute w-[340px] h-[340px] rounded-full border border-outline-variant/20 border-dashed pointer-events-none" />

            {/* SVG Circular Gauge */}
            <div className="relative w-[320px] h-[320px] rounded-full bg-surface-container-low border border-white/[0.12] flex items-center justify-center glow-timer">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 320 320">
                <circle cx="160" cy="160" fill="none" r="140" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="10" />
                <circle
                  cx="160"
                  cy="160"
                  fill="none"
                  r="140"
                  stroke="url(#electricGlowGradient)"
                  strokeDasharray="880"
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  strokeWidth="12"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="electricGlowGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#5B4DFF" />
                    <stop offset="60%" stopColor="#8475FF" />
                    <stop offset="100%" stopColor="#4EDEA3" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Inner Timer Digital Readout */}
              <div className="text-center z-10 flex flex-col items-center">
                <span className="px-3 py-0.5 rounded-full bg-primary-container/20 text-primary font-label-sm text-label-sm border border-primary/30 tracking-wider mb-1 font-semibold uppercase">
                  {isTimerRunning ? 'SESSION IN FLOW' : 'PAUSED'}
                </span>
                <div className="font-display text-[64px] leading-tight font-bold tracking-tighter text-on-surface">
                  {formatTimer(timerSeconds)}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary" data-icon="coffee">
                    coffee
                  </span>
                  Next: 5m Break in {formatTimer(timerSeconds)}
                </p>
              </div>
            </div>
          </div>

          {/* Timer Action Controller Dock */}
          <div className="w-full flex flex-col items-center gap-space-md">
            <div className="flex items-center gap-4">
              {/* Reset Button */}
              <button
                onClick={onResetTimer}
                className="w-12 h-12 rounded-full border border-outline-variant/30 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-all active:scale-95"
                title="Restart Interval"
              >
                <span className="material-symbols-outlined" data-icon="restart_alt">
                  restart_alt
                </span>
              </button>

              {/* Primary Pause / Resume Button */}
              <button
                onClick={onToggleTimer}
                className="px-8 py-3.5 rounded-full bg-primary-container hover:bg-primary-container/90 text-on-primary-container font-label-lg text-label-lg flex items-center gap-3 transition-all transform active:scale-95 glow-violet font-semibold shadow-lg shadow-primary-container/30"
              >
                <span className="material-symbols-outlined text-[24px]" data-icon={isTimerRunning ? 'pause' : 'play_arrow'}>
                  {isTimerRunning ? 'pause' : 'play_arrow'}
                </span>
                <span>{isTimerRunning ? 'Pause Focus Chamber' : 'Resume Focus Chamber'}</span>
              </button>

              {/* Fast-Forward / Skip */}
              <button
                onClick={onSkipTimer}
                className="w-12 h-12 rounded-full border border-outline-variant/30 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-all active:scale-95"
                title="Skip to Break"
              >
                <span className="material-symbols-outlined" data-icon="skip_next">
                  skip_next
                </span>
              </button>
            </div>

            {/* Protocol Discipline Quote Card */}
            <div className="w-full bg-surface-container-low border border-white/[0.06] rounded-DEFAULT p-space-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary-container/20 border border-secondary/30 flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[18px]" data-icon="format_quote">
                    format_quote
                  </span>
                </div>
                <div>
                  <p className="font-body-md text-body-md text-on-surface italic">
                    "The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable."
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                    — Cal Newport, <span className="text-primary font-semibold">Deep Work Cockpit Mandate</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="material-symbols-outlined text-secondary text-[20px]" data-icon="bolt">
                  bolt
                </span>
                <span className="font-label-md text-label-md text-secondary font-semibold">Flow State: 98%</span>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: Atmosphere Mixing Deck & Ambient Soundscapes (3 cols) */}
        <section className="col-span-12 lg:col-span-3 flex flex-col gap-space-md">
          {/* Atmospheric Audio Deck */}
          <div className="bg-surface-container-low border border-white/[0.06] rounded-DEFAULT p-space-md flex flex-col flex-1 shadow-sm">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20 mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]" data-icon="graphic_eq">
                  graphic_eq
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Soundscape Mixer</h3>
              </div>
              <span className="font-label-sm text-label-sm text-primary px-2 py-0.5 rounded-full bg-primary-container/20 border border-primary/30 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                LIVE MIX
              </span>
            </div>

            {/* Channel Sliders */}
            <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[380px] pr-1">
              {soundChannels.map((channel) => {
                const isActive = channel.enabled && channel.volume > 0;
                return (
                  <div
                    key={channel.id}
                    className={`p-3 rounded-DEFAULT transition-all ${
                      isActive
                        ? channel.id === 'binaural'
                          ? 'bg-surface-container border border-primary/30 glow-violet'
                          : 'bg-surface-container border border-white/[0.04]'
                        : 'bg-surface-container/60 border border-white/[0.02] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            channel.id === 'binaural'
                              ? 'bg-primary-container text-on-primary-container'
                              : 'bg-surface-container-high text-secondary'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]" data-icon={channel.icon}>
                            {channel.icon}
                          </span>
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface font-semibold">{channel.name}</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">{channel.subtitle}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => onToggleSoundChannel(channel.id)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                          channel.enabled
                            ? 'bg-primary/20 text-primary hover:bg-primary hover:text-on-primary'
                            : 'bg-surface-variant text-on-surface-variant hover:text-on-surface'
                        }`}
                        title={channel.enabled ? 'Mute channel' : 'Enable channel'}
                      >
                        <span
                          className="material-symbols-outlined text-[14px]"
                          data-icon={channel.enabled ? 'volume_up' : 'volume_off'}
                        >
                          {channel.enabled ? 'volume_up' : 'volume_off'}
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant" data-icon="volume_mute">
                        volume_mute
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={channel.volume}
                        onChange={(e) => onUpdateSoundVolume(channel.id, Number(e.target.value))}
                        className="w-full h-1.5 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <span className="font-label-sm text-label-sm text-primary w-8 text-right font-medium">
                        {channel.volume}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Master Volume Preset Bar */}
            <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between mt-auto">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Master Atmosphere</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePresetSelect('quiet')}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-label-sm transition-colors ${
                    activePreset === 'quiet'
                      ? 'bg-primary-container/20 text-primary border border-primary/30 font-semibold'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Quiet
                </button>
                <button
                  onClick={() => handlePresetSelect('immersion')}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-label-sm transition-colors ${
                    activePreset === 'immersion'
                      ? 'bg-primary-container/20 text-primary border border-primary/30 font-semibold'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Immersion
                </button>
                <button
                  onClick={() => handlePresetSelect('mute')}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-label-sm transition-colors ${
                    activePreset === 'mute'
                      ? 'bg-primary-container/20 text-primary border border-primary/30 font-semibold'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Mute
                </button>
              </div>
            </div>
          </div>

          {/* Lo-Fi Radio Visualizer Card */}
          <div className="bg-surface-container-low border border-white/[0.06] rounded-DEFAULT p-space-md flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping" />
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">Lo-Fi Synth Station</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">128 kbps • Lossless</span>
            </div>

            {/* Animated Equalizer Spectrum Visualizer */}
            <div className="h-12 w-full bg-surface-container-lowest rounded-DEFAULT px-4 flex items-end justify-between gap-1.5 py-2 border border-outline-variant/20">
              <div className={`w-1.5 bg-primary rounded-full ${isTimerRunning ? 'eq-anim-1' : 'h-1'}`} />
              <div className={`w-1.5 bg-secondary rounded-full ${isTimerRunning ? 'eq-anim-2' : 'h-2'}`} />
              <div className={`w-1.5 bg-primary-container rounded-full ${isTimerRunning ? 'eq-anim-3' : 'h-1.5'}`} />
              <div className={`w-1.5 bg-secondary-fixed rounded-full ${isTimerRunning ? 'eq-anim-4' : 'h-3'}`} />
              <div className={`w-1.5 bg-primary rounded-full ${isTimerRunning ? 'eq-anim-5' : 'h-2'}`} />
              <div className={`w-1.5 bg-secondary rounded-full ${isTimerRunning ? 'eq-anim-6' : 'h-1'}`} />
              <div className={`w-1.5 bg-primary-fixed-dim rounded-full ${isTimerRunning ? 'eq-anim-2' : 'h-2.5'}`} />
              <div className={`w-1.5 bg-secondary rounded-full ${isTimerRunning ? 'eq-anim-1' : 'h-1'}`} />
              <div className={`w-1.5 bg-primary-container rounded-full ${isTimerRunning ? 'eq-anim-4' : 'h-3'}`} />
              <div className={`w-1.5 bg-secondary rounded-full ${isTimerRunning ? 'eq-anim-3' : 'h-1.5'}`} />
              <div className={`w-1.5 bg-primary rounded-full ${isTimerRunning ? 'eq-anim-5' : 'h-2'}`} />
              <div className={`w-1.5 bg-secondary-fixed rounded-full ${isTimerRunning ? 'eq-anim-2' : 'h-1'}`} />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="truncate">
                <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
                  {currentTrack.title}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {currentTrack.subtitle}
                </p>
              </div>
              <button
                onClick={() => setCurrentTrackIndex((i) => i + 1)}
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface transition-colors shrink-0 active:scale-95"
                title="Next Lo-Fi Beat"
              >
                <span className="material-symbols-outlined text-[16px]" data-icon="skip_next">
                  skip_next
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
