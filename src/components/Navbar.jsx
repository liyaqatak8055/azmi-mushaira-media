import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openSyncModal, isLiveActive, liveDetails, openVideoPlayer } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Sticky header background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove("mobile-drawer-open");
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => {
      const next = !prev;
      if (next) {
        document.body.classList.add("mobile-drawer-open");
      } else {
        document.body.classList.remove("mobile-drawer-open");
      }
      return next;
    });
  };

  const handleAnchorClick = (anchorId) => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove("mobile-drawer-open");

    if (location.pathname !== '/') {
      navigate('/#' + anchorId);
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement & Booking Ticker */}
      <div className="top-announcement-strip">
        <div className="container announcement-inner">
          <div className="announcement-left-group">
            <span className="announcement-pill-badge">OFFICIAL DESK</span>
            <div className="ticker-text-wrapper">
              <span className="ticker-animated-text">
                📹 All India Mushaira, Mazhabi Jalse, Political Press Conferences aur Public Programs ki professional 4K Ultra HD multi-cam recording &amp; live coverage ke liye booking open hai!
              </span>
            </div>
          </div>
          <Link to="/contact" className="announcement-right-cta">
            <span>🎙️ Book Event Coverage</span>
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header className={`site-header-wrapper ${isScrolled ? 'scrolled' : ''}`} id="siteHeader">
        <div className="header-main-nav">
          {/* Logo & Brand */}
          <Link to="/" className="brand-identity" id="brandLogoLink" aria-label="AZMI MUSHAIRA MEDIA Home">
            <div className="brand-avatar-frame">
              <img src="/assets/images/avatar.jpg" alt="Azmi Mushaira Media Channel Logo" className="brand-avatar-img" />
            </div>
            <div className="brand-text-block">
              <span className="brand-name">AZMI MUSHAIRA MEDIA</span>
              <span className="brand-tagline-sub">عظمیٰ مشاعرہ میڈیا • Zameeni Haqeeqat &amp; Adab</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav aria-label="Main Navigation" className="desktop-nav-wrapper">
            <ul className="nav-menu-desktop">
              <li>
                <Link to="/" className={`nav-menu-link ${location.pathname === '/' ? 'active' : ''}`}>
                  Home
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-menu-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => handleAnchorClick('taaza-coverage')}
                >
                  Coverage
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-menu-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-accent-gold)', fontWeight: 800 }}
                  onClick={() => handleAnchorClick('popular-videos')}
                >
                  🔥 Popular
                </button>
              </li>
              <li>
                <Link to="/videos" className={`nav-menu-link ${location.pathname === '/videos' ? 'active' : ''}`}>
                  🎬 All Videos
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-menu-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => handleAnchorClick('mushaira')}
                >
                  Mushaira
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-menu-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => handleAnchorClick('shayari')}
                >
                  Shayari
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-menu-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => handleAnchorClick('shorts')}
                >
                  Shorts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-menu-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => handleAnchorClick('ground-zero')}
                >
                  Ground Zero
                </button>
              </li>
              <li>
                <Link to="/about" className={`nav-menu-link ${location.pathname === '/about' ? 'active' : ''}`}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`nav-menu-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                  Booking
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Action CTA */}
          <div className="header-cta-group">
            <Link to="/videos" className="header-search-btn" aria-label="Search Videos" title="Search All Videos">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </Link>

            <button
              className={`header-sync-btn ${isLiveActive ? 'is-live' : ''}`}
              id="headerSyncBtn"
              onClick={openSyncModal}
              title="YouTube Live & New Video Auto-Sync"
              aria-label="YouTube Auto-Sync"
            >
              <span className="sync-dot"></span>
              <span className="sync-text">{isLiveActive ? "🔴 LIVE NOW" : "Auto-Sync"}</span>
            </button>

            <a
              href="https://youtube.com/@AZMIMUSHAIRAMEDIA?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-action-youtube"
              id="headerSubscribeBtn"
            >
              <svg viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span className="btn-sub-label">Subscribe Karein</span>
            </a>

            <button
              className="mobile-menu-trigger"
              id="mobileMenuToggle"
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <div
          className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}
          id="mobileNavDrawer"
          role="dialog"
          aria-modal="true"
        >
          <Link to="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
            <span>Home</span> <span className="label-meta">ہوم</span>
          </Link>
          <button
            type="button"
            className="mobile-link"
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => handleAnchorClick('taaza-coverage')}
          >
            <span>Taaza Coverage</span> <span className="label-meta">تازہ کوریج</span>
          </button>
          <button
            type="button"
            className="mobile-link"
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: '#b45309', fontWeight: 800 }}
            onClick={() => handleAnchorClick('popular-videos')}
          >
            <span>🔥 Popular Videos</span> <span className="label-meta">مقبول ویڈیوز</span>
          </button>
          <Link to="/videos" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
            <span>🎬 All Videos (6.8K)</span> <span className="label-meta">تمام ویڈیوز</span>
          </Link>
          <button
            type="button"
            className="mobile-link"
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => handleAnchorClick('mushaira')}
          >
            <span>Mushaira &amp; Mehfil</span> <span className="label-meta">مشاعرہ</span>
          </button>
          <button
            type="button"
            className="mobile-link"
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => handleAnchorClick('shayari')}
          >
            <span>Shayari Ki Mehfil</span> <span className="label-meta">شعر و سخن</span>
          </button>
          <button
            type="button"
            className="mobile-link"
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => handleAnchorClick('shorts')}
          >
            <span>Trending Shorts</span> <span className="label-meta">شارٹس</span>
          </button>
          <button
            type="button"
            className="mobile-link"
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => handleAnchorClick('ground-zero')}
          >
            <span>Ground Zero Reporting</span> <span className="label-meta">گراؤنڈ زیرو</span>
          </button>
          <Link to="/about" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
            <span>About Us</span> <span className="label-meta">تعارف</span>
          </Link>
          <Link to="/contact" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
            <span>Coverage Booking</span> <span className="label-meta">بکنگ</span>
          </Link>
          <a
            href="https://youtube.com/@AZMIMUSHAIRAMEDIA"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-action-primary"
            style={{ marginTop: '10px', width: '100%' }}
          >
            YouTube Channel Kholein
          </a>
        </div>
      </header>

      {/* Dynamic YouTube Live Stream Alert Banner */}
      {isLiveActive && (
        <div className="yt-live-alert-strip" id="ytLiveAlertStrip" style={{ display: 'block' }}>
          <div className="container yt-live-alert-inner">
            <div className="live-pulse-indicator">
              <span className="pulse-dot"></span>
              <span className="live-tag">🔴 LIVE BROADCAST</span>
            </div>
            <div className="live-title-wrap">
              <span className="live-stream-title" id="liveStreamTitle">
                {liveDetails.title}
              </span>
            </div>
            <div className="live-cta-wrap">
              <button
                className="btn-live-watch"
                id="btnWatchLiveNow"
                onClick={() => openVideoPlayer(liveDetails.id, liveDetails.title, "لائیو نشریات")}
              >
                <span>Abhi Dekhein (Watch Live)</span>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
