import { ProjectSchedule, Schedule } from '../types';

const isNowInSchedule = (schedule: Schedule): boolean => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const currentDay = now.getDay();

  if (schedule.type === 'none') {
    return true;
  }

  if (schedule.timeRange) {
    const [startHour, startMinute] = schedule.timeRange.start.split(':').map(Number);
    const [endHour, endMinute] = schedule.timeRange.end.split(':').map(Number);
    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;

    const inTimeRange = currentTime >= start && currentTime <= end;

    if (schedule.type === 'daily') {
      return inTimeRange;
    }

    if (schedule.type === 'specificDays') {
        const correctDay = schedule.daysOfWeek?.includes(currentDay) ?? false;
        return inTimeRange && correctDay;
    }
  }

  return false;
};

export const getCurrentlyPlayingProject = (projects: ProjectSchedule[]): ProjectSchedule | null => {
  return projects.find((p) => isNowInSchedule(p.schedule)) || null;
};
