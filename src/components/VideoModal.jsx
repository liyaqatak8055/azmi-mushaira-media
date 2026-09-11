import React from 'react';
import { useApp } from '../context/AppContext';

export default function VideoModal() {
  const { activeVideo, closeVideoPlayer, showPlatformToast } = useApp();

  if (!activeVideo) return null;

  const videoUrl = `https://www.youtube.com/watch?v=${activeVideo.id}`;
  const embedUrl = `https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0&modestbranding=1`;

  const handleShareWhatsApp = () => {
    const msg = encodeURIComponent(`Azmi Mushaira Media Par Dekhein:\n${activeVideo.title}\n${videoUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(videoUrl).then(() => {
      showPlatformToast("✅ Video link copy ho gaya! Ab aap share kar sakte hain.");
    }).catch(() => {
      showPlatformToast("Video link copy nahi ho saka.");
    });
  };

  return (
    <div
      className="video-theater-modal active"
      id="videoTheaterModal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeVideoPlayer();
      }}
    >
      <div className="theater-modal-content">
        <div className="theater-modal-header">
          <h3 id="theaterVideoTitle">{activeVideo.title}</h3>
          <button className="theater-close-btn" onClick={closeVideoPlayer} aria-label="Close Video Player">
            ✕
          </button>
        </div>
        <div className="theater-video-frame-wrap">
          <iframe
            id="theaterModalIframe"
            src={embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={activeVideo.title}
          />
        </div>
        <div className="theater-modal-footer">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              className="btn-action-secondary"
              onClick={handleShareWhatsApp}
              style={{ padding: '7px 14px', fontSize: '0.82rem' }}
            >
              <span>WhatsApp Par Share Karein</span>
            </button>
            <button
              className="btn-action-secondary"
              onClick={handleCopyLink}
              style={{ padding: '7px 14px', fontSize: '0.82rem' }}
            >
              <span>Link Copy Karein</span>
            </button>
          </div>

          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-action-primary"
            style={{ padding: '7px 16px', fontSize: '0.82rem' }}
          >
            <span>YouTube Par Dekhein →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
