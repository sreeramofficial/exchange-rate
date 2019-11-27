import { handleActions, updateProperty } from '../../utils/helpers';
import state from '../state';
import {
  SET_MESSAGE,
  SET_LOADING,
  SET_CURRENT_VAL,
  SET_CURRENT_POCKET_TOP,
  SET_CURRENT_POCKET_BOTTOM,
  SET_CURRENT_DIRECTION,
  SET_BUTTON_DISABLED,
} from './appActions';

const setMessage = (state, action) => updateProperty([ 'message' ], action.payload, state);
const setLoading = (state, action) => updateProperty([ 'loading' ], action.payload, state);
const setCurrentVal = (state, action) => updateProperty([ 'val' ], action.payload, state);
const setCurrentPocketTop = (state, action) => updateProperty([ 'pocketTop' ], action.payload, state);
const setCurrentPocketBottom = (state, action) => updateProperty([ 'pocketBottom' ], action.payload, state);
const setCurrentDirection = (state, action) => updateProperty([ 'direction' ], action.payload, state);
const setButtonDisabled = (state, action) => updateProperty([ 'buttonDisabled' ], action.payload, state);

export default handleActions({
  [SET_MESSAGE]: setMessage,
  [SET_LOADING]: setLoading,
  [SET_CURRENT_VAL]: setCurrentVal,
  [SET_CURRENT_POCKET_TOP]: setCurrentPocketTop,
  [SET_CURRENT_POCKET_BOTTOM]: setCurrentPocketBottom,
  [SET_CURRENT_DIRECTION]: setCurrentDirection,
  [SET_BUTTON_DISABLED]: setButtonDisabled,
}, state.app);
