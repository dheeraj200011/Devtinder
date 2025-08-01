import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">
          {login ? "Login" : "Register"}
        </legend>

        {!login && (
          <>
            <label className="label">Firstname</label>
            <input
              type="name"
              className="input"
              placeholder="Enter your firstname"
            />

            <label className="label">Lastname</label>
            <input
              type="name"
              className="input"
              placeholder="Enter your Lastname"
            />
          </>
        )}

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        {!login ? (
          <p>
            Already a user ?{" "}
            <Link onClick={() => setLogin(!login)}>Login Now</Link>
          </p>
        ) : (
          <p>
            New user ?{" "}
            <Link onClick={() => setLogin(!login)}>Register Now</Link>
          </p>
        )}
        <button className="btn btn-neutral mt-4">
          {login ? "Login" : "Register"}
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
