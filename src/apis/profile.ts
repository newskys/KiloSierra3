import axios from '@apis/axios'
import { Profile } from '@interfaces/profile'
import { Schedule, ScheduleRequest } from '@interfaces/schedule'
import { AxiosResponse } from 'axios'
import qs from 'query-string'

export const getMyProfile = async () => {
  const result: AxiosResponse<Profile> = await axios.get(`/my/profile`)

  return result.data
}
