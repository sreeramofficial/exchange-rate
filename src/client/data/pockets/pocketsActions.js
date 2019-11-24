import { createAction } from '../../utils/helpers';
import { setMessage } from '../app/appActions';
import { setInputs } from '../inputs/inputsActions';
import { setLoading } from '../app/appActions';

export const SET_POCKETS = 'POCKETS::SET_POCKETS';

export const setPockets = createAction(SET_POCKETS);

export const getPockets = () => dispatch => {
  dispatch(setLoading(true));

  fetch(`/pockets`, {
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
        setLoading(false),
      ]);
    })
    .catch(() => {
      dispatch([
        setMessage({
          message: 'Techincal error! Reduced functionality.',
          type: 'warning',
        }),
        setLoading(false),
      ]);
    });
};