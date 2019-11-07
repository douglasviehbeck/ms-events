import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Signin, Signup } from './screens/Auth';
import NotFound from './screens/NotFound';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/app" component={Signup} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;