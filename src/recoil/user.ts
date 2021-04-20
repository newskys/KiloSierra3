import { UserRole, UserStatus } from '@interfaces/status'
import { atom, RecoilState, RecoilValueReadOnly, selector } from 'recoil'

const KEY = {
  STATE: 'userState',
  GET_USER_ROLE: 'getUserRole',
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

export const getUserRole: RecoilValueReadOnly<UserRole> = selector({
  key: KEY.GET_USER_ROLE,
  get: ({ get }) => {
    const user: UserState = get(userState)

    return user.role
  },
})
