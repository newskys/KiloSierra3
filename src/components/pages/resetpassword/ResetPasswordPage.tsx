import { AUTH, SIGN_UP } from '@common/lang'
import { checkPassword } from '@common/regex'
import { HOME, LOGIN, TUTORS } from '@common/routePath'
import Layout from '@components/ui/Layout'
import ResetPasswordInput from '@components/ui/ResetPasswordInput'
import { useHeader } from '@hooks/useHeader'
import { AuthError, UserStatus } from '@interfaces/status'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { userState, UserState } from '@recoil/user'
import { Auth } from 'aws-amplify'
import React, { KeyboardEvent, useEffect, useState } from 'react'
import { History, useHistory } from 'react-router-dom'
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

const ResetPasswordPage: React.FC = () => {
  useHeader(true)
  const classes = useStyles()
  const history: History = useHistory()
  const [user, setUserState] = useRecoilState<UserState>(userState)
  const [invalidReason, setInvalidReason] = useState<string>(null)
  const [isConfirmEnabled, setConfirmEnabled] = useState<boolean>(false)
  const [codeRef, setCodeRef] = useState<HTMLInputElement>(null)
  const [passwordRef, setPasswordRef] = useState<HTMLInputElement>(null)
  const [
    confirmPasswordRef,
    setConfirmPasswordRef,
  ] = useState<HTMLInputElement>(null)
  const [passwordInvalidReason, setPasswordInvalidReason] = useState<string>(
    null
  )
  const [
    confirmPasswordInvalidReason,
    setConfirmPasswordInvalidReason,
  ] = useState<string>(null)
  const isResetMode: boolean = user.status === UserStatus.RESET

  useEffect(() => {
    // setHeaderStore({ ...headerStore, isVisible: true })
  }, [])

  useEffect(() => {
    if (user.status === UserStatus.CONFIRMED) {
      history.replace(TUTORS)
    }
  }, [user])

  useEffect(() => {
    if (codeRef) {
      checkSignUpAvailability()
    }
  }, [
    invalidReason,
    passwordInvalidReason,
    confirmPasswordInvalidReason,
  ])

  const setRef = (code: HTMLInputElement, password, confirmPassword) => {
    setCodeRef(code)
    setPasswordRef(password)
    setConfirmPasswordRef(confirmPassword)
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
    return validateCode(codeRef.value) && validatePassword(passwordRef.value) && validateConfirmPassword(confirmPasswordRef.value)
  }

  const checkSignUpAvailability = (): void => {
    if (validateAll()) {
      setConfirmEnabled(true)
    } else {
      setConfirmEnabled(false)
    }
  }

  const handleClickConfirm = (e: KeyboardEvent<HTMLInputElement>) => {
    confirmReset(user.userId, codeRef.value, passwordRef.value)
  }

  const handleClickResend = (e: KeyboardEvent<HTMLInputElement>) => {
    resendEmail(user.userId)
  }

  const handleChangePassword = (e: KeyboardEvent<HTMLInputElement>) => {
    const message: string = !validatePassword(e.currentTarget.value) ? SIGN_UP.PASSWORD_ERROR_REGEX : null
    setPasswordInvalidReason(message)

    const confirmMessage: string = !validateConfirmPassword(
      confirmPasswordRef.value
    ) ? SIGN_UP.CONFIRM_PASSWORD_ERROR_DIFFERENT : null
    setConfirmPasswordInvalidReason(confirmMessage)
  }

  const validatePassword = (value: string): boolean => {
    return checkPassword(value)
  }

  const handleChangeConfirmPassword = (
    e: KeyboardEvent<HTMLInputElement>
  ): void => {
    const message: string = !validateConfirmPassword(e.currentTarget.value) ? SIGN_UP.CONFIRM_PASSWORD_ERROR_DIFFERENT : null
    setConfirmPasswordInvalidReason(message)
  }

  const validateConfirmPassword = (value: string): boolean => {
    return passwordRef.value === value
  }

  const confirmReset = async (username, code, password) => {
    try {
      const result = await Auth.forgotPasswordSubmit(username, code, password)
      
      alert(AUTH.PASSWORD_CHANGED)
      history.push(LOGIN)
    } catch (e) {
      if (e.code === AuthError.WRONG_CODE) {
        setInvalidReason(AUTH.WRONG_CODE)
        checkSignUpAvailability()
      } else {
        setInvalidReason(AUTH.OTHER)
        checkSignUpAvailability()
      }
      console.error(e)
      return
    }
  }

  const resendEmail = async (userId) => {
    await Auth.resendSignUp(userId)
    alert(SIGN_UP.RESENT_SMS)
  }

  return (
    <Layout>
      <Box className={classes.root}>
        <ResetPasswordInput
          setRef={setRef}
          invalidReason={invalidReason}
          isConfirmEnabled={isConfirmEnabled}
          onChangeCode={handleChangeCode}
          onClickConfirm={handleClickConfirm}
          onClickResend={handleClickResend}
          onChangePassword={handleChangePassword}
          onChangeConfirmPassword={handleChangeConfirmPassword}
          passwordInvalidReason={passwordInvalidReason}
          confirmPasswordInvalidReason={confirmPasswordInvalidReason}
        />
      </Box>
    </Layout>
  )
}

export default ResetPasswordPage
