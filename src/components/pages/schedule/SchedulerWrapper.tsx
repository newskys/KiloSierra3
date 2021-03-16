import React, { useEffect, useState } from 'react'
import { appointments } from '@common/appointments'
import Layout from '@components/ui/Layout'
import { AppointmentModel, EditingState, ViewState } from '@devexpress/dx-react-scheduler'
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  CurrentTimeIndicator,
  DateNavigator,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui'
import { Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment'
import classNames from 'clsx'

const useStyles = makeStyles((theme) => ({
  todayCell: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.14),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.16),
    },
  },
  weekendCell: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
  },
  today: {
    backgroundColor: fade(theme.palette.primary.main, 0.16),
  },
  weekend: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
  },
  appointment: {
    borderRadius: 0,
    borderBottom: 0,
  },

  fab: {
    position: 'absolute',
    bottom: '98px',
    right: '32px',
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  content: {
    opacity: 0.7,
  },
  container: {
    width: '100%',
    lineHeight: 1.2,
    height: '100%',
  },
}))

export enum ViewName {
  Week = 'week',
  Month = 'month',
}

interface Props {
  schedule: AppointmentModel[]
}

interface Schedule {
  week: AppointmentModel[]
  month: DayScheduleAvailability[]
}

interface DayScheduleAvailability {
  early: boolean
  mid: boolean
  late: boolean
}

