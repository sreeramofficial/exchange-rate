/* eslint-disable no-magic-numbers */
import { createAction } from '../../utils/helpers';
import { setCurrentPocket, setCurrentVal, setCurrentDirection } from '../app/appActions';

export const SET_INPUTS = 'POCKETS::SET_INPUTS';

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

export const setConvertedInputs = (val, pocket, direction) => (dispatch, getState) => {
  const { app: { val : currentVal, pocket: currentPocket, direction: currentDirection }, pockets, inputs, rates } = getState();
  if(!val && val !== 0) val = currentVal;
  if(!pocket) pocket = currentPocket;
  if(!direction) direction = currentDirection;

  const newInputs = { ...inputs };
  const otherDirection = direction === 'from' ? 'to' : 'from';

  // newInputs[pocket][direction] = val;

  for (let _pocket in pockets) {
    newInputs[_pocket][direction] = val;
    newInputs[_pocket][otherDirection] = convert(pocket, _pocket, val, rates);
  }

  dispatch([
    setInputsRoot(newInputs),
    setCurrentVal(val),
    setCurrentPocket(pocket),
    setCurrentDirection(direction),
  ]);
}

const convert = (fromCurr, toCurr, amt, rates) => {
  return rates[toCurr]/rates[fromCurr] * amt;
}