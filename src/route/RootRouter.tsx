import * as React from 'react'
import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MAIN } from './routePath'
import Main from '@components/main/Main'


const Fallback: React.ReactNode = <></>

const RootRouter: React.FC = () => {
  return (
    <Suspense fallback={Fallback}>
      <Router>
        <Switch>
          <Route exact path={MAIN} component={Main} />
        </Switch>
      </Router>
    </Suspense>
  )
}

export default RootRouter