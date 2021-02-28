import { SIGN_UP } from '@common/lang'
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import React, { useEffect, useRef } from 'react'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: '16px',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },

  title: {
    textAlign: 'center',
  },

  avatar_wrap: {
    color: '#FF1493',
    // padding: "16px 0 0 0",
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: '#FF1493',
  },

  login_input: {
    margin: '16px 0 0 0',
  },

  signup: {
    margin: '16px 0 0 0',
    padding: '8px',
  },

  text_link: {
    margin: '8px 0 0 0',
    justify: 'flex-end',
  },

  text_button: {
    textTransform: 'none',
  },

  grid_text: {
    flexBasis: 'inherit',
  },
})

interface Props {
  setRef: Function
  invalidReason: string
  onChangeCode: Function
  isConfirmEnabled: boolean
  onClickConfirm: Function
  onClickResend: Function
}

const ConfirmSignUpInput: React.FC<Props> = ({
  setRef,
  invalidReason,
  onChangeCode,
  isConfirmEnabled,
  onClickConfirm,
  onClickResend,
}) => {
  const classes = useStyles()
  const code = useRef<HTMLInputElement>(null)
  useEffect(() => {
    setRef(code.current)
  }, [])

  return (
    <>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h4"
        component="h2">
        EMAIL CHECK
      </Typography>
      <Box className={classes.avatar_wrap}>
        <Avatar className={classes.avatar}>
          <MailOutlineIcon />
        </Avatar>
      </Box>
      <TextField
        inputRef={code}
        fullWidth
        error={!!invalidReason}
        className={classes.login_input}
        variant="outlined"
        label="Code *"
        margin="normal"
        helperText={invalidReason || SIGN_UP.CONFIRM_CODE}
        type="number"
        onChange={(e) => onChangeCode(e)}
      />

      <Button
        className={classes.signup}
        fullWidth
        disabled={!isConfirmEnabled}
        variant="contained"
        color="primary"
        onClick={(e) => onClickConfirm(e)}>
        {'CONFIRM'}
      </Button>
      <Grid className={classes.text_link} container justify="flex-end">
        <Grid item xs={6}></Grid>
        <Grid item xs={6} className={classes.grid_text}>
          <Button
            className={classes.text_button}
            href="#"
            color="primary"
            onClick={(e) => onClickResend(e)}>
            코드를 재발급받고 싶으신가요?
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default ConfirmSignUpInput
