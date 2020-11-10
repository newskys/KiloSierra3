import * as React from 'react'
import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {LOGIN, MAIN} from './routePath'
import Main from '@components/main/Main'
import Login from "@components/main/Login";


const Fallback: React.ReactNode = <></>

const RootRouter: React.FC = () => {
  return (
    <Suspense fallback={Fallback}>
      <Router>
        <Switch>
          <Route exact path={LOGIN} component={Login} />
          <Route exact path={MAIN} component={Main} />
        </Switch>
      </Router>
    </Suspense>
  )
}

export default RootRouter