import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { modalHandler } from "../../utils/handlers";
import { removeFavoriteMountain, fetchInfo } from "../../utils/api";
import { SetDataObject, SetModalState, UserFavorites } from "../../types/types";
import "./Card.scss";

interface Props { 
  data: UserFavorites
  setModalState: SetModalState
  setMountainInfo: SetDataObject
  altStyle: string
  userId: number
  userFavorites?: UserFavorites[] 
}

const UserCard: React.FC<Props> = ({
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

  const unlikeArea = useMutation(
    () => removeFavoriteMountain(data.mountain_id, userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userLikes"]);
        queryClient.refetchQueries(["userLikes"]);
      },
    }
  );

const buttonMapping = {
  favourited: (
    <button className="card__btn card__btn--remove button" onClick={() => unlikeArea.mutate()}>
    Remove Favorite
    </button>
  ),
  notLoggedIn: ( 
    <button disabled className="card__btn button">
      Please login
     </button>
  )
}

  const isFavorited =
    userFavorites && userFavorites.some((item) => item.name === data.name);

  if (isLoading) {
    return <span className="card">Content Loading..</span>;
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
          <p className="card__temp card-body">{Math.floor(mountainData![1].data[0].main.temp)}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${mountainData![1].data[0].weather[0].icon}@2x.png`}
            alt=""
            className="card__icon"
          />
        <p className="card__wind card-body">{Math.floor(mountainData![1].data[0].wind.speed * 3.6)} KM/H</p>
        </div>
        <div className="card__btn-container">
          <button
            className="card__btn card__btn--animate button"
            onClick={() => modalHandler(setModalState, data, setMountainInfo)}
          >
            Show me the forecast
          </button>
          {isFavorited  
          ? buttonMapping.favourited
          : !userId 
          ? buttonMapping.notLoggedIn  
          : null}
        </div>
      </div>
      <div className="card__background">
        <img src={data.img} alt="glacier" className="card__img" />
      </div>
    </article>
  );
};

export default UserCard;