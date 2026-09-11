import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main id="aboutContent">
      <div className="container about-page-wrapper">
        {/* Back Button & Breadcrumbs Navigation Bar */}
        <div className="about-nav-row">
          <Link to="/" className="about-back-btn" id="aboutBackBtn" aria-label="Back to Home Page">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>← Back to Home (واپس ہوم پر جائیں)</span>
          </Link>

          <nav className="about-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 0 }}>
            <Link to="/">Home (مرکزی صفحہ)</Link>
            <span>›</span>
            <span>About Us / تعارف اور مشن</span>
          </nav>
        </div>

        {/* Hero Introduction Card */}
        <section className="about-hero-card" aria-label="About Introduction">
          <div className="about-hero-badge">
            <span className="badge-dot"></span>
            <span>OFFICIAL PROFILE &amp; EDITORIAL MISSION</span>
          </div>

          <h1 className="about-hero-title">
            AZMI MUSHAIRA MEDIA
            <span className="about-urdu-name">عظمیٰ مشاعرہ میڈیا</span>
          </h1>

          <p className="urdu-sub-badge" style={{ fontSize: '1.2rem', margin: '0 auto 20px', maxWidth: '780px' }}>
            بے باک صحافت، زمینی حقائق، اور کل ہند مشاعرہ کی معتبر و پروقار آواز
          </p>

          <p className="about-lead-text">
            <strong>AZMI MUSHAIRA MEDIA</strong> (یوٹیوب چینل: <strong>@AZMIMUSHAIRAMEDIA</strong>) بھارت کا ایک ممتاز اور آزاد ڈیجیٹل میڈیا پلیٹ فارم ہے، جو پچھلے کئی برسوں سے اتر پردیش، دہلی، بہار، راجستھان اور پورے ملک میں زمینی حقائق، سیاسی تجزیات اور اردو ادب و مشاعروں کی براہِ راست کوریج پیش کر رہا ہے۔
          </p>

          <div className="about-hero-actions">
            <a
              href="https://youtube.com/@AZMIMUSHAIRAMEDIA?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-action-primary"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>Official YouTube Channel</span>
            </a>
            <Link to="/contact" className="btn-action-secondary hero-btn-book">
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
              <span>Book Event Coverage</span>
            </Link>
          </div>
        </section>

        {/* Key Platform Metrics */}
        <section className="about-stats-grid" aria-label="Official Platform Statistics">
          <div className="about-stat-box">
            <span className="stat-number">1.49M+</span>
            <span className="stat-label">Subscribers on YouTube</span>
            <span className="stat-urdu">14 لاکھ 90 ہزار سے زائد سبسکرائبرز</span>
          </div>
          <div className="about-stat-box">
            <span className="stat-number">530M+</span>
            <span className="stat-label">Total Video Views</span>
            <span className="stat-urdu">53 کروڑ سے زیادہ مجموعی ویوز</span>
          </div>
          <div className="about-stat-box">
            <span className="stat-number">6,895+</span>
            <span className="stat-label">Published Videos</span>
            <span className="stat-urdu">ہزاروں معیاری ویڈیوز کا ذخیرہ</span>
          </div>
          <div className="about-stat-box">
            <span className="stat-number">2016</span>
            <span className="stat-label">Established (March 24)</span>
            <span className="stat-urdu">8 سالوں سے مسلسل دیانتدار صحافت</span>
          </div>
        </section>

        {/* Narrative & Editorial Philosophy */}
        <section className="about-narrative-split">
          <div className="about-story-col">
            <h2 className="about-sub-heading">
              Hamari Kahani Aur Maqsad (Our Mission)
            </h2>
            <p className="body-default" style={{ fontSize: '1rem', lineHeight: 1.8, marginBottom: '16px' }}>
              <strong>AZMI MUSHAIRA MEDIA</strong> ki buniyad 24 March 2016 ko is maqsad ke sath rakhi gayi thi ke aam awam tak baghair kisi siyasi ya shakhsi dabao ke zameeni sach pahunchaya jaye, aur sath hi Hindustani tehzeeb ke sabse pyare hisse — <strong>Urdu Shayari, Ghazal aur All India Mushaira</strong> — ko digital duniya me aala meyaar (4K Ultra HD) par mehfooz kiya jaye.
            </p>
            <p className="body-default" style={{ fontSize: '1rem', lineHeight: 1.8, marginBottom: '16px' }}>
              Pichhle 8 saalon ke dauran humne Asaduddin Owaisi (AIMIM), Adv. Chandrashekhar Azad (Aazad Samaj Party / Bhim Army), Hanuman Beniwal (RLP), aur UP/Bihar ki tamam ahem siyasi raliyon aur jalson ko ground zero se live report kiya hai.
            </p>
          </div>

          <aside className="about-quote-sidebar">
            <blockquote className="about-quote-text">
              "Sahafat ka matlab taqatwar se be-khauf sawaal poochna aur kamzor ki aawaz banna hai. Aur shayari hamare dil aur rooh ko zinda rakhne ka zariya hai."
            </blockquote>
            <div className="about-quote-urdu">
              صحافت طاقتور سے سوال اور کمزور کی آواز ہے، اور شاعری روح کو زندہ رکھنے کا وسیلہ۔
            </div>
            <div className="about-quote-author">
              <img src="/assets/images/avatar.jpg" alt="Azmi Mushaira Media Logo" className="author-avatar" />
              <div>
                <div className="author-name">Azmi Mushaira Media</div>
                <div className="author-role">Editorial Board &amp; Production Team</div>
              </div>
            </div>
          </aside>
        </section>

        {/* 4 Core Pillars */}
        <section style={{ margin: '50px 0' }} aria-label="Our 4 Core Pillars">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-eyebrow">BUNIYADI SUTOON | بنیادی ستون</span>
            <h2 className="h2-section-title">4 Core Pillars of Our Work</h2>
          </div>

          <div className="about-pillars-grid">
            <div className="about-pillar-card">
              <div className="pillar-icon-box">🎙️</div>
              <h3 className="pillar-title">1. All India Mushaira</h3>
              <p className="pillar-desc">
                Hamza Ayaz Bijnori, Shabina Adeeb, Johar Kanpuri, Rahat Indori aur digar maroof shora ke kalami shahkar ko high-quality multi-camera setup ke sath broadcast karna.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="pillar-icon-box">⚖️</div>
              <h3 className="pillar-title">2. Ground Zero Bebak Reporting</h3>
              <p className="pillar-desc">
                UP aur dehaat ke zameeni masail, awami aawaz, masjid/madrassa issues aur samaji haqeeqat ko bina kisi khauf aur hiras ke qalam-band karna.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="pillar-icon-box">🗳️</div>
              <h3 className="pillar-title">3. Siyasat &amp; Jalsa Coverage</h3>
              <p className="pillar-desc">
                Uttar Pradesh Assembly elections, AIMIM rallies, Bhim Army conventions aur tamam ahem siyasi bayanat ka bina jhanjhat nishpaksh tajziya.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="pillar-icon-box">📹</div>
              <h3 className="pillar-title">4. Professional Production</h3>
              <p className="pillar-desc">
                Stage lighting, 4K multi-cam video switching, crystal-clear audio master recording aur social media platforms par live stream support.
              </p>
            </div>
          </div>
        </section>

        {/* Event Coverage Booking CTA */}
        <section className="about-services-banner">
          <div className="services-banner-content">
            <span className="section-eyebrow" style={{ color: 'var(--color-accent-gold)' }}>PROFESSIONAL SERVICES</span>
            <h2 className="services-banner-title">Apne Event Ki Professional Video Recording Karwayein</h2>
            <p className="services-banner-desc">
              Azmi Mushaira Media pure UP aur All India me All India Mushaira, Mazhabi Jalse, Political Press Conferences aur Public Rallies ki multi-camera 4K recording aur instant live streaming ki professional service provide karta hai.
            </p>
            <div className="hero-cta-actions">
              <Link to="/contact" className="btn-action-primary" style={{ background: '#ffffff', color: '#064e3b' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
                <span style={{ fontWeight: 800 }}>Book Event Coverage Now</span>
              </Link>
              <a
                href="https://youtube.com/@AZMIMUSHAIRAMEDIA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-action-secondary"
                style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff' }}
              >
                <span>Past Work &amp; Portfolio</span>
              </a>
            </div>
          </div>
        </section>

        {/* Bottom Return Navigation */}
        <div style={{ textAlign: 'center', marginTop: '52px', paddingTop: '30px', borderTop: '1px solid var(--color-border-subtle)' }}>
          <Link to="/" className="about-back-btn" style={{ padding: '12px 30px', fontSize: '0.98rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Wapas Home Page Par Jayein (← Back to Home)</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
