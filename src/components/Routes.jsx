import React, { Fragment } from "react";
import { connect } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Logout from './Logout';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import NewQuestion from "./NewQuestion";
import QuestionDetails from "./QuestionDetails";
import PageNotFound from "./PageNotFound";
import PropTypes from "prop-types";

const Routes = (props) => {
  return <div className="container">
    <Switch>
      { !props.loggedIn ? <Route path='/' exact component={ Login }/> :
        <Fragment>
          <Route path='/' exact component={ Dashboard } />
          <Route path='/add' component={ NewQuestion }/>
          <Route path='/leaderboard' exact component={ Leaderboard } />
          <Route path="/questions/:id" component={ QuestionDetails } />
          <Route exact path='/logout' component={ Logout } />
        </Fragment>
      }
      <Route component={ PageNotFound } />
    </Switch>
  </div>
}

const mapStateToProps = ({ authedUser }) => {
  return {
    loggedIn: authedUser !== null
  }
}

Routes.propTypes = {
  loggedIn: PropTypes.any
}

export default connect(mapStateToProps)(Routes)
