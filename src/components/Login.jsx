import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { Card, CardHeader, CardBody, Row, Col, Input, Button, Form, FormGroup} from 'reactstrap';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId : ''
    }
  }

  handleOnSubmit = (event) => {
    if (this.state.userId) {
      this.props.dispatch(setAuthedUser(this.state.userId));
    } 
    event.preventDefault();
  }

  handleOnChangeUser = (event) => {
    this.setState({
      userId: event.target.value
    })
  }

  render() {
    const { users } = this.props;
    const { userId } = this.state;
    
    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
          <CardHeader>Select User</CardHeader>
          <CardBody>
          <Form onSubmit={this.handleOnSubmit}>
            <FormGroup>
              <Input 
                type="select"
                value={userId}
                onChange={this.handleOnChangeUser}>
                <option value="" disabled>Please select a user</option>
                { Object.keys(users).map(user =>
                  <option key={user} value={user}>
                    {users[user].name}
                  </option>)
                }
              </Input>
            </FormGroup>
            <Button color="primary" disabled={userId === ''}>Submit</Button>
          </Form>
          </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users
  }
}

Login.propTypes = {
  users: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Login)
