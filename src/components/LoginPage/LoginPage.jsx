import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();




  return (
    <div>

      <h1>Houseplant Palace</h1>

      <img
        src="place-of-worship-solid.svg"
        alt="Houseplant Palace Logo"
        width="200"
      />

      <LoginForm />

      {/* navigate to register page */}
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => { history.push('/registration') }}
        > Tap here to Register a as new user
        </button>
      </center>

    </div>
  );
}

export default LoginPage;
