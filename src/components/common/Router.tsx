import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '@components/ui/Layout';
import LoginPage from '@components/login/LoginPage';
import { HOME, LOGIN, MAIN } from '@common/routePath';
import HomePage from '@components/login/HomePage';

const Router: React.FC = () => {
    return (
        <Switch>
            <Route exact path={[MAIN, HOME]} component={HomePage} />
            <Route exact path={LOGIN} component={LoginPage} />
            {/* <Layout /> */}
        </Switch>
    );
};

export default Router;