import { LOGIN_SUCCESS_ACTION, FETCH_PROFILE_ACTION, RETRIEVE_TOKEN_ACTION } from './auth-actions';

const initialState = {
  username: null,
  token: null,
  name: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_SUCCESS_ACTION:
    return {
      ...state,
      token: action.user.token,
      username: action.user.username,
      name: action.user.name,

    };
  case FETCH_PROFILE_ACTION:
    return {
      ...state,
      token: action.user.token,
      username: action.user.username,
      name: action.user.name,
    };
  case RETRIEVE_TOKEN_ACTION:
    return {
      ...state,
      token: action.token,
    };
  case 'LOGOUT':
    return {
      ...initialState,
    };
  default:
    return state;
  }
};

export default authReducer;
