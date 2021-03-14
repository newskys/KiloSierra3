import React, { useEffect, useState } from 'react'
import { appointments } from '@common/appointments'
import Layout from '@components/ui/Layout'
import { EditingState, ViewState } from '@devexpress/dx-react-scheduler'
import {
  AppointmentForm,
  Appointments,
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
}))

export enum ViewName {
  Week = 'week',
  Month = 'month',
}

const SchedulerWrapper = () => {
  const classes = useStyles()
  const [currentViewName, setCurrentViewName] = useState<string>(ViewName.Week)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

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

  const Appointment = ({ data, ...restProps }: AppointmentProps) => (
    <Appointments.Appointment
      {...restProps}
      onClick={(e) => {
        console.log(e)
      }}
      className={classes.appointment}
      data={data}
    />
  )
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
        
      <Scheduler data={appointments}>
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
      // appointmentComponent={Appointment}
      // appointmentContentComponent={AppointmentContainer}
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
