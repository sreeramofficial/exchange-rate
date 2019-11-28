import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import reduxMulti from '../middlewares/reduxMulti';

const middlewares = [ thunk, reduxMulti ];
const mockStore = configureMockStore(middlewares)

import {
  SET_BUTTON_DISABLED,
  setButtonDisabled,
  setButtonState,
  exchangePockets,
  formatVal,
} from './appActions';
import { SET_POCKETS } from '../pockets/pocketsActions';

describe('App actions', () => {

  describe('setButtonState', () => {

    it('Should create an action to set button disabled', () => {
      const expectedAction = {
        type: SET_BUTTON_DISABLED,
        payload: true,
      };
      expect(setButtonDisabled(true)).toEqual(expectedAction)
    });

    it('Should set button to disabled if transfer value is 0', () => {
      const store = mockStore({
        app: {
          val: '0',
          pocketTop: 'usd',
          pocketBottom: 'gbp',
          direction: 'Top',
        },
        pockets: {
          usd: 100,
          gbp: 100,
        },
      });
      store.dispatch(setButtonState());
      const expectedAction = [ {
        type: SET_BUTTON_DISABLED,
        payload: true,
      } ];
      expect(store.getActions()).toEqual(expectedAction);
    });

    it('Should set button to disabled if transfer value is greater than pocket value', () => {
      const store = mockStore({
        app: {
          val: '101',
          pocketTop: 'usd',
          pocketBottom: 'gbp',
          direction: 'Top',
        },
        pockets: {
          usd: 100,
          gbp: 100,
        },
      });
      store.dispatch(setButtonState());
      const expectedAction = [ {
        type: SET_BUTTON_DISABLED,
        payload: true,
      } ];
      expect(store.getActions()).toEqual(expectedAction);
    });

    it('Should set button to disabled if transfer currency is same as destination currency', () => {
      const store = mockStore({
        app: {
          val: '100',
          pocketTop: 'usd',
          pocketBottom: 'usd',
          direction: 'Top',
        },
        pockets: {
          usd: 100,
          gbp: 100,
        },
      });
      store.dispatch(setButtonState());
      const expectedAction = [ {
        type: SET_BUTTON_DISABLED,
        payload: true,
      } ];
      expect(store.getActions()).toEqual(expectedAction);
    });

    it('Should set button to enabled if transfer value is less than or equal to pocket value', () => {
      const store = mockStore({
        app: {
          val: '100',
          pocketTop: 'usd',
          pocketBottom: 'gbp',
          direction: 'Top',
        },
        pockets: {
          usd: 100,
          gbp: 100,
        },
      });
      store.dispatch(setButtonState());
      const expectedAction = [ {
        type: SET_BUTTON_DISABLED,
        payload: false,
      } ];
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  describe('exchangeCurrencies', () => {
    it('Should exchange currencites correctly', () => {
      const store = mockStore({
        app: {
          val: '10',
          pocketTop: 'usd',
          pocketBottom: 'gbp',
          direction: 'Top',
        },
        pockets: {
          usd: 100,
          gbp: 100,
        },
        rates: {
          usd: 1,
          gbp: 0.5,
        },
        inputs: {
          usd: {
            top: 10,
            bottom: 10,
          },
          gbp: {
            top: 10,
            bottom: 10,
          },
        },
      });
      store.dispatch(exchangePockets());

      const expectedAction = [ {
        type: SET_POCKETS,
        payload: {
          usd: 90,
          gbp: 105,
        },
      } ];
      expect(store.getActions()).toEqual(jasmine.objectContaining(expectedAction));
    });
  });

});

fdescribe('formatVal', () => {
  it('Should convert 0. to 0.00', () => {
    expect(formatVal('0.')).toBe('0.00');
  });
  it('Should convert 0 to 0', () => {
    expect(formatVal('0')).toBe('0');
  });
  // it('Should convert 0.0 to 0.00', () => {
  //   expect(formatVal('0.0')).toBe('0.00');
  // });
  // it('Should convert 0.012 to 0.12', () => {
  //   expect(formatVal('0.012')).toBe('0.12');
  // });
  // it('Should convert 0.1 to 0.10', () => {
  //   expect(formatVal('0.1')).toBe('0.10');
  // });
  // it('Should convert 0.123 to 1.23', () => {
  //   expect(formatVal('0.123')).toBe('1.23');
  // });
  // it('Should convert 1.2 to 1.20', () => {
  //   expect(formatVal('1.2')).toBe('1.20');
  // });
  // it('Should convert 1.234 to 12.34', () => {
  //   expect(formatVal('1.234')).toBe('12.34');
  // });
  // it('Should convert 12.3 to 12.30', () => {
  //   expect(formatVal('12.3')).toBe('12.30');
  // });
  // it('Should convert 12.345 to 123.45', () => {
  //   expect(formatVal('12.345')).toBe('123.45');
  // });
  // it('Should convert 123.4 to 123.40', () => {
  //   expect(formatVal('123.4')).toBe('123.40');
  // });
  // it('Should convert 123.456 to 1234.56', () => {
  //   expect(formatVal('123.456')).toBe('1234.56');
  // });
  // it('Should convert 1234.5 to 1234.50', () => {
  //   expect(formatVal('1234.5')).toBe('1234.50');
  // });
});