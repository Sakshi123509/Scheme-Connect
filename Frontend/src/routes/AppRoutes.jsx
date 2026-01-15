// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';

// Pages
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import SchemesPage from '../pages/SchemesPage';
import SchemeDetail from '../pages/SchemeDetail';
import Dashboard from '../pages/Dashboard';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="schemes" element={<SchemesPage />} />
          <Route path="schemes/:id" element={<SchemeDetail />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
        </Route>

        {/* Auth Routes (No Layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes (Dashboard) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;