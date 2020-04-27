import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/index';
import App from './components/App';

/* eslint-disable no-underscore-dangle */
const store = createStore(reducers);
/* eslint-enable */

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
