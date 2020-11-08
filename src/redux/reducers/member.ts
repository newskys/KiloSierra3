import { ActionType, createAction, createReducer } from 'typesafe-actions'

// action
export const SET_MEMBER = 'member/set'
export const setMember = createAction(SET_MEMBER)<SetMemberPayload>()

export type MemberAction = ActionType<typeof SET_MEMBER/* | typeof TEST2*/>

export interface MemberState {
  email: string
  token: string
}

export interface SetMemberPayload {
  email: string
  token: string
}

export interface SetMemberAction {
  type: typeof SET_MEMBER
  payload: SetMemberPayload
}

// store
const initialState: MemberState = {
  email: null,
  token: null,
}

// reducer
export default createReducer<MemberState, MemberAction>(initialState, {
  [SET_MEMBER]: (state: MemberState, { payload }: SetMemberAction) => {
    return {
      ...state,
      email: payload.email,
      token: payload.token,
    }
  },
})
