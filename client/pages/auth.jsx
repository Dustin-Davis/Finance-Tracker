import React from 'react';
import SignIn from './sign-in';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {

    const { route } = this.context;

    return (
      <div className="row pt-5 align-items-center">
        <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
          <div className="card p-3 ">
            <SignIn
              key={route.path}
              action={route.path} />
          </div>
        </div>
      </div>
    );
  }
}

AuthPage.contextType = AppContext;
