import { UserRole } from "./status";

export interface Schedule {
  userId?: string
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
  userId?: string
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