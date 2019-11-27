import { connect } from 'react-redux';

import { getPockets } from '../../../data/pockets/pocketsActions';
import { getRates } from '../../../data/rates/ratesActions';
import { setValues, exchangePockets } from '../../../data/app/appActions';
import Component from './Component';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  getPockets: data => dispatch(getPockets(data)),
  getRates: data => dispatch(getRates(data)),
  setValues: (val, pocket, pocketTo, direction) => dispatch(setValues(val, pocket, pocketTo, direction)),
  exchangePockets: () => dispatch(exchangePockets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
