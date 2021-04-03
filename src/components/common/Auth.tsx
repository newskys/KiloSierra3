import { initUserProfile } from '@apis/auth'
import { getMyProfile } from '@apis/profile'
import { Profile } from '@interfaces/profile'
import { UserState, userState } from '@recoil/user'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Auth as AwsAuth } from 'aws-amplify'
import { UserRole, UserStatus } from '@interfaces/status'

interface Props {
  children: any
}

const Auth: React.FC<Props> = ({ children }) => {
  const [user, setUserState] = useRecoilState(userState)

  useEffect(() => {
    // getCurrentUserInfo()
    initUserProfile()
  }, [])

  const initUserProfile = async () => {
    try {
      const session = await AwsAuth.currentSession()
      const token: string = session?.getIdToken()?.getJwtToken()
      window.__token = token
      const profile: Profile = await getMyProfile()
      console.log('profile', profile)

      setUserState({
        isInit: true,
        userId: profile.userId,
        email: profile.email,
        status: profile.userStatus,
        role: profile.role,
      })
    } catch (e) {
      console.error(e)
      setUserState({
        isInit: true,
        userId: null,
        email: null,
        status: UserStatus.ANONYMOUS,
        role: UserRole.UNDEFINED,
      })
    }
  }

  return <>{user.isInit && children}</>
}

export default Auth
