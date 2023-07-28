import { Loader } from "@mantine/core";
import "./CardLoader.scss";

const CardLoader = () => {
  return (
    <article className="cardLoader">
      <Loader color="dark" size="lg" />
    </article>
  );
};

export default CardLoader;
