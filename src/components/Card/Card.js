import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { modalHandler, favoriteHandler } from "../../utils/handlers";
import { fetchInfo } from "../../utils/api";
import "./Card.scss";

const Card = ({
  data,
  setModalState,
  setMountainInfo,
  altStyle,
  userId,
  userFavorites,
}) => {

  const queryClient = useQueryClient();

  const { lat, long } = data;

  const { data: mountainData, isLoading } = useQuery({
    queryKey: ["mountainInfo", lat, long],
    queryFn: () => fetchInfo(lat, long),
  });

  const likeArea = useMutation({
    mutationFn: () => favoriteHandler(data.id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userLikes"],
        refetchQueries: ["userLikes"],
      });
    },
  });

  const isFavorited =
    userFavorites && userFavorites.some((item) => item.name === data.name);

  if (isLoading) {
    return <span>Content Loading</span>;
  }

  return (
    <article className={`card ${altStyle}`}>
      <div className="card__contrast">
        <h2 className="card__heading">{data.name}</h2>
        <div className="card__icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            viewBox="0 -960 960 960"
            width="40"
            className="card__icon--danger card__icon"
          >
            <path d="m80-120 400-720 400 720H80Zm102-60h268v-482L182-180Zm328 0h268L510-662v482Z" />
          </svg>
          <p className="card__temp card-body">{Math.floor(mountainData[1].data[0].main.temp)}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${mountainData[1].data[0].weather[0].icon}@2x.png`}
            alt=""
            className="card__icon"
          />
        <p className="card__wind card-body">{Math.floor(mountainData[1].data[0].wind.speed * 3.6)} KM/H</p>
        </div>
        <div className="card__btn-container">
          <button
            className="card__btn button"
            onClick={() => modalHandler(setModalState, data, setMountainInfo)}
          >
            Show me the forecast
          </button>
          {isFavorited ? (
            <button disabled className="card__btn button">
              {" "}
              Already Favorited
            </button>
          ) : !userId ? (
            <button disabled className="card__btn button">
              Please login
            </button>
          ) : altStyle !== "" ? (
            <button className="card__btn button" onClick={() => likeArea.mutate()}>
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