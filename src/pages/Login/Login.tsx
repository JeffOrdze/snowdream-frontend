import "./Login.scss";
import Input from "../../components/Input/Input";
import GoogleLogin from "../../components/GoogleLogin/GoogleLogin";
import { SetString, SubmitEvent } from "../../types/types";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC= () => {
  
  const [error, setError] = useState("");
  const [success, setSuccess]: [
    success: string,
    setSuccess: SetString
  ] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/users/login", {
        username: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        setSuccess("Successfully logged in!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <main className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        <h2 className="login__title">Log in</h2>

        <Input type="text" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />

        <button className="login__button button">Log in</button>

        {success && <div className="login__message">{success}</div>}
        {error && <div className="login__message">{error}</div>}
      </form>
      <p>
        Need an account?{" "}
        <Link to="/sign-up" className="login__link">
          Sign up
        </Link>
      </p>
      <GoogleLogin setSuccess={setSuccess} />
    </main>
  );
}

export default Login;
