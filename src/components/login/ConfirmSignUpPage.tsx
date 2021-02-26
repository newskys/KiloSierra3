import ConfirmSignUpInput from '@components/ui/ConfirmSignUpInput'
import Layout from '@components/ui/Layout'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { userState, UserState } from '@recoil/user'
import { Auth } from 'aws-amplify'
import React, { KeyboardEvent, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useHistory, History } from 'react-router-dom'
import { HOME } from '@common/routePath'

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
  const classes = useStyles()
  const history: History = useHistory()
  const [user, setUserState] = useRecoilState<UserState>(userState)
  const [invalidReason, setInvalidReason] = useState<string>(null)
  const [isConfirmEnabled, setConfirmEnabled] = useState<boolean>(false)
  const [codeRef, setCodeRef] = useState<HTMLInputElement>(null)

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
      console.log(result)
      // history.push(HOME)
    } catch (e) {
      if (e.code === "CodeMismatchException") {
      setInvalidReason('코드가 다릅니다.')
      checkSignUpAvailability()
      }
      console.error(e)
    }
  }

  const resendEmail = async (userId) => {
    console.log(user)
    await Auth.resendSignUp(userId)
  }

  return (
    <Layout useHeader={false}>
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
