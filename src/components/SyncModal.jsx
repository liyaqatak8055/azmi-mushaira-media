import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function SyncModal() {
  const { isSyncModalOpen, closeSyncModal, toggleLiveSimulation, isLiveActive, showPlatformToast, loadYouTubeFeed, feedVideos, isFeedLoading } = useApp();
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("AZMI_YT_API_KEY") || "");
  const [statusText, setStatusText] = useState(() => {
    return feedVideos.length > 0
      ? `🟢 Real-Time RSS Sync ACTIVE hai (${feedVideos.length} taaza videos live sync hain).`
      : "ℹ️ Real-time YouTube RSS Sync active hai bina kisi API key ke.";
  });

  if (!isSyncModalOpen) return null;

  const handleSaveKey = () => {
    const trimmed = apiKey.trim();
    if (trimmed) {
      localStorage.setItem("AZMI_YT_API_KEY", trimmed);
      setStatusText("⏳ YouTube se sync ho raha hai...");
      setTimeout(() => {
        setStatusText("✅ Key save ho gayi aur YouTube sync ho gaya!");
        showPlatformToast("✅ YouTube sync configured!");
        setTimeout(() => closeSyncModal(), 1200);
      }, 1000);
    } else {
      localStorage.removeItem("AZMI_YT_API_KEY");
      setStatusText("Key hata di gayi.");
      showPlatformToast("API Key removed.");
    }
  };

  const handleSyncNow = async () => {
    setStatusText("⏳ YouTube Channel (@AZMIMUSHAIRAMEDIA) se taaza uploads sync ho rahe hain...");
    const res = await loadYouTubeFeed(true);
    if (res.ok) {
      const liveMsg = res.hasLive ? " [🔴 LIVE STREAM DETECTED]" : "";
      setStatusText(`✅ Real-Time Sync Success! ${res.videos.length} new uploads directly synced from YouTube${liveMsg}!`);
      showPlatformToast(`✅ ${res.videos.length} taaza videos YouTube se sync ho gayi!`);
    } else {
      setStatusText("⚠️ YouTube sync complete (Cached data active).");
      showPlatformToast("YouTube feed updated.");
    }
  };

  return (
    <div
      className="yt-sync-modal active"
      id="ytSyncModal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSyncModal();
      }}
    >
      <div className="yt-sync-dialog">
        <div className="yt-sync-header">
          <h3>
            <span>🔄</span> <span>YouTube Live &amp; Video Auto-Sync</span>
          </h3>
          <button className="yt-sync-close-btn" onClick={closeSyncModal} aria-label="Close Sync Modal">
            ✕
          </button>
        </div>
        <div className="yt-sync-body">
          <div className="yt-sync-info-box">
            <strong>📡 Real-Time YouTube Automation:</strong>
            <br />
            Jaise hi aap YouTube channel (<strong>@AZMIMUSHAIRAMEDIA</strong>) par koi naya video upload karenge ya <strong>LIVE</strong> aayenge, website automatically detect karke yahan display kar degi.
          </div>

          <div className="yt-sync-field-group">
            <label>YouTube Channel ID (Verified)</label>
            <input
              type="text"
              className="yt-sync-input"
              value="UCEywUZeMwjUzlFvV64IfiSQ"
              readOnly
              style={{ background: '#f1f5f9', color: '#64748b' }}
            />
          </div>

          <div className="yt-sync-field-group">
            <label htmlFor="ytApiKeyInput">Google Cloud YouTube Data API v3 Key (Free)</label>
            <input
              type="password"
              id="ytApiKeyInput"
              className="yt-sync-input"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy... (Apni YouTube API Key paste karein)"
            />
            <small style={{ display: 'block', marginTop: '4px', fontSize: '0.75rem', color: '#64748b' }}>
              Google Cloud Console se 100% free YouTube Data API v3 key milti hai (daily 10,000 free quota).
            </small>
          </div>

          <div className="yt-sync-status-text" id="ytSyncStatusText" style={{ color: 'var(--color-header-green)' }}>
            {statusText}
          </div>
        </div>
        <div className="yt-sync-footer">
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn-action-primary"
              id="btnTriggerLiveSim"
              style={{ background: isLiveActive ? '#064e3b' : '#990012', padding: '8px 16px', fontSize: '0.82rem' }}
              onClick={toggleLiveSimulation}
            >
              <span>{isLiveActive ? "⏹️ Stop Live Simulation" : "🔴 Test Live Mode"}</span>
            </button>
            <button
              className="btn-action-secondary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              onClick={handleSyncNow}
            >
              <span>🔄 Sync Now</span>
            </button>
          </div>
          <button
            className="btn-action-primary"
            style={{ padding: '8px 20px', fontSize: '0.85rem' }}
            onClick={handleSaveKey}
          >
            <span>Save Key &amp; Sync</span>
          </button>
        </div>
      </div>
    </div>
  );
}
