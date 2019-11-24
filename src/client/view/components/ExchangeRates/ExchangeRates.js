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
import { setConvertedInputs } from '../../../data/inputs/inputsActions';

import { formatMoney } from '../../../utils/helpers';

class ExchangeRates extends React.Component {
  state = {
    value: 0,
    activeDirection: 'from',
  }
  componentDidMount() {
    const { getPockets, getRates } = this.props;
    getPockets();
    getRates();
    // window.setInterval(getExchangeRates, 10000);
  }
  onChangeValue = (e, pocket, direction) => {
    const { setConvertedInputs } = this.props;
    setConvertedInputs(+e.target.value, pocket, direction);
    this.setState({
      value: +e.target.value,
      activeDirection: direction,
    });
  };
  onChangeIndex = (index, direction) => {
    const { pockets, setConvertedInputs } = this.props;
    if(direction === this.state.activeDirection) setConvertedInputs(this.state.value, Object.keys(pockets)[index], direction);
  };
  render() {
    const { classes, pockets, inputs, rates } = this.props;

    return pockets && inputs && rates &&
      <Fragment>
        <SwipeableViews onChangeIndex={index => this.onChangeIndex(index, 'from')} enableMouseEvents>
          {Object.keys(pockets).map(pocket => <div key={pocket} className={classNames(classes.slide, classes.topSlide)}>
            <Typography variant="h2" className={classes.currencyHeading}>{pocket}</Typography>
            <TextField id="standard-basic" label="" className={classes.textInput} onChange={e => this.onChangeValue(e, pocket, 'from')} value={inputs[pocket].from} type="text" color="white" autoFocus />
            <Typography variant="caption">You have {formatMoney(pockets[pocket], pocket)}</Typography>
          </div>)}
        </SwipeableViews>
        <SwipeableViews onChangeIndex={index => this.onChangeIndex(index, 'to')} enableMouseEvents>
          {Object.keys(pockets).map(pocket => <div key={pocket} className={classNames(classes.slide, classes.bottomSlide)}>
            <Typography variant="h2" className={classes.currencyHeading}>{pocket}</Typography>
            <TextField id="standard-basic" label="" className={classes.textInput} onChange={e => this.onChangeValue(e, pocket, 'to')} value={inputs[pocket].to} type="text" color="white" autoFocus />
            <Typography variant="caption">You have {formatMoney(pockets[pocket], pocket)}</Typography>
          </div>)}
        </SwipeableViews>
      </Fragment>
    ;
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  getPockets: data => dispatch(getPockets(data)),
  getRates: data => dispatch(getRates(data)),
  setConvertedInputs: (val, pocket, direction) => dispatch(setConvertedInputs(val, pocket, direction)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ExchangeRates));
