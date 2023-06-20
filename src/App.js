import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import Locations from "./pages/Locations/Locations";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import "./App.scss";
import "./styles/global.scss";

const queryClient = new QueryClient();
function App() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mountainInfo, setMountainInfo] = useState([]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
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
