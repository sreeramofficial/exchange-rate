/* eslint-disable no-magic-numbers */
import { createAction } from '../../utils/helpers';
import { setMessage, setCurrentPocketTop, setCurrentPocketBottom } from '../app/appActions';
import { setInputs } from '../inputs/inputsActions';

export const SET_POCKETS = 'POCKETS::SET_POCKETS';

export const setPockets = createAction(SET_POCKETS);

export const getPockets = () => dispatch => {
  return fetch(`/pockets`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Network response was not ok.');
    })
    .then(json => {
      dispatch([
        setPockets(json),
        setInputs(json),
        setCurrentPocketTop(Object.keys(json)[0]),
        setCurrentPocketBottom(Object.keys(json)[0]),
      ]);
    })
    .catch(() => {
      dispatch([
        setMessage({
          message: 'Techincal error! Reduced functionality.',
          type: 'warning',
        }),
      ]);
    });
};