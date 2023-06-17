import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Carousel } from "@mantine/carousel";
import { fetchMountainList, fetchUser } from "../../utils/utils";
import Card from "../../components/Card/Card";
import "./Home.scss";

const HomePage = () => {
  const [failedAuth, setFailedAuth] = useState(false);
  const [user, setUser] = useState(null);

  const {
    isLoading,
    isError,
    data: avData,
    error,
  } = useQuery({
    queryKey: ["mountains"],
    queryFn: fetchMountainList,
  });

  const { isError: userError, error: usersError } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUser(setFailedAuth, setUser),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (userError) {
    return <span>Error: {usersError.message}</span>;
  }

  return (
    <main className="home main">
      <section className="carousel">
      <h2 className="carousel__title">All Mountains</h2>
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
      <section className="carousel">
        <h2 className="carousel__title">My Mountains</h2>
        <div
          className={
            user ? "carousel__overlay--user carousel__overlay" : "carousel__overlay--no-user carousel__overlay"}>
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
             {avData.map((mountain) => {
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
