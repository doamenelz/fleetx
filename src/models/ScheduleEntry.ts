export interface ScheduleEntry {
  id: string;
  name: string;
  date: string;
  status: string;
  type: string;
  data: any;
}

export enum SCHEDULE_TYPES {
  RENEWAL = "renewals",
  INSPECTION = "inspection",
  SERVICE = "service",
}
