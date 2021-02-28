import { UserState, userState } from '@recoil/user'
import Amplify, { Auth } from 'aws-amplify'
import { Authenticator } from 'aws-amplify-react'
import React, { useEffect, useState, MouseEvent } from 'react'
import { useRecoilState } from 'recoil'
import Login from '../ui/LoginInput'
import awsconfig from '../../aws-exports'
import { useHistory, History } from 'react-router-dom'
import { CONFIRM_CODE, HOME } from '@common/routePath'
import { UserStatus } from '@interfaces/status'
import { signIn } from '@apis/auth'

Amplify.configure(awsconfig)

const LoginContainer: React.FC = () => {
  const [userIdElement, setUserIdElement] = useState(null)
  const [passwordElement, setPasswordElement] = useState(null)
  const [user, setUserState] = useRecoilState<UserState>(userState)
  const history: History = useHistory()

  useEffect(() => {
    switch (user.status) {
      case UserStatus.NORMAL:
        history.replace(HOME)
        break
      case UserStatus.TEMP:
        history.replace(CONFIRM_CODE)
        break
      case UserStatus.RESET:
        break
      default:
        break
    }
  }, [user])

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    const userId = userIdElement.value
    const password = passwordElement.value

    requestApi(userId, password)
  }

  const requestApi = async (userId: string, password: string) => {
    try {
      const userState: UserState = await signIn(userId, password)
      setUserState(userState)
    } catch (e) {
      alert(e)
    }
  }

  const setRef = (userIdEl: HTMLInputElement, passwordEl: HTMLInputElement) => {
    setUserIdElement(userIdEl)
    setPasswordElement(passwordEl)
  }

  return (
    <>
      <Authenticator hideDefault={true} amplifyConfig={awsconfig}>
        <Login setRef={setRef} onClick={handleClick} />
      </Authenticator>
    </>
  )
}

export default LoginContainer
