import axios from "axios";

const fetchMountainList = async () => {
    try { 
         const response = await axios.get("https://api.avalanche.ca/forecasts/en/products/point?lat=51.3507&long=-117.4383")
         return response.data;
    } 
    catch(error) { 
        console.log(error)
    }
  };

export {
    fetchMountainList,
}