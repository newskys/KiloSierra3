import Layout from '@components/ui/Layout'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Appointments,
  DateNavigator,
  DayView,
  MonthView,
  Scheduler,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { appointments } from '@common/appointments'

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
}))

const HomePage: React.FC = () => {
  const TimeTableCell = (props) => {
    const classes = useStyles()
    const { startDate } = props
    const date = new Date(startDate)

    if (date.getDate() === new Date().getDate()) {
      return <WeekView.TimeTableCell {...props} className={classes.todayCell} />
    }
    if (date.getDay() === 0 || date.getDay() === 6) {
      return (
        <WeekView.TimeTableCell {...props} className={classes.weekendCell} />
      )
    }
    return <WeekView.TimeTableCell {...props} />
  }

  const DayScaleCell = (props) => {
    const classes = useStyles()
    const { startDate, today } = props

    if (today) {
      return <WeekView.DayScaleCell {...props} className={classes.today} />
    }
    if (startDate.getDay() === 0 || startDate.getDay() === 6) {
      return <WeekView.DayScaleCell {...props} className={classes.weekend} />
    }
    return <WeekView.DayScaleCell {...props} />
  }

  return (
    <Layout useHeader={true}>
      <Scheduler data={appointments} height={window.innerHeight}>
        <ViewState defaultCurrentDate="2018-07-25" />
        <WeekView
          name="work-week"
          displayName="Work Week"
          excludedDays={[0, 6]}
          startDayHour={9}
          endDayHour={19}
        />
        <MonthView />
        <DayView />
        <Toolbar />
        <DateNavigator />
        <ViewSwitcher />
        <Appointments />
      </Scheduler>
    </Layout>
  )
}

export default HomePage
