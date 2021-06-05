import axios from '@apis/axios'
import { Schedule, ScheduleCancelRequest, ScheduleRequest } from '@interfaces/schedule'
import { AxiosResponse } from 'axios'
import qs from 'query-string'

export const getTutorSchedule = async (tutorId: string) => {
  const result: AxiosResponse<Schedule[]> = !!window.__token
    ? await axios.get(`/tutors/${tutorId}/schedule`)
    : await axios.get(`/tutors/${tutorId}/openschedule`)

  return result.data
}

export const getMySchedule = async () => {
  const result: AxiosResponse<Schedule[]> = await axios.get(`/my/schedule`)

  return result.data
}

export const checkScheduleAvailablility = async (
  tutorId: string,
  startDate: Date,
  endDate: Date
) => {
  const queries: string = qs.stringify({
    startDate: startDate.getTime(),
    endDate: endDate.getTime(),
  })
  const result: AxiosResponse<boolean> = await axios.get(
    `/tutors/${tutorId}/schedule/check?${queries}`
  )

  return result.data
}

export const putRequestSchedule = async (
  tutorId: string,
  request: ScheduleRequest
) => {
  const result: AxiosResponse<boolean> = await axios.put(
    `/tutors/${tutorId}/schedule`,
    { ...request }
  )

  return result.data
}

export const putSchedule = async (
  tutorId: string,
  userId: string,
  startDate: number,
) => {
  const queries: string = qs.stringify({
    tutorId, userId, startDate,
  })
  const result: AxiosResponse<boolean> = await axios.put(
    `/my/schedule`, 
    { tutorId, userId, startDate }
  )

  return result.data
}

export const deleteSchedule = async (
  tutorId: string,
  request: ScheduleCancelRequest
) => {
  const queries: string = qs.stringify({
    ...request,
  })
  const result: AxiosResponse<boolean> = await axios.delete(
    `/tutors/${tutorId}/schedule?${queries}`,
  )

  return result.data
}
