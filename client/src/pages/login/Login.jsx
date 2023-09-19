import "./login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [credentialsLogin, setCredentialsLogin] = useState({
    username: undefined,
    password: undefined,
  });

  const [credentialsRegister, setCredentialsRegister] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  //  Login
  const handleLoginChange = (e) => {
    setCredentialsLogin((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "AUTH_START" });
    try {
      const res = await publicRequest.post("auth/login", credentialsLogin);
      dispatch({ type: "AUTH_SUCCES", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "AUTH_FAILURE", payload: err.response.data });
      toast.error(`Error Login !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // Register
  const handleRegisterChange = (e) => {
    setCredentialsRegister((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch({ type: "AUTH_START" });
    try {
      const res = await publicRequest.post(
        "auth/register",
        credentialsRegister
      );
      dispatch({ type: "AUTH_SUCCES", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "AUTH_FAILURE", payload: err.response.data });
      toast.error(`Error Register !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="loginContainer">
      <div className="main">
        <input
          className="loginInput"
          type="checkbox"
          id="chk"
          aria-hidden="true"
        />

        <div className="signup">
          <form onSubmit={handleRegister}>
            <label className="loginLabel" htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className="loginInput"
              id="username"
              type="text"
              placeholder="Username"
              onChange={handleRegisterChange}
              required
            />
            <input
              className="loginInput"
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleRegisterChange}
              required
            />
            <input
              className="loginInput"
              id="password"
              type="password"
              placeholder="Password"
              onChange={handleRegisterChange}
              required
            />

            <button className="myButton" type="submit" disabled={loading}>
              Sign up
            </button>
            {error && (
              <div
                style={{ color: "red", textAlign: "center", marginTop: "20px" }}
              >
                {error}
              </div>
            )}
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogin}>
            <label className="loginLabel" htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              className="loginInput"
              id="username"
              type="text"
              placeholder="Username"
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="loginInput"
              onChange={handleLoginChange}
              required
            />
            <button className="myButton" type="submit" disabled={loading}>
              Login
            </button>
            {error && (
              <div
                style={{ color: "red", textAlign: "center", marginTop: "20px" }}
              >
                {error}
              </div>
            )}
            <ToastContainer autoClose={1000} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
