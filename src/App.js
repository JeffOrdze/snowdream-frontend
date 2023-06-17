import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import "./App.scss";
import "./styles/global.scss";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
         <Header/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/sign-up" element={<Signup/>}/>
          </Routes>
          <Footer/>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
