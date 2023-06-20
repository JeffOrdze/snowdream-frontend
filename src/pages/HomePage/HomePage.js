import { useQuery } from "@tanstack/react-query";
import { Carousel } from "@mantine/carousel";
import {fetchMountainList,fetchUser,fetchLikedMountains,
} from "../../utils/api";
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
  const { data: userData } = useQuery({
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
      <h2 className="section-title">All Backcountry Areas</h2>
      <section className="carousel">
        <Carousel
          maw={"100%"}
          mx="auto"
          withIndicators
          height={300}
          draggable={true}
          slideSize={"50%"}
          align={"start"}
          slideGap={"xl"}
          breakpoints={[{ maxWidth: 'sm', slideSize: '100%'}]}
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
      <h2 className="section-title">Your Areas</h2>
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
          height={300}
          draggable={true}
          slideSize={"50%"}
          align={"start"}
          slideGap={"xl"}
          breakpoints={[{ maxWidth: 'sm', slideSize: '100%'}]}
        >
          {userData?.map((mountain) => {
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
    </main>
  );
};

export default HomePage;
