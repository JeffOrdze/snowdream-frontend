import parse from "html-react-parser";
import "./AvalancheInModal.scss";

const AvalancheInModal = ({ confidence, dangerRatings, highlights }) => {
  return (
    <section className="avalanche">
      <h2 className="modal__title">Avalanche Data</h2>
      <div className="avalanche__section">
        <h3 className="modal__heading sub-heading">Confidence</h3>
        <p className="avalanche__p body">
          Confidence rating: {confidence.rating.display}
        </p>
      </div>
      <div className="avalanche__section">
        <h3 className="modal__heading sub-heading">Danger Rating</h3>
        <div className="avalanche__danger-container body">
          {dangerRatings.map((rating, index) => {
            return (
              <div className="avalanche__danger" key={index}>
                <h4 className="modal__subheading sub-heading">
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
      </div>
      <div className="avalanche__section">
        <h3 className="modal__heading sub-heading">Summaries:</h3>
        {parse(highlights)}
      </div>
    </section>
  );
};

export default AvalancheInModal;
