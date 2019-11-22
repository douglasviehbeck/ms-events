import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { Signin, Signup } from "./screens/Auth";
import NotFound from "./screens/NotFound";
import Events from "./screens/Events";
import Certificates from "./screens/Certificates";
import Certificate from "./screens/Certificate";

import Route from "./screens/Route";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/events" component={Events} isPrivate />
      <Route path="/certificates" exact component={Certificates} isPrivate />
      <Route
        path="/certificates/:certificateId"
        component={Certificate}
        isPrivate
      />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
