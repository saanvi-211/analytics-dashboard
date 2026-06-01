export interface User {
  id: number;
  email: string;
  full_name: string;
  role: "admin" | "analyst" | "viewer";
}

export interface KPI {
  id: number;
  metric_name: string;
  value: number;
  dimension?: string;
  recorded_at: string;
}

export interface TimeseriesPoint {
  date: string;
  value: number;
}
