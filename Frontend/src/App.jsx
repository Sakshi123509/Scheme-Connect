import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Layout/Navbar"
// import Footer from "./components/Layout/Footer";
import About from "./components/Dashboard/ApplicationCard"
import LoginForm from "./components/Auth/LoginForm";
import HeroSection from "./components/Home/HerooSection";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/About" element={<About/>} />
      </Routes>
    </>
  );
};

export default App;
