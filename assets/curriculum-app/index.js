import { createStore, applyMiddleware, compose } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import { initialState } from './reducers';
import App from './components/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(
  // applyMiddleware(...middleware)
));
console.log(store.getState());

$(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    $('#curriculum-app-root').get()[0]
  );
});
