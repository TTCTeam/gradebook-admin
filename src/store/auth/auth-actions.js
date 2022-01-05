import { pending, showError, success } from '../ui/ui-actions';
// eslint-disable-next-line import/no-cycle
import { runLogoutTimer } from './auth-services';


export const LOGOUT_ACTION = 'LOGOUT';
export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS';
export const FETCH_PROFILE_ACTION = 'FETCH_PROFILE_ACTION';
export const RETRIEVE_TOKEN_ACTION = 'RETRIEVE_TOKEN_ACTION';

export function retrieveTokenAction(token) {
  return {
    type: RETRIEVE_TOKEN_ACTION,
    token,
  };
}

export function loginConfirmAction(user) {
  return {
    type: LOGIN_SUCCESS_ACTION,
    user,
  };
}

export function fetchProfileInfo(user) {
  return {
    type: FETCH_PROFILE_ACTION,
    user,
  };
}

export function signOut(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    history('/signin');
    dispatch({ type: 'LOGOUT' });
  };
}

export function signIn(credentials, history) {
  return async (dispatch) => {
    dispatch(pending());

    const url = `${process.env.REACT_APP_BASE_URL}/admin/signin`;

    const cre = `username=${credentials.username}&password=${credentials.password}`;
    const response = await fetch(url, {
      method: 'POST',
      body: cre,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000,
      );
      console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('expirationTime', expirationTime.toISOString());

      runLogoutTimer(dispatch, +data.expiresIn * 1000, history);
      dispatch(loginConfirmAction(data));
      dispatch(success());

        history('/');
    } else {
      dispatch(showError('Your account has not been registered! If you did please contact admin.'));
    }
  };
}