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
  console.log(data);
  return (
    <main className="home">
      <section className="carousel">
        <Carousel
          maw={"90%"}
          mx="auto"
          withIndicators
          height={300}
          draggable={true}
          slideSize={'50%'}
          align={"start"}
          slideGap={"xl"}
        >
          {data.map((mountain) => {
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
