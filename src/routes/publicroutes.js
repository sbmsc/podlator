import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../session/session';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
      !getToken() ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to='/dashboard' />
      )
    }
  />
);

export default PublicRoute;
