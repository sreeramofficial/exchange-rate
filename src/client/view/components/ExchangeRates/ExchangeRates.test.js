/* eslint-disable */

import React from "react";
import ExchangeRate, { Swiper, RateInfo, isWholeNum } from "./Component";
import enzyme, { shallow, mount } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import sinon from 'sinon';

enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({});

const getPockets = sinon.stub();

const props = {
  getPockets,
  app: {
    pocketTop: 'usd',
    pocketBottom: 'gbp',
  },
  pockets: {
    usd: 100,
    gbp: 100,
    inr: 100,
  },
  inputs: {
    usd: {
      Top: 0,
      Bottom: 0,
    },
    gbp: {
      Top: 0,
      Bottom: 0,
    },
    inr: {
      Top: 0,
      Bottom: 0,
    },
  },
  rates: {
    usd: 1,
    gbp: 0.79,
    inr: 70,
  },
  classes: {
    row: {},
  },
};

describe("ExchangeRate Component", () => {
  it('calls getPockets and getRates on mount', () => {
    const newProps = { ...props };
    const wrapper = mount(<ExchangeRate {...newProps} />);
    expect(getPockets.calledOnce).toBe(true);
  });
});

describe("Swiper", () => {
  it("Shoud not render if pockets is null", () => {
    const newProps = { ...props };
    delete newProps.pockets;

    const wrapper = shallow(<Swiper {...newProps} />);
    expect(wrapper.find('.slide-container').length).toBe(0);
  });

  it("Shoud not render if inputs is null", () => {
    const newProps = { ...props };
    delete newProps.inputs;

    const wrapper = shallow(<Swiper {...newProps} />);
    expect(wrapper.find('.slide-container').length).toBe(0);
  });

  it("Shoud not render if rates is null", () => {
    const newProps = { ...props };
    delete newProps.rates;

    const wrapper = shallow(<Swiper {...newProps} />);
    expect(wrapper.find('.slide-container').length).toBe(0);
  });

  it("Shoud render a slide per pocket", () => {
    const newProps = { ...props };

    const wrapper = shallow(<Swiper {...newProps} />);
    expect(wrapper.find('.slide-container').length).toBe(3);
  });

  it("Shoud render an inputbox per pocket", () => {
    const newProps = { ...props };

    const wrapper = shallow(<Swiper {...newProps} />);
    expect(wrapper.find('.text-input').length).toBe(3);
  });

  it("Shoud render a balance per pocket", () => {
    const newProps = { ...props };

    const wrapper = shallow(<Swiper {...newProps} />);
    expect(wrapper.find('.balance').length).toBe(3);
  });

  it("Shoud render a currency header per pocket", () => {
    const newProps = { ...props };

    const wrapper = shallow(<Swiper {...newProps} />);
    expect(wrapper.find('.currency-header').length).toBe(3);
  });

});

describe("RateInfo", () => {
  it("Shoud not render if rates is not defined", () => {
    const newProps = { ...props, rates: null };

    const wrapper = shallow(<RateInfo {...newProps} />);
    expect(wrapper.find('.rate-info').length).toBe(0);
  });

  it("Shoud render if rates is defined", () => {
    const newProps = { ...props };

    const wrapper = shallow(<RateInfo {...newProps} />);
    expect(wrapper.find('.rate-info').length).toBe(1);
  });
});

describe("isWholeNum", () => {
  it("Should not return true for 1.2", () => {
    expect(isWholeNum(1.2)).toBe(false);
  });
  it("Should return true for 3", () => {
    expect(isWholeNum(3)).toBe(true);
  });
});