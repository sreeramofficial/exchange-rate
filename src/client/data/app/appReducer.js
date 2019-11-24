import { handleActions, updateProperty } from '../../utils/helpers';
import state from '../state';
import {
  SET_MESSAGE,
  SET_LOADING,
  SET_CURRENT_VAL,
  SET_CURRENT_POCKET,
  SET_CURRENT_DIRECTION,
} from './appActions';

const setMessage = (state, action) => updateProperty([ 'message' ], action.payload, state);
const setLoading = (state, action) => updateProperty([ 'loading' ], action.payload, state);
const setCurrentVal = (state, action) => updateProperty([ 'val' ], action.payload, state);
const setCurrentPocket = (state, action) => updateProperty([ 'pocket' ], action.payload, state);
const setCurrentDirection = (state, action) => updateProperty([ 'direction' ], action.payload, state);

export default handleActions({
  [SET_MESSAGE]: setMessage,
  [SET_LOADING]: setLoading,
  [SET_CURRENT_VAL]: setCurrentVal,
  [SET_CURRENT_POCKET]: setCurrentPocket,
  [SET_CURRENT_DIRECTION]: setCurrentDirection,
}, state.app);
