import React from 'react';
import { NavigationTab } from '../../types';

interface SideNavBarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onStartFocus: () => void;
  onOpenSettings: () => void;
  isTimerRunning: boolean;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  onStartFocus,
  onOpenSettings,
  isTimerRunning,
}) => {
  const navItems: { id: NavigationTab; label: string; icon: string }[] = [
    { id: 'cockpit', label: 'Cockpit', icon: 'dashboard' },
    { id: 'habits', label: 'Habit Matrix', icon: 'calendar_view_week' },
    { id: 'timer', label: 'Focus Timer', icon: 'timer' },
    { id: 'analytics', label: 'Analytics', icon: 'monitoring' },
    { id: 'syllabi', label: 'Course Syllabi', icon: 'menu_book' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen transition-all duration-300 z-40 bg-surface-container-low border-r border-outline-variant/30 flex flex-col justify-between shrink-0 p-margin ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col gap-space-lg">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-1 cursor-pointer" onClick={() => setActiveTab('cockpit')}>
          <div className="w-10 h-10 rounded-full bg-primary-container/20 border border-primary/40 flex items-center justify-center text-primary shadow-sm shrink-0">
            <span className="material-symbols-outlined" data-icon="terminal">
              terminal
            </span>
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h1 className="text-headline-md font-headline-md text-primary tracking-tight font-bold leading-none">
                FocusTrack
              </h1>
              <p className="text-body-sm font-body-sm text-on-surface-variant leading-none mt-1">
                Deep Work Cockpit
              </p>
            </div>
          )}
        </div>

        {/* Student Profile Pill Card */}
        {!isCollapsed ? (
          <div className="p-3 rounded-DEFAULT bg-surface-container border border-outline-variant/20 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-primary/30 shrink-0 bg-surface-bright">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkqx_ifLlm19GP1mfFM7B4xDvj5FB5KUhHla9IITDSwcwW7C_pvmDsXUBsnkUT9BvAzNc4TON2Ri78oUsa15SSVOgYKZOKoSGwIo_XzIdnjUOWh5vxmO_XfR9gyAzLaSNuAfrXp6gGllg5XN_Ou42pnRUDUGKiPt17fsn8jp8nhe-6YdygL5-IjMtzbjn2VI3ePIHsVjQSc49LyJPUiM2Sh50cvK-rPXN_paTnyUfduFgfHj2mYPcU2w"
                alt="Alex Rivera Portrait"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-label-md font-label-md text-on-surface truncate font-semibold">Alex Rivera</p>
              <span className="text-label-sm font-label-sm text-secondary bg-secondary-container/20 px-2 py-0.5 rounded-full border border-secondary/30 inline-block mt-0.5">
                Lvl 14 Scholar
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/30 bg-surface-bright">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkqx_ifLlm19GP1mfFM7B4xDvj5FB5KUhHla9IITDSwcwW7C_pvmDsXUBsnkUT9BvAzNc4TON2Ri78oUsa15SSVOgYKZOKoSGwIo_XzIdnjUOWh5vxmO_XfR9gyAzLaSNuAfrXp6gGllg5XN_Ou42pnRUDUGKiPt17fsn8jp8nhe-6YdygL5-IjMtzbjn2VI3ePIHsVjQSc49LyJPUiM2Sh50cvK-rPXN_paTnyUfduFgfHj2mYPcU2w"
                alt="Alex Rivera"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {/* Primary CTA: Start Focus Session */}
        <button
          onClick={onStartFocus}
          title="Start Focus Session"
          className={`w-full py-3 px-4 rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_12px_32px_-6px_rgba(91,77,255,0.35)] ${
            isCollapsed ? 'px-0' : ''
          }`}
        >
          <span className="material-symbols-outlined" data-icon="play_arrow">
            play_arrow
          </span>
          {!isCollapsed && <span className="whitespace-nowrap">Start Focus Session</span>}
        </button>

        {/* Navigation Tabs */}
        <nav aria-label="Main Navigation" className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={item.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-full text-left font-label-md text-label-md transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-container/20 text-primary border border-primary/30 shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
              >
                <span className="material-symbols-outlined text-[20px]" data-icon={item.icon}>
                  {item.icon}
                </span>
                {!isCollapsed && <span className="truncate">{item.label}</span>}
                {!isCollapsed && item.id === 'timer' && isTimerRunning && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-secondary animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="flex flex-col gap-1 pt-4 border-t border-outline-variant/30">
        <button
          onClick={onOpenSettings}
          title="Settings"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface transition-colors ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
        >
          <span className="material-symbols-outlined" data-icon="settings">
            settings
          </span>
          {!isCollapsed && <span>Settings</span>}
        </button>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand View' : 'Collapse View'}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface transition-colors ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
        >
          <span className="material-symbols-outlined" data-icon="side_navigation">
            side_navigation
          </span>
          {!isCollapsed && <span>{isCollapsed ? 'Expand View' : 'Collapse View'}</span>}
        </button>
      </div>
    </aside>
  );
};
