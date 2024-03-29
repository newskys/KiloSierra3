import Layout from '@components/ui/Layout'
import { useFooter } from '@hooks/useFooter'
import { useHeader } from '@hooks/useHeader'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockIcon from '@material-ui/icons/Lock'
import React, { Suspense } from 'react'
import LoginAccountConfigContainer from './LoginAccountConfigContainer'
// import LoginContainer from './LoginContainer'

const LoginContainer = React.lazy(() => import('./LoginContainer'))

const useStyles = makeStyles({
  root: {
    padding: '16px',
  },

  avatar_wrap: {
    color: '#FF1493',
    padding: '16px 0 0 0',
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: '#FF1493',
  },

  login_input: {
    margin: '16px 0 0 0',
  },

  signin: {
    margin: '16px 0 0 0',
    padding: '8px',
  },

  text_link: {
    margin: '8px 0 0 0',
  },

  text_button: {
    textTransform: 'none',
  },
})

const LoginPage: React.FC = () => {
  useHeader(false)
  useFooter(true)

  const classes = useStyles()

  return (
    <Layout>
      <Box className={classes.root}>
        <Card>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="200"
            image="https://picsum.photos/200"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>

        <Box className={classes.avatar_wrap}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
        </Box>

        <Suspense fallback={<></>}>
          <LoginContainer />
        </Suspense>
        <LoginAccountConfigContainer />
      </Box>
    </Layout>
  )
}

export default LoginPage
