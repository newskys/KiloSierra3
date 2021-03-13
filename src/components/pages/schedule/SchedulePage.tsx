import Layout from '@components/ui/Layout'
import { Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import React, { useEffect } from 'react'
import SchedulerWrapper from './SchedulerWrapper'
import { withRouter, RouteComponentProps } from "react-router";
import { useRecoilState } from 'recoil'
import { userState, UserState } from '@recoil/user'
import axios from '@apis/axios'

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

const SchedulePage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const classes = useStyles()
  const [user, setUserState] = useRecoilState<UserState>(userState)

  useEffect(() => {
    // getTutorSchedule(match.params.tutorId)
    getTutorSchedule('umlaut')
  }, [])

  const getTutorSchedule = (tutorId: string) => {
    const result = axios.get(`tutors/${tutorId}/schedule`, {
      // withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.token
      }
    })

    console.log(result)
  }

  return (
    <Layout useHeader={true}>
      <SchedulerWrapper />
    <Fab
      className={classes.fab}
      variant="extended"
      color="primary"
      aria-label="add">
      <AddIcon />
      Add Schedule
    </Fab>
    </Layout>
  )
}

export default SchedulePage
