/* eslint-disable no-magic-numbers */
require('isomorphic-fetch');
import { createAction } from '../../utils/helpers';

import { setConvertedInputs, convert } from '../inputs/inputsActions';
import { setPockets } from '../pockets/pocketsActions';

export const SET_MESSAGE = 'APP::MESSAGE';
export const SET_LOADING = 'APP::SET_LOADING';
export const SET_CURRENT_VAL = 'APP::SET_CURRENT_VAL';
export const SET_CURRENT_POCKET_TOP = 'APP::SET_CURRENT_POCKET_TOP';
export const SET_CURRENT_POCKET_BOTTOM = 'APP::SET_CURRENT_POCKET_BOTTOM';
export const SET_CURRENT_DIRECTION = 'APP::SET_CURRENT_DIRECTION';
export const SET_BUTTON_DISABLED = 'APP::SET_BUTTON_DISABLED';

export const setMessage = createAction(SET_MESSAGE);
export const setLoading = createAction(SET_LOADING);
export const setCurrentVal = createAction(SET_CURRENT_VAL);
export const setCurrentPocketTop = createAction(SET_CURRENT_POCKET_TOP);
export const setCurrentPocketBottom = createAction(SET_CURRENT_POCKET_BOTTOM);
export const setCurrentDirection = createAction(SET_CURRENT_DIRECTION);
export const setButtonDisabled = createAction(SET_BUTTON_DISABLED);

export const setValues = (val, pocketTop, pocketBottom, direction) => dispatch => {
  if (isNaN(+val)) return;
  if (val[val.length - 1] === '.') return;

  dispatch([
    setCurrentVal(formatVal(val)),
    setCurrentPocketTop(pocketTop),
    setCurrentPocketBottom(pocketBottom),
    setCurrentDirection(direction),
    setConvertedInputs(),
    setButtonState(),
  ]);
};

export const setButtonState = () => (dispatch, getState) => {
  const { app: { val: transferVal, pocketTop, pocketBottom, direction }, pockets } = getState();
  const transferFrom = direction === 'Top' ? pocketTop : pocketBottom;
  const transferTo = direction === 'Top' ? pocketBottom : pocketTop;
  const pocketVal = pockets[transferFrom];

  if (!+transferVal || pocketVal < +transferVal || transferFrom === transferTo) dispatch(setButtonDisabled(true));
  else dispatch(setButtonDisabled(false));
};

export const exchangePockets = () => (dispatch, getState) => {
  const { app: { val: transferVal, pocketTop, pocketBottom, direction }, pockets, rates } = getState();
  const transferFrom = direction === 'Top' ? pocketTop : pocketBottom;
  const transferTo = direction === 'Top' ? pocketBottom : pocketTop;
  let newPockets = { ...pockets };

  for (let currency in newPockets) {
    if (currency === transferFrom) newPockets[currency] -= transferVal;
    if (currency === transferTo) newPockets[currency] += convert(transferFrom, transferTo, transferVal, rates);
  }
  dispatch([
    setPockets(newPockets),
    setValues(0, pocketTop, pocketBottom, direction),
  ]);
};

export const formatVal = val => {
  const a = (+val / 100).toString();
  if(a.length === 4) return a;
  const b = val.split('.').pop().length;
  return (+val * Math.pow(10, b) / 100).toString();
}