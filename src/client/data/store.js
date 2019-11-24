import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxMulti from './middlewares/reduxMulti';
import state from './state';

import appReducer from './app/appReducer';
import pocketsReducer from './pockets/pocketsReducer';
import ratesReducer from './rates/ratesReducer';
import inputsReducer from './inputs/inputsReducer';

const reducer = combineReducers({
  app: appReducer,
  pockets: pocketsReducer,
  rates: ratesReducer,
  inputs: inputsReducer,
});

const middleware = applyMiddleware(thunk, reduxMulti);

if (typeof window === 'undefined') {
  global.window = {};
}

export default middleware(createStore)(reducer, state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());