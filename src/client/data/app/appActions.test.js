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

    it('Should set button to disabled if transfer value is negative', () => {
      const store = mockStore({
        app: {
          val: '-2.00',
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

describe('formatVal', () => {
  it('Should convert 1 to 0.01', () => {
    expect(formatVal("1")).toBe("0.01");
  });
  it('Should convert 0.010 to 0.10', () => {
    expect(formatVal("0.010")).toBe("0.10");
  });
  it('Should convert 0.100 to 1.00', () => {
    expect(formatVal("0.100")).toBe("1.00");
  });
  it('Should convert 1.000 to 10.00', () => {
    expect(formatVal("1.000")).toBe("10.00");
  });
  it('Should convert 10.012 to 100.12', () => {
    expect(formatVal("10.012")).toBe("100.12");
  });
});