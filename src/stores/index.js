import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import { thunk } from 'redux-thunk';

import counterReducer from './counter';
import jobsReducer from './jobs';

const middleware = [
  thunk,
];

const reducers = combineReducers({
  counter: counterReducer,
  jobs: jobsReducer,
});

const composeEnhancers = typeof window === 'object'
  && process.env.NODE_ENV !== 'production'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

const store = createStore(reducers, enhancer);

export default store;
