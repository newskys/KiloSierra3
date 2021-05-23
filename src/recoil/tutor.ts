import { UserRole, UserStatus } from '@interfaces/status'
import { atom, RecoilState, RecoilValueReadOnly, selector } from 'recoil'

const KEY = {
  STATE: 'tutorState',
  // GET_USER_ROLE: 'getTutor',
}

export interface TutorState {
  tutorId: string
  urlPath: string
  nickname: string
  career: string
  image: string
}

export const tutorState: RecoilState<TutorState> = atom({
  key: KEY.STATE,
  default: {
    tutorId: null,
    urlPath: null,
    nickname: null,
    career: null,
    image: null,
  },
})

// export const getTutorRole: RecoilValueReadOnly<TutorRole> = selector({
//   key: KEY.GET_USER_ROLE,
//   get: ({ get }) => {
//     const user: TutorState = get(tutorState)

//     return user.role
//   },
// })
