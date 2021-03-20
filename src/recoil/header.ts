import { HeaderType } from '@interfaces/header'
import { atom, RecoilState } from 'recoil'

const KEY = {
  STATE: 'headerState',
  // GET_USER: 'getUser',
}

export interface HeaderState {
  isVisible: boolean
  hasProfile: boolean
  profileUrl: string
  onClickProfile: Function
  title: string
  headerType: HeaderType
}

const initialState: HeaderState = {
  title: null,
  hasProfile: false,
  profileUrl: null,
  onClickProfile: () => {},
  isVisible: false,
  headerType: HeaderType.COMMON,
}

export const headerState: RecoilState<HeaderState> = atom({
  key: KEY.STATE,
  default: initialState,
})

// export const getUser: RecoilValueReadOnly<string> = selector({
//   key: KEY.GET_USER,
//   get: ({ get }) => {
//     const user: HeaderState = get(headerState)

//     return user.email
//   },
// })
