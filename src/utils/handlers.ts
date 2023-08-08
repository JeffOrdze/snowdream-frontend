import { googleLogout } from "@react-oauth/google";
import { SetUser, SetModalState, Data, SetDataObject, SetModalTab, InputEvent, SetString } from "../types/types";

const modalHandler = (setModalState: SetModalState, data: Data, setMountainInfo: SetDataObject) => {
  setModalState(true);
  setMountainInfo(data);
};

const closeHandler = (setModalState: SetModalState, setModalTab: SetModalTab) => {
  setModalState(false);
  setModalTab(1)

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

const modalCheckHandler = (setModalTab: SetModalTab) => { 
  setModalTab(3)
}

const searchHandler = (e: InputEvent, setSearchValue: SetString) => {
  const lowerCase = e.target.value.toLowerCase();
  setSearchValue(lowerCase);
};

export { modalHandler, closeHandler, logOutHandler, modalInfoHandler, modalMapHandler, modalCheckHandler, searchHandler };
