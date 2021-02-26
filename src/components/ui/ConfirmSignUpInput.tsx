import { Button, TextField } from '@material-ui/core'
import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SIGN_UP } from '@common/lang'

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
  invalidReason: string
  onChangeCode: Function
  isConfirmEnabled: boolean
  onClickConfirm: Function
}

const ConfirmSignUpInput: React.FC<Props> = ({
  invalidReason,
  onChangeCode,
  isConfirmEnabled,
  onClickConfirm,
}) => {
  const classes = useStyles()
  const code = useRef<HTMLInputElement>(null)

  return (
    <>
      <TextField
        inputRef={code}
        fullWidth
        error={!!invalidReason}
        className={classes.login_input}
        variant="outlined"
        label="Email *"
        margin="normal"
        helperText={invalidReason || SIGN_UP.CONFIRM_CODE}
        type="email"
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
    </>
  )
}

export default ConfirmSignUpInput
