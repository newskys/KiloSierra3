import Layout from '@components/ui/Layout'
import { useHeader } from '@hooks/useHeader'
import { HeaderType } from '@interfaces/header'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ScheduleRequestInput from '@components/ui/ScheduleRequestInput'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: '16px',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
})

const ReservationPage: React.FC = () => {
  useHeader(true, HeaderType.BOOKING, 'Schedule Request')
  const classes = useStyles()

  const setRef = (startTimeEl, endTimeEl) => {

  }

  return (
    <Layout>
      <Box className={classes.root}>
        <ScheduleRequestInput
          setRef={setRef}
          onClick={()=>{}}
        />
      </Box>
    </Layout>
  )
}

export default ReservationPage
