import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { history, store } from './redux'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import App from './App'
import './css/common/global.css'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
