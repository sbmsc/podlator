import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../utils/session';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
      getToken() ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to='/' />
      )
    }
  />
);

export default PrivateRoute;
