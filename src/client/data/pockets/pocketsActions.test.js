import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import reduxMulti from '../middlewares/reduxMulti';
import fetchMock from 'fetch-mock';

import {
  SET_POCKETS,
  getPockets,
} from './pocketsActions';

const middlewares = [ thunk, reduxMulti ];
const mockStore = configureMockStore(middlewares)

describe('Pockets actions', () => {
  it('creates SET_POCKETS when fetching pockets has been done', () => {
    // fetch.mockResponse(JSON.stringify({ usd: 100, gbp: 150 }));
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
});
