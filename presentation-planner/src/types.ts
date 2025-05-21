export type ScheduleType = 'none' | 'daily' | 'specificDays';

export interface TimeRange {
  start: string; 
  end: string;
}

export interface Schedule {
  type: ScheduleType;
  timeRange?: TimeRange;
  daysOfWeek?: number[]; // 0 = nedeľa, 1 = pondelok, ..., 6 = sobota
}

export interface ProjectSchedule {
  projectId: string;
  name: string;
  schedule: Schedule;
}
