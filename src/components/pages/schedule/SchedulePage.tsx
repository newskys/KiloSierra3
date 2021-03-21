import { getTutorSchedule } from '@apis/schedule'
import { ADD_SCHEDULE } from '@common/routePath'
import Layout from '@components/ui/Layout'
import { AppointmentModel } from '@devexpress/dx-react-scheduler'
import { useHeader } from '@hooks/useHeader'
import { useLogin } from '@hooks/useLogin'
import { HeaderType } from '@interfaces/header'
import { Schedule } from '@interfaces/schedule'
import { Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import React, { useEffect, useState, MouseEvent } from 'react'
import { RouteComponentProps } from 'react-router'
import { History, useHistory } from 'react-router-dom'
import BookingModal from '../booking/BookingModal'
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

const SchedulePage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  const tutorId: string = match.params.tutorId
  useHeader(true, HeaderType.TUTOR, 'Ramona')
  const [isLogin, token] = useLogin()
  const classes = useStyles()
  const history: History = useHistory()
  const [schedules, setSchedules] = useState<Schedule[]>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  const getSchedule = async (tutorId: string) => {
    try {
      const result: Schedule[] = await getTutorSchedule('umlaut', token)
      setSchedules(result)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  useEffect(() => {
    getSchedule(tutorId)
  }, [])

  const schedulesVO: AppointmentModel[] = schedules?.map((schedule, index) => {
    return {
      startDate: new Date(schedule.startDate),
      endDate: new Date(schedule.endDate),
      title: schedule.title,
      place: schedule.place,
      isMine: schedule.isMine,
    }
  })

  const onClickAddSchedule = (e: MouseEvent) => {
    e.preventDefault()
    history.push(`/${tutorId}/schedule/add`)
  }

  return (
    <Layout>
      {!isLoading && (
        <>
          <BookingModal />
          <SchedulerWrapper schedule={schedulesVO} />
          <Fab
            className={classes.fab}
            variant="extended"
            color="primary"
            onClick={(e) => onClickAddSchedule(e)}
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
