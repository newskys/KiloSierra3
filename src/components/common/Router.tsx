import { CONFIRM_CODE, FORGOT, HOME, LOGIN, MAIN, RESET, SCHEDULE, SIGN_UP } from '@common/routePath'

import ConfirmCodePage from '@components/pages/confirmcode/ConfirmCodePage'
import ForgotPasswordPage from '@components/pages/forgotpassword/ForgotPasswordPage'
import HomePage from '@components/pages/home/HomePage'
import LoginPage from '@components/pages/login/LoginPage'
import ResetPasswordPage from '@components/pages/resetpassword/ResetPasswordPage'
import SignUpPage from '@components/pages/signup/SignUpPage'

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SchedulePage from '@components/pages/schedule/SchedulePage'

const Router: React.FC = () => (
  <Switch>
    <Route exact path={[MAIN, HOME]} component={HomePage} />
    <Route exact path={SCHEDULE} component={SchedulePage} />
    <Route exact path={LOGIN} component={LoginPage} />
    <Route exact path={SIGN_UP} component={SignUpPage} />
    <Route exact path={CONFIRM_CODE} component={ConfirmCodePage} />
    <Route exact path={RESET} component={ResetPasswordPage} />
    <Route exact path={FORGOT} component={ForgotPasswordPage} />
    {/* <Layout /> */}
  </Switch>
)

export default Router
