import React from 'react';
import Layout from '@components/ui/Layout';
import { Switch, Route } from 'react-router-dom';

const Router: React.FC = () => {
    return (
        <Switch>
            <Route exact path={['/', '/home']} component={Layout} />
            {/* <Layout /> */}
        </Switch>
    );
};

export default Router;