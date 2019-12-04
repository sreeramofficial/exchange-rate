/* eslint-disable no-magic-numbers */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import reduxMulti from '../middlewares/reduxMulti';
import fetchMock from 'fetch-mock';

import { getRates, SET_RATES } from './ratesActions';
import { SET_MESSAGE } from '../app/appActions';

const middlewares = [ thunk, reduxMulti ];
const mockStore = configureMockStore(middlewares)

describe('Rates actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates SET_RATES when fetching rates has been done', () => {
    fetchMock.mock('/rates', JSON.stringify({ usd: 1, gbp: 2 }));

    const expectedAction = [ {
      type: SET_RATES,
      payload: {
        usd: 1,
        gbp: 2,
      },
    } ];

    const store = mockStore({
      app: {
        val: 0,
        direction: 'Top',
      },
    })

    return store.dispatch(getRates())
      .then(() => {
        expect(store.getActions()).toEqual(jasmine.objectContaining(expectedAction));
      });
  });

  it('creates SET_MESSAGE when fetching rates fails', () => {
    fetchMock.mock('/rates', 404);

    const expectedAction = [ {
      type: SET_MESSAGE,
      payload: {
        message: 'Techincal error! Reduced functionality.',
        type: 'warning',
      },
    } ];

    const store = mockStore({
      app: {
        val: 0,
      },
    })

    return store.dispatch(getRates())
      .then(() => {
        expect(store.getActions()).toEqual(jasmine.objectContaining(expectedAction));
      });
  });

});
