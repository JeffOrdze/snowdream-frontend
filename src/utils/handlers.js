import axios from "axios";

const modalHandler = (setModalState, data, setMountainInfo) => {
  setModalState(true);
  setMountainInfo(data);
};

const closeHandler = (setModalState) => {
  setModalState(false);
};

const logOutHandler = (setUser) => { 
   sessionStorage.removeItem("token")
   setUser(null)
}

const favoriteHandler = async (mountain_id, users_id) => {
  try {
   await axios.post("http://localhost:8080/users/mountains", {
      mountain_id,
      users_id
    });
  } catch (error) {
    console.error(error);
  }
};

export { modalHandler, closeHandler, favoriteHandler, logOutHandler };
