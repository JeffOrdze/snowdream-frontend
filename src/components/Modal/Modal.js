import { closeHandler } from "../../utils/handlers";
import { useQuery } from "@tanstack/react-query";
import { fetchInfo } from "../../utils/api";
import AvalancheInModal from "../AvalancheInModal/AvalancheInModal";
import WeatherInModal from "../WeatherInModal/WeatherInModal";
import exit from "../../assets/images/icons/close-24px.svg";
import "./Modal.scss";

const Modal = ({ modalState, setModalState, mountainInfo }) => {
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
                <h2 className="modal__title">{name}</h2>
                <AvalancheInModal
                  confidence={confidence}
                  dangerRatings={dangerRatings}
                  highlights={highlights}
                />
                <WeatherInModal weatherData={weatherData} />
              </div>
            </article>
          </div>
        ) : null}
      </>
    );
  }
};

export default Modal;
