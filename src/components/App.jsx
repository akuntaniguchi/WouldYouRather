import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { handleInitialData }  from '../actions/shared';
import { connect } from 'react-redux';
import Routes from './Routes';
import Navigation from './Navigation';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Navigation/>
          <Routes/>
        </Fragment>
      </Router>
    );
  }
}
export default connect()(App)
