import React, { useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pomodoroMinutes: number;
  onUpdatePomodoroMinutes: (mins: number) => void;
  studentName: string;
  onUpdateStudentName: (name: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  pomodoroMinutes,
  onUpdatePomodoroMinutes,
  studentName,
  onUpdateStudentName,
}) => {
  const [name, setName] = useState(studentName);
  const [pomoMin, setPomoMin] = useState(pomodoroMinutes);
  const [shortBreak, setShortBreak] = useState(5);
  const [deepBlock, setDeepBlock] = useState(50);
  const [soundFeedback, setSoundFeedback] = useState(true);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStudentName(name);
    onUpdatePomodoroMinutes(pomoMin);
    onClose();
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
            <span className="material-symbols-outlined text-xs" data-icon="settings">
              settings
            </span>
            Preferences &amp; Engine
          </div>
          <h3 className="text-headline-md font-headline-md text-on-surface font-bold">Cockpit Settings</h3>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Customize focus chamber cadences, scholar profile, and strict shield parameters.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-label-md font-label-md text-on-surface font-medium">Scholar Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-surface-container-low rounded-DEFAULT border border-outline-variant/40 text-on-surface text-body-md font-body-md focus:border-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="block text-label-md font-label-md text-on-surface font-medium">Pomodoro (min)</label>
              <input
                type="number"
                min="10"
                max="60"
                value={pomoMin}
                onChange={(e) => setPomoMin(Number(e.target.value))}
                className="w-full px-3 py-2 bg-surface-container-low rounded-DEFAULT border border-outline-variant/40 text-on-surface text-body-md font-body-md focus:border-primary focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-label-md font-label-md text-on-surface font-medium">Short Break (min)</label>
              <input
                type="number"
                min="1"
                max="15"
                value={shortBreak}
                onChange={(e) => setShortBreak(Number(e.target.value))}
                className="w-full px-3 py-2 bg-surface-container-low rounded-DEFAULT border border-outline-variant/40 text-on-surface text-body-md font-body-md focus:border-primary focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-label-md font-label-md text-on-surface font-medium">Deep Block (min)</label>
              <input
                type="number"
                min="30"
                max="120"
                value={deepBlock}
                onChange={(e) => setDeepBlock(Number(e.target.value))}
                className="w-full px-3 py-2 bg-surface-container-low rounded-DEFAULT border border-outline-variant/40 text-on-surface text-body-md font-body-md focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center justify-between p-3 rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 cursor-pointer">
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">Soundscape Telemetry Feedback</p>
                <p className="text-body-sm font-body-sm text-outline">Enable Web Audio synthesizer for ambient mixers</p>
              </div>
              <input
                type="checkbox"
                checked={soundFeedback}
                onChange={(e) => setSoundFeedback(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
            </label>
          </div>

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
              <span className="material-symbols-outlined text-sm" data-icon="save">
                save
              </span>
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
