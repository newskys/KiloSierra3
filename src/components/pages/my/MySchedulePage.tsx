import { getMySchedule } from '@apis/schedule'
import { ADD_SCHEDULE } from '@common/routePath'
import SchedulerWrapper from '@components/common/SchedulerWrapper'
import Layout from '@components/ui/Layout'
import { AppointmentModel } from '@devexpress/dx-react-scheduler'
import { useHeader } from '@hooks/useHeader'
import { useLogin } from '@hooks/useLogin'
import { HeaderType } from '@interfaces/header'
import { Schedule, ScheduleRequest } from '@interfaces/schedule'
import { Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import React, { MouseEvent, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { History, useHistory } from 'react-router-dom'

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

const MySchedulePage: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  useHeader(true, HeaderType.MY_SCHEDULE, 'My Schedule')
  const classes = useStyles()
  const history: History = useHistory()
  const [isLogin] = useLogin()
  const [schedules, setSchedules] = useState<Schedule[]>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [initModalSchedule, setInitModalSchedule] = useState<ScheduleRequest>(null)

  const getSchedule = async (tutorId: string) => {
    try {
      const result: Schedule[] = await getMySchedule()
      setSchedules(result)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  const handleClickSchedule = (e, date: Date) => {
    console.log('sc')
    if (date.getTime() < new Date().getTime()) {
      return
    }

    const schedule: ScheduleRequest = {
      startDate: date.getTime(),
      endDate: null,
      level: null,
      phone: null,
      place: null,
    }

    setInitModalSchedule(schedule)
    setModalOpen(true)
  }

  useEffect(() => {
    // getTutorSchedule(match.params.tutorId)
    getSchedule(match.params.tutorId)
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

  return (
    <Layout>
      {!isLoading && (
        <>
          <SchedulerWrapper schedule={schedulesVO} onClickSchedule={handleClickSchedule} />
        </>
      )}
    </Layout>
  )
}

export default MySchedulePage
