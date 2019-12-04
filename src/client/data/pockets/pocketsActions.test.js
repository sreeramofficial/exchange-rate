/* eslint-disable no-magic-numbers */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import reduxMulti from '../middlewares/reduxMulti';
import fetchMock from 'fetch-mock';

import {
  SET_POCKETS,
  getPockets,
} from './pocketsActions';
import { SET_MESSAGE } from '../app/appActions';

const middlewares = [ thunk, reduxMulti ];
const mockStore = configureMockStore(middlewares)

describe('Pockets actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates SET_POCKETS when fetching pockets has been done', () => {
    fetchMock.mock('/pockets', JSON.stringify({ usd: 100, gbp: 150 }));

    const expectedAction = [ {
      type: SET_POCKETS,
      payload: {
        usd: 100,
        gbp: 150,
      },
    } ];

    const store = mockStore({
      app: {
        val: 0,
      },
    })

    return store.dispatch(getPockets())
      .then(() => {
        expect(store.getActions()).toEqual(jasmine.objectContaining(expectedAction));
      });
  });

  it('creates SET_MESSAGE when fetching pockets fails', () => {
    fetchMock.mock('/pockets', 404);

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

    return store.dispatch(getPockets())
      .then(() => {
        expect(store.getActions()).toEqual(jasmine.objectContaining(expectedAction));
      });
  });
});
