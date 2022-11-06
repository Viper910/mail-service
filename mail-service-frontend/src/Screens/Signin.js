import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../service";
export default function Signin() {
  const cardStyle = { backgroundColor: "#182747" };
  const fontStyle = { color: "white" };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pnumber, setPhonenumber] = useState("");
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
    console.log(username, email, pnumber, password);
    signin(username, email, pnumber, password)
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.user._id);
        localStorage.setItem("userMailId", result.data.user.email);
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
      class="vh-100 d-flex justify-content-center align-items-center "
      style={fontStyle}
    >
      <div class="col-md-5 p-5 shadow-sm border rounded-3 " style={cardStyle}>
        <h2 class="text-center mb-4 ">Create your account</h2>
        <form className="needs-validation" onSubmit={submitFormHandler}>
          <div class="mb-1">
            <label for="username" class="form-label">
              Username
            </label>
            <input
              type="text"
              class="form-control border "
              id="username"
              aria-describedby="emailHelp"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div class="mb-1">
            <label for="email" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control border "
              id="email"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div class="mb-1">
            <label for="phonenumber" class="form-label">
              PhoneNumber
            </label>
            <input
              type="number"
              class="form-control border "
              id="phonenumber"
              onChange={(e) => setPhonenumber(e.target.value)}
              required
            />
          </div>
          <div class="mb-1">
            <label for="password" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control border "
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div class="d-grid">
            <button class="btn btn-primary" type="submit">
              Sign in
            </button>
          </div>
        </form>
        <div class="mt-3">
          <p class="mb-0  text-center">
            Have an account?{" "}
            <Link to="/login" class="text-primary fw-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
