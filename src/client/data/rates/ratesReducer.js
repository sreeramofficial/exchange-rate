import { handleActions, updateProperty } from '../../utils/helpers';
import state from '../state';
import {
  SET_RATES,
} from './ratesActions';

const setRates = (state, action) => updateProperty(null, action.payload, state);

export default handleActions({
  [SET_RATES]: setRates,
}, state.rates);
