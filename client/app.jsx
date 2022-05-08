import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import NotFound from './pages/not-found';
import SignUp from './pages/sign-up';
import AppContext from './lib/app-context';
import Auth from './pages/auth';
import decodeToken from './lib/decode-token';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('user');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });

  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Auth />;
    }
    if (route.path === 'home') {
      return <Home />;
    }
    if (route.path === 'sign-up') {
      return <SignUp />;
    }
    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const contextValue = { user, route };
    return (
      <AppContext.Provider value={contextValue}>
      <>
        {this.renderPage()}
      </>
      </AppContext.Provider>

    );
  }
}
