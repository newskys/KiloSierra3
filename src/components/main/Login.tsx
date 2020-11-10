import React from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Grid, Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
import LockIcon from '@material-ui/icons/Lock'
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {pink} from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: '16px 0 16px 0',
  },
  container: {
    display: 'flex',
    marginTop: '64px',
    alignItems: 'center',
    flexDirection: 'column',
  },
  media: {
    height: 140,
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  button: {
    margin: '24px 0px 16px 0px',
    lineHeight: '1.75',
  },
  bottom: {
    marginTop: '64px',
  }
}))

const Login: React.FC = () => {
  const prefersDarkMode = false || useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: /*prefersDarkMode ? 'dark' :*/ 'light',
        },
      }),
    [prefersDarkMode],
  );
  const classes = useStyles()

  return (
    <>
      <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <div className={classes.container}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="http://lorempixel.com/400/255/cats"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Umlaut
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                  continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Avatar className={classes.pink}>
            <LockIcon />
          </Avatar>

          <TextField fullWidth label="Email Address *" variant="outlined" margin="normal" />
          <TextField fullWidth label="Password *" variant="outlined" margin="normal" />

          <Button fullWidth variant="contained" color="primary" style={{ margin: '24px 0px 16px 0px' }}>
            SIGN IN
          </Button>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={6}>
              <Typography variant="body2" color="primary">
                <Link href="#" onClick={() => {}} underline="hover">
                  Forgot Password?
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="primary">
                <Link href="#" onClick={() => {}} underline="hover">
                  Don't have an account? Sign Up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
        <Box className={classes.bottom}>
          <Typography align="center" variant="body2" color="textSecondary">
            Copyright © Umlaut 2020
            {/*<Link href="#" onClick={() => {}} underline="hover">*/}
            {/*  Don't have an account? Sign Up*/}
            {/*</Link>*/}
          </Typography>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default Login
