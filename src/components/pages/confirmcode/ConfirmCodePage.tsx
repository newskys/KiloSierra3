import { signIn } from '@apis/auth'
import { AUTH, SIGN_UP } from '@common/lang'
import { HOME, LOGIN, TUTORS } from '@common/routePath'
import ConfirmCodeInput from '@components/ui/ConfirmCodeInput'
import Layout from '@components/ui/Layout'
import { useHeader } from '@hooks/useHeader'
import { AuthError, UserStatus } from '@interfaces/status'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { userState, UserState } from '@recoil/user'
import { Auth } from 'aws-amplify'
import React, { KeyboardEvent, useEffect, useState } from 'react'
import { History, Location, useHistory, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'

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
  useHeader(false)
  const classes = useStyles()
  const history: History = useHistory()
  const location: Location = useLocation()
  const [userId, setUserId] = useState<string>(null)
  const [password, setPassword] = useState<string>(null)
  const [invalidReason, setInvalidReason] = useState<string>(null)
  const [isConfirmEnabled, setConfirmEnabled] = useState<boolean>(false)
  const [codeRef, setCodeRef] = useState<HTMLInputElement>(null)
  const [user, setUserState] = useRecoilState<UserState>(userState)

  useEffect(() => {
    const userId: string = location.state?.userId
    const password: string = location.state?.password

    if (!userId || !password) {
      history.replace(LOGIN)
    }

    setUserId(userId)
    setPassword(password)
  }, [])

  useEffect(() => {
    if (codeRef) {
      checkSignUpAvailability()
    }
  }, [invalidReason])

  const setRef = (code: HTMLInputElement) => {
    setCodeRef(code)
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
    console.log('user', userId)
    confirmSignUp(userId, password, codeRef.value)
  }

  const handleClickResend = (e: KeyboardEvent<HTMLInputElement>) => {
    resendEmail(userId)
  }

  const confirmSignUp = async (username, password, code) => {
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
      const userState: UserState = await signIn(username, password)
      setUserState(userState)
      history.replace(TUTORS)
    } catch (e) {
      alert(e)
    }
  }

  const resendEmail = async (userId) => {
    await Auth.resendSignUp(userId)
    alert(SIGN_UP.RESENT_SMS)
  }

  return (
    <Layout>
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
