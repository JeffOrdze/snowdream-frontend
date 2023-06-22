import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGoogle } from "../../utils/api";
import { useQuery } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import google from "../../assets/images/icons/google.svg"
import "./GoogleLogin.scss";

function GoogleLogin({ setSuccess }) {
  const [googleUser, setGoogleUser] = useState(null);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const { data: profile, isSuccess } = useQuery({
    queryKey: ["googleInfo"],
    queryFn: () => fetchGoogle(googleUser, setSuccess),
    enabled: !!googleUser,
  });

if (isSuccess) { 
  setTimeout(()=> navigate("/"), 2000)
}

  return (
    <div className="google">
      {!profile ? (
        <button className="google__btn button" onClick={() => login()}>
         <img src={google} alt="google icon" className="google__icon" /> Sign in with Google
        </button>
      ) : (
        <div className="google__btn button">
          Welcome back, {profile.name}{" "}
          <img className="google__photo" src={profile.picture} alt="profile" />
        </div>
      )}
    </div>
  );
}

export default GoogleLogin;
