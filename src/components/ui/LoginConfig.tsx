import { Button, Grid } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  text_link: {
    margin: '8px 0 0 0',
  },

  text_button: {
    textTransform: 'none',
  }
});

interface Props {
  onClickForgot: Function
  onClickSignUp: Function
}

const LoginConfig: React.FC<Props> = ({ onClickForgot, onClickSignUp }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.text_link} container>
      <Grid item xs={6}>
        <Button className={classes.text_button} href="#" color="primary" onClick={(e) => onClickForgot(e)}>Forgot Password?</Button>
      </Grid>
      <Grid item xs={6}>
        <Button className={classes.text_button} href="#" color="primary" onClick={(e) => onClickSignUp(e)}>Don't have an account? Sign Up</Button>
      </Grid>
    </Grid>
  )
}

export default LoginConfig
