import "./Login.scss";
import Input from "../../components/Input/Input";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/users/login", {
        username: event.target.email.value,
        password: event.target.password.value,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        setSuccess("Successfully logged in!")
        setTimeout(()=> {
            navigate("/");
       }, 2000)
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

        <button className="login__button">Log in</button>

        { success && <div className="login__message">{success}</div> }
        {error && <div className="login__message">{error}</div>}
      </form>
      <p>
        Need an account? <Link to="/sign-up"className="login__link">Sign up</Link>
      </p>
    </main>
  );
}

export default Login;
