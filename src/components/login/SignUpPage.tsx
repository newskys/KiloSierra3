import { SIGN_UP } from '@common/lang'
import { checkEmail, checkPassword, checkUserId } from '@common/regex'
import { LOGIN } from '@common/routePath'
import Layout from '@components/ui/Layout'
import SignUpInput from '@components/ui/SignUpInput'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Auth } from 'aws-amplify'
import React, { KeyboardEvent, useEffect, useState } from 'react'
import { useHistory, History } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: '16px',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
})

const SignUpPage = () => {
  const classes = useStyles()
  const matches = useMediaQuery('(min-width:600px)')
  const history: History = useHistory()

  const [userIdRef, setUserIdRef] = useState<HTMLInputElement>(null)
  const [passwordRef, setPasswordRef] = useState<HTMLInputElement>(null)
  const [
    confirmPasswordRef,
    setConfirmPasswordRef,
  ] = useState<HTMLInputElement>(null)
  const [emailRef, setEmailRef] = useState<HTMLInputElement>(null)
  const [phoneRef, setPhoneRef] = useState<HTMLInputElement>(null)
  const [userIdInvalidReason, setUserIdInvalidReason] = useState<string>(null)
  const [passwordInvalidReason, setPasswordInvalidReason] = useState<string>(
    null
  )
  const [
    confirmPasswordInvalidReason,
    setConfirmPasswordInvalidReason,
  ] = useState<string>(null)
  const [emailInvalidReason, setEmailInvalidReason] = useState<string>(null)
  const [isSignUpEnabled, setSignUpEnabled] = useState<boolean>(false)
  const [usedUserIds, setUsedUserIds] = useState<string[]>([])

  useEffect(() => {
    if (userIdRef) {
      checkSignUpAvailability()
    }
  }, [
    userIdInvalidReason,
    passwordInvalidReason,
    confirmPasswordInvalidReason,
    emailInvalidReason,
  ])

  const setRef = (userId, password, confirmPassword, email, phone): void => {
    setUserIdRef(userId)
    setPasswordRef(password)
    setConfirmPasswordRef(confirmPassword)
    setEmailRef(email)
    setPhoneRef(phone)
  }

  const handleChangeUserId = (e: KeyboardEvent<HTMLInputElement>): void => {
    const message: string = validateUserId(e.currentTarget.value)
    setUserIdInvalidReason(message)

    // checkSignUpAvailability();
  }

  const validateUserId = (value: string): string => {
    if (!checkUserId(value)) {
      return SIGN_UP.USER_ID_ERROR_REGEX
    }

    if (usedUserIds.includes(value)) {
      return SIGN_UP.USER_ID_ERROR_USED
    }

    return null
  }

  const handleChangePassword = (e: KeyboardEvent<HTMLInputElement>) => {
    const message: string = validatePassword(e.currentTarget.value)
    setPasswordInvalidReason(message)

    const confirmMessage: string = validateConfirmPassword(
      confirmPasswordRef.value
    )
    setConfirmPasswordInvalidReason(confirmMessage)
  }

  const validatePassword = (value: string): string => {
    return !checkPassword(value) ? SIGN_UP.PASSWORD_ERROR_REGEX : null
  }

  const handleChangeConfirmPassword = (
    e: KeyboardEvent<HTMLInputElement>
  ): void => {
    const message: string = validateConfirmPassword(e.currentTarget.value)
    setConfirmPasswordInvalidReason(message)
  }

  const handleChangeEmail = (e: KeyboardEvent<HTMLInputElement>): void => {
    const message: string = validateEmail(e.currentTarget.value)
    setEmailInvalidReason(message)
  }

  const validateConfirmPassword = (value: string): string => {
    return passwordRef.value !== value
      ? SIGN_UP.CONFIRM_PASSWORD_ERROR_DIFFERENT
      : null
  }

  const validateEmail = (value: string): string => {
    return !checkEmail(value) ? SIGN_UP.EMAIL_ERROR_REGEX : null
  }

  const validatePhone = (e: KeyboardEvent<HTMLInputElement>) => {}

  const handleClickSignUp = (e: KeyboardEvent<HTMLInputElement>): void => {
    e.preventDefault()
    if (!validateAll()) {
      alert('형식에 맞지 않는 항목이 있습니다.')
      setSignUpEnabled(false)
      return
    }

    signUp(userIdRef.value, passwordRef.value, emailRef.value)
  }

  const signUp = async (
    username: string,
    password: string,
    email: string,
    phone_number?: string
  ) => {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          // phone_number,   // optional - E.164 number convention
        },
      })
      console.log(user)
      alert('가입되었습니다.')
      history.push(LOGIN)
    } catch (e) {
      console.error(e)
      if (e.code === 'UsernameExistsException') {
        alert(SIGN_UP.USER_ID_ERROR_USED)
        setUsedUserIds([...usedUserIds, username])
        setUserIdInvalidReason(SIGN_UP.USER_ID_ERROR_USED)
      }
    }
  }

  const validateAll = (): boolean => {
    return (
      !validateUserId(userIdRef.value) &&
      !validatePassword(passwordRef.value) &&
      !validateConfirmPassword(confirmPasswordRef.value) &&
      !validateEmail(emailRef.value)
    )
  }

  const checkSignUpAvailability = (): void => {
    if (validateAll()) {
      setSignUpEnabled(true)
    } else {
      setSignUpEnabled(false)
    }
  }

  return (
    <Layout useHeader={false}>
      <Box className={classes.root}>
        <SignUpInput
          setRef={setRef}
          onChangeUserId={handleChangeUserId}
          onChangePassword={handleChangePassword}
          onChangeConfirmPassword={handleChangeConfirmPassword}
          onChangeEmail={handleChangeEmail}
          validatePhone={validatePhone}
          onClickSignUp={handleClickSignUp}
          userIdInvalidReason={userIdInvalidReason}
          passwordInvalidReason={passwordInvalidReason}
          confirmPasswordInvalidReason={confirmPasswordInvalidReason}
          emailInvalidReason={emailInvalidReason}
          isSignUpEnabled={isSignUpEnabled}
        />
      </Box>
    </Layout>
  )
}

export default SignUpPage
