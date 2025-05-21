import { ProjectSchedule, Schedule } from '../types';

export const isTimeOverlap = (
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean => {
  return startA < endB && startB < endA;
};

export const isOverlapping = (
  newSchedule: Schedule,
  existingProjects: ProjectSchedule[]
): boolean => {

  if (newSchedule.type === 'none' && existingProjects.length > 0) {
    return true;
  }

  return existingProjects.some(({ schedule: existing }) => {
    if (existing.type === 'none') return true;

    if (!existing.timeRange || !newSchedule.timeRange) return false;

    const timesOverlap = isTimeOverlap(
      existing.timeRange.start,
      existing.timeRange.end,
      newSchedule.timeRange.start,
      newSchedule.timeRange.end
    );

    if (!timesOverlap) return false;

    if (existing.type === 'daily' || newSchedule.type === 'daily') {
      return true;
    }

    if (existing.type === 'specificDays' && newSchedule.type === 'specificDays') {
      return existing.daysOfWeek?.some(day =>
        newSchedule.daysOfWeek?.includes(day)
      ) ?? false;
    }

    return false;
  });
};
