import { Routes, Route } from "react-router-dom";
import About from "./pages/AboutUs";
import LoginForm from "./pages/login";
import HeroSection from "./components/Home/HeroSection";
import Register from "./pages/Register";
import BlogCard from "./components/Common/Blogscard.jsx";
import FAQ from "./pages/FAQ";
import Contact from "./pages/contact.jsx";
import Footer from "./components/Layout/Footer.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/Blogs" element={<BlogCard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="footer" element={<Footer />} />
      </Routes>
      <AdminPanel />
      <Footer />

    </>
  );
};

export default App;
