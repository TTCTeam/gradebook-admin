import React from 'react';
import './SignInPage.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SignInPage() {
  return (
    <div className="signin-page">
      <div className="container">
        <div className="title">Sign in</div>
        <TextField className="field" label="Username" variant="outlined" />
        <TextField
          className="field"
          label="Password"
          variant="outlined"
          type="password"
        />
        <Button variant="contained">Sign in</Button>
      </div>
    </div>
  );
}
