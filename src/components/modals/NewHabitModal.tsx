import React, { useState } from 'react';
import { HabitItem } from '../../types';

interface NewHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHabit: (habit: Omit<HabitItem, 'id' | 'completedDays' | 'wtdPercentage' | 'completedLogged' | 'streakDays'>) => void;
}

export const NewHabitModal: React.FC<NewHabitModalProps> = ({ isOpen, onClose, onAddHabit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'study' | 'health' | 'morning'>('study');
  const [flightWindow, setFlightWindow] = useState('Afternoon');
  const [atomicTrigger, setAtomicTrigger] = useState('');
  const [cadence, setCadence] = useState<'7days' | 'weekdays' | 'custom'>('7days');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !atomicTrigger.trim()) return;

    onAddHabit({
      title: title.trim(),
      tag: category === 'study' ? 'Deep Work' : category === 'health' ? 'Health' : 'Routine',
      category,
      timeOfDay: flightWindow,
      scheduledTime: flightWindow === 'Morning' ? '08:00 AM' : flightWindow === 'Afternoon' ? '03:00 PM' : '09:00 PM',
      atomicTrigger: atomicTrigger.trim(),
      isTodayDone: false,
    });

    // Reset & close
    setTitle('');
    setAtomicTrigger('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container rounded-DEFAULT border border-outline-variant/40 w-full max-w-lg p-space-lg shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
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
            <span className="material-symbols-outlined text-xs" data-icon="tune">
              tune
            </span>
            Atomic Habit Engine
          </div>
          <h3 className="text-headline-md font-headline-md text-on-surface font-bold">Deploy New Study Habit</h3>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Configure clear triggers to bind actions to existing behavioral anchors.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Habit Name */}
          <div className="space-y-1.5">
            <label className="block text-label-md font-label-md text-on-surface font-medium">
              Habit Title &amp; Target Duration
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Physics Proof Reviews (45 min)"
              required
              className="w-full px-4 py-2.5 bg-surface-container-low rounded-DEFAULT border border-outline-variant/40 text-on-surface placeholder:text-outline text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
            />
          </div>

          {/* Category & Time of Day */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-label-md font-label-md text-on-surface font-medium">Domain Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'study' | 'health' | 'morning')}
                className="w-full px-3 py-2.5 bg-surface-container-low rounded-DEFAULT border border-outline-variant/40 text-on-surface text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="study">Study Protocol</option>
                <option value="health">Health &amp; Mindset</option>
                <option value="morning">Morning Routines</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-label-md font-label-md text-on-surface font-medium">Flight Window</label>
              <select
                value={flightWindow}
                onChange={(e) => setFlightWindow(e.target.value)}
                className="w-full px-3 py-2.5 bg-surface-container-low rounded-DEFAULT border border-outline-variant/40 text-on-surface text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Night Study">Night Study</option>
                <option value="All Day">All Day</option>
              </select>
            </div>
          </div>

          {/* Atomic Stacking Trigger Formula */}
          <div className="space-y-1.5">
            <label className="block text-label-md font-label-md text-primary flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-sm" data-icon="link">
                link
              </span>
              Atomic Anchor Trigger (When [Anchor], I will [Habit])
            </label>
            <input
              type="text"
              value={atomicTrigger}
              onChange={(e) => setAtomicTrigger(e.target.value)}
              placeholder="e.g. After opening lecture PDF, immediately summarize theorems in LaTeX"
              required
              className="w-full px-4 py-2.5 bg-surface-container-low rounded-DEFAULT border border-outline-variant/40 text-on-surface placeholder:text-outline text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
            />
          </div>

          {/* Cadence Select */}
          <div className="space-y-1.5">
            <label className="block text-label-md font-label-md text-on-surface font-medium">Weekly Cadence</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCadence('7days')}
                className={`py-2 text-center rounded-DEFAULT font-label-md text-label-md font-medium transition-all ${
                  cadence === '7days'
                    ? 'border border-primary bg-primary/10 text-primary'
                    : 'border border-outline-variant/40 bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                7 Days / Week
              </button>
              <button
                type="button"
                onClick={() => setCadence('weekdays')}
                className={`py-2 text-center rounded-DEFAULT font-label-md text-label-md font-medium transition-all ${
                  cadence === 'weekdays'
                    ? 'border border-primary bg-primary/10 text-primary'
                    : 'border border-outline-variant/40 bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                Weekdays (5d)
              </button>
              <button
                type="button"
                onClick={() => setCadence('custom')}
                className={`py-2 text-center rounded-DEFAULT font-label-md text-label-md font-medium transition-all ${
                  cadence === 'custom'
                    ? 'border border-primary bg-primary/10 text-primary'
                    : 'border border-outline-variant/40 bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                Custom (3-4d)
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-lg shadow-primary-container/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm" data-icon="check_circle">
                check_circle
              </span>
              Lock into Matrix
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
