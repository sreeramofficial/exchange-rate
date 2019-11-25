/* eslint-disable no-magic-numbers */
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { connect } from 'react-redux';
import styles from './styles';
import { Typography } from '@material-ui/core';

import { getPockets } from '../../../data/pockets/pocketsActions';
import { getRates } from '../../../data/rates/ratesActions';
import { setCurrentValues } from '../../../data/app/appActions';
import { convert } from '../../../data/inputs/inputsActions';

import { formatMoney } from '../../../utils/helpers';

// const DELAY = 10000;

const isWholeNum = num => num % 1 === 0;

class ExchangeRates extends React.Component {
  state = {
  }
  componentDidMount() {
    const { getPockets, getRates } = this.props;
    getPockets();
    getRates();
    // window.setInterval(getRates, DELAY);
  }
  onChangeValue = (e, pocket, direction) => {
    const { setCurrentValues } = this.props;
    setCurrentValues(+e.target.value, pocket, direction);
  };
  onChangeIndexFrom = index => {
    if (!isWholeNum(index)) return;

    const { setCurrentValues, app: { val }, pockets } = this.props;
    setCurrentValues(val, Object.keys(pockets)[index], 'from');
  };
  onChangeIndexTo = index => {
    if (!isWholeNum(index)) return;

    const { setCurrentValues, app: { val }, pockets } = this.props;
    setCurrentValues(val, Object.keys(pockets)[index], 'to');
  }
  render() {
    const { classes, pockets, inputs, rates, app: { pocket } } = this.props;

    return pockets && inputs && rates &&
      <Fragment>
        <SwipeableViews onSwitching={this.onChangeIndexFrom} enableMouseEvents>
          {Object.keys(pockets).map(pocket => <div key={pocket} className={classNames(classes.slide, classes.topSlide)}>
            <div className={classes.slideRow1}>
              <Typography variant="h2" className={classes.currencyHeading}>{pocket}</Typography>
              <TextField id="standard-basic" label="" className={classes.textInput} onChange={e => this.onChangeValue(e, pocket, 'from')} value={inputs[pocket].from} type="text" color="white" autoFocus />
              <Typography variant="caption">You have {formatMoney(pockets[pocket], pocket)}</Typography>
            </div>
          </div>)}
        </SwipeableViews>
        {`${formatMoney(1, pocket)} = ${formatMoney(convert(pocket, 'inr', 1, rates), 'inr')}`}
        <SwipeableViews onSwitching={this.onChangeIndexTo} enableMouseEvents>
          {Object.keys(pockets).map(pocket => <div key={pocket} className={classNames(classes.slide, classes.bottomSlide)}>
            <div className={classes.slideRow1}>
              <Typography variant="h2" className={classes.currencyHeading}>{pocket}</Typography>
              <TextField id="standard-basic" label="" className={classes.textInput} onChange={e => this.onChangeValue(e, pocket, 'to')} value={inputs[pocket].to} type="text" color="white" autoFocus />
              <Typography variant="caption">You have {formatMoney(pockets[pocket], pocket)}</Typography>
            </div>
          </div>)}
        </SwipeableViews>
      </Fragment>;
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  getPockets: data => dispatch(getPockets(data)),
  getRates: data => dispatch(getRates(data)),
  setCurrentValues: (val, pocket, direction) => dispatch(setCurrentValues(val, pocket, direction)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ExchangeRates));
