import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from "react";
import { ModalState, SetModalState, SetUser, User, Data, SetData } from "./types/types";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import Locations from "./pages/Locations/Locations";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import "./App.scss";
import "./styles/typography.scss";
import "./styles/global.scss";

const queryClient = new QueryClient();

function App() {

  const [user, setUser]: [User | null, SetUser] = useState<User | null>(null);
  const [showModal, setShowModal]:[ModalState, SetModalState] = useState(false);
  const [mountainInfo, setMountainInfo]: [Data[], SetData] = useState<Data[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header user={user} setUser={setUser}/>
        <ReactQueryDevtools initialIsOpen={false}/>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                user={user}
                setUser={setUser}
                showModal={showModal}
                setShowModal={setShowModal}
                mountainInfo={mountainInfo}
                setMountainInfo={setMountainInfo}
              />
            }
          />
          <Route
            path="locations"
            element={
              <Locations
                user={user}
                setUser={setUser}
                showModal={showModal}
                setShowModal={setShowModal}
                mountainInfo={mountainInfo}
                setMountainInfo={setMountainInfo}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
