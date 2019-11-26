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
// import { convert } from '../../../data/inputs/inputsActions';

import { formatMoney } from '../../../utils/helpers';

// const DELAY = 10000;

const isWholeNum = num => num % 1 === 0;

class ExchangeRates extends React.Component {
  state = {
    indexTop: 0,
    indexBottom: 0,
  }
  componentDidMount() {
    const { getPockets, getRates } = this.props;
    getPockets();
    getRates();
    // window.setInterval(getRates, DELAY);
  }
  onChangeValue = (e, dir) => {
    const value = +e.target.value;
    if (isNaN(value)) return;

    const { pockets, setCurrentValues } = this.props;
    const { indexTop, indexBottom } = this.state;
    const pocketTop = Object.keys(pockets)[indexTop];
    const pocketBottom = Object.keys(pockets)[indexBottom];

    setCurrentValues(value, pocketTop, pocketBottom, dir);
  };
  onChangeIndex = (index, dir) => {
    if (!isWholeNum(index) || index === this.state[`index${dir}`]) return;

    const { setCurrentValues, app: { val }, pockets } = this.props;

    this.setState({
      [`index${dir}`]: index,
    }, () => {
      const { indexTop, indexBottom } = this.state;
      setCurrentValues(val, Object.keys(pockets)[indexTop], Object.keys(pockets)[indexBottom], null);
    });

  };
  render() {
    const { classes, pockets, inputs, rates } = this.props;

    return pockets && inputs && rates && <Fragment>
      {[ 'Top', 'Bottom' ].map(dir => <SwipeableViews key={dir} onSwitching={index => this.onChangeIndex(index, dir)} enableMouseEvents>
        {Object.keys(pockets).map(pocket => <div key={pocket} className={classNames(classes.slide, classes[`slide${dir}`])}>
          <div className={classes.slideRow}>
            <Typography variant="h2" className={classes.currencyHeading}>{pocket}</Typography>
            <TextField id="standard-basic" className={classes.textInput} onChange={e => this.onChangeValue(e, dir)} value={inputs[pocket][dir]} type="text" color="white" />
            <Typography variant="caption"><b>{formatMoney(pockets[pocket], pocket)}</b></Typography>
          </div>
          <div className={classes.slideRow}>
          </div>
        </div>)}
      </SwipeableViews>)}
    </Fragment>;
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  getPockets: data => dispatch(getPockets(data)),
  getRates: data => dispatch(getRates(data)),
  setCurrentValues: (val, pocket, pocketTo, direction) => dispatch(setCurrentValues(val, pocket, pocketTo, direction)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ExchangeRates));
