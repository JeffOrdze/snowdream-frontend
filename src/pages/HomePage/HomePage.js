import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Carousel } from "@mantine/carousel";
import {
  fetchMountainList,
  fetchUser,
  fetchLikedMountains,
} from "../../utils/api";
import Modal from "../../components/Modal/Modal";
import Card from "../../components/Card/Card";
import "./Home.scss";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mountainInfo, setMountainInfo] = useState([]);

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
      <h2 className="section-title">All Mountains</h2>
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
        >
          {avData.map((mountain) => {
            return (
              <Carousel.Slide key={mountain.id}>
                <Card
                  data={mountain}
                  setModalState={setShowModal}
                  setMountainInfo={setMountainInfo}
                />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </section>
      <h2 className="section-title">Your Mountains</h2>
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
        >
          {userData?.map((mountain) => {
            return (
              <Carousel.Slide key={mountain.id}>
                <Card data={mountain} />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </section>
    </main>
  );
};

export default HomePage;
