import { Routes, Route } from 'react-router-dom';

// Pages
import Home from '../(pages)/Home/Home';
import CarListing from '../(pages)/CarListing/CarListing';
import CarDetails from '../(pages)/CarDetails/CarDetails';
import Booking from '../(pages)/Booking/Booking';
import About from '../(pages)/About/About';
import Contact from '../(pages)/Contact/Contact';
import Dashboard from '../(pages)/Dashboard/Dashboard';
import MyBookings from '../(pages)/Dashboard/MyBookings/MyBookings';
import Favorites from '../(pages)/Dashboard/Favorites/Favorites';
import Settings from '../(pages)/Dashboard/Settings/Settings';
import NotFound from '../(pages)/NotFound/NotFound';
import PeerToPeer from '../(pages)/PeerToPeer/PeerToPeer';

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:id" element={<CarDetails />} />
      <Route path="/booking/:id" element={<Booking />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/list-your-car" element={<PeerToPeer />} />

      {/* Dashboard routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes; 