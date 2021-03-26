import axios from '@apis/axios'
import { Schedule } from '@interfaces/schedule'
import { AxiosResponse } from 'axios'
import qs from 'query-string'

export const getTutorSchedule = async (tutorId: string, token: string) => {
  const result: AxiosResponse<Schedule[]> = !!token
    ? await axios.get(`/tutors/${tutorId}/schedule`, {
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
    : await axios.get(`/tutors/${tutorId}/openschedule`, {
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: token,
        },
      })

  return result.data
}

export const getMySchedule = async (token: string) => {
  const result: AxiosResponse<Schedule[]> = await axios.get(
    `/myschedule`,
    {
      // withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }
  )

  return result.data
}

export const checkScheduleAvailablility = async (tutorId: string, startDate: Date, endDate: Date, token: string) => {
  const queries: string = qs.stringify({ startDate: startDate.getTime(), endDate: endDate.getTime() })
  const result: AxiosResponse<boolean> = await axios.get(`/tutors/${tutorId}/schedule/check?${queries}`, {
      // withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }
  )

  return result.data
}