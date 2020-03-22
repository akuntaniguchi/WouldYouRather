import React from "react";
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
    { !props.loggedIn ? <Route path='/' component={ Login }/> :
      <Switch>
        <Route exact path='/' component={ Dashboard } />
        <Route exact path='/add' component={ NewQuestion }/>
        <Route exact path='/leaderboard' component={ Leaderboard } />
        <Route exact path="/questions/:id" component={ QuestionDetails } />
        <Route exact path='/logout' component={ Logout } />
        <Route component={ PageNotFound } />
      </Switch>
    }
      
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
