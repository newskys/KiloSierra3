import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import member from '@reducers/member'

export interface RootState {}

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    member,
  })
