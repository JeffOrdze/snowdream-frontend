import parse from "html-react-parser";
import { closeHandler } from "../../utils/handlers";
import { useQuery } from "@tanstack/react-query";
import { fetchInfo } from "../../utils/api";
import exit from "../../assets/images/icons/close-24px.svg";
import "./Modal.scss";

const timestamp = require("unix-timestamp");

const Modal = ({ modalState, setModalState, mountainInfo }) => {
  
  const { name, lat, long } = mountainInfo;

  const { data, isLoading } = useQuery({
    queryKey: ["info"],
    queryFn: () => fetchInfo(lat, long),
    enabled: modalState,
  });

  if (modalState === true && isLoading) {
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
                <section className="avalanche">
                  <h2 className="modal__title">Avalanche Data</h2>
                  <div className="avalanche__section">
                    <h3 className="modal__heading">Confidence</h3>
                    <p className="avalanche__p">
                      Confidence rating: {confidence.rating.display}
                    </p>
                  </div>
                  <div className="avalanche__section">
                    <h3 className="modal__heading">Danger Rating</h3>
                    {dangerRatings.map((rating, index) => {
                      return (
                        <div className="avalanche__danger" key={index}>
                          <h4 className="modal__subheading">
                            {rating.date.display}
                          </h4>
                          <p className="avalanche__p">
                            Alpine: {rating.ratings.alp.rating.display}
                          </p>
                          <p className="avalanche__p">
                            Below treeline: {rating.ratings.btl.rating.display}
                          </p>
                          <p className="avalanche__p">
                            Treeline: {rating.ratings.tln.rating.display}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="avalanche__section">
                    <h3 className="modal__heading">Summaries:</h3>
                    {parse(highlights)}
                  </div>
                </section>
                <section className="weather">
                  <h2 className="modal__title">Weather</h2>
                  {weatherData.map((day, index) => {
                    return (
                      <>
                        <div className="weather__section" key={index}>
                          <h3 className="modal__subheading">
                            {timestamp.toDate(day.dt).toLocaleString()}
                          </h3>
                          <div className="weather__card">
                            <img
                              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                              alt="weather icon"
                              className="weather__icon"
                            />
                            <div className="weather__card-text">
                              <p className="weather__p">
                                Temperature:{" "}
                                <span className="weather__figure">
                                  {day.main.temp}°C
                                </span>
                              </p>
                              <p className="weather__p">
                                Feels like:{" "}
                                <span className="weather__figure">
                                  {day.main.feels_like}°C
                                </span>
                              </p>
                              <p className="weather__p">
                                Chance of Preciptiation:{" "}
                                <span className="weather__figure">
                                  {day.pop * 100}%
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="weather__section">
                          <h3 className="modal__subheading">Conditions</h3>
                          <p className="weather__p">{day.weather[0].main}</p>
                          <p className="weather__p">
                            Wind: {Math.floor(day.wind.speed * 3.6)} km/h{" "}
                          </p>
                          <p className="weather__p">
                            Wind Gust: {Math.floor(day.wind.gust * 3.6)} km/h
                          </p>
                        </div>
                      </>
                    );
                  })}
                </section>
              </div>
            </article>
          </div>
        ) : null}
      </>
    );
  }
};

export default Modal;
