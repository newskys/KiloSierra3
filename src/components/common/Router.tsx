import { CONFIRM_CODE, FORGOT, HOME, LOGIN, MAIN, RESET, SIGN_UP } from '@common/routePath'
import ConfirmCodePage from '@components/login/ConfirmCodePage'
import ForgotPasswordPage from '@components/login/ForgotPasswordPage'
import HomePage from '@components/login/HomePage'
import LoginPage from '@components/login/LoginPage'
import ResetPasswordPage from '@components/login/ResetPasswordPage'
import SignUpPage from '@components/login/SignUpPage'

import React from 'react'
import { Route, Switch } from 'react-router-dom'

const Router: React.FC = () => (
  <Switch>
    <Route exact path={[MAIN, HOME]} component={HomePage} />
    <Route exact path={LOGIN} component={LoginPage} />
    <Route exact path={SIGN_UP} component={SignUpPage} />
    <Route exact path={CONFIRM_CODE} component={ConfirmCodePage} />
    <Route exact path={RESET} component={ResetPasswordPage} />
    <Route exact path={FORGOT} component={ForgotPasswordPage} />
    {/* <Layout /> */}
  </Switch>
)

export default Router
