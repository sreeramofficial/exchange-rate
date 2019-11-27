/* eslint-disable no-magic-numbers */
import React, { Component, Fragment } from 'react';
import SwipeableViews from 'react-swipeable-views';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { convert } from '../../../data/inputs/inputsActions';
import { formatMoney } from '../../../utils/helpers';

const DELAY = 10000;

class ExchangeRates extends Component {
  state = {
    indexTop: 0,
    indexBottom: 0,
  };

  componentDidMount = () => {
    const { getPockets, getRates } = this.props;
    getPockets();
    getRates();
    window.setInterval(getRates, DELAY);
  };

  onChangeValue = (e, dir) => {
    const value = e.target.value;
    console.log(value);
    const { pockets, setValues } = this.props;
    const { indexTop, indexBottom } = this.state;

    if (isNaN(value)) return;
    setValues(value, Object.keys(pockets)[indexTop], Object.keys(pockets)[indexBottom], dir);
  };

  onChangeIndex = (index, dir) => {
    const { setValues, app: { val, direction }, pockets } = this.props;

    if (!isWholeNum(index) || index === this.state[`index${dir}`]) return;

    this.setState({
      [`index${dir}`]: index,
    }, () => {
      const { indexTop, indexBottom } = this.state;
      setValues(val, Object.keys(pockets)[indexTop], Object.keys(pockets)[indexBottom], direction);
    });
  };

  onExchange = () => {
    const { exchangePockets } = this.props;
    exchangePockets();
  };

  render() {
    const { classes } = this.props;
    const { indexTop, indexBottom } = this.state;

    return <Fragment>
      <div className={classNames(classes.container, 'exchange')}>
        <Swiper dir={'Top'} onChangeIndex={this.onChangeIndex} onChangeValue={this.onChangeValue} {...this.props} index={indexTop} />
        <Swiper dir={'Bottom'} onChangeIndex={this.onChangeIndex} onChangeValue={this.onChangeValue} {...this.props} index={indexBottom} />
        <RateInfo {...this.props} />
        <Arrow {...this.props} />
      </div>
      <XButton onClick={this.onExchange} {...this.props} />
    </Fragment>;
  }
}

export const isWholeNum = num => !(num % 1);

export const Swiper = props => {
  const { dir, onChangeIndex, onChangeValue, classes, pockets, inputs, index } = props;

  if (!pockets || !inputs ) return null;
  return <SwipeableViews onSwitching={index => onChangeIndex(index, dir)} className={classes[`slide${dir}`]} index={index} enableMouseEvents>
    {Object.keys(pockets).map(pocket => <div key={pocket} className={classNames(classes.slide, 'slide-container')}>
      <div className={classes.sliderRow}>
        <Typography variant="h4" className={classNames(classes.currencyHeading, 'currency-header')}>{pocket}</Typography>
        <TextField id="standard-basic" className={classNames(classes.textInput, 'text-input')} onChange={e => onChangeValue(e, dir)} value={inputs[pocket][dir]} type="text" color="white" inputProps={{ autoComplete: "off" }}/>
        <Typography variant="h4" className={classNames(classes.balance, 'balance')}><b>{formatMoney(pockets[pocket], pocket)}</b></Typography>
      </div>
    </div>)}
  </SwipeableViews>;
};

export const RateInfo = props => {
  const { classes, app: { pocketTop, pocketBottom }, rates } = props;
  if (!rates) return null;
  return <Typography variant="h6" className={classNames(classes.sliderRow, classes.xr, 'rate-info')}>
    {`${formatMoney(1, pocketTop)} = ${formatMoney(convert(pocketTop, pocketBottom, 1, rates), pocketBottom)}`}
  </Typography>
};

export const Arrow = props => {
  const { classes, app: { direction } } = props;
  return <Typography variant="h6" className={classes.arrow}>{direction === 'Top' ? '↓' : '↑'}</Typography>
};

export const XButton = props => {
  const { classes, app: { buttonDisabled }, onClick } = props;
  return <Fab disabled={buttonDisabled} onClick={onClick} className={classes.button} variant="extended" size="large" color="secondary"> Exchange </Fab>;
};

export default withStyles(styles)(ExchangeRates);