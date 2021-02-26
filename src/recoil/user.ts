import { UserStatus } from '@interfaces/status'
import { atom, RecoilState, RecoilValueReadOnly, selector } from 'recoil'

const KEY = {
  STATE: 'userState',
  GET_USER: 'getUser',
}

export interface UserState {
  isInit: boolean
  userId: string
  email: string
  emailVerified: boolean
  phone: string
  phoneVerified: boolean
  status: UserStatus
}

export const userState: RecoilState<UserState> = atom({
  key: KEY.STATE,
  default: {
    isInit: false,
    userId: null,
    email: null,
    emailVerified: false,
    phone: null,
    phoneVerified: false,
    status: null,
  },
})

export const getUser: RecoilValueReadOnly<string> = selector({
  key: KEY.GET_USER,
  get: ({ get }) => {
    const user: UserState = get(userState)

    return user.email
  },
})
