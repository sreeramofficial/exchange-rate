import { handleActions, updateProperty } from '../../utils/helpers';
import state from '../state';
import {
  SET_INPUTS,
} from './inputsActions';

const setInputs = (state, action) => updateProperty(null, action.payload, state);

export default handleActions({
  [SET_INPUTS]: setInputs,
}, state.inputs);
