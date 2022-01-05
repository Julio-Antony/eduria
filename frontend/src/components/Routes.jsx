import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Schedule from "../pages/Schedule";
import Home from "../pages/Home";
import Class from "../pages/Class";
import Subject from "../pages/Subject";
import Log from "../pages/Log";
import User from "../pages/User";
import SubjectDetail from "../pages/SubjectDetail";

const Routes = () => {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/beranda" component={Home} />
      <Route path="/customers" component={Customers} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/kelas" component={Class} />
      <Route path="/mapel" component={Subject} />
      <Route path="/subject_detail/:id" component={SubjectDetail} />
      <Route path="/aktivitas" component={Log} />
      <Route path="/user" component={User} />
    </Switch>
  );
};

export default Routes;
