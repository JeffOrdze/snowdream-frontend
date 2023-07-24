import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Input from "../../components/Input/Input";
import GoogleLogin from "../../components/GoogleLogin/GoogleLogin";
import { handleLogin } from "../../utils/api";
import { SetString } from "../../types/types";
import "./Login.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [error, setError]: [error: string, setError: SetString] = useState("");
  const [success, setSuccess]: [success: string, setSuccess: SetString] =
    useState("");

  return (
    <main className="login-page">
      <form
        className="login"
        onSubmit={(e) => handleLogin(setSuccess, e, setError, navigate)}
      >
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
};

export default Login;
