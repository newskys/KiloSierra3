import { createBrowserHistory, History } from 'history'
import { applyMiddleware, createStore, StoreEnhancer } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './store'
import { ENV } from '@utils/constant'

export const history: History = createBrowserHistory()
const initialState: Object = {}

const enhancers: StoreEnhancer = (() => {
  if (process.env.NODE_ENV === ENV.PRODUCTION) {
    return applyMiddleware(routerMiddleware(history))
  } else {
    return composeWithDevTools(applyMiddleware(routerMiddleware(history)))
  }
})()

export const store = createStore(reducer(history), initialState, enhancers)
