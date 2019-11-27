/* eslint-disable no-magic-numbers */
import { createAction } from '../../utils/helpers';

export const SET_INPUTS = 'INPUTS::SET_INPUTS';

export const setInputsRoot = createAction(SET_INPUTS);

export const setInputs = pockets => dispatch => {

  const data = {};

  for(let pocket in pockets) {
    data[pocket] = {
      Top: 0,
      Bottom: 0,
    };
  }

  dispatch(setInputsRoot(data));

};

export const setConvertedInputs = () => (dispatch, getState) => {
  const { app: { val, pocketTop, pocketBottom, direction }, pockets, rates } = getState();

  const newInputs = {};
  const otherDirection = direction === 'Top' ? 'Bottom' : 'Top';
  for (let currency in pockets) {
    newInputs[currency] = {};
    newInputs[currency][direction] = val;
    const from = direction === 'Top' ? pocketTop : pocketBottom;
    newInputs[currency][otherDirection] = convert(from, currency, val, rates);
  }

  dispatch(setInputsRoot(newInputs));
};

export const convert = (fromCurr, toCurr, amt, rates) => {
  const res = rates[toCurr]/rates[fromCurr] * amt;
  return res % 1 === 0 ? res : +res.toFixed(2);
};