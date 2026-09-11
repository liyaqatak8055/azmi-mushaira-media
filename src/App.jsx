import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import SyncModal from './components/SyncModal';
import SupportModal from './components/SupportModal';
import Toast from './components/Toast';
import BackToTop from './components/BackToTop';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import About from './pages/About';
import Videos from './pages/Videos';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function RouteManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Dynamic SEO Titles based on route
    if (pathname === '/admin') {
      document.title = "Admin Control Center & CMS | AZMI MUSHAIRA MEDIA (عظمیٰ مشاعرہ میڈیا)";
    } else if (pathname === '/about') {
      document.title = "About Us & Editorial Mission | AZMI MUSHAIRA MEDIA (عظمیٰ مشاعرہ میڈیا)";
    } else if (pathname === '/videos') {
      document.title = "Complete Video Archive & Reports (6,895+) | AZMI MUSHAIRA MEDIA";
    } else if (pathname === '/contact') {
      document.title = "Book Event Video Coverage & 24/7 Helpline | AZMI MUSHAIRA MEDIA";
    } else {
      document.title = "AZMI MUSHAIRA MEDIA | عظمیٰ مشاعرہ میڈیا - Zameeni Haqeeqat Aur Shayari Ki Mehfil";
    }

    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function MainLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAdmin = pathname.startsWith('/admin');

  // Secret keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A opens Admin Panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <>
      <RouteManager />
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!isAdmin && <Footer />}
      <VideoModal />
      <SyncModal />
      <SupportModal />
      <Toast />
      {!isAdmin && <BackToTop />}
      {!isAdmin && <WhatsAppFloat />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
