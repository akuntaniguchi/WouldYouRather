import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const User = ({ user }) => {
  return (
    <Fragment>
      <img src={ user.avatarURL } className='avatar' alt={`Avatar User: ${ user.name }`}/>
      <span>{ user.name }</span>
    </Fragment>
  )
}

const mapStateToProps = ({ users }, { id }) => {
  return {
    user : users[id]
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(User)
