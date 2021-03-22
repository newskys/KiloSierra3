export interface Schedule {
  startDate: Date
  endDate: Date
  title?: string
  place?: string
  isMine?: boolean
}

export interface ScheduleRequest {
  startDate: Date
  endDate: Date
  title: string
  place: string
  level: string
  phone: string
  
}