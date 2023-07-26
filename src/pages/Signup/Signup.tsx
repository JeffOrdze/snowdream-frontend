import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Input from "../../components/Input/Input";
import { SubmitEvent } from "../../types/types";
import "./Signup.scss";

const Signup: React.FC = () => {
  const backendURI = process.env.REACT_APP_BACKEND_URI
  const navigate = useNavigate();
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const submitHandler = async (e: SubmitEvent) => {
    e.preventDefault();
   
    try {
      await axios.post(`${backendURI}/users/signup`, {
        name: e.currentTarget.givenName.value,
        username: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      });
      setSuccess(true)
      setError("")
    
      setTimeout(() => { 
        navigate("/login")
      }, 1000)
    } catch (error: any) {
      setSuccess(false);
      setError(error.response.data.message);
    }
  };

  return (
    <main className="main signup-main">
      <form className="signup" onSubmit={submitHandler}>
        <h2 className="signup__title">Sign up</h2>

        <Input type="text" name="givenName" label="Name" />
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
