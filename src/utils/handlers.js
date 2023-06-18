const modalHandler = (setModalState, data, setMountainInfo) => { 
    setModalState(true)
    setMountainInfo(data)
}

const closeHandler = (setModalState) => {
    setModalState(false);
  };

export {modalHandler, closeHandler}