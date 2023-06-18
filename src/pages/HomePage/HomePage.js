import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Carousel } from "@mantine/carousel";
import {
  fetchMountainList,
  fetchUser,
  fetchLikedMountains,
} from "../../utils/utils";
import Card from "../../components/Card/Card";
import "./Home.scss";

const HomePage = () => {
  const [failedAuth, setFailedAuth] = useState(false);
  const [user, setUser] = useState(null);

  const {
    isLoading: avIsLoad,
    isError: avIsError,
    data: avData,
    error: avError,
  } = useQuery({
    queryKey: ["mountains"],
    queryFn: fetchMountainList,
  });

  const {
    isError: userError,
    isLoading: userLoad,
    error: usersError,
    data: userName,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUser(setFailedAuth, setUser),
  });

  const userId = userName?.id;

  const { data: userData } = useQuery({
    queryKey: ["userLikes"],
    queryFn: () => fetchLikedMountains(userId),
    enabled: !!userId,
  });

  if (avIsLoad) {
    return <span>Loading...</span>;
  }

  if (avIsError) {
    return <span>Error: {usersError.message}</span>;
  }

  return (
    <main className="home main">
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
                <Card data={mountain} />
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
