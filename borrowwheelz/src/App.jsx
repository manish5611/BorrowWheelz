import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/common_pages/Homepage';
import Pagenotfound from './pages/common_pages/Pagenotfound';
import Header from './components/common_components/Header';
import Footer from './components/common_components/Footer';
import ContactPage from './pages/common_pages/contactpage';
import Login from './pages/user_pages/login_page';
import About from './pages/common_pages/Aboutuspage';
import CarRentalPage from './pages/car_rental/CarRentalPage';
import ThankYouPage from './pages/common_pages/ThankYouPage'; // Import the Thank You page

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/car-rent" element={<CarRentalPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} /> {/* New Route Added */}
        <Route path="/pagenotfound" element={<Pagenotfound />} />
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
