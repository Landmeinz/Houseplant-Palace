import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <h1>Houseplant Palace</h1>

      <img
        src="place-of-worship-solid.svg"
        alt="Houseplant Palace Logo"
        width="200"
      />

      <RegisterForm />

      {/* navigate to Login page */}
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Tap here to Login with username
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
