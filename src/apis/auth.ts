import { AUTH } from '@common/lang'
import { Profile } from '@interfaces/profile'
import { AuthError, UserRole, UserStatus } from '@interfaces/status'
import { getRecoilExternalLoadable } from '@recoil/RecoilExternalStatePortal'
import { userState, UserState } from '@recoil/user'
import { Auth } from 'aws-amplify'
import { getMyProfile } from './profile'

export const initUserProfile = async () => {
  const session = await Auth.currentSession()
  const token: string = session?.getIdToken()?.getJwtToken()
  window.__token = token

  const profile: Profile = await getMyProfile()
  console.log('p', profile)
  setProfile(profile)
  const recoilUserState: UserState = getRecoilExternalLoadable(userState).valueMaybe() as UserState
  console.log(recoilUserState)
}

export const setProfile = (profile: Profile) => {
  const { userId, email, userStatus, role } = profile
  const userState: UserState = {
    isInit: true,
    userId,
    email,
    status: UserStatus.CONFIRMED,
    role: UserRole.UNDEFINED,
  }
}

export const signIn = async (userId, password): Promise<UserState> => {
  try {
    const result = await Auth.signIn(userId, password)
    const session = await Auth.currentSession()

    const userState: UserState = {
      isInit: true,
      userId: result.username,
      email: result.attributes?.email,
      status: UserStatus.CONFIRMED,
      role: UserRole.UNDEFINED,
    }

    return userState
  } catch (e) {
    if (e.code === AuthError.NOT_CONFIRMED) {
      // this.props.updateUsername(email)
      const userState: UserState = {
        isInit: true,
        userId,
        password,
        email: null,
        status: UserStatus.NOT_CONFIRMED,
        role: UserRole.UNDEFINED,
      }
      return userState
      // this.props.onStateChange('confirmSignUp', {})
    } else if (e.code === AuthError.NOT_AUTHORIZED) {
      // The error happens when the incorrect password is provided
      throw new Error(AUTH.NOT_FOUND)
    } else if (e.code === AuthError.NOT_FOUND) {
      throw new Error(AUTH.NOT_FOUND)
      // The error happens when the supplied username/email does not exist in the Cognito user pool
      // this.setState({ error: 'Login failed.' })
    } else if (e.code === AuthError.RESET_REQUIRED) {
      const userState: UserState = {
        isInit: true,
        userId,
        password,
        email: null,
        status: UserStatus.RESET,
        role: UserRole.UNDEFINED,
      }
      return userState
      // throw new Error(AUTH.RESET_REQUIRED)
    } else {
      console.error(e)
      throw new Error(AUTH.NOT_FOUND)
    }
  }
}
