import React from 'react'
import LoginContainer from './LoginContainer'
import { Avatar, Box, Button, Card, CardMedia, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import Layout from '@components/ui/Layout';
import { makeStyles } from '@material-ui/core/styles';

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
  }
});

const LoginPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Layout useHeader={false}>
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
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>

        <Box className={classes.avatar_wrap}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
        </Box>
        <LoginContainer />
        <Grid className={classes.text_link} container>
                <Grid item xs={6}>
                    <Button className={classes.text_button} href="#text-buttons" color="primary">Forgot Password?</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button className={classes.text_button} href="#text-buttons" color="primary">Don't have an account? Sign Up</Button>
                </Grid>
            </Grid>
      </Box>
    </Layout>
  )
}

export default LoginPage;