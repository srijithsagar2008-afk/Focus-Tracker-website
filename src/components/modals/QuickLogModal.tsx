import React, { useState } from 'react';
import { HabitItem } from '../../types';

interface QuickLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  habits: HabitItem[];
  onToggleHabit: (habitId: string) => void;
  onAddHydration: () => void;
  onLogStudySession: (minutes: number, course: string) => void;
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({
  isOpen,
  onClose,
  habits,
  onToggleHabit,
  onAddHydration,
  onLogStudySession,
}) => {
  const [selectedCourse, setSelectedCourse] = useState('Math 201');
  const [duration, setDuration] = useState('25');
  const [loggedNotification, setLoggedNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStudyLog = (e: React.FormEvent) => {
    e.preventDefault();
    onLogStudySession(Number(duration), selectedCourse);
    setLoggedNotification(`Successfully logged ${duration}m of ${selectedCourse}!`);
    setTimeout(() => {
      setLoggedNotification(null);
      onClose();
    }, 1200);
  };

  const handleHydrationClick = () => {
    onAddHydration();
    setLoggedNotification('Logged +500ml water hydration!');
    setTimeout(() => setLoggedNotification(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container rounded-DEFAULT border border-outline-variant/40 w-full max-w-lg p-space-lg shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-outline hover:text-on-surface transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined" data-icon="close">
            close
          </span>
        </button>

        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-primary/15 text-primary border border-primary/30 font-semibold">
            <span className="material-symbols-outlined text-xs" data-icon="bolt">
              bolt
            </span>
            Instant Telemetry
          </div>
          <h3 className="text-headline-md font-headline-md text-on-surface font-bold">Quick Academic Log</h3>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Rapidly log focus blocks, hydration intake, or daily routine check-ins.
          </p>
        </div>

        {loggedNotification && (
          <div className="mb-4 p-3 rounded-lg bg-secondary-container/30 border border-secondary text-secondary text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-sm" data-icon="check_circle">
              check_circle
            </span>
            {loggedNotification}
          </div>
        )}

        {/* Rapid Actions Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleHydrationClick}
            className="p-3 rounded-DEFAULT bg-surface-container-high border border-outline-variant/30 hover:border-secondary flex items-center gap-3 transition-colors text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]" data-icon="water_drop">
                water_drop
              </span>
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface font-semibold">+500ml Water</p>
              <span className="text-[11px] text-outline">Keep hydration shield active</span>
            </div>
          </button>

          <button
            onClick={() => {
              onLogStudySession(45, 'Problem Sets');
              setLoggedNotification('Logged 45m Practice Set!');
              setTimeout(() => {
                setLoggedNotification(null);
                onClose();
              }, 1200);
            }}
            className="p-3 rounded-DEFAULT bg-surface-container-high border border-outline-variant/30 hover:border-primary flex items-center gap-3 transition-colors text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]" data-icon="menu_book">
                menu_book
              </span>
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface font-semibold">+45m Problem Set</p>
              <span className="text-[11px] text-outline">Add to daily mastery total</span>
            </div>
          </button>
        </div>

        {/* Study Block Form */}
        <form onSubmit={handleStudyLog} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-label-md font-label-md text-on-surface font-medium">Log Dedicated Focus Time</label>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low rounded-DEFAULT border border-outline-variant/40 text-on-surface text-body-md font-body-md focus:border-primary focus:outline-none"
              >
                <option value="Math 201">Calculus II (Math 201)</option>
                <option value="Phys 212">Physics Optics (Phys 212)</option>
                <option value="CS 180">Discrete Math (CS 180)</option>
                <option value="General Study">General Research</option>
              </select>

              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low rounded-DEFAULT border border-outline-variant/40 text-on-surface text-body-md font-body-md focus:border-primary focus:outline-none"
              >
                <option value="15">15 Minutes</option>
                <option value="25">25 Minutes (Pomodoro)</option>
                <option value="50">50 Minutes (Deep Block)</option>
                <option value="90">90 Minutes (Ultra Focus)</option>
              </select>
            </div>
          </div>

          {/* Quick Check Today's Habits */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-label-md font-label-md text-on-surface font-medium">
              Today's Quick Checklist
            </label>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {habits.slice(0, 4).map((h) => (
                <div
                  key={h.id}
                  onClick={() => onToggleHabit(h.id)}
                  className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low border border-outline-variant/20 hover:border-primary/40 cursor-pointer"
                >
                  <span className={`text-xs ${h.isTodayDone ? 'line-through text-outline' : 'text-on-surface'}`}>
                    {h.title}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      h.isTodayDone ? 'text-secondary' : 'text-outline'
                    }`}
                    data-icon={h.isTodayDone ? 'check_circle' : 'radio_button_unchecked'}
                  >
                    {h.isTodayDone ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-lg shadow-primary-container/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm" data-icon="save">
                save
              </span>
              Record Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
