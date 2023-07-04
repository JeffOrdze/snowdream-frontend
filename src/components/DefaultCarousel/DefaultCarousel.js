import { Carousel } from "@mantine/carousel";
import Card from "../Card/Card";
import "./DefaultCarousel.scss"

const DefaultCarousel = ({avData, setShowModal, setMountainInfo, userId}) => {
    return (
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
            { maxWidth: "sm", slideSize: "100%" },
            { maxWidth: "md", slideSize: "50%" },
            { maxWidth: "120rem", slideSize: "33%" },
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
    );
};

export default DefaultCarousel;