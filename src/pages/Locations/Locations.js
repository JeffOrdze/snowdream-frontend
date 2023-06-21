import { useQuery } from "@tanstack/react-query";
import Modal from "../../components/Modal/Modal";
import Card from "../../components/Card/Card";
import {
  fetchMountainList,
  fetchUser,
  fetchLikedMountains,
} from "../../utils/api";
import "./Locations.scss";

const Locations = ({
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

  const userId = userName?.id;

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
    <div>
      <Modal
        modalState={showModal}
        setModalState={setShowModal}
        mountainInfo={mountainInfo}
      />
      {avData.map((mountain) => (
        <Card
          key={mountain.id}
          data={mountain}
          setModalState={setShowModal}
          setMountainInfo={setMountainInfo}
          altStyle={"card--locations"}
          userId={userId}
          userFavorites={userFavorites}
        />
      ))}
    </div>
  );
};

export default Locations;
