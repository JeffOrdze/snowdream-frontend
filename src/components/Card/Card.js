import { modalHandler, favoriteHandler } from "../../utils/handlers";
import "./Card.scss";

const Card = ({
  data,
  setModalState,
  setMountainInfo,
  altStyle,
  userId,
  userData,
}) => {
  const isFavorited =
    userData && userData.some((item) => item.name === data.name);

  return (
    <article className={`card ${altStyle}`}>
      <div className="card__contrast">
        <h2 className="card__heading">{data.name}</h2>
        <div className="card__btn-container">
          <button
            className="card__btn"
            onClick={() => modalHandler(setModalState, data, setMountainInfo)}
          >
            Show me the forecast
          </button>
          {isFavorited ? (
            <button disabled className="card__btn"> Already Favorited</button>
          ) : altStyle !== "" ? (
            <button
              className="card__btn"
              onClick={() => favoriteHandler(data.id, userId)}
            >
              Add to my favorites
            </button>
          ) : null}
        </div>
      </div>
      <div className="card__background">
        <img src={data.img} alt="glacier" className="card__img" />
      </div>
    </article>
  );
};

export default Card;
