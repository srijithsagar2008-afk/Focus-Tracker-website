import React, { useState } from 'react';
import { NavigationTab } from '../../types';

interface TopNavBarProps {
  isCollapsed: boolean;
  onOpenQuickLog: () => void;
  onToggleZenMode: () => void;
  onSelectCourse: (courseCode: string) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  isCollapsed,
  onOpenQuickLog,
  onToggleZenMode,
  onSelectCourse,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Calculus II Midterm in 3 days', time: '10m ago', unread: true },
    { id: 2, title: 'Habit Streak: 14 days clean sheet!', time: '1h ago', unread: true },
    { id: 3, title: 'Optics Lab Practical syllabus updated', time: 'Yesterday', unread: false },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header
      className={`sticky top-0 w-full z-30 bg-surface/85 backdrop-blur-md border-b border-outline-variant/30 pr-margin py-space-sm flex justify-between items-center transition-all duration-300 ${
        isCollapsed ? 'pl-24' : 'pl-72'
      }`}
    >
      {/* Left Section: Search Input Capsule */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <span
            className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]"
            data-icon="search"
          >
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search modules, syllabus blocks, notes..."
            className="w-full pl-10 pr-4 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/40 text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Center/Status Section: Critical Badges & Exam Countdown */}
      <div className="hidden lg:flex items-center gap-2">
        {/* Calculus II Countdown */}
        <button
          onClick={() => {
            onSelectCourse('Math 201');
            setActiveTab('syllabi');
          }}
          className="text-secondary font-label-md text-label-md px-3 py-1.5 rounded-full bg-secondary-container/20 border border-secondary-container/30 flex items-center gap-1.5 hover:brightness-110 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]" data-icon="alarm">
            alarm
          </span>
          <span>Calculus II (Midterm - 3d)</span>
        </button>

        {/* Physics Lab Tag */}
        <button
          onClick={() => {
            onSelectCourse('Phys 212');
            setActiveTab('syllabi');
          }}
          className="text-on-surface-variant font-label-md text-label-md px-3 py-1.5 rounded-full hover:bg-surface-container-high transition-colors flex items-center gap-1.5 border border-outline-variant/20 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]" data-icon="science">
            science
          </span>
          <span>Physics Lab (Final - 12d)</span>
        </button>

        {/* Streak Indicator */}
        <button
          onClick={() => setActiveTab('analytics')}
          className="text-on-surface-variant font-label-md text-label-md px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/30 flex items-center gap-1.5 hover:border-tertiary/40 transition-colors"
        >
          <span className="text-tertiary">🔥</span>
          <span className="text-on-surface font-semibold">14-Day Streak</span>
        </button>
      </div>

      {/* Right Trailing Actions & Icons */}
      <div className="flex items-center gap-2.5 relative">
        {/* Zen Mode Button */}
        <button
          onClick={onToggleZenMode}
          title="Distraction Free Zen Mode"
          className="px-3.5 py-1.5 rounded-full border border-outline-variant/40 font-label-md text-label-md text-on-surface hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px] text-primary" data-icon="filter_vintage">
            filter_vintage
          </span>
          <span>Zen Mode</span>
        </button>

        {/* Quick Log Primary Button */}
        <button
          onClick={onOpenQuickLog}
          className="px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 shadow-md shadow-primary-container/20"
        >
          <span className="material-symbols-outlined text-[16px]" data-icon="add">
            add
          </span>
          <span>Quick Log</span>
        </button>

        <div className="h-5 w-[1px] bg-outline-variant/30 mx-1" />

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors relative"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]" data-icon="notifications">
              notifications
            </span>
            {notifications.some((n) => n.unread) && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-surface animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 p-3 rounded-DEFAULT bg-surface-container border border-outline-variant/40 shadow-2xl z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-outline-variant/20">
                <span className="font-headline font-semibold text-sm text-on-surface">Notifications</span>
                <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                  Mark all read
                </button>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2 rounded-lg text-left transition-colors ${
                      n.unread ? 'bg-primary-container/10 border border-primary/20' : 'bg-surface-container-high/40'
                    }`}
                  >
                    <p className="text-xs font-semibold text-on-surface">{n.title}</p>
                    <span className="text-[10px] text-outline">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme indicator */}
        <button
          className="p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
          title="Theme (Nocturnal Dark Mode Active)"
          onClick={() => {}}
        >
          <span className="material-symbols-outlined text-[20px]" data-icon="dark_mode">
            dark_mode
          </span>
        </button>

        {/* Account Details */}
        <button
          onClick={() => setActiveTab('cockpit')}
          className="p-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors"
          title="Account: Alex Rivera (Lvl 14 Scholar)"
        >
          <span className="material-symbols-outlined text-[24px] text-primary" data-icon="account_circle">
            account_circle
          </span>
        </button>
      </div>
    </header>
  );
};
