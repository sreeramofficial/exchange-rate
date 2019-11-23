import React, { Component } from 'react';
import { connect } from 'react-redux';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MetaTags from '../../components/MetaTags/MetaTags';
import ExchangeRates from '../../components/ExchangeRates/ExchangeRates';
import { setMessage } from '../../../data/app/appActions';
import { getMetaTags } from '../../../utils/custom';

class Page extends Component {
  state = {
    metaTags: this.getMetaTags(),
  }
  getMetaTags() {
    const { match: { params: { folder = 'home', subfolder = 'home', post = 'home' } } } = this.props;
    return getMetaTags(folder, subfolder, post);
  }
  handleErrorClose() {
    const { setMessage } = this.props;
    setMessage(null);
  }
  render() {
    const { app: { message } } = this.props;
    const { metaTags } = this.state;

    return <div>
      <MetaTags {...metaTags} />
      {message && message.message && <ErrorMessage variant={message.type} message={message.message} duration={2000} handleErrorClose={this.handleErrorClose.bind(this)} />}
      <ExchangeRates />
    </div>;
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  setMessage: () => dispatch(setMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);