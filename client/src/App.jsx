import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import HistoryPage from './pages/HistoryPage';
import MataRaniPage from './pages/MataRaniPage';
import PanditPage from './pages/PanditPage';
import SamitiPage from './pages/SamitiPage';
import GalleryPage from './pages/GalleryPage';
import EventsPage from './pages/EventsPage';
import ShareHistoryPage from './pages/ShareHistoryPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF5EF]">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/mata-rani" element={<MataRaniPage />} />
          <Route path="/pandit" element={<PanditPage />} />
          <Route path="/samiti" element={<SamitiPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/share-history" element={<ShareHistoryPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Authentication & Management */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
