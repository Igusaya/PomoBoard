import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './containers/App';
import settingReducer, { initialState } from './reducers/Setting';
import * as serviceWorker from './serviceWorker';

import './index.css';

const store = createStore(settingReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
