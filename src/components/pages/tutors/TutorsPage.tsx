import React, { FC, useEffect, useState } from 'react'
import Layout from '@components/ui/Layout'
import { useFooter } from '@hooks/useFooter'
import { useHeader } from '@hooks/useHeader'
import { Avatar, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getTutors } from '@apis/tutor'
import { Tutor } from '@interfaces/tutor'

const useStyles = makeStyles({
  avatar_wrap: {
    color: '#FF1493',
    padding: '16px 0 0 0',
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: '#FF1493',
    width: '100px',
    height: '100px',
  },
})

const TutorsPage: FC = () => {
  useFooter(false)
  useHeader(false)
  
  const [tutorsList, setTutorsList] = useState<Tutor[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [init, setInit] = useState<boolean>(false)

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

  const classes = useStyles()

  return (
    <Layout>
      {tutorsList.map((item) => (
        <React.Fragment key={`${item.nickname}`}>
          <Box className={classes.avatar_wrap}>
            <Avatar className={classes.avatar} src={item.image} alt={item.nickname} />
          </Box>
          <Typography variant="h6" component="div">
            {item.nickname}
          </Typography>
          <Typography variant="h6" component="div">
            {item.career}
          </Typography>
        </React.Fragment>
      ))}
    </Layout>
  )
}

export default TutorsPage
