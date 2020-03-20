import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Input, Button, Card, CardHeader, CardBody, CardTitle, CardSubtitle, Row, Col, Form, FormGroup } from 'reactstrap';
import { handleAddQuestion } from '../actions/shared';
import PropTypes from 'prop-types';

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    redirect: false
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    const { optionOne, optionTwo } = this.state;
    this.props.addQuestion(optionOne, optionTwo);
    this.setState({ redirect: true })
  }

  handleOnOptionOneChange = (event) => {
    event.preventDefault();
    this.setState({
      optionOne : event.target.value
    })
  }

  handleOnOptionTwoChange = (event) => {
    event.preventDefault();
    this.setState({
      optionTwo : event.target.value
    })
  }

  render() {
    const { optionOne, optionTwo, redirect } = this.state;

    if (redirect) {
      return <Redirect to='/' />
    }

    return (
      <Row>
        <Col sm="12" md={{ size: 7, offset: 3 }}>
          <Card>
            <CardHeader>Create New Question</CardHeader>
            <CardBody>
              <CardSubtitle>Complete the question:</CardSubtitle>
              <CardTitle>Would You Rather ...</CardTitle> 
              <Form onSubmit={this.handleOnSubmit}>
                <FormGroup>
                  <Input type="text"
                    value={ optionOne }
                    onChange={ this.handleOnOptionOneChange }
                    placeholder="Enter Option One Text Here" />
                </FormGroup>
                <CardSubtitle>OR</CardSubtitle>
                <FormGroup>
                  <Input type="text"
                    value={ optionTwo }
                    onChange={ this.handleOnOptionTwoChange }
                    placeholder="Enter Options Two Text Here" />
                </FormGroup>
                <Button color='primary' disabled={ optionOne === '' || optionTwo === '' }>Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (optionOne, optionTwo) => {
      dispatch(handleAddQuestion(optionOne, optionTwo))
    }
  }
}

NewQuestion.propTypes = {
  authedUser: PropTypes.string,
  addQuestion: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(NewQuestion)
