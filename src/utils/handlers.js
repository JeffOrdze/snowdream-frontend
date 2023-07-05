import { googleLogout } from "@react-oauth/google";

const modalHandler = (setModalState, data, setMountainInfo) => {
  setModalState(true);
  setMountainInfo(data);
};

const closeHandler = (setModalState) => {
  setModalState(false);
};

const logOutHandler = (setUser) => {
  googleLogout();
  sessionStorage.removeItem("token");
  setUser(null);
};

const modalInfoHandler = (setModalTab) => { 
setModalTab(1)
}

const modalMapHandler = (setModalTab) => { 
setModalTab(2)
}

export { modalHandler, closeHandler, logOutHandler, modalInfoHandler, modalMapHandler };
