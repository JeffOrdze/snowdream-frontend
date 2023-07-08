import { googleLogout } from "@react-oauth/google";
import { SetUser, SetModalState, Data, SetData, SetModalTab } from "../types/types";

const modalHandler = (setModalState: SetModalState, data: Data[], setMountainInfo: SetData) => {
  setModalState(true);
  setMountainInfo(data);
};

const closeHandler = (setModalState: SetModalState) => {
  setModalState(false);
};

const logOutHandler = (setUser: SetUser): void => {
  googleLogout();
  sessionStorage.removeItem("token");
  setUser(null);
};

const modalInfoHandler = (setModalTab: SetModalTab) => { 
  setModalTab(1)
}

const modalMapHandler = (setModalTab: SetModalTab) => { 
  setModalTab(2)
}

export { modalHandler, closeHandler, logOutHandler, modalInfoHandler, modalMapHandler };
