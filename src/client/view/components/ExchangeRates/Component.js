/* eslint-disable no-magic-numbers */
import React, { Component, Fragment } from 'react';
import SwipeableViews from 'react-swipeable-views';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import { convert } from '../../../data/inputs/inputsActions';
import { formatMoney } from '../../../utils/helpers';

const DELAY = 10000;

class ExchangeRates extends Component {
  state = {
    indexTop: 0,
    indexBottom: 1,
  };

  componentDidMount = () => {
    const { getPockets, getRates } = this.props;
    getPockets();
    window.setInterval(getRates, DELAY);
  };

  onChangeValue = (e, dir) => {
    const value = e.target.value;
    const { pockets, setValues } = this.props;
    const { indexTop, indexBottom } = this.state;

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
    const { classes, pockets, inputs, rates } = this.props;

    if (!pockets || !inputs || !rates) return null;
    return <Fragment>
      <div className={classNames(classes.container, 'exchange')}>
        {[ 'Top', 'Bottom' ].map(dir => <Swiper key={dir} dir={dir} onChangeIndex={this.onChangeIndex} onChangeValue={this.onChangeValue} {...this.props} index={this.state[`index${dir}`]} />)}
        <RateInfo {...this.props} />
        <Arrow {...this.props} />
      </div>
      <XButton onClick={this.onExchange} {...this.props} />
      <Typography className={classes.note} variant="caption">Note: The value of INR changes every 10 seconds. It fluctuates between 71 and 75. Other values remain the same. {JSON.stringify(rates)}</Typography>
    </Fragment>;
  }
}

export const isWholeNum = num => !(num % 1);

export const Swiper = props => {
  const { dir, onChangeIndex, onChangeValue, classes, pockets, inputs, index, rates, app: { direction } } = props;

  if (!pockets || !inputs || !rates) return null;
  return <Fragment>
    <SwipeableViews onSwitching={index => onChangeIndex(index, dir)} className={classNames(classes[`slide${dir}`], direction === dir ? classes.slideFrom : classes.slideTo)} index={index} enableMouseEvents>
      {Object.keys(pockets).map(pocket => <div key={pocket} className={classNames(classes.slide, 'slide-container')}>
        <div className={classes.sliderRow}>
          <Typography variant="h4" className={classNames(classes.currencyHeading, 'currency-header')}>{pocket}</Typography>
          <TextField variant="filled" id="standard-basic" className={classNames(classes.textInput, 'text-input')} onChange={e => onChangeValue(e, dir)} placeholder={'0'} value={+inputs[pocket][dir] === 0 ? '' : inputs[pocket][dir]} type="number" color="white" inputProps={{ autoComplete: "off" }} />
          <Typography variant="h5" className={classNames(classes.balance, 'balance')}><b>{formatMoney(pockets[pocket], pocket)}</b></Typography>
        </div>
      </div>)}
    </SwipeableViews>
    <MobileStepper
      variant="dots"
      steps={Object.keys(pockets).length}
      position="static"
      activeStep={index}
      className={classNames(direction === dir ? classes.slideFrom : classes.slideTo, classes[`stepper${dir}`], classes.stepper)}
      nextButton={null}
      backButton={null} />
  </Fragment>;
};

export const RateInfo = props => {
  const { classes, app: { direction, pocketTop, pocketBottom }, rates } = props;
  if (!pocketTop || !pocketBottom || !rates) return null;
  const fromDir = direction === 'Top' ? pocketTop : pocketBottom;
  const toDir = direction === 'Top' ? pocketBottom : pocketTop;

  return <Typography variant="h6" className={classNames(classes.rowFlex, classes.xr, 'rate-info')}>
    {`${formatMoney(1, fromDir)} = ${formatMoney(convert(fromDir, toDir, 1, rates), toDir)}`}
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