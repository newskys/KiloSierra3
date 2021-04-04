import axios from '@apis/axios'
import { Tutor } from '@interfaces/tutor'
import { Schedule, ScheduleRequest } from '@interfaces/schedule'
import { AxiosResponse } from 'axios'
import qs from 'query-string'

export const getTutors = async () => {
  console.log('test')
  try {
  const result: AxiosResponse<Tutor[]> = await axios.options(`/my`)
  // const result: AxiosResponse<any> = await axios.get(`https://hu5mcclx4l.execute-api.ap-northeast-2.amazonaws.com/prod/tutors`)

  // return result.data
  } catch (e) {
    console.error(e)
  }
  return [{
    "urlpath": "ramona",
    "nickname": "Ramona",
    "career": "독일어 Master",
    "image": "https://picsum.photos/100"
}]
}
