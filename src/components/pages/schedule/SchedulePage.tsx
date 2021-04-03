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
import SchedulerWrapper from '../../common/SchedulerWrapper'

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
  const classes = useStyles()
  const history: History = useHistory()
  const [schedules, setSchedules] = useState<Schedule[]>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [initModalDateTime, setInitModalDateTime] = useState<Date>(null)

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
    getSchedule(tutorId)
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      setModalVisible(true)
    } else {
      window.setTimeout(() => {
        setModalVisible(false)
      }, 500)
    }
  }, [isModalOpen])

  const schedulesVO: AppointmentModel[] = schedules?.map((schedule, index) => {
    return {
      startDate: new Date(schedule.startDate),
      endDate: new Date(schedule.endDate),
      title: schedule.title,
      place: schedule.place,
      isMine: schedule.isMine,
    }
  })

  const handleClickAddSchedule = (e: MouseEvent) => {
    setModalOpen(true)
  }

  const setSchedule = async () => {
    // setInitModalDateTime()
  }

  const handleClickSchedule = (e, date: Date) => {
    if (date.getTime() < new Date().getTime()) {
      return
    }

    setInitModalDateTime(date)
    setModalOpen(true)
  }

  return (
    <Layout>
      {!isLoading && schedulesVO && (
        <>
          {isModalVisible && <BookingModal tutorId={'umlaut'} isOpen={isModalOpen} setOpen={setModalOpen} initDateTime={initModalDateTime} setSchedule={setSchedule} />}
          <SchedulerWrapper schedule={schedulesVO} onClickSchedule={handleClickSchedule} />
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
