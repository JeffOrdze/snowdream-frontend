import axios from "axios";
import { SetUser, SetString, GoogleUser } from "../types/types";

//Get list of all mountains
const fetchMountainList = async () => {
  try {
    const response = await axios.get("http://localhost:8080/avalanche");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//Get user information
const fetchUser = async (setUser: SetUser) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const response = await axios.get("http://localhost:8080/users/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//Get list of mountains a user has liked
const fetchLikedMountains = async (userId: number) => {
  try {
    const response = await axios.get("http://localhost:8080/users/mountains", {
      params: { id: userId },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//Add a mountain to users liked list
const favoriteMountain = async (mountain_id:number, users_id:number) => {
  try {
    await axios.post("http://localhost:8080/users/mountains", {
      mountain_id,
      users_id,
    });
  } catch (error) {
    console.error(error);
  }
};

//Remove a mountain from a users liked list
const removeFavoriteMountain = async (mountain_id:number, users_id:number) => { 
  try {
    console.log(mountain_id, users_id)
    await axios.delete("http://localhost:8080/users/mountains", {
     data:{ mountain_id,
      users_id}
    });
  } catch (error) {
    console.error("Hiting catch",error);
  }
}

//Get avalanche and weather information for selected mountain
const fetchInfo = async (lat:string, long:string) => {
  try {
    const response = Promise.all([
    await axios.get(`http://localhost:8080/avalanche/${lat}/${long}`),
    await axios.get(`http://localhost:8080/weather/${lat}/${long}`),
    ]);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//Google login
const fetchGoogle = async (googleUser: GoogleUser, setSuccess:SetString) => {
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
    const login = await axios.post("http://localhost:8080/users/google", {
      username: response.data.email,
      password: response.data.id,
      name: response.data.name,
    });
    sessionStorage.setItem("token", login.data);
    setSuccess("Successfully Logged in!")
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchMountainList,
  fetchUser,
  fetchLikedMountains,
  fetchInfo,
  fetchGoogle,
  favoriteMountain,
  removeFavoriteMountain
};
