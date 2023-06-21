import { useQuery } from "@tanstack/react-query";
import { Carousel } from "@mantine/carousel";
import {fetchMountainList,fetchUser,fetchLikedMountains,
} from "../../utils/api";
import Hero from "../../components/Hero/Hero";
import Modal from "../../components/Modal/Modal";
import Card from "../../components/Card/Card";
import "./Home.scss";

const HomePage = ({user, setUser, showModal, setShowModal, mountainInfo, setMountainInfo}) => {

  const {
    isLoading: avIsLoad,
    isError: avIsError,
    data: avData,
    error: avError,
  } = useQuery({
    queryKey: ["mountains"],
    queryFn: fetchMountainList,
  });

  const { data: userName } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUser(setUser),
  });

  //Set userId to the id of the userName query response
  const userId = userName?.id;

  //Only enable this query if userId exists
  const { data: userFavorites } = useQuery({
    queryKey: ["userLikes"],
    queryFn: () => fetchLikedMountains(userId),
    enabled: !!userId,
  });

  if (avIsLoad) {
    return <span>Loading...</span>;
  }

  if (avIsError) {
    return <span>Error: {avError.message}</span>;
  }

  return (
    <main className="home main">
      <Modal
        modalState={showModal}
        setModalState={setShowModal}
        mountainInfo={mountainInfo}
      />
      <Hero/>
      <div className="content-block">
      <h2 className="home__title section-heading">All Backcountry Areas</h2>
      <section className="carousel">
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
            { maxWidth: 'sm', slideSize: '100%'},
            {maxWidth: 'md', slideSize: "50%"},
            {maxWidth: '120rem', slideSize: "33%"}
          ]}
          dragFree
        >
          {avData.map((mountain) => {
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
      <h2 className="home__title section-heading">Your Areas</h2>
      <section className="carousel">
        <div
          className={
            user
              ? "carousel__overlay--user carousel__overlay"
              : "carousel__overlay--no-user carousel__overlay"
          }
        >
          <p className="carousel__prompt">Please login to view your carousel</p>
        </div>
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
            { maxWidth: 'sm', slideSize: '100%'},
            {maxWidth: 'md', slideSize: "50%"},
            {maxWidth: '120rem', slideSize: "33%"}
          ]}
          dragFree
        >
          {userFavorites?.map((mountain) => {
            return (
              <Carousel.Slide key={mountain.id}>
                <Card  data={mountain}
                  setModalState={setShowModal}
                  setMountainInfo={setMountainInfo}
                  userId={userId}
                  altStyle={""} />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </section>
      </div>
    </main>
  );
};

export default HomePage;
