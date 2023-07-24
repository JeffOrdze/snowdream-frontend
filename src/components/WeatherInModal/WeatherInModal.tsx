import { WeatherData } from "../../types/types";
import "./WeatherInModal.scss";

interface Props { 
  weatherData: WeatherData[]
}

const WeatherInModal: React.FC<Props> = ({ weatherData }) => {
  // parse timestamp from weather api to human readable
  const timestamp = require("unix-timestamp");
  return (
    <section className="weather body">
      <h2 className="modal__title sub-heading">Weather</h2>
      <div className="weather__container">
        {weatherData.map((day, index) => {
          return (
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
                  <p className="weather__p body">
                    Temperature:{" "}
                    <span className="weather__figure">
                      {Math.floor(day.main.temp)}°C
                    </span>
                  </p>
                  <p className="weather__p body">
                    Feels like:{" "}
                    <span className="weather__figure">
                      {Math.floor(day.main.feels_like)}°C
                    </span>
                  </p>
                  <p className="weather__p body">
                    Chance of Preciptiation:{" "}
                    <span className="weather__figure">
                      {Math.floor(day.pop * 100)}%
                    </span>
                  </p>
                </div>
              </div>
              <div className="weather__section">
                <h3 className="modal__subheading">Conditions</h3>
                <p className="weather__p body">{day.weather[0].main}</p>
                <p className="weather__p body">
                  Wind: {Math.floor(day.wind.speed * 3.6)} km/h{" "}
                </p>
                <p className="weather__p body">
                  Wind Gust: {Math.floor(day.wind.gust * 3.6)} km/h
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WeatherInModal;
