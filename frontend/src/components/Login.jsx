import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUrl, signupUrl } from "../../utils/constants.js";
import axios from "axios";

const Login = () => {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handledata = (key, value) => {
    setLoginData((prev) => ({ ...prev, [key]: value }));
  };

  const submitLogin = async () => {
    if (!loginData.email || !loginData.password) {
      alert("Email and password are required");
      return;
    }

    if (!login && (!loginData.firstname || !loginData.lastname)) {
      alert("Firstname and lastname are required for registration");
      return;
    }

    try {
      if (!login) {
        const response = await axios.post(signupUrl, {
          firstName: loginData.firstname,
          lastName: loginData.lastname,
          email: loginData.email,
          password: loginData.password,
        });
        console.log(response.data);
      } else {
        const response = await axios.post(
          loginUrl,
          {
            email: loginData.email,
            password: loginData.password,
          },
          { withCredentials: true }
        );
        navigate("/");
        console.log(response.data);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  return (
    <div>
      <div className="w-full h-full flex justify-center items-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">
            {login ? "Login" : "Register"}
          </legend>

          {!login && (
            <>
              <label className="label">FirstName</label>
              <input
                type="firstname"
                className="input"
                placeholder="Firstname"
                value={loginData.firstname}
                onChange={(e) => handledata("firstname", e.target.value)}
              />

              <label className="label">Lastname</label>
              <input
                type="lastname"
                className="input"
                placeholder="Lastname"
                value={loginData.lastname}
                onChange={(e) => handledata("lastname", e.target.value)}
              />
            </>
          )}

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => handledata("email", e.target.value)}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => handledata("password", e.target.value)}
          />

          <div>
            {login ? (
              <>
                <p>
                  New User:{" "}
                  <Link onClick={() => setLogin(!login)}>Register Now</Link>
                </p>
              </>
            ) : (
              <>
                <p>
                  Already a user:{" "}
                  <Link onClick={() => setLogin(!login)}>Login Now</Link>
                </p>
              </>
            )}
          </div>

          <button
            onClick={() => submitLogin()}
            className="btn btn-neutral mt-4"
          >
            {" "}
            {login ? "Login" : "Register"}
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
