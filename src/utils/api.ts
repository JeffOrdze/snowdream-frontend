import axios from "axios";
import { SetUser, SetString, GoogleUser, SubmitEvent } from "../types/types";
import { NavigateFunction } from "react-router-dom";

const backendURI = process.env.REACT_APP_BACKEND_URI

//Get list of all mountains
const fetchMountainList = async () => {
  try {
    const response = await axios.get(`${backendURI}/avalanche`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Get user information
const fetchUser = async (setUser: SetUser) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const response = await axios.get(`${backendURI}/users/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Get list of mountains a user has liked
const fetchLikedMountains = async (userId: number) => {
  try {
    const response = await axios.get(`${backendURI}/users/mountains`, {
      params: { id: userId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Add a mountain to users liked list
const favoriteMountain = async (mountain_id: number, users_id: number) => {
  try {
    await axios.post(`${backendURI}/users/mountains`, {
      mountain_id,
      users_id,
    });
  } catch (error) {
    console.error(error);
  }
};

//Remove a mountain from a users liked list
const removeFavoriteMountain = async (
  mountain_id: number,
  users_id: number
) => {
  try {
    await axios.delete(`${backendURI}/users/mountains`, {
      data: { mountain_id, users_id },
    });
  } catch (error) {
    console.error("Hiting catch", error);
  }
};

//Get avalanche and weather information for selected mountain
const fetchInfo = async (lat: string, long: string) => {
  try {
    const response = Promise.all([
      axios.get(`${backendURI}/avalanche/${lat}/${long}`),
      axios.get(`${backendURI}/weather/${lat}/${long}`),
    ]);
    return response;
  } catch (error) {
    console.error(error);
  }
};

//Google login
const fetchGoogle = async (googleUser: GoogleUser, setSuccess: SetString) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${googleUser.access_token}`,
          Accept: "application/json",
        },
      }
    );
    const login = await axios.post(`${backendURI}/users/google`, {
      username: response.data.email,
      password: response.data.id,
      name: response.data.name,
    });
    sessionStorage.setItem("token", login.data);
    setSuccess("Successfully Logged in!");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Login Request
const handleLogin = async (
  setSuccess: SetString,
  e: SubmitEvent,
  setError: SetString,
  navigate: NavigateFunction
) => {
  e.preventDefault();

  try {
    const login = await axios.post(`${backendURI}/users/login`, {
      username: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    });
    sessionStorage.setItem("token", login.data.token);
    setSuccess("Successfully logged in!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  } catch (error: any) {
    setError(error.response.data.message);
  }
};

export {
  fetchMountainList,
  fetchUser,
  fetchLikedMountains,
  fetchInfo,
  fetchGoogle,
  favoriteMountain,
  removeFavoriteMountain,
  handleLogin,
};
