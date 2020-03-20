export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const CLEAR_AUTHED_USER = 'CLEAR_AUTHED_USER';

export const setAuthedUser = (id) =>{
  return {
    type: SET_AUTHED_USER,
    id
  }
}

export const unsetAuthedUser = () => {
  return {
    type: CLEAR_AUTHED_USER
  }
}
