import { atom, RecoilState } from 'recoil'

const KEY = {
  STATE: 'footerState',
}

export interface FooterState {
  isVisible: boolean
}

const initialState: FooterState = {
  isVisible: false,
}

export const footerState: RecoilState<FooterState> = atom({
  key: KEY.STATE,
  default: initialState,
})
