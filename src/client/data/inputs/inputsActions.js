/* eslint-disable no-magic-numbers */
import { createAction } from '../../utils/helpers';

export const SET_INPUTS = 'INPUTS::SET_INPUTS';

export const setInputsRoot = createAction(SET_INPUTS);

export const setInputs = pockets => dispatch => {

  const data = {};

  for(let pocket in pockets) {
    data[pocket] = {
      from: 0,
      to: 0,
    };
  }

  dispatch(setInputsRoot(data));

};

export const setConvertedInputs = () => (dispatch, getState) => {
  const { app: { val, pocket, direction }, pockets, inputs, rates } = getState();

  const newInputs = { ...inputs };
  const otherDirection = direction === 'from' ? 'to' : 'from';

  for (let _pocket in pockets) {
    newInputs[_pocket][direction] = val;
    newInputs[_pocket][otherDirection] = convert(pocket, _pocket, val, rates);
  }

  dispatch([
    setInputsRoot(newInputs),
  ]);
};

export const convert = (fromCurr, toCurr, amt, rates) => {
  const res = rates[toCurr]/rates[fromCurr] * amt;
  return res % 1 === 0 ? res : res.toFixed(2);
};