import { getTutorSchedule } from '@apis/schedule'
import { ADD_SCHEDULE } from '@common/routePath'
import Layout from '@components/ui/Layout'
import { AppointmentModel } from '@devexpress/dx-react-scheduler'
import { useHeader } from '@hooks/useHeader'
import { useLogin } from '@hooks/useLogin'
import { HeaderType } from '@interfaces/header'
import { Schedule, ScheduleRequest } from '@interfaces/schedule'
import { Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import React, { useEffect, useState, MouseEvent } from 'react'
import { RouteComponentProps } from 'react-router'
import { History, useHistory } from 'react-router-dom'
import BookingModal from '../booking/BookingModal'
import SchedulerWrapper from '../../common/SchedulerWrapper'
import { ScheduleMode } from '@interfaces/status'
import CheckingModal from '../booking/CheckingModal'
import { useRecoilState } from 'recoil'
import { TutorState, tutorState } from '@recoil/tutor'
import { getTutor } from '@apis/tutor'
import { Tutor } from '@interfaces/tutor'

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
  const urlpath: string = match.params.tutorId
  useHeader(true, HeaderType.TUTOR, 'Ramona')
  const classes = useStyles()
  const history: History = useHistory()
  const [tutor, setTutorState] = useRecoilState(tutorState)
  const [schedules, setSchedules] = useState<Schedule[]>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [isCheckingModalOpen, setCheckingModalOpen] = useState<boolean>(false)
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [initModalDateTime, setInitModalDateTime] = useState<Date>(null)

  const getSchedule = async (tutorId: string) => {
    try {
      const result: Schedule[] = await getTutorSchedule(tutorId)
      setSchedules(result)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  const init = async () => {
    if (tutor.urlPath) {
      getSchedule(tutor.tutorId)
      return
    } 

    const newTutor: Tutor = await getTutor(urlpath)

    const tutorState: TutorState = {
      tutorId: newTutor.tutorId,
      urlPath: newTutor.urlpath,
      image: newTutor.image,
      nickname: newTutor.nickname,
      career: newTutor.career,
    }

    setTutorState(tutorState)
    getSchedule(newTutor.tutorId)
  }

  useEffect(() => {
    init()
    }, [])

  useEffect(() => {
    if (isModalOpen || isCheckingModalOpen) {
      setModalVisible(true)
    } else {
      window.setTimeout(() => {
        setModalVisible(false)
      }, 500)
    }
  }, [isModalOpen, isCheckingModalOpen])

  const schedulesVO: AppointmentModel[] = schedules?.map((schedule, index) => {
    return {
      startDate: new Date(schedule.startDate),
      endDate: new Date(schedule.endDate),
      title: schedule.title,
      place: schedule.place,
      isMine: schedule.isMine,
      tutorId: schedule.tutorId,
    }
  })

  const handleClickAddSchedule = (e: MouseEvent) => {
    setModalOpen(true)
  }

  const setSchedule = async () => {
  }

  const handleClickSchedule = (e, schedule: Schedule | Date) => {
    console.log('k', schedule)
    
    const startDate: Date = (() => {
      if (schedule instanceof Date) {
        return schedule
      } else if (schedule instanceof Object) {
        return schedule.startDate
      }
    })()
    const isNewMode: boolean = schedule instanceof Date
    const isMine: boolean = !isNewMode && (schedule as Schedule).isMine

    if (startDate.getTime() < new Date().getTime()) {
      return
    }

    setInitModalDateTime(startDate)

    if (isNewMode) {
      setModalOpen(true)
    } else if (isMine) {
      setCheckingModalOpen(true)
    }
  }

  const initSchedule: ScheduleRequest = initModalDateTime ? {
    startDate: initModalDateTime.getTime(),
    endDate: null,
    level: null,
    phone: null,
    place: null,
    request: null,
  } : null

  return (
    <Layout>
      {!isLoading && schedulesVO && (
        <>
          {isModalOpen && isModalVisible && <BookingModal tutorId={'umlaut'} isOpen={isModalOpen} setOpen={setModalOpen} mode={ScheduleMode.NEW} initSchedule={initSchedule} />}
          {isCheckingModalOpen && isModalVisible && <CheckingModal tutorId={'umlaut'} isOpen={isCheckingModalOpen} setOpen={setCheckingModalOpen} mode={ScheduleMode.EDIT} initSchedule={initSchedule} />}
          <SchedulerWrapper schedule={schedulesVO} mode={ScheduleMode.NEW} onClickSchedule={handleClickSchedule} />
          <Fab
            className={classes.fab}
            variant="extended"
            color="primary"
            onClick={(e) => handleClickAddSchedule(e)}
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
