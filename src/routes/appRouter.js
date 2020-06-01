import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import Login from '../components/Login/Login';
import Signup from '../components/SignUp/Signup';
import Transcript from '../components/TranscriptPlayer/Transcripter';
import Dashboard from '../components/Dashboard/Dashboard';
import PublicRoute from './publicroutes';
import PrivateRoute from './privateroutes';
import Payment from '../components/SignUp/Payment';
import Transcriber from '../components/TranscriptPlayer/Transcriber';
import Settings from '../components/Settings/Settings';
import Loader from '../components/SignUp/Redirecter';

const routes = (
  <Router>
    <div>
      <Switch>
        <PublicRoute exact path='/' component={Login} />
        <PublicRoute path='/payment' component={Payment} />
        <PublicRoute path='/signup' component={Signup} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <PrivateRoute path='/transcriber' component={Transcriber} />
        <PrivateRoute path='/transcript' component={Transcript} />
        <PrivateRoute path='/settings' component={Settings} />
        <PublicRoute path="/auth/google/callback" component={Loader}/>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);
export default routes;
