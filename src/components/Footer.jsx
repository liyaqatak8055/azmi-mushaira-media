import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { openSupportModal } = useApp();
  const navigate = useNavigate();

  const handleAnchorClick = (anchorId) => {
    navigate('/#' + anchorId);
    setTimeout(() => {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="site-footer-wrapper">
      <div className="container">
        <div className="footer-columns-grid">
          {/* Brand Column */}
          <div>
            <div className="brand-identity" style={{ marginBottom: '12px' }}>
              <div className="brand-avatar-frame" style={{ width: '40px', height: '40px' }}>
                <img src="/assets/images/avatar.jpg" alt="Azmi Mushaira Media Logo" className="brand-avatar-img" />
              </div>
              <div className="brand-text-block">
                <span className="brand-name" style={{ fontSize: '1.1rem' }}>AZMI MUSHAIRA MEDIA</span>
                <span className="brand-tagline-sub" style={{ fontSize: '0.68rem' }}>
                  Zameeni Haqeeqat Aur Shayari Ki Mehfil
                </span>
              </div>
            </div>
            <p className="body-default" style={{ fontSize: '0.84rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Azmi Mushaira Media is an independent digital media channel covering All India Mushaira, Urdu
              Bayan, Politics, Interviews and Ground Zero News.
            </p>
            <span className="urdu-sub-badge" style={{ textAlign: 'left', fontSize: '0.85rem' }}>
              آوازِ حق، بے باک صحافت اور کل ہند مشاعرہ
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-nav-list">
              <li><Link to="/">Home (مرکزی صفحہ)</Link></li>
              <li>
                <button
                  type="button"
                  onClick={() => handleAnchorClick('taaza-coverage')}
                  style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0, cursor: 'pointer' }}
                >
                  Taaza Coverage
                </button>
              </li>
              <li><Link to="/videos">Videos &amp; Reports</Link></li>
              <li>
                <button
                  type="button"
                  onClick={() => handleAnchorClick('mushaira')}
                  style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0, cursor: 'pointer' }}
                >
                  Mushaira Corner
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleAnchorClick('shorts')}
                  style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0, cursor: 'pointer' }}
                >
                  Shorts &amp; Reels
                </button>
              </li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="footer-col-title">Services &amp; Production</h4>
            <ul className="footer-nav-list">
              <li><Link to="/contact">Live Mushaira Streaming</Link></li>
              <li><Link to="/contact">Ground Zero Political Coverage</Link></li>
              <li><Link to="/contact">4K Multi-Camera Setup</Link></li>
              <li><Link to="/contact">Poet Interviews &amp; Reels</Link></li>
              <li><Link to="/contact">Book Event Coverage</Link></li>
              <li><a href="https://wa.me/919451329571" target="_blank" rel="noopener noreferrer">24/7 Coverage Helpline</a></li>
            </ul>
          </div>

          {/* Support & Legal Column */}
          <div>
            <h4 className="footer-col-title">Support &amp; Legal</h4>
            <ul className="footer-nav-list">
              <li>
                <button
                  type="button"
                  onClick={() => openSupportModal('faqs')}
                  style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0, cursor: 'pointer' }}
                >
                  FAQs (عام سوالات)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openSupportModal('terms')}
                  style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0, cursor: 'pointer' }}
                >
                  Terms of Use (شرائط و ضوابط)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openSupportModal('privacy')}
                  style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0, cursor: 'pointer' }}
                >
                  Privacy Policy (رازداری)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openSupportModal('editorial')}
                  style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0, cursor: 'pointer' }}
                >
                  Editorial Guidelines
                </button>
              </li>
              <li><Link to="/contact">Contact Editorial Team</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Connect Strip */}
        <div className="footer-connect-strip">
          <h3 className="footer-connect-title">Connect with us</h3>
          <div className="footer-social-circles">
            <a
              href="https://www.facebook.com/azmimushaira31/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-btn btn-facebook"
              aria-label="Follow us on Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/invites/contact/?i=9mt4kzdqh6rc&utm_content=iohjt99"
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-btn btn-instagram"
              aria-label="Follow us on Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://youtube.com/@AZMIMUSHAIRAMEDIA"
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-btn btn-youtube"
              aria-label="Subscribe on YouTube"
              title="YouTube"
            >
              <svg viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © 2026 <strong 
              style={{ cursor: 'text', userSelect: 'text' }} 
              title="" 
              onDoubleClick={() => navigate('/admin')}
            >
              AZMI MUSHAIRA MEDIA
            </strong> (عظمیٰ مشاعرہ میڈیا). All Rights Reserved.
          </div>
          <div>
            Ground Zero Journalism &amp; Cultural Urdu Heritage
          </div>
        </div>
      </div>
    </footer>
  );
}
