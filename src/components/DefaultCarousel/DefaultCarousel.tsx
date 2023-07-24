import { Carousel } from "@mantine/carousel";
import Card from "../Card/Card";
import { Data, SetDataObject, SetModalState } from "../../types/types";
import "./DefaultCarousel.scss"

interface Props { 
avData: Data[]
setShowModal: SetModalState
setMountainInfo: SetDataObject
userId: number
}

const DefaultCarousel: React.FC<Props> = ({avData, setShowModal, setMountainInfo, userId}) => {
 
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
          {avData.map((mountain: Data) => {
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