import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import PropTypes from 'prop-types';

const Leaderboard = ({ users }) => {
  return (
    <Fragment>
      { users.map((user, index) => (
        <Card>
          <CardHeader>
            {index + 1}
            <img src={ user.avatarURL } className='avatar' alt={`Avatar of ${ user.name }`}/>
            {user.name}
          </CardHeader>
          <CardBody>
            <CardTitle>Answered Questions: { user.questions.length }</CardTitle>
            <CardTitle>Created Questions: { Object.keys(user.answers).length  }</CardTitle>
          </CardBody>
        </Card>  
        ))}
    </Fragment>
  )
}

const mapStateToProps = ({ users }) => {
  const userScore = user =>
    Object.keys(user.answers).length + user.questions.length;
  return {
    users: Object.values(users).sort((a, b) => userScore(b) - userScore(a))
  }
}

Leaderboard.propTypes = {
  users: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(Leaderboard)
