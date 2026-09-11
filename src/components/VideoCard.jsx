import React from 'react';
import { useApp } from '../context/AppContext';

export default function VideoCard({ video, variant = 'editorial', index = 0 }) {
  const { openVideoPlayer } = useApp();

  const handleClick = () => {
    openVideoPlayer(video.id, video.title, video.urduTitle || video.poet || "");
  };

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  };

  // 1. POPULAR VARIANT
  if (variant === 'popular') {
    let rankBadgeClass = "rank-other";
    let rankLabel = `#${index + 1} POPULAR`;
    if (index === 0) {
      rankBadgeClass = "rank-1";
      rankLabel = "🏆 #1 HIGHEST VIEWS";
    } else if (index === 1) {
      rankBadgeClass = "rank-2";
      rankLabel = "🥈 #2 MOST VIEWED";
    } else if (index === 2) {
      rankBadgeClass = "rank-3";
      rankLabel = "🥉 #3 MOST VIEWED";
    }

    return (
      <article className="popular-video-card" onClick={handleClick}>
        <div className="video-card-thumb-frame">
          <img src={video.thumbnail} alt={video.title} loading={index < 4 ? 'eager' : 'lazy'} onError={handleImgError} />
          <div className="card-play-hover-indicator">
            <div className="card-play-disc">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
          <span className={`popular-rank-badge ${rankBadgeClass}`}>{rankLabel}</span>
          <span className="popular-views-badge">🔥 {video.viewsText}</span>
          <span className="featured-video-duration">{video.duration}</span>
        </div>
        <div className="popular-video-card-body">
          <div style={{ marginBottom: '6px' }}>
            <span className={`badge-category cat-${video.category}`}>{video.categoryLabel}</span>
          </div>
          <h3 className="popular-video-card-title">{video.title}</h3>
          <span className="urdu-sub-badge" style={{ textAlign: 'left', marginBottom: '8px' }}>{video.urduTitle}</span>
          <div className="popular-video-card-footer">
            <span>📍 {video.location}</span>
            <span style={{ color: 'var(--color-header-green)', fontWeight: 800 }}>▶ Play HD</span>
          </div>
        </div>
      </article>
    );
  }

  // 2. MUSHAIRA VARIANT
  if (variant === 'mushaira') {
    return (
      <article className="mushaira-entry-card" onClick={handleClick}>
        <div className="video-card-thumb-frame">
          <img src={video.thumbnail} alt={video.title} loading="lazy" onError={handleImgError} />
          <div className="card-play-hover-indicator">
            <div className="card-play-disc">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
            <span className="badge-category cat-mushaira">🎤 کلامِ مشاعرہ</span>
          </div>
        </div>
        <div className="video-card-body">
          <div className="poet-name-display">
            <span>{video.poet}</span>
            <span className="urdu-poet-badge">{video.urduPoet}</span>
          </div>
          <h3 className="video-card-title" style={{ fontSize: '0.96rem' }}>{video.title}</h3>
          <p className="urdu-couplet-excerpt">{video.urduExcerpt}</p>
          <div className="video-card-footer">
            <span>{video.location}</span>
            <span style={{ color: 'var(--color-header-green)', fontWeight: 800 }}>▶ Suniye</span>
          </div>
        </div>
      </article>
    );
  }

  // 3. SHORTS VARIANT
  if (variant === 'short') {
    return (
      <article className="short-vertical-card" onClick={handleClick}>
        <img src={video.thumbnail} alt={video.title} loading="lazy" onError={handleImgError} />
        <div className="short-vertical-overlay">
          <span className="short-pill-badge">⚡ Shorts</span>
          <h3 className="short-card-title">{video.title}</h3>
          <span className="short-views-count">{video.views}</span>
        </div>
      </article>
    );
  }

  // 4. GROUND STORY VARIANT
  if (variant === 'ground') {
    return (
      <article className="ground-story-card" onClick={handleClick}>
        <div className="video-card-thumb-frame">
          <img src={video.thumbnail} alt={video.title} loading="lazy" onError={handleImgError} />
          <div className="card-play-hover-indicator">
            <div className="card-play-disc">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
            <span className={`badge-category cat-${video.category}`} style={{ fontSize: '0.62rem' }}>
              {video.categoryLabel || "Ground Zero"}
            </span>
          </div>
          <span className="featured-video-duration">{video.duration}</span>
        </div>
        <div className="video-card-body">
          <div className="ground-location-tag">
            <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span>{video.location}</span>
          </div>
          <h3 className="video-card-title">{video.title}</h3>
          <span
            className="urdu-sub-badge"
            style={{
              textAlign: 'left',
              fontSize: '0.78rem',
              WebkitLineClamp: 1,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {video.urduTitle}
          </span>
          <div className="video-card-footer">
            <span>Ground Zero</span>
            <span style={{ color: 'var(--color-header-green)', fontWeight: 800 }}>▶ Report</span>
          </div>
        </div>
      </article>
    );
  }

  // 5. DEFAULT EDITORIAL CATALOG CARD
  return (
    <article className="editorial-video-card" onClick={handleClick}>
      <div className="video-card-thumb-frame">
        <img src={video.thumbnail} alt={video.title} loading={index < 4 ? 'eager' : 'lazy'} onError={handleImgError} />
        <div className="card-play-hover-indicator">
          <div className="card-play-disc">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
          <span className={`badge-category cat-${video.category}`}>{video.categoryLabel || 'Video'}</span>
        </div>
        {video.viewsText && (
          <span className="popular-views-badge" style={{ bottom: '10px', left: '10px' }}>
            👁️ {video.viewsText}
          </span>
        )}
        <span className="featured-video-duration">{video.duration || 'Full Video'}</span>
      </div>
      <div className="video-card-body">
        <h3 className="video-card-title">{video.title}</h3>
        <span className="urdu-sub-badge" style={{ textAlign: 'left' }}>{video.urduTitle || ''}</span>
        <div className="video-card-footer">
          <span>{video.location || 'Azmi Media Official'}</span>
          <span style={{ color: 'var(--color-header-green)', fontWeight: 800 }}>▶ Dekhein</span>
        </div>
      </div>
    </article>
  );
}
