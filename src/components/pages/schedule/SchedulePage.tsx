import axios from '@apis/axios'
import Layout from '@components/ui/Layout'
import { AppointmentModel } from '@devexpress/dx-react-scheduler'
import { Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import { userState, UserState } from '@recoil/user'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { useRecoilState } from 'recoil'
import { useHeader } from '@hooks/useHeader'
import SchedulerWrapper from './SchedulerWrapper'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: '98px',
    right: '32px',
  },
}))

interface MatchParams {
  tutorId: string
}

interface Schedule {
  startDate: Date
  endDate: Date
}

const SchedulePage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  useHeader(true, 'Ramona')
  const classes = useStyles()
  const [userStore, setUserStore] = useRecoilState<UserState>(userState)
  const [schedules, setSchedules] = useState<Schedule[]>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  const getSchedule = async (tutorId: string) => {
    try {
      const result: Schedule[] = await getTutorSchedule('umlaut')
      setSchedules(result)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }


  useEffect(() => {
    getSchedule(match.params.tutorId)
  }, [])

  const getTutorSchedule = async (tutorId: string) => {
    const result: AxiosResponse<Schedule[]> = await axios.get(
      `/tutors/${tutorId}/schedule`,
      {
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: userStore.token,
        },
      }
    )

    return result.data
  }

  const schedulesVO: AppointmentModel[] = schedules?.map((schedule, index) => {
    return {
      startDate: new Date(schedule.startDate),
      endDate: new Date(schedule.endDate),
    }
  })

  return (
    <Layout>
      {!isLoading && (
        <>
          <SchedulerWrapper schedule={schedulesVO} />
          <Fab
            className={classes.fab}
            variant="extended"
            color="primary"
            aria-label="add">
            <AddIcon />
            Add Schedule
          </Fab>
        </>
      )}
    </Layout>
  )
}

export default SchedulePage
