import glacier from "../../assets/images/Glacier.jpg"
import "./Card.scss"

const Card = ({ data }) => {

  return (
    <article className="card">
      <div className="card__background">
        <img src={glacier} alt="glacier" className="card__img" />
        <h2 className="card__heading">{data.owner.value}</h2>
        <button className="card__btn">Show me the forecast</button>
      </div>
    </article>
  );
};

export default Card;
