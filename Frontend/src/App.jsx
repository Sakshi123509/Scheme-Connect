import { Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Layout/Navbar"
import Footer from "./components/Layout/Footer";
import HeroSection from "./components/Home/HerooSection";


const App = () => {
  return (
    <>
      <Navbar />
      <HeroSection/>
      {/* <Footer /> */}
    </>
  );
};

export default App;
