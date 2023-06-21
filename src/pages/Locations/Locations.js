import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../components/Modal/Modal";
import Card from "../../components/Card/Card";
import Search from "../../components/Search/Search";
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
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchValue(lowerCase);
  };

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

  const filteredData = avData?.filter((mountain) => {
    if (searchValue === "") {
      return mountain;
    } else {
      return mountain.name.toLowerCase().includes(searchValue);
    }
  });

  if (avIsLoad) {
    return <span>Loading...</span>;
  }

  if (avIsError) {
    return <span>Error: {avError.message}</span>;
  }

  return (
    <main className="main main-locations">
      <Modal
        modalState={showModal}
        setModalState={setShowModal}
        mountainInfo={mountainInfo}
      />
      <div className="content-block">
        <Search searchHandler={searchHandler} />
        <section className="locations">
          {filteredData.map((mountain) => (
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
        </section>
      </div>
    </main>
  );
};

export default Locations;
