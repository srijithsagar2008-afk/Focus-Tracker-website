import React, { useState } from 'react';
import { COURSES } from '../../data/mockData';

interface CourseSyllabiScreenProps {
  onLaunchFocusBlock: (title: string) => void;
  selectedCourseCode?: string;
}

export const CourseSyllabiScreen: React.FC<CourseSyllabiScreenProps> = ({
  onLaunchFocusBlock,
  selectedCourseCode,
}) => {
  const [activeCourseId, setActiveCourseId] = useState<string>(
    selectedCourseCode
      ? COURSES.find((c) => c.code.toLowerCase().includes(selectedCourseCode.toLowerCase()))?.id || COURSES[0].id
      : COURSES[0].id
  );

  const activeCourse = COURSES.find((c) => c.id === activeCourseId) || COURSES[0];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-label-sm font-label-sm px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary border border-primary/30 uppercase font-semibold">
              Academic Curriculum
            </span>
            <span className="text-label-sm font-label-sm text-outline">Fall Term 2024 / Spring 2026</span>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight font-bold">
            Course Syllabi &amp; Milestone Roadmap
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant mt-0.5">
            Directly bridge syllabus objectives into targeted deep work pomodoro blocks.
          </p>
        </div>
      </div>

      {/* Course Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {COURSES.map((course) => {
          const isSelected = course.id === activeCourseId;
          return (
            <div
              key={course.id}
              onClick={() => setActiveCourseId(course.id)}
              className={`p-space-md rounded-DEFAULT border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-surface-container border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/30'
                  : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant/60'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary border border-primary/30 font-label-sm text-label-sm font-semibold">
                  {course.code}
                </span>
                <span className="text-label-sm font-label-sm text-secondary bg-secondary-container/20 px-2 py-0.5 rounded-full border border-secondary/30 font-semibold">
                  {course.examCountdownDays}d to Exam
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold line-clamp-1">
                {course.name}
              </h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">{course.instructor}</p>

              <div className="mt-4 pt-3 border-t border-outline-variant/20">
                <div className="flex justify-between text-label-sm font-label-sm mb-1.5">
                  <span className="text-outline">Term Progress</span>
                  <span className="text-on-surface font-semibold">{course.termProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${course.termProgress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Course Modules Breakdown */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Modules List (8 cols) */}
        <div className="col-span-12 lg:col-span-8 p-space-lg rounded-DEFAULT bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div>
              <span className="text-label-sm font-label-sm text-primary font-semibold uppercase">
                Active Curriculum Breakdown
              </span>
              <h2 className="text-headline-sm font-headline-sm text-on-surface font-bold mt-0.5">
                {activeCourse.name}
              </h2>
            </div>
            <span className="text-body-sm font-body-sm text-on-surface-variant">
              {activeCourse.modules.length} Core Modules
            </span>
          </div>

          <div className="space-y-3">
            {activeCourse.modules.map((mod, idx) => (
              <div
                key={mod.id}
                className="p-space-md rounded-DEFAULT bg-surface-container border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface-variant font-label-sm font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-label-lg text-label-lg font-semibold text-on-surface">{mod.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`text-label-sm font-label-sm px-2 py-0.2 rounded-full border font-semibold ${
                          mod.status === 'Mastered'
                            ? 'bg-secondary-container/20 text-secondary border-secondary/30'
                            : mod.status === 'In Review'
                            ? 'bg-primary-container/20 text-primary border-primary/30'
                            : 'bg-surface-variant text-on-surface-variant border-outline-variant/30'
                        }`}
                      >
                        {mod.status}
                      </span>
                      {mod.hoursRemaining > 0 && (
                        <span className="text-body-sm font-body-sm text-outline">
                          {mod.hoursRemaining} hrs prep recommended
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onLaunchFocusBlock(`${activeCourse.code}: ${mod.title}`)}
                  className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary-container/20 flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span className="material-symbols-outlined text-[16px]" data-icon="timer">
                    timer
                  </span>
                  Launch Block
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Detail Card (4 cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <div className="p-space-lg rounded-DEFAULT bg-surface-container border border-primary/30 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping" />
              <span className="font-label-sm font-label-sm text-error uppercase font-semibold">
                High Priority Milestone
              </span>
            </div>
            <div>
              <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface">
                {activeCourse.examTitle}
              </h3>
              <p className="text-body-sm font-body-sm text-outline mt-1">{activeCourse.location}</p>
            </div>

            <div className="p-3 rounded-DEFAULT bg-surface-container-high/60 border border-outline-variant/20 flex items-center justify-between">
              <div>
                <div className="text-label-sm font-label-sm text-outline">EXAM COUNTDOWN</div>
                <div className="text-display-mobile font-display-mobile text-error font-extrabold">
                  {activeCourse.examCountdownDays} Days
                </div>
              </div>
              <span className="material-symbols-outlined text-outline text-[32px]" data-icon="event_available">
                event_available
              </span>
            </div>

            <button
              onClick={() => onLaunchFocusBlock(`Exam Sprint: ${activeCourse.examTitle}`)}
              className="w-full py-3 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/25 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined" data-icon="bolt">
                bolt
              </span>
              Start Midterm Sprint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
