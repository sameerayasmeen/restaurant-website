
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { PublicLayout, AdminLayout } from './components/Layouts';

// Public Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Order from './pages/Order';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import MenuManager from './pages/admin/MenuManager';
import ReservationManager from './pages/admin/ReservationManager';
import BlogManager from './pages/admin/BlogManager';
import SiteConfig from './pages/admin/SiteConfig';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout><Outlet /></PublicLayout>}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order" element={<Order />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout><Outlet /></AdminLayout>}>
            <Route index element={<Dashboard />} />
            <Route path="menu" element={<MenuManager />} />
            <Route path="reservations" element={<ReservationManager />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="config" element={<SiteConfig />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;
