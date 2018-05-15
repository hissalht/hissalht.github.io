import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers';
import { initialState } from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(
  // applyMiddleware(...middleware)
));
console.log(store.getState());

