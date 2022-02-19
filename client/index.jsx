import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Provider } from './Context/context';

ReactDOM.render(
  <Provider>
      <App />,
  </Provider>,
  document.querySelector('#root')
);
