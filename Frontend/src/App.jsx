import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Layout/Navbar"
// import Footer from "./components/Layout/Footer";
import About from "./components/Dashboard/ApplicationCard";
import LoginForm from "./components/Auth/LoginForm";
import HeroSection from "./components/Home/HerooSection";
import SearchBar from "./components/Common/SearchBar";
import { Search } from "lucide-react";
import Button from "./components/Common/Button";
import Card from "./components/Common/Card";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/About" element={<About/>} />
      </Routes>
      <SearchBar />
      <Button />
      <Card
        number="1450+"
        description="Total Schemes"
      />
    </>
  );
};

export default App;
