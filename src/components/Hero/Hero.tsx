import "./Hero.scss";

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero__text">
        <h2 className="hero__title heading">snowDREAM</h2>
        <p className="hero__p body">
          A currated collection of backcountry conditions, just for you.
        </p>
      </div>
    </section>
  );
};

export default Hero;
