import { getMySchedule } from '@apis/schedule'
import { ADD_SCHEDULE, TUTORS } from '@common/routePath'
import SchedulerWrapper from '@components/common/SchedulerWrapper'
import Layout from '@components/ui/Layout'
import { AppointmentModel } from '@devexpress/dx-react-scheduler'
import { useHeader } from '@hooks/useHeader'
import { useLogin } from '@hooks/useLogin'
import { HeaderType } from '@interfaces/header'
import { Schedule, ScheduleRequest } from '@interfaces/schedule'
import { ScheduleModalMode } from '@interfaces/status'
import { Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import React, { MouseEvent, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { History, useHistory } from 'react-router-dom'
import BookingModal from '../booking/BookingModal'
import CheckingModal from '../booking/CheckingModal'

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

  useEffect(() => {
    if (isModalOpen) {
      setModalVisible(true)
    } else {
      window.setTimeout(() => {
        setModalVisible(false)
      }, 500)
    }
  }, [isModalOpen])

  useEffect(() => {
    getSchedule(match.params.tutorId)

    if (!isLogin) {
      history.push(TUTORS)
    }
  }, [])

  const getSchedule = async (tutorId: string) => {
    try {
      const result: Schedule[] = await getMySchedule()
      setSchedules(result)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  const handleClickSchedule = (e, scheduleRequest: ScheduleRequest) => {
    console.log('sc', scheduleRequest)
    if (scheduleRequest.startDate < new Date().getTime()) {
      return
    }

    // const schedule: ScheduleRequest = {
    //   startDate: scheduleRequest.startDate,
    //   endDate: null,
    //   level: null,
    //   phone: null,
    //   place: null,
    // }

    setInitModalSchedule(scheduleRequest)
    setModalOpen(true)
  }

  const schedulesVO: AppointmentModel[] = schedules?.map((schedule, index) => {
    return {
      startDate: new Date(schedule.startDate),
      endDate: new Date(schedule.endDate),
      title: schedule.title,
      place: schedule.place,
      isMine: schedule.isMine,
      level: schedule.level,
      request: schedule.request,
      phone: schedule.phone,
    }
  })

  return (
    <Layout>
      {!isLoading && (
        <>
        {isModalVisible && <CheckingModal tutorId={'umlaut'} isOpen={isModalOpen} setOpen={setModalOpen} mode={ScheduleModalMode.REQUEST} initSchedule={initModalSchedule} />}
          <SchedulerWrapper schedule={schedulesVO} onClickSchedule={handleClickSchedule} />
        </>
      )}
    </Layout>
  )
}

export default MySchedulePage