const SchedulerWrapper: React.FC<Props> = ({ schedule: rawSchedule }) => {
  const classes = useStyles()
  const [schedule, setSchedule] = useState<Schedule>(null)
  const [currentViewName, setCurrentViewName] = useState<string>(ViewName.Week)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<number>(null)

  useEffect(() => {
    setCurrentMonth(moment(currentDate).month())
  }, [currentDate])

  const hasNoSchedule = (schedules: AppointmentModel[], startHour: number, endHour: number): boolean => {
    // 30분 단위 체크    
    const iterateCount: number = (endHour - startHour) * 2
    // unavailable: 0, available: 1
    const availableTimeIndices: number[] = Array(iterateCount).fill(1)
    let iterateTime: Date = moment(currentDate).set({'hour': 9, 'minute': 0, 'second': 0, 'millisecond': 0}).toDate()

    for (var i = 0; i < iterateCount; i++) {
      const isBetween: boolean = schedules.some(schedule => {
        return moment(iterateTime).isBetween(schedule.startDate, schedule.endDate) || moment(schedule.startDate).isSame(iterateTime)
      })

      isBetween && (availableTimeIndices[i] = 0)
      iterateTime = moment(iterateTime).add(30, 'minutes').toDate()
    }

    const hasNoSchedule: boolean = availableTimeIndices.join('').indexOf('1111') >= 0
    return hasNoSchedule
  }

  useEffect(() => {
    if (!currentMonth) {
      return
    }

    const endOfMonth: number = moment(currentDate).endOf('month').date()
    const monthViewSchedules: DayScheduleAvailability[] = []
    for (var i = 1; i <= endOfMonth; i++) {
      const daySchedules: AppointmentModel[] = rawSchedule.filter(schedule => moment(schedule.startDate).date() === i)
      const early: boolean = hasNoSchedule(daySchedules, 9, 12)
      const mid: boolean = hasNoSchedule(daySchedules, 12, 18)
      const late: boolean = hasNoSchedule(daySchedules, 18, 22)

      // const hasEarlySchedule: boolean = daySchedules.some(daySchedule => moment(daySchedule.endDate).hour() moment(daySchedule.endDate).hour() < 12)
      const monthViewSchedule: DayScheduleAvailability = {
        early,
        mid,
        late,
      }

      monthViewSchedules.push(monthViewSchedule)
    }
    // moment(currentDate).endOf('month')
    // if (currentDate.)
    // const month = rawSchedule.map((schedule) => {
    //   const reservedTime = moment(schedule.startDate).hour()
    //   return {
    //     early: 
    //     mid: 
    //     late: 
    //   }
    // })
    const schedule: Schedule = {
      week: rawSchedule,
      month: monthViewSchedules,
    }

    setSchedule(schedule)
  }, [currentMonth])

  const WeekTimeTableLabel = (props) => {
    return (
      <WeekView.TimeScaleLabel
        {...props}
        style={{ width: '50px' }}
        formatDate={(date, options) => {
          const time: string = moment(date).format('h:mm')
          // if (moment(date).hours() % 12 === 0 && moment(date).minutes() === 0) {
          //   const ampm: string = moment(date).format('A')
          //   return `${ampm}\n${time}`
          // }
          return time
        }}
      />
    )
  }

  const WeekTimeScaleLayout = (props) => {
    return (
      <WeekView.TimeScaleLayout
        {...props}
        style={{ width: '50px' }}
      />
    )
  }

  const WeekTimeTableCell = (props) => {
    const { startDate } = props
    const date = new Date(startDate)

    if (date.getDate() === new Date().getDate()) {
      return (
        <WeekView.TimeTableCell
          {...props}
          className={classes.todayCell}
          onClick={props.onDoubleClick}
        />
      )
    }
    if (date.getDay() === 0 || date.getDay() === 6) {
      return (
        <WeekView.TimeTableCell
          {...props}
          className={classes.weekendCell}
          onClick={(e) => {
            console.log(props)
            props.onDoubleClick(e)
          }}
        />
      )
    }
    return (
      <WeekView.TimeTableCell
        {...props}
        onClick={(e) => {
          console.log(props)
          props.onDoubleClick(e)
        }}
      />
    )
  }
  const MonthTimeTableCell = (props) => {
    const { startDate } = props
    const date = new Date(startDate)

    if (date.getDate() === new Date().getDate()) {
      return (
        <MonthView.TimeTableCell
          {...props}
          className={classes.todayCell}
          onClick={(e) => handleClickDateOnMonthView(props.startDate)}
        />
      )
    }
    if (date.getDay() === 0 || date.getDay() === 6) {
      return (
        <MonthView.TimeTableCell
          {...props}
          className={classes.weekendCell}
          onClick={() => {}}
        />
      )
    }
    return (
      <MonthView.TimeTableCell
        {...props}
        onClick={(e) => {
          console.log(props)
          handleClickDateOnMonthView(props.startDate)
        }}
      />
    )
  }

  const DayScaleCell = (props) => {
    const { startDate, today } = props

    if (today) {
      return (
        <MonthView.DayScaleCell
          {...props}
          className={classes.today}
          onClick={(e) => {
            console.log(e, 'monthclick')
          }}
        />
      )
    }
    if (startDate.getDay() === 0 || startDate.getDay() === 6) {
      return (
        <MonthView.DayScaleCell
          {...props}
          className={classes.weekend}
          onClick={(e) => {
            console.log(e, 'monthclick')
          }}
        />
      )
    }
    return (
      <MonthView.DayScaleCell
        {...props}
        onClick={(e) => {
          console.log(e, 'monthclick')
        }}
      />
    )
  }

  const DayScaleEmptyCell = (props) => {
    const { startDate, today } = props

    return (
      <MonthView.DayScaleEmptyCell
        {...props}
        onClick={(e) => {
          console.log(e)
        }}
      />
    )
  }


  type AppointmentProps = Appointments.AppointmentProps
  type AppointmentContentProps = Appointments.AppointmentContentProps

  const Appointment = ({ data, ...restProps }: AppointmentProps) => {
    // console.log('d', data)
    const isWeekView: boolean = currentViewName === ViewName.Week
    return (
      <Appointments.Appointment
        {...restProps}
        onClick={(e) => {
          console.log(e)
        } }
        draggable={false}
        className={classes.appointment}
        style={isWeekView ? {width: '130%'} : undefined}
        data={data} />
    )
  }

  const AppointmentContent = ({ data, ...restProps }: AppointmentContentProps) => {
    console.log('d', restProps)
    return (
      <Appointments.AppointmentContent {...restProps} data={data}>
      <div className={classes.container}>
        <div className={classes.text}>
          일정
        </div>
        <div className={classes.text}>
          있음
        </div>
        {/* <div className={classNames(classes.text, classes.content)}> */}
          {/* {`Priority: ${priority}`} */}
        {/* </div> */}
        {/* <div className={classNames(classes.text, classes.content)}>
          {`Location: ${data.location}`}
        </div> */}
      </div>
    </Appointments.AppointmentContent>
      
      // <Appointments.AppointmentContent
      //   {...restProps}
      //   // onClick={(e) => {
      //   //   console.log(e)
      //   // } }
      //   // resources={[{
      //   //   id: 1,
      //   //   title: 'title',
      //   //   fieldName: 'field',
      //   //   allowMultiple: false,
      //   //   isMain: false,
      //   //   color: '',
      //   //   text: '',
      //   // }]}
      //   className={classes.appointment}
      //   data={data} />
    )
  }

  const viewSwitcher = ({ ...restProps }: ViewSwitcher.SwitcherProps) => (
    <ViewSwitcher.Switcher
      {...restProps}
      onChange={(e) => {
        setCurrentViewName(e)
      }}
    />
  )

  const handleCurrentDateChange = (date: Date) => {
    console.log('handlechange currentdate', date)
    setCurrentDate(date)
  }

  const handleClickDateOnMonthView = (date: Date) => {
    console.log('date', date)
    setCurrentDate(date)
    // window.setTimeout(() => {
    setCurrentViewName(ViewName.Week)
    // }, 1000)
  }

    return (
      <Scheduler data={rawSchedule}>
      <EditingState onCommitChanges={() => {}} />
      <ViewState
        defaultCurrentDate={new Date()}
        currentDate={currentDate}
        onCurrentDateChange={(e) => handleCurrentDateChange(e)}
        currentViewName={currentViewName}
      />
      <WeekView
        name="week"
        displayName="Week"
        // excludedDays={[0, 6]}
        cellDuration={60}
        startDayHour={9}
        endDayHour={22}
        timeTableCellComponent={WeekTimeTableCell}
        timeScaleLabelComponent={WeekTimeTableLabel}
        timeScaleLayoutComponent={WeekTimeScaleLayout}
        // dayScaleEmptyCellComponent={DayScaleEmptyCell}
      />
      <MonthView
        name="month"
        displayName="Month"
        timeTableCellComponent={MonthTimeTableCell}
        // dayScaleCellComponent={DayScaleCell}
        // dayScaleEmptyCellComponent={DayScaleEmptyCell}

      />
      {/* <DayView /> */}
      <Toolbar />
      <TodayButton />
      <DateNavigator />
      <ViewSwitcher switcherComponent={viewSwitcher} />
      <Appointments
      appointmentComponent={Appointment}
      appointmentContentComponent={AppointmentContent}
      />
      {/* <AppointmentTooltip showCloseButton showDeleteButton showOpenButton /> */}
      <AppointmentForm />
      <CurrentTimeIndicator
        shadePreviousCells={true}
        shadePreviousAppointments={true}
      />
    </Scheduler>
    )
}

export default SchedulerWrapper
