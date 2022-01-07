import React from 'react';
import './SignInPage.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/auth/auth-actions';
import { useNavigate } from 'react-router-dom';
import { FormHelperText } from '@mui/material';
import { useSelector } from 'react-redux';

export default function SignInPage() {
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = React.useRef();
  const password = React.useRef();

  const loginHandler = () => {
    if (username.current.value !== '' && password.current.value !== '') {
      const credentials = {
        username: username.current.value,
        password: password.current.value,
      };
      dispatch(signIn(credentials, navigate));
    }
  };
  return (
    <div className="signin-page">
      <div className="container">
        <div className="title">Sign in</div>
        <TextField
          className="field"
          label="Username"
          variant="outlined"
          inputRef={username}
        />
        <TextField
          inputRef={password}
          className="field"
          label="Password"
          variant="outlined"
          type="password"
        />
        <FormHelperText sx={{ marginBottom: 1 }} error={ui.request === 'error'}>
          {ui.message}
        </FormHelperText>
        <Button variant="contained" onClick={loginHandler}>
          Sign in
        </Button>
      </div>
    </div>
  );
}
