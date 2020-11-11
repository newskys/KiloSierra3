import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { DAYS_OF_THE_WEEK } from '@utils/constant'
import format from 'date-fns/format'
import add from 'date-fns/add'
import { pink } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: pink[500],
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  table: {
    width: '100%',
    tableLayout: 'fixed',
  },
}))

function createData(mon, tue, wed, thu, fri, sat, sun) {
  return { mon, tue, wed, thu, fri, sat, sun }
}

const rows = [
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
  createData(true, true, true, true, true, true, true),
]

const CalendarContainer: React.FC = () => {
  const classes = useStyles()

  const times: Array<string> = (() => {
    let date: Date = new Date(2020, 0, 1, 10, 0)
    let result: Array<string> = []

    for (var i = 0; i < 18; i++) {
      const timeStr: string = format(date, 'HH:mm')
      date = add(date, {
        minutes: 30,
      })

      result.push(timeStr)
    }

    return result
  })()

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">{DAYS_OF_THE_WEEK.MONDAY}</TableCell>
              <TableCell align="center">{DAYS_OF_THE_WEEK.TUESDAY}</TableCell>
              <TableCell align="center">{DAYS_OF_THE_WEEK.WEDNESDAY}</TableCell>
              <TableCell align="center">{DAYS_OF_THE_WEEK.THURSDAY}</TableCell>
              <TableCell align="center">{DAYS_OF_THE_WEEK.FRIDAY}</TableCell>
              <TableCell align="center">{DAYS_OF_THE_WEEK.SATURDAY}</TableCell>
              <TableCell align="center">{DAYS_OF_THE_WEEK.SUNDAY}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {times.map((time, index) => {
              const availability = rows[index]
              console.log(availability)
              return (
                <TableRow key={`calendar-${index}`}>
                  <TableCell component="th" scope="row">
                    {time}
                  </TableCell>
                  <TableCell align="right">{availability.mon}</TableCell>
                  <TableCell align="right">{availability.tue}</TableCell>
                  <TableCell align="right">{availability.wed}</TableCell>
                  <TableCell align="right">{availability.thu}</TableCell>
                  <TableCell align="right">{availability.fri}</TableCell>
                  <TableCell align="right">{availability.sat}</TableCell>
                  <TableCell align="right">{availability.sun}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CalendarContainer
