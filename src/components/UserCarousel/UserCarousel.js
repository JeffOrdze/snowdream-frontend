import { Carousel } from "@mantine/carousel";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import "./UserCarousel.scss";

const UserCarousel = ({user, userId, userFavorites, setShowModal, setMountainInfo}) => {
    return (
        <section className="carousel">
        {!user ? (
          <div className="carousel__overlay">
            <p className="carousel__prompt">Not logged in!</p>
            <Link to={"/login"} className="carousel__btn button">
              Take me there!
            </Link>
          </div>
        ) : userFavorites?.length === 0 ? (
          <div className="carousel__overlay">
            <p className="carousel__prompt">You have no areas!</p>
            <Link to={"/locations"} className="carousel__btn button">
              Lets fix that
            </Link>
          </div>
        ) : null}
        <Carousel
          maw={"100%"}
          mx="auto"
          withIndicators
          height={400}
          draggable={true}
          slideSize={"25%"}
          align={"start"}
          slideGap={"xl"}
          breakpoints={[
            { maxWidth: "sm", slideSize: "100%" },
            { maxWidth: "md", slideSize: "50%" },
            { maxWidth: "120rem", slideSize: "33%" },
          ]}
          dragFree
        >
          {userFavorites?.map((mountain) => {
            return (
              <Carousel.Slide key={mountain.id}>
                <Card
                  data={mountain}
                  setModalState={setShowModal}
                  setMountainInfo={setMountainInfo}
                  userId={userId}
                  altStyle={""}
                />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </section>
    );
};

export default UserCarousel;