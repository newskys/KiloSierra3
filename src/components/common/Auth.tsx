import { UserState, userState } from '@recoil/user';
import { Auth as AwsAuth } from 'aws-amplify';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  children: any
}

const Auth: React.FC<Props> = ({ children }) => {
  const [user, setUserState] = useRecoilState(userState)

  const getCurrentUserInfo = async () => {
    try {
      // const result = await AwsAuth.currentAuthenticatedUser()
      const result = {username: null, attributes: null}
      const userState: UserState = {
        isInit: true,
        userId: result.username,
        email: result.attributes?.email,
        emailVerified: result.attributes?.email_verified,
        phone: result.attributes?.phone_number,
        phoneVerified: result.attributes?.phone_number_verified,
      }
      console.log(userState)
      setUserState(userState)
    } catch (e) {
      console.error(e)
      const userState: UserState = {
        isInit: true,
        userId: null,
        email: null,
        emailVerified: null,
        phone: null,
        phoneVerified: null,
      }

      setUserState(userState)
    }
  }

  useEffect(() => {
    getCurrentUserInfo()
  }, [])

  return (
    <>{user.isInit && children}</>
  )
}

export default Auth
