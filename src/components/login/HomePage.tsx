import Layout from '@components/ui/Layout'
import { EditingState, ViewState, ViewSwitcherProps } from '@devexpress/dx-react-scheduler'
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  DayView,
  EditRecurrenceMenu,
  GroupingPanel,
  MonthView,
  Scheduler,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { appointments } from '@common/appointments'
import { WithStyles } from '@material-ui/styles'
import { withStyles, Theme, createStyles } from '@material-ui/core'
import { TodayButton } from '@devexpress/dx-react-scheduler-material-ui'

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
}))

export enum ViewName {
  Week = 'work-week',
  Month = 'month',
}

const HomePage: React.FC = () => {
  const classes = useStyles()
  const [currentViewName, setCurrentViewName] = useState<string>(ViewName.Week)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
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
          onClick={() => {}}
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
      // className={classNames({
      //   [classes.highPriorityAppointment]: data.priority === 1,
      //   [classes.mediumPriorityAppointment]: data.priority === 2,
      //   [classes.lowPriorityAppointment]: data.priority === 3,
      //   [classes.appointment]: true,
      // })}
      data={data}
    />
  )
  const viewSwitcher = ({ ...restProps }: ViewSwitcher.SwitcherProps) => (
    <ViewSwitcher.Switcher
      {...restProps}
      
      onChange={(e) => {setCurrentViewName(e)}}
    />
  )
  // const AppointmentContainer = ({
  //   data, ...restProps
  // }) => (
  //   <Appointments.Container
  //     {...restProps}
  //     // onClick={(e) => {console.log('container', e)}}
  //     // className={classes.appointment
  //       style={{width: '100%', data:'test', height: '100%'}}

  //     // className={classNames({
  //     //   [classes.highPriorityAppointment]: data.priority === 1,
  //     //   [classes.mediumPriorityAppointment]: data.priority === 2,
  //     //   [classes.lowPriorityAppointment]: data.priority === 3,
  //     //   [classes.appointment]: true,
  //     // })}
  //     // data={data}
  //   />
  // );
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
    <Layout useHeader={true}>
      <Scheduler data={appointments} height={window.innerHeight}>
        <EditingState onCommitChanges={() => {}} />
        <ViewState
          defaultCurrentDate={new Date()}
          currentDate={currentDate}
          onCurrentDateChange={(e) => handleCurrentDateChange(e)}
          currentViewName={currentViewName}
        />
        <WeekView
          name="work-week"
          displayName="Work Week"
          excludedDays={[0, 6]}
          startDayHour={9}
          endDayHour={19}
          timeTableCellComponent={WeekTimeTableCell}
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
      </Scheduler>
    </Layout>
  )
}

export default HomePage
