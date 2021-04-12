import React, { FC, useEffect, useState, MouseEvent } from 'react'
import Layout from '@components/ui/Layout'
import { useFooter } from '@hooks/useFooter'
import { useHeader } from '@hooks/useHeader'
import { Avatar, Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getTutors } from '@apis/tutor'
import { History, useHistory } from 'react-router-dom';
import { Tutor } from '@interfaces/tutor'

const useStyles = makeStyles({
  avatar_wrap: {
    // color: '#FF1493',
    padding: '8px',
    width: 'fit-content',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },

  avatar: {
    margin: '8px',
    backgroundColor: '#eeeeee',
    width: '100px',
    height: '100px',
  },
  avatar_area: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const TutorsPage: FC = () => {
  useFooter(false)
  useHeader(false)

  const [tutorsList, setTutorsList] = useState<Tutor[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [init, setInit] = useState<boolean>(false)
  const history: History = useHistory()

  useEffect(() => {
    getTutorsProfile()
  }, [])

  const getTutorsProfile = async () => {
    setLoading(true)

    try {
      const result: Tutor[] = await getTutors()
      setTutorsList(result)
      setInit(true)
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  const handleClickTutor = (e: MouseEvent, pathUrl: string) => {
    e.preventDefault()

    history.push(`/${pathUrl}/schedule`)
  }

  const classes = useStyles()

  return (
    <Layout>
      <Box className={classes.avatar_area}>
        {tutorsList.map((item) => (
          <Box
            key={`${item.nickname}`}
            className={classes.avatar_wrap}
            onClick={(e) => handleClickTutor(e, item.urlpath)}
            >
            <Avatar
              className={classes.avatar}
              src={item.image}
              alt={item.nickname}
            />
            <Typography variant="h6" component="div">
              {item.nickname}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {item.career}
            </Typography>
          </Box>
        ))}
      </Box>
    </Layout>
  )
}

export default TutorsPage
