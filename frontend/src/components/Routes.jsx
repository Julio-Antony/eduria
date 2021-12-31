import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Schedule from "../pages/Schedule";

const Routes = () => {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/customers" component={Customers} />
      <Route path="/schedule" component={Schedule} />
    </Switch>
  );
};

export default Routes;
