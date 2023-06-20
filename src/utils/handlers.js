import axios from "axios";

const modalHandler = (setModalState, data, setMountainInfo) => {
  setModalState(true);
  setMountainInfo(data);
};

const closeHandler = (setModalState) => {
  setModalState(false);
};

const favoriteHandler = (mountain_id, users_id) => {
  axios.post("http://localhost:8080/users/mountains", {
    mountain_id,
    users_id
  });
};

export { modalHandler, closeHandler, favoriteHandler };
