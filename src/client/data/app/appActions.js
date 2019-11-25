require('isomorphic-fetch');
import { createAction } from '../../utils/helpers';

import { setConvertedInputs } from '../inputs/inputsActions';

export const SET_MESSAGE = 'APP::MESSAGE';
export const SET_LOADING = 'APP::SET_LOADING';
export const SET_CURRENT_VAL = 'APP::SET_CURRENT_VAL';
export const SET_CURRENT_POCKET = 'APP::SET_CURRENT_POCKET';
export const SET_CURRENT_DIRECTION = 'APP::SET_CURRENT_DIRECTION';

export const setMessage = createAction(SET_MESSAGE);
export const setLoading = createAction(SET_LOADING);
export const setCurrentVal = createAction(SET_CURRENT_VAL);
export const setCurrentPocket = createAction(SET_CURRENT_POCKET);
export const setCurrentDirection = createAction(SET_CURRENT_DIRECTION);

export const setCurrentValues = (val, pocket, direction) => (dispatch, getState) => {
  if (val === getState().app.val && direction !== getState().app.direction) return;

  dispatch([
    setCurrentVal(val),
    setCurrentPocket(pocket),
    setCurrentDirection(direction),
    setConvertedInputs(),
  ]);
}