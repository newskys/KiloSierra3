import axios from '@apis/axios'
import { Schedule } from '@interfaces/schedule'
import { AxiosResponse } from 'axios'

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
