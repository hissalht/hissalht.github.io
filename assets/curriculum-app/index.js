import React from 'react';
import ReactDOM from 'react-dom';


import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';
import App from './components/App';
import { fetchEntries } from './actions';
import { DataTypes } from './constants';

const store = createStore(rootReducer,composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    logger
  )
));

store.dispatch(fetchEntries(DataTypes.EDUCATION))
store.dispatch(fetchEntries(DataTypes.EXPERIENCE))

$(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    $('#curriculum-app-root').get()[0]
  );
});
