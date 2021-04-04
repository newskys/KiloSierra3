import axios from '@apis/axios'
import { Tutor } from '@interfaces/tutor'
import { Schedule, ScheduleRequest } from '@interfaces/schedule'
import { AxiosResponse } from 'axios'
import qs from 'query-string'

export const getTutors = async () => {
  const result: AxiosResponse<Tutor[]> = await axios.get(`/tutors`)
  
  return result.data
}
