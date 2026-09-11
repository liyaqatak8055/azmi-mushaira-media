import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Helper to extract clean YouTube Video ID from any URL format
function extractYouTubeId(urlOrId) {
  if (!urlOrId) return "";
  const str = urlOrId.trim();
  // If already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
  // youtu.be/ID
  const youtuBe = str.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (youtuBe) return youtuBe[1];
  // youtube.com/watch?v=ID
  const watchV = str.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchV) return watchV[1];
  // youtube.com/shorts/ID
  const shorts = str.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shorts) return shorts[1];
  // youtube.com/embed/ID
  const embed = str.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embed) return embed[1];
  // live/ID
  const live = str.match(/live\/([a-zA-Z0-9_-]{11})/);
  if (live) return live[1];
  return "";
}

// Available website container slots definition
export const WEBSITE_SLOTS = [
  { key: "heroSlide1", label: "🌟 Hero Carousel — Slide 1 (Front Spotlight)", section: "Hero Carousel" },
  { key: "heroSlide2", label: "🌟 Hero Carousel — Slide 2", section: "Hero Carousel" },
  { key: "heroSlide3", label: "🌟 Hero Carousel — Slide 3", section: "Hero Carousel" },
  { key: "spotlightLead", label: "🔥 Home Spotlight — Big Lead Feature Story", section: "Spotlight" },
  { key: "taazaLead", label: "🔴 Taaza Coverage — Breaking Lead Headline", section: "Taaza Coverage" },
  { key: "taazaSecondary1", label: "📰 Taaza Coverage — Secondary Story 1", section: "Taaza Coverage" },
  { key: "taazaSecondary2", label: "📰 Taaza Coverage — Secondary Story 2", section: "Taaza Coverage" },
  { key: "upNext1", label: "⏭️ Up Next Strip — Position 1", section: "Up Next" },
  { key: "upNext2", label: "⏭️ Up Next Strip — Position 2", section: "Up Next" },
  { key: "upNext3", label: "⏭️ Up Next Strip — Position 3", section: "Up Next" },
  { key: "mushaira1", label: "🎤 All India Mushaira — Slot 1", section: "Mushaira Rail" },
  { key: "mushaira2", label: "🎤 All India Mushaira — Slot 2", section: "Mushaira Rail" },
  { key: "popular1", label: "🏆 Most Viewed #1 (Gold Trophy)", section: "Popular Videos" },
  { key: "popular2", label: "🥈 Most Viewed #2 (Silver)", section: "Popular Videos" },
  { key: "popular3", label: "🥉 Most Viewed #3 (Bronze)", section: "Popular Videos" },
  { key: "ground1", label: "🌍 Ground Zero Reports — Slot 1", section: "Ground Zero" },
  { key: "ground2", label: "🌍 Ground Zero Reports — Slot 2", section: "Ground Zero" },
  { key: "shorts1", label: "⚡ Trending Shorts — Slot 1", section: "Shorts" },
  { key: "shorts2", label: "⚡ Trending Shorts — Slot 2", section: "Shorts" }
];

