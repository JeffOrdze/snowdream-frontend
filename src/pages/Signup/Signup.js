import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import "./Signup.scss";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/users/signup", {
        name: e.target.name.value,
        username: e.target.email.value,
        password: e.target.password.value,
      })
      .then(() => {
        setSuccess(true);
        setError("");
        e.target.reset();

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        setSuccess(false);
        setError(error.response.data);
      });
  };
  return (
    <main className="main signup-main">
      <form className="signup" onSubmit={submitHandler}>
        <h2 className="signup__title">Sign up</h2>

        <Input type="text" name="name" label="Name" />
        <Input type="text" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />

        <button className="signup__button button">Sign up</button>
        {success && <div className="signup__message">Signed up!</div>}
        {error && <div className="signup__message">{error}</div>}
      </form>
      <p className="signup__login">
        Have an account?{" "}
        <Link className="signup__link" to="/login">
          Log in
        </Link>
      </p>
    </main>
  );
};

export default Signup;
