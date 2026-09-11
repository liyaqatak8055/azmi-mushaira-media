import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function SyncModal() {
  const { isSyncModalOpen, closeSyncModal, toggleLiveSimulation, isLiveActive, showPlatformToast, syncYouTubeVideos } = useApp();
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("AZMI_YT_API_KEY") || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusText, setStatusText] = useState(() => {
    return localStorage.getItem("AZMI_YT_API_KEY")
      ? "🟢 Auto-Sync ACTIVE hai (API Key saved hai)."
      : "ℹ️ Apni YouTube Data API v3 Key enter karke automatic sync shuru karein.";
  });

  if (!isSyncModalOpen) return null;

  const handleSaveKey = async () => {
    const trimmed = apiKey.trim();
    if (trimmed) {
      setIsSubmitting(true);
      localStorage.setItem("AZMI_YT_API_KEY", trimmed);
      setStatusText("⏳ YouTube Channel se latest 20 videos fetch ho rahi hain...");
      const result = await syncYouTubeVideos(trimmed);
      setIsSubmitting(false);
      if (result && result.success) {
        setStatusText(`✅ Zabardast! Channel ki ${result.count || 20} latest videos website par auto-sync ho gayi.`);
        setTimeout(() => closeSyncModal(), 1400);
      } else {
        setStatusText(result && result.message ? `⚠️ ${result.message}` : "⚠️ Sync error. Please check key.");
      }
    } else {
      localStorage.removeItem("AZMI_YT_API_KEY");
      localStorage.removeItem("AZMI_SYNCED_VIDEOS");
      setStatusText("API Key hata di gayi.");
      showPlatformToast("API Key removed.");
    }
  };

  const handleSyncNow = async () => {
    setIsSubmitting(true);
    setStatusText("⏳ YouTube Channel se 20 latest uploads fetch ho rahe hain...");
    const result = await syncYouTubeVideos();
    setIsSubmitting(false);
    if (result && result.success) {
      setStatusText(`✅ Sync kamyab! ${result.count || 20} nayi videos live ho gayi.`);
    } else {
      setStatusText(result && result.message ? `⚠️ ${result.message}` : "Kripya valid API Key enter karein.");
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ margin: 0 }}>YouTube Channel ID</label>
              <span style={{ fontSize: '0.72rem', color: '#064e3b', background: '#dcfce7', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>
                ✅ Pehle Se Set Hai (@AZMIMUSHAIRAMEDIA)
              </span>
            </div>
            <input
              type="text"
              className="yt-sync-input"
              value="UCEywUZeMwjUzlFvV64IfiSQ"
              readOnly
              style={{ background: '#f8fafc', color: '#334155', fontWeight: 600, cursor: 'not-allowed' }}
            />
            <small style={{ display: 'block', marginTop: '4px', fontSize: '0.74rem', color: '#16a34a' }}>
              ✓ Aapke channel ki ID pehle se daali hui hai, ise change karne ki zaroorat nahi hai.
            </small>
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
