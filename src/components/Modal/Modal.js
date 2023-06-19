import { closeHandler } from "../../utils/handlers";
import parse from "html-react-parser";
import { useQuery } from "@tanstack/react-query";
import { fetchInfo } from "../../utils/api";
import exit from "../../assets/images/close-24px.svg";
import "./Modal.scss";

const Modal = ({ modalState, setModalState, mountainInfo }) => {
  const { name, lat, long } = mountainInfo;

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchInfo(lat, long),
    enabled: modalState,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (data) {
    const { confidence, dangerRatings, highlights } = data[0].data;
    const weatherData = data[1].data;
    console.log(weatherData);
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
                          <h4 className="avalanche__subheading">
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
                    <h3 className="avalanche__heading">Summaries:</h3>
                    {parse(highlights)}
                  </div>
                </section>
                <section className="weather">
                  <h2 className="modal__title">Weather</h2>
                  {weatherData.map((day, index) => {
                    return (
                      <>
                        <div className="weather__section" key={index}>
                          <h3 className="modal__subheading">{day.dt}</h3>
                          <p className="weather__p">
                            Temperature:{" "}
                            <span className="weather__figure">
                              {day.main.temp}
                            </span>
                          </p>
                          <p className="weather__p">
                            Feels like:{" "}
                            <span className="weather__figure">
                              {day.main.feels_like}
                            </span>
                          </p>
                          <p className="weather__p">
                            Chance of Preciptiation:{" "}
                            <span className="weather__figure">{day.pop}</span>
                          </p>
                        </div>
                        <div className="weather__section">
                          <h3 className="modal__subheading">Conditions</h3>
                          <img
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt="weather icon"
                            className="weather__icon"
                          />
                          <p className="weather__p">{day.weather[0].main}</p>
                          <p className="weather__p">
                            Wind: {day.wind.speed}m/s{" "}
                          </p>
                          <p className="weather__p">
                            Wind Gust: {day.wind.gust} m/s
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
