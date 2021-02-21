import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '@components/ui/Layout';
import LoginPage from '@components/login/LoginPage';
import { HOME, LOGIN, MAIN, SIGN_UP } from '@common/routePath';
import SignUpPage from '@components/login/SignUpPage';

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path={[MAIN, HOME]} component={Layout} />
      <Route exact path={LOGIN} component={LoginPage} />
      <Route exact path={SIGN_UP} component={SignUpPage} />
      {/* <Layout /> */}
    </Switch>
  );
};

export default Router;