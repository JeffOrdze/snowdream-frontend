import "./Card.scss";

const Card = ({ data }) => {
  console.log();
  return (
    <article className="card">
        <div className="card__contrast">
          <h2 className="card__heading">{data.name}</h2>
          <button className="card__btn">Show me the forecast</button>
        </div>
      <div className="card__background">
        <img src={data.img} alt="glacier" className="card__img" />
      </div>
    </article>
  );
};

export default Card;
