import axios from "axios";

const fetchMountainList = async () => {
    try { 
         const response = await axios.get("http://localhost:8080/avalanche")
         return response.data;
    } 
    catch(error) { 
        console.log(error)
    }
  };

export {
    fetchMountainList,
}