export default function Admin() {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    changeAdminPassword,
    gridOverrides,
    setGridSlotVideo,
    clearGridSlotVideo,
    resetAllGridSlots,
    adsConfig,
    updateAdPlacement,
    toggleAdPlacement,
    tickerText,
    updateTickerText,
    bookingLeads,
    updateBookingLeadStatus,
    deleteBookingLead,
    isLiveActive,
    setIsLiveActive,
    liveDetails,
    setLiveDetails,
    syncedVideos,
    syncYouTubeVideos,
    showPlatformToast
  } = useApp();

  // Login form state
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Active dashboard tab: 'grids' | 'ads' | 'sync' | 'live' | 'leads' | 'settings'
  const [activeTab, setActiveTab] = useState("grids");

  // Grid Video Slot Form State
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("spotlightLead");
  const [videoTitle, setVideoTitle] = useState("");
  const [urduTitle, setUrduTitle] = useState("");
  const [category, setCategory] = useState("politics");
  const [location, setLocation] = useState("Azmi Media Exclusive");
  const [duration, setDuration] = useState("⚡ 4K Ultra HD");
  const [viewsText, setViewsText] = useState("🔥 Trending");

  // Live broadcast form state
  const [liveVideoInput, setLiveVideoInput] = useState(liveDetails.id || "");
  const [liveTitleInput, setLiveTitleInput] = useState(liveDetails.title || "");

  // Ticker text form state
  const [tickerInput, setTickerInput] = useState(tickerText);

  // Sync section state
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem("AZMI_YT_API_KEY") || "");
  const [isSyncing, setIsSyncing] = useState(false);

  // Password change state
  const [oldPassInput, setOldPassInput] = useState("");
  const [newPassInput, setNewPassInput] = useState("");

  // Detected Video ID from input
  const detectedId = useMemo(() => extractYouTubeId(videoUrlInput), [videoUrlInput]);

  // Handle Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    const res = loginAdmin(loginUser, loginPass);
    if (!res.success) {
      setLoginError(res.message);
    } else {
      showPlatformToast("👋 Welcome to Azmi Mushaira Media Admin Panel!");
    }
  };

  // Handle Video URL change
  const handleUrlChange = (e) => {
    const val = e.target.value;
    setVideoUrlInput(val);
    const id = extractYouTubeId(val);
    if (id && !videoTitle) {
      setVideoTitle(`Azmi Media Special Coverage — [Video: ${id}]`);
      setUrduTitle("عظمیٰ مشاعرہ میڈیا خصوصی کوریج");
    }
  };

  // Save video to slot
  const handleSaveVideoSlot = (e) => {
    e.preventDefault();
    if (!detectedId) {
      showPlatformToast("⚠️ Bara-e-meharbani valid YouTube video link ya ID enter karein.");
      return;
    }

    const categoryLabels = {
      mushaira: "🎤 کلامِ مشاعرہ",
      politics: "🗳️ UP Siyasat",
      ground: "🌍 Ground Zero",
      interview: "🎙️ Khas Bayan",
      breaking: "🔴 Breaking Story"
    };

    const newVideo = {
      id: detectedId,
      title: videoTitle.trim() || `Special Video ${detectedId}`,
      urduTitle: urduTitle.trim() || "عظمیٰ مشاعرہ میڈیا آفیشل",
      category,
      categoryLabel: categoryLabels[category] || "Special Video",
      location: location.trim() || "Azmi Media Official",
      duration: duration.trim() || "⚡ 4K HD",
      viewsText: viewsText.trim() || "🔥 Exclusive",
      thumbnail: `https://i.ytimg.com/vi/${detectedId}/maxresdefault.jpg`,
      date: new Date().toLocaleDateString()
    };

    setGridSlotVideo(selectedSlot, newVideo);
    setVideoUrlInput("");
    setVideoTitle("");
    setUrduTitle("");
  };

  // Save Live broadcast settings
  const handleSaveLiveSettings = (e) => {
    e.preventDefault();
    const id = extractYouTubeId(liveVideoInput) || liveVideoInput.trim();
    if (!id) {
      showPlatformToast("⚠️ Valid YouTube Live Video ID enter karein.");
      return;
    }
    setLiveDetails({
      id,
      title: liveTitleInput.trim() || "🔴 LIVE: All India Mushaira 2026 Special Broadcast",
      channel: "AZMI MUSHAIRA MEDIA"
    });
    showPlatformToast("🔴 Live stream settings updated!");
  };

  // Handle Sync now
  const handleRunSync = async () => {
    if (apiKeyInput.trim()) {
      localStorage.setItem("AZMI_YT_API_KEY", apiKeyInput.trim());
    }
    setIsSyncing(true);
    const res = await syncYouTubeVideos(apiKeyInput.trim());
    setIsSyncing(false);
    if (res && res.success) {
      showPlatformToast(`🎉 ${res.count || 20} YouTube videos successfully synced!`);
    }
  };

  // Handle change password
  const handleChangePassSubmit = (e) => {
    e.preventDefault();
    const res = changeAdminPassword(oldPassInput, newPassInput);
    if (res.success) {
      showPlatformToast("🔑 Password successfully updated!");
      setOldPassInput("");
      setNewPassInput("");
    } else {
      showPlatformToast(`⚠️ ${res.message}`);
    }
  };

  // ---------------------------------------------------------------------------
  // RENDER: LOGIN PORTAL (If unauthenticated)
  // ---------------------------------------------------------------------------
  if (!isAdminLoggedIn) {
    return (
      <main className="admin-login-screen">
        <div className="admin-login-box">
          <div className="admin-login-brand">
            <div className="admin-brand-logo">
              <img src="/assets/images/avatar.jpg" alt="Azmi Mushaira Media" />
            </div>
            <h2>AZMI MUSHAIRA MEDIA</h2>
            <span className="admin-portal-sub">Admin Control Center • انتظام و کنٹرول</span>
          </div>

          <form onSubmit={handleLoginSubmit} className="admin-login-form" autoComplete="off">
            {loginError && <div className="admin-error-alert">{loginError}</div>}

            <div className="admin-field-group">
              <label htmlFor="loginUser">Username (صارف نام)</label>
              <input
                id="loginUser"
                type="text"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                placeholder="Enter admin username"
                autoComplete="off"
                required
              />
            </div>

            <div className="admin-field-group">
              <label htmlFor="loginPass">Password (پاس ورڈ)</label>
              <div className="admin-pass-wrap">
                <input
                  id="loginPass"
                  type={showPassword ? "text" : "password"}
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="Enter admin password"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="admin-pass-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "🙈 Hide" : "👁️ Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-action-primary admin-login-submit">
              🔐 Login To Admin Panel
            </button>
          </form>

          <div className="admin-login-footer">
            <Link to="/" className="admin-back-site-link">
              ← Return to Main Website (ہوم پیج)
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------------------------
  // RENDER: ADMIN DASHBOARD (Authenticated)
  // ---------------------------------------------------------------------------
  const activeOverridesCount = Object.keys(gridOverrides).length;
  const activeAdsCount = Object.values(adsConfig).filter(a => a.enabled).length;

  return (
    <div className="admin-dashboard-wrapper">
      {/* Top Admin Topbar */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <div className="admin-topbar-brand">
            <span className="admin-topbar-pill">CMS 2.0</span>
            <strong>AZMI MUSHAIRA MEDIA</strong>
            <span className="admin-topbar-tag">Official Admin Portal</span>
          </div>
          <div className="admin-quick-pills">
            <span className="admin-stat-pill">📹 {syncedVideos ? syncedVideos.length : 40} Synced Videos</span>
            <span className="admin-stat-pill">🎯 {activeOverridesCount} Active Grid Overrides</span>
            <span className="admin-stat-pill">📢 {activeAdsCount} Active Ads</span>
            <span className={`admin-stat-pill ${isLiveActive ? 'live' : ''}`}>
              {isLiveActive ? "🔴 LIVE STREAM ACTIVE" : "⚪ Offline"}
            </span>
          </div>
        </div>

        <div className="admin-topbar-right">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="btn-admin-preview-site">
            🌐 View Public Website →
          </Link>
          <button onClick={logoutAdmin} className="btn-admin-logout">
            🚪 Logout
          </button>
        </div>
      </header>

      <div className="admin-main-body">
        {/* Left Sidebar Navigation */}
        <aside className="admin-sidebar">
          <nav className="admin-nav-menu">
            <button
              className={`admin-nav-item ${activeTab === 'grids' ? 'active' : ''}`}
              onClick={() => setActiveTab('grids')}
            >
              <span className="admin-nav-icon">🎬</span>
              <div className="admin-nav-text">
                <span>Video &amp; Grid Manager</span>
                <small>Link paste &amp; slot assign</small>
              </div>
              {activeOverridesCount > 0 && <span className="admin-nav-badge">{activeOverridesCount}</span>}
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'ads' ? 'active' : ''}`}
              onClick={() => setActiveTab('ads')}
            >
              <span className="admin-nav-icon">📢</span>
              <div className="admin-nav-text">
                <span>Ads &amp; Banners</span>
                <small>4 ad placements &amp; sponsors</small>
              </div>
              {activeAdsCount > 0 && <span className="admin-nav-badge">{activeAdsCount}</span>}
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'sync' ? 'active' : ''}`}
              onClick={() => setActiveTab('sync')}
            >
              <span className="admin-nav-icon">🔄</span>
              <div className="admin-nav-text">
                <span>YouTube Auto-Sync</span>
                <small>API Key &amp; 20-video fetch</small>
              </div>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'live' ? 'active' : ''}`}
              onClick={() => setActiveTab('live')}
            >
              <span className="admin-nav-icon">🔴</span>
              <div className="admin-nav-text">
                <span>Live Stream &amp; Ticker</span>
                <small>Broadcast switch &amp; headline</small>
              </div>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'leads' ? 'active' : ''}`}
              onClick={() => setActiveTab('leads')}
            >
              <span className="admin-nav-icon">📋</span>
              <div className="admin-nav-text">
                <span>Booking Inquiries</span>
                <small>Client leads &amp; WhatsApp</small>
              </div>
              {bookingLeads.length > 0 && <span className="admin-nav-badge">{bookingLeads.length}</span>}
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <span className="admin-nav-icon">⚙️</span>
              <div className="admin-nav-text">
                <span>Admin Settings</span>
                <small>Password &amp; backup</small>
              </div>
            </button>
          </nav>
        </aside>

        {/* Right Content Area */}
        <main className="admin-content-area">
          {/* =================================================================
              TAB 1: VIDEO & GRID MANAGER (Core Feature)
              ================================================================= */}
          {activeTab === 'grids' && (
            <div className="admin-tab-pane">
              <div className="admin-tab-header">
                <div>
                  <h2>🎬 Website Video &amp; Container Slot Manager</h2>
                  <p>
                    Paste ANY YouTube video link, select which grid/container it should appear in, and save. It will immediately show up on the main website!
                  </p>
                </div>
                {activeOverridesCount > 0 && (
                  <button onClick={resetAllGridSlots} className="btn-action-outline-danger">
                    🔄 Reset All Containers To Default
                  </button>
                )}
              </div>

              {/* Paste Link & Assign Slot Form */}
              <div className="admin-card-box">
                <h3 className="admin-box-title">➕ Add / Assign Video to Any Website Grid Container</h3>

                <form onSubmit={handleSaveVideoSlot} className="admin-video-assign-grid">
                  {/* Step 1: YouTube URL */}
                  <div className="admin-form-col-full">
                    <label htmlFor="videoUrlInput">
                      <strong>1. Paste YouTube Video Link or Video ID (یوٹیوب لنک پیسٹ کریں) *</strong>
                    </label>
                    <input
                      id="videoUrlInput"
                      type="text"
                      className="admin-input-lg"
                      placeholder="e.g. https://www.youtube.com/watch?v=VJ7gDXyOSCY or https://youtu.be/VJ7gDXyOSCY or VJ7gDXyOSCY"
                      value={videoUrlInput}
                      onChange={handleUrlChange}
                      required
                    />
                    <small className="admin-input-hint">
                      Supports all formats: standard watch links, youtu.be short links, YouTube Shorts, and direct 11-digit Video IDs.
                    </small>
                  </div>

                  {/* Step 2: Slot Picker */}
                  <div className="admin-form-col">
                    <label htmlFor="slotPicker">
                      <strong>2. Choose Target Container / Grid Slot (کہاں دکھانا ہے) *</strong>
                    </label>
                    <select
                      id="slotPicker"
                      className="admin-select-lg"
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                    >
                      {WEBSITE_SLOTS.map((slot) => (
                        <option key={slot.key} value={slot.key}>
                          {slot.label} {gridOverrides[slot.key] ? "(CURRENTLY OVERRIDDEN)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 3: Category */}
                  <div className="admin-form-col">
                    <label htmlFor="catPicker">
                      <strong>3. Category Badge (کیٹیگری)</strong>
                    </label>
                    <select
                      id="catPicker"
                      className="admin-select-lg"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="mushaira">🎤 All India Mushaira (مشاعرہ)</option>
                      <option value="politics">🗳️ UP Siyasat &amp; Politics (سیاست)</option>
                      <option value="ground">🌍 Ground Zero Reality (گراؤنڈ زیرو)</option>
                      <option value="interview">🎙️ Khas Bayan &amp; Interview (بیان)</option>
                      <option value="breaking">🔴 Breaking Headline (بریکنگ)</option>
                    </select>
                  </div>

                  {/* Step 4: Title */}
                  <div className="admin-form-col">
                    <label htmlFor="vidTitle"><strong>Video Title (عنوان)</strong></label>
                    <input
                      id="vidTitle"
                      type="text"
                      className="admin-input-default"
                      placeholder="e.g. Imran Pratapgarhi Zabardast Kalam In All India Mushaira"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                    />
                  </div>

                  {/* Step 5: Urdu Title */}
                  <div className="admin-form-col">
                    <label htmlFor="urduTitle"><strong>Urdu Title / Poet (اردو عنوان یا شاعر کا نام)</strong></label>
                    <input
                      id="urduTitle"
                      type="text"
                      className="admin-input-default"
                      placeholder="e.g. عمران پرتاپ گڑھی کا شاندار کلام"
                      value={urduTitle}
                      onChange={(e) => setUrduTitle(e.target.value)}
                      style={{ direction: 'rtl', fontFamily: 'var(--font-urdu)' }}
                    />
                  </div>

                  {/* Step 6: Location & Duration */}
                  <div className="admin-form-col">
                    <label htmlFor="vidLoc"><strong>Location Tag (مقام)</strong></label>
                    <input
                      id="vidLoc"
                      type="text"
                      className="admin-input-default"
                      placeholder="e.g. Deoband, Lucknow, Azamgarh, Delhi"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className="admin-form-col">
                    <label htmlFor="vidDur"><strong>Duration or Quality Badge</strong></label>
                    <input
                      id="vidDur"
                      type="text"
                      className="admin-input-default"
                      placeholder="e.g. 15:40 or ⚡ 4K HD"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>

                  {/* Live Card Preview (when ID detected) */}
                  {detectedId && (
                    <div className="admin-form-col-full admin-preview-box">
                      <span className="admin-preview-label">Live Thumbnail &amp; HD Card Preview:</span>
                      <div className="admin-preview-card">
                        <div className="admin-preview-media">
                          <img
                            src={`https://i.ytimg.com/vi/${detectedId}/maxresdefault.jpg`}
                            alt="HD Preview"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = `https://i.ytimg.com/vi/${detectedId}/hqdefault.jpg`;
                            }}
                          />
                          <span className="admin-preview-badge">ID: {detectedId}</span>
                          <span className="admin-preview-dur">{duration}</span>
                        </div>
                        <div className="admin-preview-info">
                          <span className="badge-category cat-politics">{category.toUpperCase()}</span>
                          <h4>{videoTitle || `YouTube Video: ${detectedId}`}</h4>
                          <span className="urdu-sub-badge">{urduTitle || "عظمیٰ مشاعرہ میڈیا آفیشل"}</span>
                          <small>📍 {location}</small>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="admin-form-col-full" style={{ marginTop: '12px' }}>
                    <button type="submit" className="btn-action-primary" style={{ padding: '12px 28px', fontSize: '1rem' }}>
                      💾 Save Video To "{selectedSlot}" Container
                    </button>
                  </div>
                </form>
              </div>

              {/* Table of Active Slot Overrides */}
              <div className="admin-card-box" style={{ marginTop: '24px' }}>
                <div className="admin-box-header-row">
                  <h3 className="admin-box-title">
                    📋 Active Custom Slot Overrides ({activeOverridesCount})
                  </h3>
                  <small style={{ color: 'var(--color-text-secondary)' }}>
                    These videos currently take priority over the default feed on the live website.
                  </small>
                </div>

                {activeOverridesCount === 0 ? (
                  <div className="admin-empty-state">
                    <span>✨ Abhi koi custom slot override set nahi hai. Tamam containers default YouTube catalog videos show kar rahe hain.</span>
                  </div>
                ) : (
                  <div className="admin-table-responsive">
                    <table className="admin-data-table">
                      <thead>
                        <tr>
                          <th>Slot Name</th>
                          <th>HD Thumbnail</th>
                          <th>Video Title</th>
                          <th>YouTube ID</th>
                          <th>Category</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(gridOverrides).map(([key, vid]) => {
                          const slotInfo = WEBSITE_SLOTS.find(s => s.key === key);
                          return (
                            <tr key={key}>
                              <td>
                                <strong>{slotInfo ? slotInfo.label : key}</strong>
                              </td>
                              <td>
                                <img
                                  src={vid.thumbnail}
                                  alt={vid.title}
                                  className="admin-table-thumb"
                                  onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = `https://i.ytimg.com/vi/${vid.id}/hqdefault.jpg`;
                                  }}
                                />
                              </td>
                              <td>
                                <div style={{ maxWidth: '280px' }}>
                                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{vid.title}</div>
                                  <div className="urdu-sub-badge" style={{ fontSize: '0.74rem' }}>{vid.urduTitle}</div>
                                </div>
                              </td>
                              <td>
                                <code>{vid.id}</code>
                              </td>
                              <td>
                                <span className={`badge-category cat-${vid.category || 'mushaira'}`} style={{ fontSize: '0.62rem' }}>
                                  {vid.category || 'video'}
                                </span>
                              </td>
                              <td>
                                <button
                                  onClick={() => clearGridSlotVideo(key)}
                                  className="btn-action-outline-danger btn-sm"
                                >
                                  ❌ Restore Default
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 2: ADS & BANNERS MANAGER
              ================================================================= */}
          {activeTab === 'ads' && (
            <div className="admin-tab-pane">
              <div className="admin-tab-header">
                <div>
                  <h2>📢 Advertisement &amp; Sponsorship Banners Manager</h2>
                  <p>
                    Manage banner placements, sponsorship notices, and promotional cards across 4 prime locations on the website.
                  </p>
                </div>
              </div>

              <div className="admin-ads-grid">
                {/* Placement 1: Top Announcement Header Bar */}
                <div className={`admin-ad-card ${adsConfig.topHeader?.enabled ? 'active-ad' : ''}`}>
                  <div className="admin-ad-card-head">
                    <div>
                      <span className="admin-ad-pos">PLACEMENT #1</span>
                      <h3>Top Header Announcement Sponsor</h3>
                    </div>
                    <label className="admin-switch">
                      <input
                        type="checkbox"
                        checked={adsConfig.topHeader?.enabled || false}
                        onChange={() => toggleAdPlacement('topHeader')}
                      />
                      <span className="admin-slider"></span>
                    </label>
                  </div>
                  <p className="admin-ad-desc">
                    Displays at the very top of every page in the announcement ticker bar.
                  </p>
                  <div className="admin-field-group">
                    <label>Badge Label</label>
                    <input
                      type="text"
                      value={adsConfig.topHeader?.badge || ""}
                      onChange={(e) => updateAdPlacement('topHeader', { badge: e.target.value })}
                      placeholder="e.g. SPONSORED / KHAS"
                    />
                  </div>
                  <div className="admin-field-group">
                    <label>Announcement / Promo Text</label>
                    <input
                      type="text"
                      value={adsConfig.topHeader?.text || ""}
                      onChange={(e) => updateAdPlacement('topHeader', { text: e.target.value })}
                      placeholder="Enter promo text"
                    />
                  </div>
                  <div className="admin-field-group">
                    <label>Click-Through Destination Link</label>
                    <input
                      type="text"
                      value={adsConfig.topHeader?.link || ""}
                      onChange={(e) => updateAdPlacement('topHeader', { link: e.target.value })}
                      placeholder="e.g. /contact or https://sponsor.com"
                    />
                  </div>
                </div>

                {/* Placement 2: Hero Section Bottom Banner */}
                <div className={`admin-ad-card ${adsConfig.heroBottom?.enabled ? 'active-ad' : ''}`}>
                  <div className="admin-ad-card-head">
                    <div>
                      <span className="admin-ad-pos">PLACEMENT #2</span>
                      <h3>Hero Section Bottom Full Banner</h3>
                    </div>
                    <label className="admin-switch">
                      <input
                        type="checkbox"
                        checked={adsConfig.heroBottom?.enabled || false}
                        onChange={() => toggleAdPlacement('heroBottom')}
                      />
                      <span className="admin-slider"></span>
                    </label>
                  </div>
                  <p className="admin-ad-desc">
                    Prime position right under the Hero cinema carousel and channel train marquee.
                  </p>
                  <div className="admin-field-group">
                    <label>Banner Heading</label>
                    <input
                      type="text"
                      value={adsConfig.heroBottom?.title || ""}
                      onChange={(e) => updateAdPlacement('heroBottom', { title: e.target.value })}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label>Subtitle / Phone / Details</label>
                    <input
                      type="text"
                      value={adsConfig.heroBottom?.subtitle || ""}
                      onChange={(e) => updateAdPlacement('heroBottom', { subtitle: e.target.value })}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label>Destination Link</label>
                    <input
                      type="text"
                      value={adsConfig.heroBottom?.link || ""}
                      onChange={(e) => updateAdPlacement('heroBottom', { link: e.target.value })}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label>Button Label</label>
                    <input
                      type="text"
                      value={adsConfig.heroBottom?.buttonText || "Book Now"}
                      onChange={(e) => updateAdPlacement('heroBottom', { buttonText: e.target.value })}
                    />
                  </div>
                </div>

                {/* Placement 3: Mushaira Section Sponsor Card */}
                <div className={`admin-ad-card ${adsConfig.mushairaSponsor?.enabled ? 'active-ad' : ''}`}>
                  <div className="admin-ad-card-head">
                    <div>
                      <span className="admin-ad-pos">PLACEMENT #3</span>
                      <h3>Mushaira &amp; Mehfil Sponsor Card</h3>
                    </div>
                    <label className="admin-switch">
                      <input
                        type="checkbox"
                        checked={adsConfig.mushairaSponsor?.enabled || false}
                        onChange={() => toggleAdPlacement('mushairaSponsor')}
                      />
                      <span className="admin-slider"></span>
                    </label>
                  </div>
                  <p className="admin-ad-desc">
                    Displayed above the All India Mushaira poetry rail.
                  </p>
                  <div className="admin-field-group">
                    <label>Sponsor Name / Title</label>
                    <input
                      type="text"
                      value={adsConfig.mushairaSponsor?.title || ""}
                      onChange={(e) => updateAdPlacement('mushairaSponsor', { title: e.target.value })}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label>Description</label>
                    <input
                      type="text"
                      value={adsConfig.mushairaSponsor?.subtitle || ""}
                      onChange={(e) => updateAdPlacement('mushairaSponsor', { subtitle: e.target.value })}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label>Destination Link</label>
                    <input
                      type="text"
                      value={adsConfig.mushairaSponsor?.link || ""}
                      onChange={(e) => updateAdPlacement('mushairaSponsor', { link: e.target.value })}
                    />
                  </div>
                </div>

                {/* Placement 4: Video Player Modal Sponsor Tag */}
                <div className={`admin-ad-card ${adsConfig.playerSponsor?.enabled ? 'active-ad' : ''}`}>
                  <div className="admin-ad-card-head">
                    <div>
                      <span className="admin-ad-pos">PLACEMENT #4</span>
                      <h3>Video Player Modal Sponsor Tag</h3>
                    </div>
                    <label className="admin-switch">
                      <input
                        type="checkbox"
                        checked={adsConfig.playerSponsor?.enabled || false}
                        onChange={() => toggleAdPlacement('playerSponsor')}
                      />
                      <span className="admin-slider"></span>
                    </label>
                  </div>
                  <p className="admin-ad-desc">
                    Appears inside the video theater modal when any video is playing.
                  </p>
                  <div className="admin-field-group">
                    <label>Sponsor / Brand Name</label>
                    <input
                      type="text"
                      value={adsConfig.playerSponsor?.sponsorName || ""}
                      onChange={(e) => updateAdPlacement('playerSponsor', { sponsorName: e.target.value })}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label>Promotional Message</label>
                    <input
                      type="text"
                      value={adsConfig.playerSponsor?.promoText || ""}
                      onChange={(e) => updateAdPlacement('playerSponsor', { promoText: e.target.value })}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label>Destination Link</label>
                    <input
                      type="text"
                      value={adsConfig.playerSponsor?.link || ""}
                      onChange={(e) => updateAdPlacement('playerSponsor', { link: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 3: YOUTUBE AUTO-SYNC
              ================================================================= */}
          {activeTab === 'sync' && (
            <div className="admin-tab-pane">
              <div className="admin-tab-header">
                <div>
                  <h2>🔄 YouTube Channel Auto-Sync Management</h2>
                  <p>
                    Official Channel: <strong>@AZMIMUSHAIRAMEDIA</strong> (Channel ID: <code>UCEywUZeMwjUzlFvV64IfiSQ</code>)
                  </p>
                </div>
              </div>

              <div className="admin-card-box">
                <h3 className="admin-box-title">🔑 Google Cloud YouTube Data API v3 Key</h3>
                <div className="admin-field-group">
                  <label htmlFor="apiKeyInput">API Key</label>
                  <input
                    id="apiKeyInput"
                    type="password"
                    className="admin-input-default"
                    placeholder="AIzaSy..."
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                  />
                  <small className="admin-input-hint">
                    API key is securely stored in your browser's local cache.
                  </small>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={handleRunSync}
                    disabled={isSyncing}
                    className="btn-action-primary"
                  >
                    {isSyncing ? "⏳ Syncing YouTube Channel..." : "🔄 Sync Latest YouTube Videos Now"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("AZMI_SYNCED_VIDEOS");
                      localStorage.removeItem("AZMI_LAST_SYNC");
                      showPlatformToast("Cache cleared. Reset to default feed.");
                    }}
                    className="btn-action-secondary"
                  >
                    🗑️ Clear Sync Cache
                  </button>
                </div>
              </div>

              <div className="admin-card-box" style={{ marginTop: '20px' }}>
                <h3 className="admin-box-title">📊 Current Feed Status</h3>
                <ul className="admin-status-list">
                  <li>
                    <span>Feed Source:</span>
                    <strong>{syncedVideos && syncedVideos.length > 0 ? "🟢 Live YouTube API Sync" : "⚪ Default Catalog"}</strong>
                  </li>
                  <li>
                    <span>Total Active Videos in Feed:</span>
                    <strong>{syncedVideos ? syncedVideos.length : 40} Videos</strong>
                  </li>
                  <li>
                    <span>Last Synced:</span>
                    <strong>{localStorage.getItem("AZMI_LAST_SYNC") ? new Date(localStorage.getItem("AZMI_LAST_SYNC")).toLocaleString() : "Not synced yet"}</strong>
                  </li>
                  <li>
                    <span>Channel ID:</span>
                    <code>UCEywUZeMwjUzlFvV64IfiSQ</code>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 4: LIVE STREAM & TICKER
              ================================================================= */}
          {activeTab === 'live' && (
            <div className="admin-tab-pane">
              <div className="admin-tab-header">
                <div>
                  <h2>🔴 Live Broadcast &amp; Breaking News Ticker</h2>
                  <p>Control the site-wide live broadcast banner and the running announcement ticker.</p>
                </div>
              </div>

              {/* Live Stream Controller */}
              <div className="admin-card-box">
                <div className="admin-ad-card-head">
                  <h3 className="admin-box-title">🔴 Live Stream Alert Banner</h3>
                  <label className="admin-switch">
                    <input
                      type="checkbox"
                      checked={isLiveActive}
                      onChange={() => setIsLiveActive(!isLiveActive)}
                    />
                    <span className="admin-slider"></span>
                  </label>
                </div>
                <p className="admin-ad-desc">
                  When enabled, a prominent red pulsing alert banner displays across the top of the entire website.
                </p>

                <form onSubmit={handleSaveLiveSettings} style={{ marginTop: '16px' }}>
                  <div className="admin-field-group">
                    <label htmlFor="liveVideoInput">Live YouTube Video Link or ID</label>
                    <input
                      id="liveVideoInput"
                      type="text"
                      value={liveVideoInput}
                      onChange={(e) => setLiveVideoInput(e.target.value)}
                      placeholder="e.g. RQj92m7s9tQ or https://youtu.be/..."
                    />
                  </div>
                  <div className="admin-field-group">
                    <label htmlFor="liveTitleInput">Live Broadcast Title</label>
                    <input
                      id="liveTitleInput"
                      type="text"
                      value={liveTitleInput}
                      onChange={(e) => setLiveTitleInput(e.target.value)}
                      placeholder="e.g. LIVE: All India Mushaira 2026 Special Broadcast"
                    />
                  </div>
                  <button type="submit" className="btn-action-primary" style={{ marginTop: '10px' }}>
                    💾 Update Live Stream Settings
                  </button>
                </form>
              </div>

              {/* Breaking Ticker Editor */}
              <div className="admin-card-box" style={{ marginTop: '20px' }}>
                <h3 className="admin-box-title">📢 Breaking News Marquee Ticker</h3>
                <p className="admin-ad-desc">Customize the running headline message at the top of the website.</p>

                <div className="admin-field-group" style={{ marginTop: '12px' }}>
                  <label htmlFor="tickerInput">Marquee Ticker Text</label>
                  <textarea
                    id="tickerInput"
                    rows="3"
                    className="admin-input-default"
                    value={tickerInput}
                    onChange={(e) => setTickerInput(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => updateTickerText(tickerInput)}
                  className="btn-action-primary"
                  style={{ marginTop: '10px' }}
                >
                  💾 Update Ticker Headline
                </button>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 5: BOOKING INQUIRIES
              ================================================================= */}
          {activeTab === 'leads' && (
            <div className="admin-tab-pane">
              <div className="admin-tab-header">
                <div>
                  <h2>📋 Event Coverage Booking Inquiries ({bookingLeads.length})</h2>
                  <p>Inquiries submitted by organizers and clients through the Contact / Booking form.</p>
                </div>
              </div>

              {bookingLeads.length === 0 ? (
                <div className="admin-card-box admin-empty-state">
                  <span>✨ Abhi tak koi nayi booking inquiry receive nahi hui. Jab koi visitor form bharega, wo yaha show hogi.</span>
                </div>
              ) : (
                <div className="admin-card-box">
                  <div className="admin-table-responsive">
                    <table className="admin-data-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>City</th>
                          <th>Event Type</th>
                          <th>Event Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingLeads.map((lead) => (
                          <tr key={lead.id}>
                            <td>{new Date(lead.timestamp).toLocaleDateString()}</td>
                            <td><strong>{lead.name}</strong></td>
                            <td>
                              <a
                                href={`https://wa.me/91${lead.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(lead.name)},%20Azmi%20Mushaira%20Media%20se%20rabta%20kar%20rahe%20hain.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="admin-wa-link"
                              >
                                💬 {lead.phone}
                              </a>
                            </td>
                            <td>{lead.city}</td>
                            <td>{lead.eventType}</td>
                            <td>{lead.date || "TBD"}</td>
                            <td>
                              <select
                                value={lead.status || "New"}
                                onChange={(e) => updateBookingLeadStatus(lead.id, e.target.value)}
                                className="admin-status-select"
                              >
                                <option value="New">🟢 New</option>
                                <option value="Contacted">🟡 Contacted</option>
                                <option value="Confirmed">🔵 Confirmed</option>
                                <option value="Completed">⚪ Completed</option>
                              </select>
                            </td>
                            <td>
                              <button
                                onClick={() => deleteBookingLead(lead.id)}
                                className="btn-action-outline-danger btn-sm"
                              >
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              TAB 6: SETTINGS
              ================================================================= */}
          {activeTab === 'settings' && (
            <div className="admin-tab-pane">
              <div className="admin-tab-header">
                <div>
                  <h2>⚙️ Admin Portal Settings &amp; Security</h2>
                  <p>Change your admin password, backup configuration, and manage system preferences.</p>
                </div>
              </div>

              {/* Password Change Box */}
              <div className="admin-card-box">
                <h3 className="admin-box-title">🔑 Change Admin Password</h3>
                <form onSubmit={handleChangePassSubmit} style={{ maxWidth: '420px', marginTop: '14px' }}>
                  <div className="admin-field-group">
                    <label htmlFor="oldPass">Current Password</label>
                    <input
                      id="oldPass"
                      type="password"
                      className="admin-input-default"
                      value={oldPassInput}
                      onChange={(e) => setOldPassInput(e.target.value)}
                      required
                    />
                  </div>
                  <div className="admin-field-group">
                    <label htmlFor="newPass">New Password</label>
                    <input
                      id="newPass"
                      type="password"
                      className="admin-input-default"
                      value={newPassInput}
                      onChange={(e) => setNewPassInput(e.target.value)}
                      placeholder="Minimum 4 characters"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-action-primary" style={{ marginTop: '8px' }}>
                    🔒 Update Password
                  </button>
                </form>
              </div>

              {/* Backup & Export Box */}
              <div className="admin-card-box" style={{ marginTop: '20px' }}>
                <h3 className="admin-box-title">💾 Backup &amp; Factory Reset</h3>
                <p className="admin-ad-desc">Download a backup JSON of all custom grid slots and ads, or reset everything.</p>

                <div style={{ display: 'flex', gap: '14px', marginTop: '14px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      const backupData = {
                        gridOverrides,
                        adsConfig,
                        tickerText,
                        exportDate: new Date().toISOString()
                      };
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
                      const dlAnchor = document.createElement('a');
                      dlAnchor.setAttribute("href", dataStr);
                      dlAnchor.setAttribute("download", `azmi_media_backup_${Date.now()}.json`);
                      dlAnchor.click();
                      showPlatformToast("📥 Configuration downloaded!");
                    }}
                    className="btn-action-secondary"
                  >
                    📥 Export Backup JSON
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to reset all custom grids and ad settings to default?")) {
                        resetAllGridSlots();
                        localStorage.removeItem("AZMI_ADS_CONFIG");
                        localStorage.removeItem("AZMI_TICKER_TEXT");
                        showPlatformToast("🔄 Everything reset to factory defaults.");
                      }
                    }}
                    className="btn-action-outline-danger"
                  >
                    ⚠️ Factory Reset All Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
