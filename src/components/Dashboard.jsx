import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames'
import Question from './Question';
import PropTypes from 'prop-types';

class DashBoard extends Component {
  state = {
    activeTab: '1'
  }

  onSwitchTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {
    const { unansweredQuestions, answeredQuestions } = this.props;
    const { activeTab } = this.state;

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { this.onSwitchTab('1'); }}>
              Unanswered Questions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { this.onSwitchTab('2'); }}>
              Answered Questions
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              { unansweredQuestions.map(qid =>
                <Col key={qid} sm="6" md="4">
                  <Question id={qid}/>
                </Col>
              )}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              { answeredQuestions.map(qid =>
                <Col key={qid} sm="6" md="4">
                  <Question id={qid}/>
                </Col>
              )}
            </Row>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

const mapStateToProps = ({ users, authedUser, questions }) => {
  const user = users[authedUser];

  const answeredQuestions = Object.keys(user.answers)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp);

  return {
    unansweredQuestions : Object.keys(questions).filter(qid => !answeredQuestions.includes(qid))
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp), answeredQuestions
  }
}

DashBoard.propTypes = {
  answeredPolls : PropTypes.array,
  unansweredPolls : PropTypes.array
}

export default connect(mapStateToProps)(DashBoard)
