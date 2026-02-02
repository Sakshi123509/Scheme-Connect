import { Routes, Route } from "react-router-dom";
import About from "./pages/AboutUs";
import LoginForm from "./pages/login";
import HeroSection from "./components/Home/HeroSection";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Blog from "./pages/Blogs";
import FAQ from "./pages/FAQ";
import Contact from "./pages/contact.jsx";
import Footer from "./components/Layout/Footer.jsx";
  import Schemes from "./pages/Scheme.jsx";
import SchemeDetail from "./pages/SchemeDetail.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
// import ApplyScheme from "./pages/ApplyScheme.jsx";

const App = () => {
  return (  
    <>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />

        {/* Scheme Routes */}
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/schemes/:id" element={<SchemeDetail />} />
        {/* <Route path="/schemes/:id/apply" element={<ApplyScheme />} /> */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
