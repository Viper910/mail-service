import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../service";
export default function Login() {
  const cardStyle = { backgroundColor: "#182747" };
  const fontStyle = { color: "white" };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  const logoutHandler = () => {
    // this.setState({ isAuth: false, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };
  const submitFormHandler = (e) => {
    e.preventDefault();
    login(email, password)
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.userId);
        localStorage.setItem("userMailId", result.data.email);

        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
        navigate("/inbox");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      class="vh-100 d-flex justify-content-center align-items-center"
      style={fontStyle}
    >
      <div class="col-md-5 p-5 shadow-sm border rounded-3" style={cardStyle}>
        <h2 class="text-center mb-4">Login Form</h2>
        <form onSubmit={submitFormHandler}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control border"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control border"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p class="small">
            <a class="text-warning" href="forget-password.html">
              Forgot password?
            </a>
          </p>
          <div class="d-grid">
            <button class="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
        <div class="mt-3">
          <p class="mb-0  text-center">
            Don't have an account?{" "}
            <Link to="/signin" class="text-primary fw-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
