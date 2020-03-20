import { RECEIVE_USERS, USER_ANSWER_QUESTION, ADD_USER_QUESTION } from '../actions/users';

const users = (state = {}, action) => {
  switch(action.type) {

    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };

    case ADD_USER_QUESTION :
    return {
      ...state,
      [action.authedUser]: {
        ...state[action.authedUser],
        questions: state[action.authedUser].questions.concat([action.qid])
      }
    };

    case USER_ANSWER_QUESTION:
      return {
        ...state,
        [action.auth]: {
          ...state[action.auth],
          answers: {
            ...state[action.auth].answers,
            [action.qid]: action.option
          }
        }
      };

    default:
      return state
  }
}

export default users
