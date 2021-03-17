import { SIGN_UP } from '@common/lang'
import { checkEmail, checkPassword, checkUserId } from '@common/regex'
import { LOGIN } from '@common/routePath'
import Layout from '@components/ui/Layout'
import SignUpInput from '@components/ui/SignUpInput'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Auth } from 'aws-amplify'
import axios from 'axios'
import React, { KeyboardEvent, useEffect, useState } from 'react'
import { useHistory, History } from 'react-router-dom'
import { useHeader } from '@hooks/useHeader'

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
  useHeader(false)
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
  const [inputIdTimeout, setInputIdTimeout] = useState<number>(null)

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

  useEffect(() => {
    // mount

    return () => {
      // unmount
      window.clearTimeout(inputIdTimeout)
    }
  }, [])

  const setRef = (userId, password, confirmPassword, email, phone): void => {
    setUserIdRef(userId)
    setPasswordRef(password)
    setConfirmPasswordRef(confirmPassword)
    setEmailRef(email)
    setPhoneRef(phone)
  }

  const handleChangeUserId = (e: KeyboardEvent<HTMLInputElement>): void => {
    const value: string = e.currentTarget.value
    let message: string = null

    if (!checkUserId(value)) {
      message = SIGN_UP.USER_ID_ERROR_REGEX
    } else if (usedUserIds.includes(value)) {
      message = SIGN_UP.USER_ID_ERROR_USED
    } else {
      window.clearTimeout(inputIdTimeout)
      const timeout: number = window.setTimeout(() => {
        checkSignUpId(value)
      }, 500)
      setInputIdTimeout(timeout)
    }

    // const hasUserId: boolean = await checkSignUpId(value)
    // if (hasUserId) {
    //   message = SIGN_UP.USER_ID_ERROR_USED
    // } 
    

    setUserIdInvalidReason(message)
  }

  const checkSignUpId = async (value: string) => {
    try {
      const apiId = await axios.get(`https://hu5mcclx4l.execute-api.ap-northeast-2.amazonaws.com/prod/hasuser?userId=${value}`)
  
      console.log(apiId.data);
      // return apiId.data

      if (apiId.data) {
        setUserIdInvalidReason('중복된 ID가 있습니다.')
      }
    } catch (e) {
      console.error(e.response.data.message)
      setUserIdInvalidReason(e.response.data.message)
      // return true
    }
  }

  const validateUserId = (value: string): boolean => {
    return checkUserId(value) && !usedUserIds.includes(value)
  }

  const handleChangePassword = (e: KeyboardEvent<HTMLInputElement>) => {
    const message: string = !validatePassword(e.currentTarget.value)
      ? SIGN_UP.PASSWORD_ERROR_REGEX
      : null
    setPasswordInvalidReason(message)

    const confirmMessage: string = !validateConfirmPassword(
      confirmPasswordRef.value
    )
      ? SIGN_UP.CONFIRM_PASSWORD_ERROR_DIFFERENT
      : null
    setConfirmPasswordInvalidReason(confirmMessage)
  }

  const validatePassword = (value: string): boolean => {
    return checkPassword(value)
  }

  const handleChangeConfirmPassword = (
    e: KeyboardEvent<HTMLInputElement>
  ): void => {
    const message: string = !validateConfirmPassword(e.currentTarget.value)
      ? SIGN_UP.CONFIRM_PASSWORD_ERROR_DIFFERENT
      : null
    setConfirmPasswordInvalidReason(message)
  }

  const validateConfirmPassword = (value: string): boolean => {
    return passwordRef.value === value
  }

  const handleChangeEmail = (e: KeyboardEvent<HTMLInputElement>): void => {
    const message: string = !validateEmail(e.currentTarget.value) ? SIGN_UP.EMAIL_ERROR_REGEX : null
    setEmailInvalidReason(message)
  }

  const validateEmail = (value: string): boolean => {
    return checkEmail(value)
  }

  const validatePhone = (e: KeyboardEvent<HTMLInputElement>) => {}

  const handleClickSignUp = (e: KeyboardEvent<HTMLInputElement>): void => {
    e.preventDefault()
    if (!validateAll()) {
      alert(SIGN_UP.ERROR_INVALID_FORMAT)
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
      // console.log(user)
      alert(SIGN_UP.OK)
      history.push(LOGIN)
    } catch (e) {
      console.error(e)
      if (e.code === 'UsernameExistsException') {
        setUsedUserIds([...usedUserIds, username])
        setUserIdInvalidReason(SIGN_UP.USER_ID_ERROR_USED)
      }
    }
  }

  const validateAll = (): boolean => {
    return (
      validateUserId(userIdRef.value) &&
      validatePassword(passwordRef.value) &&
      validateConfirmPassword(confirmPasswordRef.value) &&
      validateEmail(emailRef.value)
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
    <Layout>
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
