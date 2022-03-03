import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import NotFound from './pages/not-found';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <SignIn />;
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
    return (
      <>
        {this.renderPage()}
      </>
    );
  }
}
