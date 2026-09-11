import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { ALL_CATALOG_VIDEOS, PLATFORM_VIDEOS } from '../data/platformData';
import { useApp } from '../context/AppContext';

export default function Videos() {
  const { syncedVideos } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 12;

  // Sync category state when URL search params change
  useEffect(() => {
    const cat = searchParams.get('cat') || 'all';
    setCategory(cat);
    setCurrentPage(1);
  }, [searchParams]);

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setCurrentPage(1);
    if (newCat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ cat: newCat });
    }
  };

  const catalogBaseList = useMemo(() => {
    if (syncedVideos && syncedVideos.length > 0 && syncedVideos !== PLATFORM_VIDEOS) {
      return [...syncedVideos, ...ALL_CATALOG_VIDEOS];
    }
    return ALL_CATALOG_VIDEOS;
  }, [syncedVideos]);

  const filteredVideos = useMemo(() => {
    let list = catalogBaseList.filter(v => {
      const matchCat = category === "all" || v.category === category;
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
  }, [category, searchQuery, sortOrder]);

  const paginatedVideos = useMemo(() => {
    return filteredVideos.slice(0, currentPage * PAGE_SIZE);
  }, [filteredVideos, currentPage]);

  const hasMore = paginatedVideos.length < filteredVideos.length;

  return (
    <main className="content-section" style={{ minHeight: '80vh', paddingTop: '32px' }}>
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow">COMPLETE CATALOG ARCHIVE | تمام ویڈیوز</span>
            <h1 className="h2-section-title" style={{ fontSize: '2rem' }}>
              Azmi Mushaira Media Video Catalog (6,895+)
            </h1>
            <p className="urdu-sub-badge" style={{ textAlign: 'left', marginTop: '4px' }}>
              آل انڈیا مشاعرہ، سیاسی بیانات، اور زمینی کوریج کا باقاعدہ انتخاب
            </p>
          </div>

          <div className="catalog-search-wrap" style={{ minWidth: '320px' }}>
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

        {/* Category Controls Bar */}
        <div className="catalog-controls-bar">
          <div className="catalog-tabs-row">
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
                className={`catalog-tab-btn ${category === tab.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="catalog-sort-wrap">
            <label htmlFor="videosSort">Sort By:</label>
            <select
              id="videosSort"
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

        {/* Status Count */}
        <div className="catalog-count-strip">
          <span>
            Displaying <strong>{paginatedVideos.length}</strong> of <strong>{filteredVideos.length}</strong> videos
          </span>
        </div>

        {/* Empty State */}
        {paginatedVideos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 20px', background: '#fff', border: '1px dashed var(--color-border-medium)', borderRadius: '12px', marginTop: '20px' }}>
            <p className="body-lead" style={{ fontWeight: 800, marginBottom: '8px' }}>
              Koi Video Nahi Mila (No Results Found)
            </p>
            <p className="body-default">Doosra keyword search karein ya "🌟 Sabhi" category par click karein.</p>
          </div>
        ) : (
          <div className="editorial-cards-grid">
            {paginatedVideos.map((video, idx) => (
              <VideoCard video={video} variant="editorial" index={idx} key={video.id + idx} />
            ))}
          </div>
        )}

        {/* Load More Pagination */}
        {hasMore && (
          <div className="catalog-load-more-wrap" style={{ textAlign: 'center', marginTop: '36px', marginBottom: '40px' }}>
            <button
              className="btn-action-primary"
              style={{ padding: '12px 30px', fontSize: '0.94rem' }}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              📥 Load More Videos (مزید ویڈیوز لوڈ کریں)
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
