import ConfirmSignUpInput from '@components/ui/ConfirmSignUpInput'
import Layout from '@components/ui/Layout'
import { useHeader } from '@hooks/useHeader'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { userState, UserState } from '@recoil/user'
import { Auth } from 'aws-amplify'
import React, { KeyboardEvent, useState } from 'react'
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

const ConfirmSignUpPage = () => {
  useHeader(false)
  const classes = useStyles()
  const [user, setUserState] = useRecoilState<UserState>(userState)
  const [invalidReason, setInvalidReason] = useState<string>(null)
  const [isConfirmEnabled, setConfirmEnabled] = useState<boolean>(false)
  const [codeRef, setCodeRef] = useState<HTMLInputElement>(null)
  // useHeader(true)

  // useEffect(() => {
  //   if (codeRef) {
  //     checkSignUpAvailability()
  //   }
  // }, [invalidReason])

  const setRef = (codeEl: HTMLInputElement) => {
    setCodeRef(codeEl)
  }

  const handleChangeCode = (e: KeyboardEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value

    if (!validateCode(value)) {
      setInvalidReason('형식에 맞지 않습니다.')
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
      const result = await Auth.confirmSignUp(username, code)
    } catch (e) {
      console.error(e)
    }
  }

  const resendEmail = async (userId) => {
    await Auth.resendSignUp(userId)
  }

  return (
    <Layout>
      <Box className={classes.root}>
        <ConfirmSignUpInput
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

export default ConfirmSignUpPage
