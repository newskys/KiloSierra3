import { UserRole } from "./status";

export interface Schedule {
  startDate: Date
  endDate: Date
  title?: string
  place?: string
  isMine?: boolean
  level?: number
  phone?: string
  request?: string
}

export interface ScheduleRequest {
  startDate: number
  endDate: number
  place: string
  level: number
  phone: string
  request?: string
}

export interface ScheduleCancelRequest {
  startDate: number
}