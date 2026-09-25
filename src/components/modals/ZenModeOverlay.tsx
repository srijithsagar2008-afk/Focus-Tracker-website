import React, { useEffect } from 'react';

interface ZenModeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  timerSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSkipTimer: () => void;
  activeTopic: string;
}

export const ZenModeOverlay: React.FC<ZenModeOverlayProps> = ({
  isOpen,
  onClose,
  timerSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  onSkipTimer,
  activeTopic,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  const timeFormatted = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0e15] flex flex-col justify-between items-center p-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between max-w-4xl">
        <div className="flex items-center gap-2 text-primary font-headline text-lg font-bold">
          <span className="material-symbols-outlined" data-icon="filter_vintage">
            filter_vintage
          </span>
          <span>FocusTrack Zen Chamber</span>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-1.5 rounded-full border border-outline-variant/40 text-on-surface hover:bg-surface-container-high transition-colors text-sm font-medium flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]" data-icon="fullscreen_exit">
            fullscreen_exit
          </span>
          Exit Zen Mode (Esc)
        </button>
      </div>

      {/* Center Hero Countdown */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        <span className="px-3 py-1 rounded-full bg-primary-container/20 text-primary border border-primary/30 text-xs font-semibold uppercase tracking-wider mb-4">
          {activeTopic || 'Deep Work Focus Block'}
        </span>

        {/* Ambient Halo & Clock */}
        <div className="relative w-80 h-80 rounded-full flex items-center justify-center glow-timer bg-surface-container-low border border-white/10 my-4">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#5B4DFF"
              strokeWidth="5"
              strokeDasharray="263.8"
              strokeDashoffset={263.8 * (1 - timerSeconds / (25 * 60))}
              strokeLinecap="round"
              className="transition-all duration-1000 shadow-[0_0_16px_#5B4DFF]"
            />
          </svg>

          <div className="z-10 flex flex-col items-center">
            <span className="text-[72px] font-display font-extrabold tracking-tight text-on-surface leading-none">
              {timeFormatted}
            </span>
            <span className="text-xs text-outline tracking-wider uppercase mt-2">
              {isTimerRunning ? 'Flow State Active' : 'Session Paused'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={onResetTimer}
            className="w-12 h-12 rounded-full border border-outline-variant/30 bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors active:scale-95"
            title="Reset"
          >
            <span className="material-symbols-outlined" data-icon="restart_alt">
              restart_alt
            </span>
          </button>

          <button
            onClick={onToggleTimer}
            className="px-8 py-3.5 rounded-full bg-primary-container hover:bg-primary-container/90 text-on-primary-container font-label-lg text-label-lg flex items-center gap-2.5 transition-all active:scale-95 glow-violet font-semibold"
          >
            <span className="material-symbols-outlined text-[24px]" data-icon={isTimerRunning ? 'pause' : 'play_arrow'}>
              {isTimerRunning ? 'pause' : 'play_arrow'}
            </span>
            <span>{isTimerRunning ? 'Pause Chamber' : 'Resume Chamber'}</span>
          </button>

          <button
            onClick={onSkipTimer}
            className="w-12 h-12 rounded-full border border-outline-variant/30 bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors active:scale-95"
            title="Skip to Break"
          >
            <span className="material-symbols-outlined" data-icon="skip_next">
              skip_next
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Quote */}
      <div className="text-center text-sm text-outline max-w-lg italic">
        "Clarity about what matters provides clarity about what does not."
      </div>
    </div>
  );
};
