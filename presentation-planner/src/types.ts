export type ScheduleType = 'none' | 'daily' | 'specificDays';

export interface TimeRange {
  start: string; 
  end: string;
}

export interface Schedule {
  type: ScheduleType;
  timeRange?: TimeRange;
  daysOfWeek?: number[];
}

export interface ProjectSchedule {
  projectId: string;
  name: string;
  schedule: Schedule;
}
