import React, { useEffect, useRef } from 'react'
import { Avatar, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

const useStyles = makeStyles({
  icon: {
    backgroundColor: '#FF1493',
  },

  input: {
    marginTop: '16px',
  },

  button: {
    marginTop: '16px',
    padding: '8px',
  },
})

interface Props {
  setRef: Function
  onClickForgot: Function
  onChangeId: Function
  invalid: boolean
}

const ForgotPasswordInput: React.FC<Props> = ({ setRef, onClickForgot, onChangeId, invalid }) => {
  const classes = useStyles()
  const userId = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setRef(userId.current)
  }, [])

  return (
    <>
      <Typography gutterBottom variant="h4" component="h2">
        FORGOT PASSWORD
      </Typography>
      <Avatar className={classes.icon}>
        <VpnKeyIcon />
      </Avatar>
      <TextField
        inputRef={userId}
        fullWidth
        error={invalid}
        className={classes.input}
        variant="outlined"
        label="Id *"
        margin="normal"
        helperText={invalid ? '6~20글자 영문+숫자 조합으로 입력해주세요' : undefined}
        type="string"
        onChange={(e) => onChangeId(e)}
      />

      <Button
        className={classes.button}
        fullWidth
        // disabled={!isConfirmEnabled}
        variant="contained"
        color="primary"
        onClick={(e) => onClickForgot(e)}>
        {'CONFIRM'}
      </Button>
    </>
  )
}

export default ForgotPasswordInput
