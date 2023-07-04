import { useQuery } from "@tanstack/react-query";
import {
  fetchMountainList,
  fetchUser,
  fetchLikedMountains,
} from "../../utils/api";
import Hero from "../../components/Hero/Hero";
import Modal from "../../components/Modal/Modal";
import DefaultCarousel from "../../components/DefaultCarousel/DefaultCarousel";
import UserCarousel from "../../components/UserCarousel/UserCarousel";
import "./Home.scss";

const HomePage = ({
  user,
  setUser,
  showModal,
  setShowModal,
  mountainInfo,
  setMountainInfo,
}) => {
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
      <Hero />
      {avIsLoad ? (
        <span>Loading...</span>
      ) : (
        <div className="content-block">
          <h2 className="home__title sub-heading">All Backcountry Areas</h2>
          <DefaultCarousel
            avData={avData}
            setShowModal={setShowModal}
            setMountainInfo={setMountainInfo}
            userId={userId}
          />

          <h2 className="home__title section-heading">Your Areas</h2>
          <UserCarousel
            user={user}
            userId={userId}
            userFavorites={userFavorites}
            setShowModal={setShowModal}
            setMountainInfo={setMountainInfo}
          />
        </div>
      )}
    </main>
  );
};

export default HomePage;
