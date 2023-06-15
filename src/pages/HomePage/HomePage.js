import { Carousel } from "@mantine/carousel";
import { useQuery } from "@tanstack/react-query";
import { fetchMountainList } from "../../utils/utils";
import Card from "../../components/Card/Card";

const HomePage = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["mountains"],
    queryFn: fetchMountainList,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <main className="home">
      <section className="carousel">
        <Carousel maw={'90%'} mx="auto" withIndicators height={200} draggable={true}>
          <Carousel.Slide>
            <Card data={data}/>
          </Carousel.Slide>
          <Carousel.Slide>2</Carousel.Slide>
          <Carousel.Slide>3</Carousel.Slide>
        </Carousel>
      </section>
    </main>
  );
};

export default HomePage;
