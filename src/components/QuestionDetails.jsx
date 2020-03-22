import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardHeader,CardBody, CardTitle, CardSubtitle, Progress, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import User from './User';
import { handleAnswer } from '../actions/shared';
import PropTypes from 'prop-types';

class QuestionDetails extends Component {
  state = {
    selectedOption: ''
  }

  radioSelected = (e) => {
    this.setState({
      selectedOption: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveQuestionAnswer(this.state.selectedOption);
  }

  render() {
    const { question, answer, questionAuthor, optionOneVotes, optionTwoVotes, totalVotes, option1Percent, option2Percent } = this.props;
    const { selectedOption } = this.state;

    return (
      <Row>
        <Col sm="12" md={{ size: 7, offset: 3 }}>
          <Card>
            <CardHeader>
              <User id={ questionAuthor.id }/>
            </CardHeader>
            <CardBody>
              <CardTitle>Would You Rather...</CardTitle>
              { answer ?
                <div>
                  <div className='container'>
                    <CardSubtitle>{ question.optionOne.text }</CardSubtitle>
                    <CardSubtitle>{ `Votes: ${optionOneVotes}` }</CardSubtitle>
                    <Progress value={ option1Percent }>{ option1Percent }</Progress>
                  </div>
                  <div className='container'>
                    <CardSubtitle>{ question.optionTwo.text }</CardSubtitle>
                    <CardSubtitle>{ `Votes: ${optionTwoVotes}`}</CardSubtitle>
                    <Progress value={ option2Percent }>{ option2Percent }</Progress>
                  </div>
                  <div className='container'>
                    <CardSubtitle>{ `Total number of votes: ${ totalVotes }` }</CardSubtitle>
                  </div>
                </div>
                :
                <Form onSubmit={ this.handleSubmit }>
                  <FormGroup>
                    <FormGroup >
                      <Label>
                        <div className='container'>
                          <Input type="radio" value="optionOne" onChange={ this.radioSelected } />{' '}
                          { question.optionOne.text }
                        </div>
                      </Label>
                    </FormGroup>
                    <FormGroup >
                      <Label>
                        <div className='container'>
                          <Input type="radio" value="optionTwo" onChange={ this.radioSelected } />{' '}
                          { question.optionTwo.text }
                        </div>       
                      </Label>
                    </FormGroup>
                  </FormGroup>
                  <Button color='primary' disabled={ selectedOption === '' }>Submit</Button>
                </Form>}
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({ questions, users, authedUser }, { match }) => {
  let answer
  const { id } = match.params;
  const answers = users[authedUser].answers;
  const question = questions[id];

  if (answers.hasOwnProperty(question.id)) {
    answer = answers[question.id]
  }

  const questionAuthor = users[question.author];
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const option1Percent = Number.parseFloat((question.optionOne.votes.length/totalVotes) * 100).toFixed(2);
  const option2Percent = Number.parseFloat((question.optionTwo.votes.length/totalVotes) * 100).toFixed(2);

  return {
    question,
    answer,
    questionAuthor,
    optionOneVotes,
    optionTwoVotes,
    totalVotes,
    option1Percent,
    option2Percent
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const { id } = props.match.params;

  return {
    saveQuestionAnswer: (answer) => {
      dispatch(handleAnswer(id, answer))
    }
  }
}

QuestionDetails.propTypes = {
  question: PropTypes.object,
  answer: PropTypes.string,
  questionAuthor: PropTypes.object,
  option1Percent: PropTypes.string.isRequired,
  option2Percent: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails)
