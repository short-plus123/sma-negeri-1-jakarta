import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
// Admin imports
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';
import NewsManagement from './pages/admin/NewsManagement';
import GalleryManagement from './pages/admin/GalleryManagement';
import ContactManagement from './pages/admin/ContactManagement';
import SettingsManagement from './pages/admin/SettingsManagement';
import UserManagement from './pages/admin/UserManagement';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Home />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <About />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/news" element={
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <News />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/gallery" element={
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Gallery />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/contact" element={
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Contact />
            </main>
            <Footer />
          </div>
        } />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/news" element={<NewsManagement />} />
        <Route path="/admin/gallery" element={<GalleryManagement />} />
        <Route path="/admin/contacts" element={<ContactManagement />} />
        <Route path="/admin/settings" element={<SettingsManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
      </Routes>
    </Router>
  )
}

export default App
