import { AUTH } from '@common/lang'
import { AuthError, UserStatus } from '@interfaces/status'
import { UserState } from '@recoil/user'
import { Auth } from 'aws-amplify'

export const signIn = async (userId, password): Promise<UserState> => {
  try {
    const result = await Auth.signIn(userId, password)
    const userState: UserState = {
      isInit: true,
      userId: result.username,
      email: result.attributes?.email,
      emailVerified: result.attributes?.email_verified,
      phone: result.attributes?.phone_number,
      phoneVerified: result.attributes?.phone_number_verified,
      status: UserStatus.NORMAL,
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
        emailVerified: null,
        phone: null,
        phoneVerified: null,
        status: UserStatus.TEMP,
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
        emailVerified: null,
        phone: null,
        phoneVerified: null,
        status: UserStatus.RESET,
      }
      return userState
      // throw new Error(AUTH.RESET_REQUIRED)
    } else {
      console.error(e)
      throw new Error(AUTH.NOT_FOUND)
    }
  }
}
