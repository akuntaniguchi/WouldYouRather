import React, { Component, Fragment } from "react";
import { Link , withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { Nav, Navbar, NavItem, NavbarBrand, NavbarToggler, NavLink, Collapse } from "reactstrap";
import User from "./User";
import PropTypes from "prop-types";

class Navigation extends Component {
  state = {
    open: false
  }

  onToggle = () =>  {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const { authedUser } = this.props;
    const { open } = this.state;

    return (
      <Navbar bg="primary" light expand="md">
        <NavbarBrand tag={Link} to="/">Would You Rather...</NavbarBrand>
        { authedUser &&
          <Fragment>
            <NavbarToggler onClick={this.onToggle}/>
            <Collapse isOpen={open} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <User id={authedUser}/>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/add">+ New Question</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/leaderboard">LeaderBoard</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to='/logout'>Logout</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Fragment>}
      </Navbar>
    )
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  }
}

Navigation.propTypes = {
  authedUser: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, null)(Navigation))