import { closeHandler, modalInfoHandler, modalMapHandler } from "../../utils/handlers";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchInfo } from "../../utils/api";
import AvalancheInModal from "../AvalancheInModal/AvalancheInModal";
import WeatherInModal from "../WeatherInModal/WeatherInModal";
import MapsInModal from "../MapsInModal/MapsInModal";
import exit from "../../assets/images/icons/close-24px.svg";
import "./Modal.scss";

const Modal = ({ modalState, setModalState, mountainInfo }) => {
  const [modalTab, setModalTab] = useState(1);

  // info from onClick in carousal
  const { name, lat, long } = mountainInfo;

  //fetch mountain per carousel item
  const { data, isLoading } = useQuery({
    queryKey: ["info"],
    queryFn: () => fetchInfo(lat, long),
    enabled: modalState,
  });

  if (modalState && isLoading) {
    return <span>Loading...</span>;
  }

  if (data) {
    const { confidence, dangerRatings, highlights } = data[0].data;
    const weatherData = data[1].data;
    return (
      <>
        {modalState === true ? (
          <div className="overlay">
            <article className="modal">
              <div className="modal__container">
                <div className="modal__exit-container">
                  <img
                    className="exit"
                    src={exit}
                    alt="exit icon"
                    onClick={() => closeHandler(setModalState)}
                  />
                </div>

                <div className="modal__button-container">
                  <button className="modal__button button card__btn" onClick={() => modalInfoHandler(setModalTab)}>
                    Mountain Info
                  </button>
                  <button className="modal__button button card__btn" onClick={() => modalMapHandler(setModalTab)}>
                    Map
                  </button>
                  <button className="modal__button button card__btn">
                    Check List
                  </button>
                </div>

                <h2 className="modal__title">{name}</h2>

                {modalTab === 1 ? (
                  <>
                    <AvalancheInModal
                      confidence={confidence}
                      dangerRatings={dangerRatings}
                      highlights={highlights}
                    />
                    <WeatherInModal weatherData={weatherData} />
                  </>
                ) : modalTab === 2 ? (
                  <MapsInModal lat={lat} long={long} />
                ) : null}

              </div>
            </article>
          </div>
        ) : null}
      </>
    );
  }
};

export default Modal;
