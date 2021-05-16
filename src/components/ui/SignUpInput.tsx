import { SIGN_UP } from '@common/lang'
import { Avatar, Box, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AssignmentIcon from '@material-ui/icons/AssignmentInd'
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
})

interface Props {
  setRef: Function
  onChangeUserId: Function
  onChangePassword: Function
  onChangeConfirmPassword: Function
  onChangeEmail: Function
  validatePhone: Function
  onClickSignUp: Function
  userIdInvalidReason: string
  passwordInvalidReason: string
  confirmPasswordInvalidReason: string
  emailInvalidReason: string
  isSignUpEnabled: boolean
}

const SignUpInput: React.FC<Props> = ({
  setRef,
  onChangeUserId,
  onChangePassword,
  onChangeConfirmPassword,
  onChangeEmail,
  validatePhone,
  onClickSignUp,
  userIdInvalidReason,
  passwordInvalidReason,
  confirmPasswordInvalidReason,
  emailInvalidReason,
  isSignUpEnabled,
}) => {
  const classes = useStyles()
  const userId = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const confirmPassword = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const phone = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setRef(
      userId.current,
      password.current,
      confirmPassword.current,
      email.current,
      phone.current
    )
  }, [])

  return (
    <>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h4"
        component="h2">
        SIGN UP
      </Typography>
      <Box className={classes.avatar_wrap}>
        <Avatar className={classes.avatar}>
          <AssignmentIcon />
        </Avatar>
      </Box>

      <TextField
        inputRef={userId}
        fullWidth
        error={!!userIdInvalidReason}
        className={classes.login_input}
        variant="outlined"
        label="ID *"
        margin="normal"
        helperText={userIdInvalidReason}
        onChange={(e) => onChangeUserId(e)}
      />
      <TextField
        inputRef={password}
        fullWidth
        error={!!passwordInvalidReason}
        className={classes.login_input}
        variant="outlined"
        label="Password *"
        margin="normal"
        helperText={SIGN_UP.PASSWORD_ERROR_REGEX}
        type="password"
        onChange={(e) => onChangePassword(e)}
      />
      <TextField
        inputRef={confirmPassword}
        fullWidth
        error={!!confirmPasswordInvalidReason}
        className={classes.login_input}
        variant="outlined"
        label="Confirm Password *"
        margin="normal"
        helperText={confirmPasswordInvalidReason}
        type="password"
        onChange={(e) => onChangeConfirmPassword(e)}
      />
      <TextField
        inputRef={email}
        fullWidth
        error={!!emailInvalidReason}
        className={classes.login_input}
        variant="outlined"
        label="Phone Number *"
        margin="normal"
        helperText={emailInvalidReason || SIGN_UP.SEND_SMS}
        
        onChange={(e) => onChangeEmail(e)}
      />
      {/* <TextField
        inputRef={phone}
        error
        fullWidth
        className={classes.login_input}
        variant="outlined"
        label="Phone Number *"
        margin="normal"
        helperText="Incorrect entry."
        type="tel"
        onChange={(e) => validatePhone(e)}
      /> */}
      <Button
        className={classes.signup}
        fullWidth
        disabled={!isSignUpEnabled}
        variant="contained"
        color="primary"
        onClick={(e) => onClickSignUp(e)}>
        {isSignUpEnabled ? 'SIGN UP' : SIGN_UP.SUBMIT_NOT_FILLED}
      </Button>
    </>
  )
}

export default SignUpInput
