import ConfirmCodeInput from '@components/ui/ConfirmCodeInput'
import Layout from '@components/ui/Layout'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { userState, UserState } from '@recoil/user'
import { Auth } from 'aws-amplify'
import React, { KeyboardEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useHistory, History } from 'react-router-dom'
import { HOME } from '@common/routePath'
import { signIn } from '@apis/auth'
import { AuthError, UserStatus } from '@interfaces/status'
import { AUTH, SIGN_UP } from '@common/lang'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: '16px',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
})

const ConfirmCodePage: React.FC = () => {
  const classes = useStyles()
  const history: History = useHistory()
  const [user, setUserState] = useRecoilState<UserState>(userState)
  const [invalidReason, setInvalidReason] = useState<string>(null)
  const [isConfirmEnabled, setConfirmEnabled] = useState<boolean>(false)
  const [codeRef, setCodeRef] = useState<HTMLInputElement>(null)

  useEffect(() => {
    if (user.status === UserStatus.NORMAL) {
      history.replace(HOME)
    }
  }, [user])

  const setRef = (codeEl: HTMLInputElement) => {
    setCodeRef(codeEl)
  }

  const handleChangeCode = (e: KeyboardEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value

    if (!validateCode(value)) {
      setInvalidReason(SIGN_UP.ERROR_INVALID_CODE)
      checkSignUpAvailability()
    } else {
      setInvalidReason(null)
      checkSignUpAvailability()
    }
  }

  const validateCode = (code: string) => {
    return code.length > 0 && code.length < 10 && !Number.isNaN(code)
  }

  const validateAll = () => {
    return validateCode(codeRef.value)
  }

  const checkSignUpAvailability = (): void => {
    if (validateAll()) {
      setConfirmEnabled(true)
    } else {
      setConfirmEnabled(false)
    }
  }

  const handleClickConfirm = (e: KeyboardEvent<HTMLInputElement>) => {
    confirmSignUp(user.userId, codeRef.value)
  }

  const handleClickResend = (e: KeyboardEvent<HTMLInputElement>) => {
    resendEmail(user.userId)
  }

  const confirmSignUp = async (username, code) => {
    try {
      await Auth.confirmSignUp(username, code)
    } catch (e) {
      if (e.code === AuthError.WRONG_CODE) {
        setInvalidReason(AUTH.WRONG_CODE)
        checkSignUpAvailability()
      }
      console.error(e)
      return
    }

    try {
      const userState: UserState = await signIn(username, user.password)
      setUserState(userState)
    } catch (e) {
      alert(e)
    }
  }

  const resendEmail = async (userId) => {
    console.log(user)
    await Auth.resendSignUp(userId)
    alert(SIGN_UP.RESENT_EMAIL)
  }

  return (
    <Layout useHeader={false}>
      <Box className={classes.root}>
        <ConfirmCodeInput
          setRef={setRef}
          invalidReason={invalidReason}
          isConfirmEnabled={isConfirmEnabled}
          onChangeCode={handleChangeCode}
          onClickConfirm={handleClickConfirm}
          onClickResend={handleClickResend}
        />
      </Box>
    </Layout>
  )
}

export default ConfirmCodePage
