import axios from "axios";

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
const fetchUser = async (setUser) => {
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
const fetchLikedMountains = async (userId) => {
  try {
    const response = await axios.get("http://localhost:8080/users/mountains", {
      params: { id: userId },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//Get avalanche and weather information for selected mountain
const fetchInfo = async (lat, long) => { 
  try { 
const response = Promise.all([
  axios.get(`http://localhost:8080/avalanche/${lat}/${long}`),
  axios.get(`http://localhost:8080/weather/${lat}/${long}`)
])
return response

  } catch (error) { 
    console.log(error)
  }
}
export { fetchMountainList, fetchUser, fetchLikedMountains, fetchInfo };
