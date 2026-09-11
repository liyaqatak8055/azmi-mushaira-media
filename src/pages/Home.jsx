import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { useApp } from '../context/AppContext';
import {
  PLATFORM_VIDEOS,
  POPULAR_CHANNEL_VIDEOS,
  ALL_CATALOG_VIDEOS,
  CAROUSEL_SLIDES,
  CHANNEL_CATEGORIES,
  MUSHAIRA_PERFORMANCES,
  SHAYARI_FEATURED,
  PLATFORM_SHORTS
} from '../data/platformData';

export default function Home() {
  const { openVideoPlayer, showPlatformToast } = useApp();

  // 1. HERO CAROUSEL STATE
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slideCount = CAROUSEL_SLIDES.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % slideCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [slideCount]);

  const prevSlide = () => {
    setCurrentSlideIndex(prev => (prev - 1 + slideCount) % slideCount);
  };

  const nextSlide = () => {
    setCurrentSlideIndex(prev => (prev + 1) % slideCount);
  };

  // 2. POPULAR FILTER STATE
  const [popularCategory, setPopularCategory] = useState("all");
  const filteredPopularVideos = useMemo(() => {
    if (popularCategory === "all") return POPULAR_CHANNEL_VIDEOS;
    return POPULAR_CHANNEL_VIDEOS.filter(v => v.category === popularCategory);
  }, [popularCategory]);

  // 3. CATALOG FILTER, SEARCH & PAGINATION STATE
  const [catalogCategory, setCatalogCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 12;

  const filteredCatalogVideos = useMemo(() => {
    let list = ALL_CATALOG_VIDEOS.filter(v => {
      const matchCat = catalogCategory === "all" || v.category === catalogCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        (v.title && v.title.toLowerCase().includes(q)) ||
        (v.urduTitle && v.urduTitle.toLowerCase().includes(q)) ||
        (v.location && v.location.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });

    if (sortOrder === "views" || sortOrder === "popular") {
      list = [...list].sort((a, b) => (b.viewCountNumeric || 0) - (a.viewCountNumeric || 0));
    } else if (sortOrder === "title") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [catalogCategory, searchQuery, sortOrder]);

  const paginatedCatalogVideos = useMemo(() => {
    return filteredCatalogVideos.slice(0, currentPage * PAGE_SIZE);
  }, [filteredCatalogVideos, currentPage]);

  const hasMoreCatalog = paginatedCatalogVideos.length < filteredCatalogVideos.length;

  // 4. BOOKING FORM STATE
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    eventType: "All India Mushaira",
    date: "",
    city: "",
    details: ""
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.city) {
      showPlatformToast("Kripya Naam, Phone aur City zaroor bharein!");
      return;
    }

    const bookingMessage = `*Official Event Coverage Booking Request*\n` +
      `*Platform:* AZMI MUSHAIRA MEDIA (@AZMIMUSHAIRAMEDIA)\n\n` +
      `👤 *Organizer:* ${bookingForm.name}\n` +
      `📞 *Contact Number:* ${bookingForm.phone}\n` +
      `🎤 *Event Category:* ${bookingForm.eventType}\n` +
      `📅 *Date:* ${bookingForm.date || 'Decide hona baaki hai'}\n` +
      `📍 *Location / City:* ${bookingForm.city}\n` +
      `📝 *Notes:* ${bookingForm.details || 'N/A'}`;

    const waUrl = `https://wa.me/919451329571?text=${encodeURIComponent(bookingMessage)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    showPlatformToast("Shukriya! Aapki booking request WhatsApp par open ho rahi hai...");
    setBookingForm({
      name: "",
      phone: "",
      eventType: "All India Mushaira",
      date: "",
      city: "",
      details: ""
    });
  };

  // Lead video for Spotlight and Breaking Coverage
  const leadVideo = PLATFORM_VIDEOS[0];
  const secondaryStories = PLATFORM_VIDEOS.slice(1, 3);
  const upNextVideos = PLATFORM_VIDEOS.slice(1, 4);
  const groundStories = PLATFORM_VIDEOS.filter(v => v.category === "ground" || v.category === "politics").slice(0, 4);

  return (
    <main>
      {/* ==========================================================================
          HERO CAROUSEL SECTION
          ========================================================================== */}
      <section className="hero-cinema-section" id="home">
        <div className="hero-carousel-container" id="heroCarousel">
          <div
            className="hero-slides-track"
            id="heroCarouselTrack"
            style={{
              transform: `translateX(-${currentSlideIndex * 100}%)`,
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {CAROUSEL_SLIDES.map((slide, idx) => (
              <div className={`hero-slide-item ${idx === currentSlideIndex ? 'active' : ''}`} key={idx}>
                <img className="hero-slide-bg" src={slide.thumbnail} alt={slide.title} />
                <div className="hero-slide-gradient"></div>
                <div className="container hero-slide-content">
                  <div className="hero-slide-badges">
                    <span className={`badge-category ${slide.badgeClass}`}>{slide.badge}</span>
                    <span className="hero-badge-tag">{slide.brandLogo}</span>
                  </div>
                  <h2 className="hero-slide-title">{slide.title}</h2>
                  <p className="urdu-sub-badge hero-slide-urdu">{slide.urduTitle}</p>
                  <div className="hero-slide-meta">
                    <span>📍 {slide.location}</span>
                    <span>⏱️ {slide.duration}</span>
                    <span style={{ color: 'var(--color-accent-gold)', fontWeight: 800 }}>⚡ 4K Ultra HD</span>
                  </div>
                  <div className="hero-slide-actions">
                    <button
                      className="btn-action-primary"
                      onClick={() => openVideoPlayer(slide.id, slide.title, slide.urduTitle)}
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      <span>Abhi Dekhein</span>
                    </button>
                    <a
                      href={`https://youtube.com/watch?v=${slide.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-action-secondary"
                    >
                      <span>YouTube Par Kholein</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-nav-arrow arrow-prev" onClick={prevSlide} aria-label="Previous Slide">‹</button>
          <button className="carousel-nav-arrow arrow-next" onClick={nextSlide} aria-label="Next Slide">›</button>

          <div className="carousel-dots-wrapper" id="carouselDots">
            {CAROUSEL_SLIDES.map((_, idx) => (
              <button
                key={idx}
                className={`carousel-dot ${idx === currentSlideIndex ? 'active' : ''}`}
                onClick={() => setCurrentSlideIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* OTT Channels Circular Bubbles Rail */}
        <div className="channels-rail-strip" id="channelsRailStrip">
          <div className="channels-rail-inner" id="channelsRailInner">
            <div className="channels-train-track">
              {CHANNEL_CATEGORIES.concat(CHANNEL_CATEGORIES).map((cat, i) => (
                cat.isExternal ? (
                  <a
                    href={cat.link}
                    key={i}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-bubble"
                    aria-label={cat.label}
                  >
                    <div className="channel-bubble-ring">
                      <img className="channel-bubble-img" src={cat.icon} alt={cat.label} />
                    </div>
                    <span className="channel-bubble-label">{cat.subLabel}</span>
                  </a>
                ) : (
                  <Link
                    to={cat.link}
                    key={i}
                    className="channel-bubble"
                    aria-label={cat.label}
                  >
                    <div className={`channel-bubble-ring ${cat.isLive ? 'live' : ''}`}>
                      <img className="channel-bubble-img" src={cat.icon} alt={cat.label} />
                      {cat.isLive && <span className="channel-bubble-live-badge">LIVE</span>}
                    </div>
                    <span className="channel-bubble-label">{cat.subLabel}</span>
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Featured Video Spotlight & Up Next Strip */}
        <div className="container" style={{ marginTop: '36px' }}>
          <div className="featured-spotlight-grid">
            <div
              className="featured-video-card"
              onClick={() => openVideoPlayer(leadVideo.id, leadVideo.title, leadVideo.urduTitle)}
            >
              <div className="featured-video-media">
                <img className="featured-video-thumb" src={leadVideo.thumbnail} alt={leadVideo.title} />
                <div className="card-play-hover-indicator">
                  <div className="card-play-disc">
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                  <span className="badge-category cat-politics">🔥 SPOTLIGHT EXCLUSIVE</span>
                </div>
                <span className="featured-video-duration">{leadVideo.duration}</span>
              </div>
              <div className="featured-video-content">
                <div className="featured-video-meta">
                  <span className="editorial-kicker">UP SIYASAT &amp; GROUND REALITY</span>
                  <span>📍 {leadVideo.location}</span>
                </div>
                <h2 className="h3-card-title spotlight-title">{leadVideo.title}</h2>
                <span className="urdu-sub-badge" style={{ textAlign: 'left', marginBottom: '12px' }}>
                  {leadVideo.urduTitle}
                </span>
                <p className="body-default spotlight-desc">
                  Ground Zero se be-khauf sach, UP aur desh ki trending politics ka zameeni tajziya, aur All India Mushaira ki roohani mehfilein — sab ek platform par.
                </p>
                <div className="hero-feature-pills" style={{ marginBottom: '16px' }}>
                  <div className="feat-pill">
                    <span className="feat-pill-icon">🎙️</span>
                    <span className="feat-pill-text"><strong>150+</strong> Mehfil Coverage</span>
                  </div>
                  <div className="feat-pill">
                    <span className="feat-pill-icon">⚖️</span>
                    <span className="feat-pill-text"><strong>Ground Zero</strong> Bebak Sach</span>
                  </div>
                  <div className="feat-pill">
                    <span className="feat-pill-icon">📹</span>
                    <span className="feat-pill-text"><strong>4K Ultra HD</strong> Multi-Cam</span>
                  </div>
                </div>
                <div className="hero-cta-actions">
                  <button
                    className="btn-action-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      openVideoPlayer(leadVideo.id, leadVideo.title, leadVideo.urduTitle);
                    }}
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    <span>Taaza Videos Dekhein</span>
                  </button>
                  <Link to="/contact" className="btn-action-secondary hero-btn-book">
                    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                    <span>Book Event Coverage</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Up Next List */}
            <div className="upnext-column">
              <div className="upnext-header">
                <span className="upnext-title">Up Next | اگلی ویڈیوز</span>
                <Link to="/videos" className="upnext-seeall">View All (تمام) →</Link>
              </div>
              <div className="upnext-list">
                {upNextVideos.map((video, idx) => (
                  <div
                    className="upnext-row-item"
                    key={idx}
                    onClick={() => openVideoPlayer(video.id, video.title, video.urduTitle)}
                  >
                    <div className="upnext-thumb-wrap">
                      <img src={video.thumbnail} alt={video.title} loading="lazy" />
                      <span className="upnext-duration">{video.duration}</span>
                    </div>
                    <div className="upnext-meta">
                      <span className={`badge-category cat-${video.category}`} style={{ fontSize: '0.62rem', padding: '2px 6px' }}>
                        {video.categoryLabel}
                      </span>
                      <h4 className="upnext-item-title">{video.title}</h4>
                      <span className="urdu-sub-badge" style={{ fontSize: '0.72rem', textAlign: 'left' }}>{video.urduTitle}</span>
                      <span className="upnext-footer-tag">📍 {video.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          TAAZA COVERAGE SECTION
          ========================================================================== */}
      <section className="content-section section-breaking" id="taaza-coverage">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">TAAZA COVERAGE | تازہ ترین کوریج</span>
              <h2 className="h2-section-title">Latest Ground Reporting &amp; Big Stories</h2>
              <p className="urdu-sub-badge" style={{ textAlign: 'left', marginTop: '4px' }}>
                اتر پردیش اور ملکی سیاست کے تازہ ترین زمینی حقائق
              </p>
            </div>
            <Link to="/videos" className="section-view-all-link">
              <span>View All Coverage</span>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" /></svg>
            </Link>
          </div>

          <div className="breaking-coverage-grid">
            <article
              className="breaking-lead-card is-lead"
              onClick={() => openVideoPlayer(leadVideo.id, leadVideo.title, leadVideo.urduTitle)}
            >
              <div className="video-card-thumb-frame">
                <img src={leadVideo.thumbnail} alt={leadVideo.title} />
                <div className="card-play-hover-indicator">
                  <div className="card-play-disc">
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                  <span className="badge-category cat-breaking">🔴 LATEST HEADLINE</span>
                  <span className="badge-category cat-politics">4K MULTI-CAM</span>
                </div>
                <span className="featured-video-duration">{leadVideo.duration}</span>
              </div>
              <div className="video-card-body">
                <span className="editorial-kicker">{leadVideo.location} EXCLUSIVE</span>
                <h3 className="video-card-title" style={{ fontSize: '1.28rem' }}>{leadVideo.title}</h3>
                <span className="urdu-sub-badge" style={{ textAlign: 'left', fontSize: '0.98rem' }}>{leadVideo.urduTitle}</span>
                <div className="video-card-footer" style={{ marginTop: '14px' }}>
                  <span>{leadVideo.date} • {leadVideo.location}</span>
                  <span style={{ color: 'var(--color-header-green)', fontWeight: 800 }}>▶ Dekhein</span>
                </div>
              </div>
            </article>

            <div className="breaking-secondary-column">
              {secondaryStories.map((story, i) => (
                <article
                  className="breaking-lead-card"
                  key={i}
                  onClick={() => openVideoPlayer(story.id, story.title, story.urduTitle)}
                >
                  <div className="video-card-thumb-frame">
                    <img src={story.thumbnail} alt={story.title} />
                    <div className="card-play-hover-indicator">
                      <div className="card-play-disc">
                        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                    <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
                      <span className={`badge-category cat-${story.category}`}>{story.categoryLabel}</span>
                    </div>
                    <span className="featured-video-duration">{story.duration}</span>
                  </div>
                  <div className="video-card-body">
                    <h3 className="video-card-title" style={{ fontSize: '1.02rem' }}>{story.title}</h3>
                    <span className="urdu-sub-badge" style={{ textAlign: 'left' }}>{story.urduTitle}</span>
                    <div className="video-card-footer">
                      <span>{story.location}</span>
                      <span style={{ color: 'var(--color-header-green)', fontWeight: 800 }}>▶ Watch</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          POPULAR VIDEOS SECTION
          ========================================================================== */}
      <section className="content-section section-popular" id="popular-videos">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow" style={{ color: '#b45309' }}>🔥 MOST POPULAR &amp; TRENDING | مقبول ترین ویڈیوز</span>
              <h2 className="h2-section-title">Highest Viewed Videos (6.7M, 4.4M, 3.8M Views)</h2>
              <p className="urdu-sub-badge" style={{ textAlign: 'left', marginTop: '4px' }}>
                کروڑوں ناظرین کی پسندیدہ تقاریر، جلسے اور مشاعروں کا مقبول ترین انتخاب
              </p>
            </div>
            <div className="popular-filter-chips">
              <button
                className={`popular-chip-btn ${popularCategory === 'all' ? 'active' : ''}`}
                onClick={() => setPopularCategory('all')}
              >
                🔥 Sabhi Popular (12)
              </button>
              <button
                className={`popular-chip-btn ${popularCategory === 'siyasat' ? 'active' : ''}`}
                onClick={() => setPopularCategory('siyasat')}
              >
                🗳️ Siyasat &amp; Jalsa
              </button>
              <button
                className={`popular-chip-btn ${popularCategory === 'mushaira' ? 'active' : ''}`}
                onClick={() => setPopularCategory('mushaira')}
              >
                🎤 All India Mushaira
              </button>
            </div>
          </div>

          <div className="popular-videos-grid">
            {filteredPopularVideos.map((video, idx) => (
              <VideoCard video={video} variant="popular" index={idx} key={video.id + idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          VIDEO CATALOG & BROWSER SECTION
          ========================================================================== */}
      <section className="content-section section-catalog" id="all-videos">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">COMPLETE CATALOG | مکمل ذخیرہ ویڈیوز</span>
              <h2 className="h2-section-title">Explore All 6,895+ Uploads &amp; Coverage</h2>
              <p className="urdu-sub-badge" style={{ textAlign: 'left', marginTop: '4px' }}>
                ہر موضوع، شاعر، اور جلسے کی مکمل ویڈیو سرچ کریں
              </p>
            </div>
            <div className="catalog-search-wrap">
              <input
                type="text"
                className="catalog-search-input"
                placeholder="Search videos, poets, speeches..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {searchQuery && (
                <button
                  className="catalog-search-clear"
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="catalog-controls-bar">
            <div className="catalog-tabs-row" id="catalogCategoryTabs">
              {[
                { id: "all", label: "🌟 Sabhi (All 6,895+)" },
                { id: "mushaira", label: "🎤 Mushaira (2.4K)" },
                { id: "politics", label: "🗳️ Siyasat (1.8K)" },
                { id: "interviews", label: "🎙️ Bayanat (1.1K)" },
                { id: "ground", label: "🌍 Ground Zero (950)" },
                { id: "islamic", label: "🕌 Deeni Mehfil (640)" }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`catalog-tab-btn ${catalogCategory === tab.id ? 'active' : ''}`}
                  onClick={() => {
                    setCatalogCategory(tab.id);
                    setCurrentPage(1);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="catalog-sort-wrap">
              <label htmlFor="catalogSort">Sort By:</label>
              <select
                id="catalogSort"
                className="catalog-sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="popular">Most Popular (زیادہ دیکھے گئے)</option>
                <option value="views">Highest Views (کروڑوں ویوز)</option>
                <option value="title">Title (حروفِ تہجی)</option>
              </select>
            </div>
          </div>

          <div className="catalog-count-strip">
            <span>
              Displaying <strong>{paginatedCatalogVideos.length}</strong> of <strong>{filteredCatalogVideos.length}</strong> videos
            </span>
          </div>

          <div className="editorial-cards-grid">
            {paginatedCatalogVideos.map((video, idx) => (
              <VideoCard video={video} variant="editorial" index={idx} key={video.id + idx} />
            ))}
          </div>

          {hasMoreCatalog && (
            <div className="catalog-load-more-wrap" style={{ textAlign: 'center', marginTop: '32px' }}>
              <button
                className="btn-action-primary"
                style={{ padding: '12px 28px', fontSize: '0.92rem' }}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                📥 Load More Videos (مزید ویڈیوز لوڈ کریں)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ==========================================================================
          ALL INDIA MUSHAIRA SECTION
          ========================================================================== */}
      <section className="content-section section-mushaira" id="mushaira">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">ALL INDIA MUSHAIRA | کل ہند مشاعرہ</span>
              <h2 className="h2-section-title">Mushaira &amp; Mehfil-e-Shayari</h2>
              <p className="urdu-sub-badge" style={{ textAlign: 'left', marginTop: '4px' }}>
                شعرائے کرام کا کلام، غزل خوانی اور مشاعروں کی روح پرور محفلیں
              </p>
            </div>
            <Link to="/videos?cat=mushaira" className="section-view-all-link">
              <span>View All Mushaira (مشاعرے دیکھیں)</span>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" /></svg>
            </Link>
          </div>

          <div className="mushaira-cards-grid">
            {MUSHAIRA_PERFORMANCES.map((item, idx) => (
              <VideoCard video={item} variant="mushaira" index={idx} key={item.id + idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SHAYARI KI MEHFIL SECTION
          ========================================================================== */}
      <section className="content-section section-shayari" id="shayari">
        <div className="container">
          <div className="shayari-spotlight-card">
            <span className="section-eyebrow" style={{ color: 'var(--color-accent-gold)' }}>SHAYARI KI MEHFIL | شعر و سخن</span>
            <blockquote className="featured-couplet-urdu">
              {SHAYARI_FEATURED.coupletUrdu}
            </blockquote>
            <p className="featured-couplet-roman">{SHAYARI_FEATURED.romanHindi}</p>
            <div className="shayari-poet-credit">
              <span>— {SHAYARI_FEATURED.poet} ({SHAYARI_FEATURED.poetUrdu})</span>
            </div>
            <div style={{ marginTop: '20px' }}>
              <button
                className="btn-action-primary"
                onClick={() => openVideoPlayer(SHAYARI_FEATURED.videoId, "Shayari Mehfil", "شعر و سخن")}
              >
                <span>Sunain Yeh Mehfil (Listen) ▶</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          TRENDING SHORTS CAROUSEL
          ========================================================================== */}
      <section className="content-section section-shorts" id="shorts">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">TRENDING SHORTS | شارٹس ویڈیوز</span>
              <h2 className="h2-section-title">Viral Clips &amp; Quick Statements</h2>
              <p className="urdu-sub-badge" style={{ textAlign: 'left', marginTop: '4px' }}>
                یوٹیوب شارٹس، وائرل اشعار اور مختصر بیانات
              </p>
            </div>
            <a
              href="https://youtube.com/@AZMIMUSHAIRAMEDIA/shorts"
              target="_blank"
              rel="noopener noreferrer"
              className="section-view-all-link"
            >
              <span>Watch on YouTube Shorts</span>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" /></svg>
            </a>
          </div>

          <div className="shorts-horizontal-track">
            {PLATFORM_SHORTS.map((short, idx) => (
              <VideoCard video={short} variant="short" index={idx} key={short.id + idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          GROUND ZERO REPORTING SECTION
          ========================================================================== */}
      <section className="content-section section-ground" id="ground-zero">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">GROUND ZERO REPORTING | زمینی حقائق</span>
              <h2 className="h2-section-title">Bebak Sahafat &amp; Zameeni Aawaz</h2>
              <p className="urdu-sub-badge" style={{ textAlign: 'left', marginTop: '4px' }}>
                بغیر کسی خوف کے زمینی مسائل، عوامی مظاہرے اور حق کا بیان
              </p>
            </div>
            <Link to="/videos?cat=ground" className="section-view-all-link">
              <span>View All Reports</span>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" /></svg>
            </Link>
          </div>

          <div className="ground-zero-grid">
            {groundStories.map((story, idx) => (
              <VideoCard video={story} variant="ground" index={idx} key={story.id + idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          RED YOUTUBE SUBSCRIPTION BANNER
          ========================================================================== */}
      <section className="youtube-banner-strip">
        <div className="container yt-banner-inner">
          <div className="yt-banner-left">
            <div className="yt-banner-play-icon">
              <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
                AZMI MUSHAIRA MEDIA YouTube Par Hamare Saath Judein
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>
                <strong>1.49M Subscribers • 530M+ Views • 6,895 Videos</strong> | Har naye All India Mushaira, Ground Zero report aur exclusive interview ki notification sabse pehle paane ke liye subscribe karein.
              </p>
            </div>
          </div>

          <a
            href="https://youtube.com/@AZMIMUSHAIRAMEDIA?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-action-primary"
            style={{ padding: '12px 28px' }}
          >
            <span>Subscribe Karein (@AZMIMUSHAIRAMEDIA)</span>
          </a>
        </div>
      </section>

      {/* ==========================================================================
          TA'ARUF (ABOUT) PREVIEW SECTION
          ========================================================================== */}
      <section className="content-section section-about" id="about">
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <span className="section-eyebrow">TA'ARUF | تعارف</span>
            <h2 className="h2-section-title" style={{ marginBottom: '12px' }}>About Azmi Mushaira Media</h2>
            <p className="urdu-sub-badge" style={{ textAlign: 'center', marginBottom: '18px', fontSize: '1.15rem' }}>
              عظمیٰ مشاعرہ میڈیا — بے باک صحافت، زمینی حقائق اور اردو ادب کی پروقار آواز
            </p>
            <p className="body-lead" style={{ fontSize: '1rem', marginBottom: '18px' }}>
              <strong>AZMI MUSHAIRA MEDIA</strong> 24 March 2016 se shuru hokar aaj <strong>1.49M+ subscribers</strong>, <strong>6,895 se zyada videos</strong> aur <strong>53 Crore (530M+) views</strong> ke sath Ground Zero be-khauf reporting, All India Mushaira aur Hindustani adab ka sabse mutabar digital platform hai.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <span style={{ background: '#ecfdf5', border: '1px solid rgba(6,78,59,0.18)', color: '#064e3b', padding: '6px 14px', borderRadius: '999px', fontWeight: 800, fontSize: '0.85rem' }}>👥 1.49M Subscribers</span>
              <span style={{ background: '#ecfdf5', border: '1px solid rgba(6,78,59,0.18)', color: '#064e3b', padding: '6px 14px', borderRadius: '999px', fontWeight: 800, fontSize: '0.85rem' }}>📈 530M+ Total Views</span>
              <span style={{ background: '#ecfdf5', border: '1px solid rgba(6,78,59,0.18)', color: '#064e3b', padding: '6px 14px', borderRadius: '999px', fontWeight: 800, fontSize: '0.85rem' }}>📹 6,895 Videos</span>
              <span style={{ background: '#ecfdf5', border: '1px solid rgba(6,78,59,0.18)', color: '#064e3b', padding: '6px 14px', borderRadius: '999px', fontWeight: 800, fontSize: '0.85rem' }}>🇮🇳 India (Since Mar 2016)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn-action-primary">
                <span>Poora Ta'aruf Padhein (Read About Us) →</span>
              </Link>
              <Link to="/contact" className="btn-action-secondary">
                <span>Book Event Coverage</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          COVERAGE BOOKING FORM SECTION
          ========================================================================== */}
      <section className="content-section section-booking" id="booking">
        <div className="container">
          <div className="booking-panel-grid">
            <div className="booking-info-pane">
              <span className="section-eyebrow" style={{ color: 'var(--color-accent-gold)' }}>PROFESSIONAL PRODUCTION</span>
              <h2 className="booking-title">Book Event Video Coverage</h2>
              <p className="booking-desc">
                All India Mushaira, Mazhabi Jalse, Political Programs aur Rallies ki 4K multi-camera professional video recording aur real-time YouTube live streaming ke liye humse rabta karein.
              </p>
              <div className="booking-feature-checklist">
                <div className="booking-check-item">
                  <span className="check-icon">✓</span>
                  <span>4K Multi-Camera Setup with High-Gain Audio Switched Recording</span>
                </div>
                <div className="booking-check-item">
                  <span className="check-icon">✓</span>
                  <span>1.49M Subscribers Wale Channel Par Instant Upload &amp; Live Stream</span>
                </div>
                <div className="booking-check-item">
                  <span className="check-icon">✓</span>
                  <span>Professional Stage Interviews &amp; Viral Shorts Reels Production</span>
                </div>
              </div>
              <div className="booking-helpline-box">
                <span className="helpline-label">Direct WhatsApp Booking:</span>
                <a href="https://wa.me/919451329571" target="_blank" rel="noopener noreferrer" className="helpline-number">
                  💬 +91 9451329571
                </a>
              </div>
            </div>

            <div className="booking-form-pane">
              <form id="coverageBookingForm" onSubmit={handleBookingSubmit}>
                <div className="form-group-row">
                  <div className="form-field">
                    <label htmlFor="clientName">Aapka Naam (Organizer Name) *</label>
                    <input
                      type="text"
                      id="clientName"
                      className="input-control"
                      placeholder="e.g. Mohd Tariq"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="clientPhone">Mobile / WhatsApp No. *</label>
                    <input
                      type="tel"
                      id="clientPhone"
                      className="input-control"
                      placeholder="9451329571"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label htmlFor="clientEventType">Event Category *</label>
                    <select
                      id="clientEventType"
                      className="input-control"
                      value={bookingForm.eventType}
                      onChange={(e) => setBookingForm({ ...bookingForm, eventType: e.target.value })}
                    >
                      <option value="All India Mushaira">All India Mushaira (کل ہند مشاعرہ)</option>
                      <option value="Deeni Jalsa / Mehfil">Deeni Jalsa / Naat Mehfil (جلسہ)</option>
                      <option value="Political Rally / Press Meet">Political Rally / Press Meet (سیاسی جلسہ)</option>
                      <option value="Exclusive Interview">Exclusive Interview (انٹرویو)</option>
                      <option value="Other Public Event">Other Public Event</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="clientDate">Event Date</label>
                    <input
                      type="date"
                      id="clientDate"
                      className="input-control"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="clientCity">City / Location *</label>
                  <input
                    type="text"
                    id="clientCity"
                    className="input-control"
                    placeholder="e.g. Azamgarh, Lucknow, Delhi, Jaipur"
                    required
                    value={bookingForm.city}
                    onChange={(e) => setBookingForm({ ...bookingForm, city: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="clientDetails">Event Details / Shora Names (Optional)</label>
                  <textarea
                    id="clientDetails"
                    className="input-control"
                    rows="3"
                    placeholder="Khas shayar, venue aur coverage requirements likhein..."
                    value={bookingForm.details}
                    onChange={(e) => setBookingForm({ ...bookingForm, details: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn-action-primary" style={{ width: '100%', padding: '14px' }}>
                  <span>📲 WhatsApp Par Booking Request Bhein</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
