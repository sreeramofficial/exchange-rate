/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import reduxMulti from '../middlewares/reduxMulti';
import fetchMock from 'fetch-mock';

const middlewares = [ thunk, reduxMulti ];
const mockStore = configureMockStore(middlewares)

import { convert, setConvertedInputs, SET_INPUTS } from './inputsActions';

const rates = {
  usd: 1,
  gbp: 0.5,
  inr: 70,
};

describe('inputsActions', () => {

  describe('convert function', () => {
    it('Should convert usd to gbp correctly', () => {
      expect(convert('usd', 'gbp', 10, rates)).toEqual(5);
    });
    it('Should convert usd to inr correctly', () => {
      expect(convert('usd', 'inr', 10, rates)).toEqual(700);
    });
  });

  describe('setConvertedInputs', () => {
    it('Should convert the input value correctly to all other currencies', () => {
      const store = mockStore({
        app: {
          val: 20,
          pocketTop: 'usd',
          pocketBottom: 'gbp',
          direction: 'Top',
        },
        pockets: {
          usd: 0,
          gbp: 0,
          inr: 0,
        },
        rates: {
          usd: 1,
          gbp: 0.5,
          inr: 2,
        },
      });

      store.dispatch(setConvertedInputs());
      const expectedAction = [ {
        type: SET_INPUTS,
        payload: {
          usd: {
            Top: 20,
            Bottom: 20,
          },
          gbp: {
            Top: 20,
            Bottom: 10,
          },
          inr: {
            Top: 20,
            Bottom: 40,
          },
        },
      } ];
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

})