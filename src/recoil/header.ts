import { atom, RecoilState } from 'recoil'

const KEY = {
  STATE: 'headerState',
  // GET_USER: 'getUser',
}

export interface HeaderState {
  isVisible: boolean
  profileUrl: string
  onClickProfile: Function
  title: string
}

const initialState: HeaderState = {
  title: null,
  profileUrl: null,
  onClickProfile: () => {},
  isVisible: false,
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
