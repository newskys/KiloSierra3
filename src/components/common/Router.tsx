import {
  ADD_SCHEDULE,
  CONFIRM_CODE,
  FORGOT,
  HOME,
  LOGIN,
  MAIN,
  MY_SCHEDULE,
  RESET,
  SCHEDULE,
  SIGN_UP,
  TUTORS,
} from '@common/routePath'

import ConfirmCodePage from '@components/pages/confirmcode/ConfirmCodePage'
import ForgotPasswordPage from '@components/pages/forgotpassword/ForgotPasswordPage'
import HomePage from '@components/pages/home/HomePage'
import LoginPage from '@components/pages/login/LoginPage'
import ResetPasswordPage from '@components/pages/resetpassword/ResetPasswordPage'
import SignUpPage from '@components/pages/signup/SignUpPage'

import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import SchedulePage from '@components/pages/schedule/SchedulePage'
import MySchedulePage from '@components/pages/my/MySchedulePage'
import ReservationPage from '@components/pages/booking/BookingModal'
import TutorsPage from '@components/pages/tutors/TutorsPage'

// const LoginPage = React.lazy(() => import('@components/pages/login/LoginPage'))

const Router: React.FC = () => (
  <Suspense fallback={<></>}>
    <Switch>
      <Route exact path={[MAIN, HOME]} component={HomePage} />
      <Route exact path={MY_SCHEDULE} component={MySchedulePage} />
      <Route exact path={SCHEDULE} component={SchedulePage} />
      <Route exact path={ADD_SCHEDULE} component={ReservationPage} />
      <Route exact path={LOGIN} component={LoginPage} />
      <Route exact path={SIGN_UP} component={SignUpPage} />
      <Route exact path={CONFIRM_CODE} component={ConfirmCodePage} />
      <Route exact path={RESET} component={ResetPasswordPage} />
      <Route exact path={FORGOT} component={ForgotPasswordPage} />
      <Route exact path={TUTORS} component={TutorsPage} />
      {/* <Layout /> */}
    </Switch>
  </Suspense>
)

export default Router
