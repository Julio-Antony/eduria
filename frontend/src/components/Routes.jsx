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
import ClassDetail from "../pages/ClassDetail";
import UserDetail from "../pages/UserDetail";
import Category from "../pages/Category";
import Course from "../pages/Course";
import CourseDetail from "../pages/CourseDetail";
import PaymentStatusPage from "../pages/PaymentStatusPage";
import MyCourse from "../pages/MyCourse";
import PaymentHistory from "../pages/PaymentHistory";

const Routes = () => {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/beranda" component={Home} />
      <Route path="/customers" component={Customers} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/course" component={Course} />
      <Route path="/my_course" component={MyCourse} />
      <Route path="/course_detail/:id" component={CourseDetail} />
      <Route path="/my_payments" component={PaymentHistory} />
      <Route path="/payment/status/:orderId" component={PaymentStatusPage} />
      <Route path="/kelas" component={Class} />
      <Route path="/detail_kelas/:id" component={ClassDetail} />
      <Route path="/kategori" component={Category} />
      <Route path="/mapel" component={Subject} />
      <Route path="/subject_detail/:id" component={SubjectDetail} />
      <Route path="/aktivitas" component={Log} />
      <Route path="/user" component={User} />
      <Route path="/user_detail/:id" component={UserDetail} />
    </Switch>
  );
};

export default Routes;
