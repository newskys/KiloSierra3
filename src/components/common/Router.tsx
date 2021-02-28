import { CONFIRM_SIGN_UP, FORGOT, HOME, LOGIN, MAIN, SIGN_UP } from '@common/routePath'
import ConfirmSignUpPage from '@components/login/ConfirmSignUpPage'
import ForgotPasswordPage from '@components/login/ForgotPasswordPage'
import HomePage from '@components/login/HomePage'
import LoginPage from '@components/login/LoginPage'
import SignUpPage from '@components/login/SignUpPage'

import React from 'react'
import { Route, Switch } from 'react-router-dom'

const Router: React.FC = () => (
  <Switch>
    <Route exact path={[MAIN, HOME]} component={HomePage} />
    <Route exact path={LOGIN} component={LoginPage} />
    <Route exact path={SIGN_UP} component={SignUpPage} />
    <Route exact path={CONFIRM_SIGN_UP} component={ConfirmSignUpPage} />
    <Route exact path={FORGOT} component={ForgotPasswordPage} />
    {/* <Layout /> */}
  </Switch>
)

export default Router
