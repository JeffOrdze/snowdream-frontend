import React, { useState } from "react";
import { fetchGoogle } from "../../utils/api";
import {  useQuery } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import "./GoogleLogin.scss";

function GoogleLogin({setSuccess}) {
  const [googleUser, setGoogleUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

const {data: profile} = useQuery({
    queryKey: ["googleInfo"],
    queryFn: () => fetchGoogle(googleUser, setSuccess),
    enabled: !!googleUser,
  })

 
  return (
    <>
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
    </>
  );
}

export default GoogleLogin;
