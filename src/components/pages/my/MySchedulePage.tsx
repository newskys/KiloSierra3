import { getMySchedule } from '@apis/schedule'
import { ADD_SCHEDULE, TUTORS } from '@common/routePath'
import SchedulerWrapper from '@components/common/SchedulerWrapper'
import Layout from '@components/ui/Layout'
import { AppointmentModel } from '@devexpress/dx-react-scheduler'
import { useHeader } from '@hooks/useHeader'
import { useLogin } from '@hooks/useLogin'
import { HeaderType } from '@interfaces/header'
import { Schedule, ScheduleRequest } from '@interfaces/schedule'
import { ScheduleMode, ScheduleStatus, UserRole } from '@interfaces/status'
import { Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import { getUserRole, userState } from '@recoil/user'
import React, { MouseEvent, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { History, useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
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
  const [user, setUserState] = useRecoilState(userState)
  const userRole: UserRole = useRecoilValue(getUserRole)
  const [schedules, setSchedules] = useState<Schedule[]>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [initModalSchedule, setInitModalSchedule] = useState<ScheduleRequest>(null)
  const [scheduleMode, setScheduleMode] = useState<ScheduleMode>(ScheduleMode.REQUEST)

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
    getSchedule()

    if (!isLogin) {
      history.push(TUTORS)
    }
  }, [])

  const getSchedule = async () => {
    try {
      const result: Schedule[] = await getMySchedule()
      setSchedules(result)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  const handleClickSchedule = (e, appointmentModel: AppointmentModel) => {
    console.log('ap', appointmentModel)

    const scheduleRequest: ScheduleRequest = {
      userId: appointmentModel.userId,
      startDate: new Date(appointmentModel.startDate).getTime(),
      endDate: new Date(appointmentModel.endDate).getTime(),
      level: appointmentModel.level,
      phone: appointmentModel.phone,
      place: appointmentModel.place,
      request: appointmentModel.request,
      status: appointmentModel.status,
      tutorId: appointmentModel.tutorId,
    }

    setInitModalSchedule(scheduleRequest)
    if (scheduleRequest.tutorId !== user.userId || scheduleRequest.status === ScheduleStatus.CONFIRMED) {
      setScheduleMode(ScheduleMode.EDIT)
    } else {
      setScheduleMode(ScheduleMode.REQUEST)
    }
    setModalOpen(true)
  }

  const schedulesVO: AppointmentModel[] = schedules?.map((schedule, index) => {
    return {
      userId: schedule.userId,
      startDate: new Date(schedule.startDate),
      endDate: new Date(schedule.endDate),
      title: schedule.title,
      place: schedule.place,
      isMine: schedule.isMine,
      level: schedule.level,
      request: schedule.request,
      phone: schedule.phone,
      status: schedule.isConfirmed ? ScheduleStatus.CONFIRMED : ScheduleStatus.REQUEST,
      tutorId: schedule.tutorId,
    }
  })

  return (
    <Layout>
      {!isLoading && (
        <>
        {isModalVisible && <CheckingModal tutorId={'umlaut'} isOpen={isModalOpen} setOpen={setModalOpen} mode={scheduleMode} initSchedule={initModalSchedule} />}
          <SchedulerWrapper schedule={schedulesVO} mode={scheduleMode} onClickSchedule={handleClickSchedule} />
        </>
      )}
    </Layout>
  )
}

export default MySchedulePage
