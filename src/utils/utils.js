import axios from "axios";

const fetchMountainList = async () => {
  try {
    const response = await axios.get("http://localhost:8080/avalanche");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchUser = async (setFailedAuth, setUser) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    setFailedAuth(true);
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
    setFailedAuth(true);
  }
};

const fetchLikedMountains = async (userId) => {

  try { 
   const response = await axios.get("http://localhost:8080/users/mountains", {
    params: { id: userId },
  }) 
  return response.data
  } catch (error) { 
    console.log(error)
  }
 
};
export { fetchMountainList, fetchUser, fetchLikedMountains };
