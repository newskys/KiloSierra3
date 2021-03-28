export interface Schedule {
  startDate: Date
  endDate: Date
  title?: string
  place?: string
  isMine?: boolean
}

export interface ScheduleRequest {
  startDate: number
  endDate: number
  place: string
  level: number
  phone: string
  request?: string
}
