require('isomorphic-fetch');
import { createAction } from '../../utils/helpers';
import { setMessage } from '../app/appActions';
import { setConvertedInputs } from '../inputs/inputsActions';

export const SET_RATES = 'RATES::SET_RATES';

export const setRates = createAction(SET_RATES);

export const getRates = () => dispatch => {
  return fetch(`/rates`, {
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
        setRates(json),
        setConvertedInputs(),
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