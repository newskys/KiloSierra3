import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '@components/ui/Layout';
import LoginPage from '@components/login/LoginPage';

const Router: React.FC = () => {
    return (
        <Switch>
            <Route exact path={['/', '/home']} component={Layout} />
            <Route exact path={'/login'} component={LoginPage} />
            {/* <Layout /> */}
        </Switch>
    );
};

export default Router;