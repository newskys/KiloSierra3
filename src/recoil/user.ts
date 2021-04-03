import { UserRole, UserStatus } from '@interfaces/status'
import { atom, RecoilState, RecoilValueReadOnly, selector } from 'recoil'

const KEY = {
  STATE: 'userState',
  GET_USER: 'getUser',
}

export interface UserState {
  isInit: boolean
  userId: string
  password?: string
  email: string
  status: UserStatus
  role: UserRole
}

export const userState: RecoilState<UserState> = atom({
  key: KEY.STATE,
  default: {
    isInit: false,
    userId: null,
    password: null,
    email: null,
    status: null,
    role: null,
  },
})

export const getUser: RecoilValueReadOnly<string> = selector({
  key: KEY.GET_USER,
  get: ({ get }) => {
    const user: UserState = get(userState)

    return user.email
  },
})
