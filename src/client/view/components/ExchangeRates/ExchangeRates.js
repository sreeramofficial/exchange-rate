/* eslint-disable no-magic-numbers */
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { connect } from 'react-redux';
import styles from './styles';
import { Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';

import { getPockets } from '../../../data/pockets/pocketsActions';
import { getRates } from '../../../data/rates/ratesActions';
import { setValues, exchangeCurrencies } from '../../../data/app/appActions';
import { convert } from '../../../data/inputs/inputsActions';

import { formatMoney } from '../../../utils/helpers';

const DELAY = 5000;

const isWholeNum = num => num % 1 === 0;

class ExchangeRates extends React.Component {
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
    const value = +e.target.value;
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
    const { exchangeCurrencies } = this.props;
    exchangeCurrencies();
  };

  render() {
    const { app: { pocketTop, pocketBottom, inputDisabled }, classes, pockets, inputs, rates } = this.props;

    return pockets && inputs && rates && <Fragment>
      <div className={classes.container}>
        {[ 'Top', 'Bottom' ].map(dir => <SwipeableViews key={dir} onSwitching={index => this.onChangeIndex(index, dir)} enableMouseEvents>
          {Object.keys(pockets).map(pocket => <div key={pocket} className={classNames(classes.slide, classes[`slide${dir}`])}>
            <div className={classes.row}>
              <Typography variant="h2" className={classes.currencyHeading}>{pocket}</Typography>
              <TextField id="standard-basic" className={classes.textInput} onChange={e => this.onChangeValue(e, dir)} value={inputs[pocket][dir]} type="text" color="white" />
              <Typography variant="body2"><b>{formatMoney(pockets[pocket], pocket)}</b></Typography>
            </div>
          </div>)}
        </SwipeableViews>)}
        <Typography variant="h6" className={classNames(classes.row, classes.xr)}>
          {`${formatMoney(1, pocketTop)} = ${formatMoney(convert(pocketTop, pocketBottom, 1, rates), pocketBottom)}`}
        </Typography>
      </div>
      <Fab
        disabled={inputDisabled}
        onClick={this.onExchange}
        className={classes.button}
        variant="extended"
        size="large"
        color="secondary">
        Exchange
      </Fab>
    </Fragment>;
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  getPockets: data => dispatch(getPockets(data)),
  getRates: data => dispatch(getRates(data)),
  setValues: (val, pocket, pocketTo, direction) => dispatch(setValues(val, pocket, pocketTo, direction)),
  exchangeCurrencies: () => dispatch(exchangeCurrencies()),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ExchangeRates));
