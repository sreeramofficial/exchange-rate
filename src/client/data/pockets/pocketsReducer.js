import { handleActions, updateProperty } from '../../utils/helpers';
import state from '../state';
import {
  SET_POCKETS,
  // SET_GBP,
  // SET_EUR,
  // SET_USD,
} from './pocketsActions';

const setPockets = (state, action) => updateProperty( null, action.payload, state);
// const setGBP = (state, action) => updateProperty([ 'gbp' ], action.payload, state);
// const setEUR = (state, action) => updateProperty([ 'eur' ], action.payload, state);
// const setUSD = (state, action) => updateProperty([ 'usd' ], action.payload, state);

export default handleActions({
  [SET_POCKETS]: setPockets,
  // [SET_GBP]: setGBP,
  // [SET_EUR]: setEUR,
  // [SET_USD]: setUSD,
}, state.pockets);
