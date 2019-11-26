require('isomorphic-fetch');
import { createAction } from '../../utils/helpers';

import { setConvertedInputs } from '../inputs/inputsActions';

export const SET_MESSAGE = 'APP::MESSAGE';
export const SET_LOADING = 'APP::SET_LOADING';
export const SET_CURRENT_VAL = 'APP::SET_CURRENT_VAL';
export const SET_CURRENT_POCKET_TOP = 'APP::SET_CURRENT_POCKET_TOP';
export const SET_CURRENT_POCKET_BOTTOM = 'APP::SET_CURRENT_POCKET_BOTTOM';
export const SET_CURRENT_DIRECTION = 'APP::SET_CURRENT_DIRECTION';

export const setMessage = createAction(SET_MESSAGE);
export const setLoading = createAction(SET_LOADING);
export const setCurrentVal = createAction(SET_CURRENT_VAL);
export const setCurrentPocketTop = createAction(SET_CURRENT_POCKET_TOP);
export const setCurrentPocketBottom = createAction(SET_CURRENT_POCKET_BOTTOM);
export const setCurrentDirection = createAction(SET_CURRENT_DIRECTION);

export const setCurrentValues = (val, pocketTop, pocketBottom, direction) => (dispatch, getState) => {

  const valueChange = val !== getState().app.val;
  const significantSwipe = direction === getState().app.direction;

  if (valueChange || significantSwipe) {
    dispatch([
      setCurrentVal(val),
      setCurrentPocketTop(pocketTop),
      setCurrentPocketBottom(pocketBottom),
    ]);
    direction && dispatch(setCurrentDirection(direction));
    dispatch(setConvertedInputs());
  }

  // if (isNaN(val)) return;

  // if (valueChange || significantSwipe) {
  //   dispatch([
  //     setCurrentVal(val),
  //     setCurrentPocketTop(pocketTop),
  //     setCurrentDirectionBottom(direction),
  //     setConvertedInputs(),
  //   ]);
  //   if(pocketTo) dispatch(setCurrentPocketBottom(pocketTo));
  // }

  // else if (!significantSwipe) dispatch([
  //   setCurrentPocket(pocket),
  //   setCurrentPocketTo(pocketTo),
  // ]);

}