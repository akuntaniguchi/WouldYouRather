import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import PropTypes from 'prop-types';

const Question = ({ question, history }) => {

  const loadQuestionDetails = (e, qid) => {
    const path = `/questions/` + qid;
    history.push(path);
  }

  return (
    <Card>
      <CardHeader>{`${question.author} asks:`}</CardHeader>
      <CardBody>
        <CardTitle>Would You Rather...</CardTitle>
        <ul>
          <li>{ question.optionOne.text }</li>
          <li>OR</li>
          <li>{ question.optionTwo.text }</li>
        </ul>
        <Button color='info' onClick={(e) => loadQuestionDetails(e, question.id)}>View Poll</Button>
      </CardBody>
    </Card>
  )
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state, { id }) => {
  return {
    question : state.questions[id],
    auth: state.authedUser,
  }
}

export default withRouter(connect(mapStateToProps, null)(Question))
