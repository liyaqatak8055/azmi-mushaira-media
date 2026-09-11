import React, { createContext, useContext, useState, useEffect } from 'react';

import { PLATFORM_VIDEOS } from '../data/platformData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Video Theater Modal State
  const [activeVideo, setActiveVideo] = useState(null);

  // Support & Legal Modal State
  const [supportModal, setSupportModal] = useState({ isOpen: false, type: 'faqs' });

  // YouTube Sync Modal State
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  // Synced Videos Feed (Fallbacks to PLATFORM_VIDEOS)
  const [syncedVideos, setSyncedVideos] = useState(() => {
    try {
      const saved = localStorage.getItem("AZMI_SYNCED_VIDEOS");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return PLATFORM_VIDEOS;
  });

  // Live Alert Banner State
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [liveDetails, setLiveDetails] = useState({
    id: "RQj92m7s9tQ",
    title: "LIVE NOW: All India Mushaira 2026 Special Broadcast — Azmi Media HD",
    channel: "AZMI MUSHAIRA MEDIA"
  });

  // Global Toast State
  const [toastMessage, setToastMessage] = useState("");

  const showPlatformToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3400);
  };

  const openVideoPlayer = (id, title = "Video Player", urduTitle = "") => {
    setActiveVideo({ id, title, urduTitle });
    document.body.classList.add("modal-open");
  };

  const closeVideoPlayer = () => {
    setActiveVideo(null);
    document.body.classList.remove("modal-open");
  };

  const openSupportModal = (type = 'faqs') => {
    setSupportModal({ isOpen: true, type });
    document.body.classList.add("modal-open");
  };

  const closeSupportModal = () => {
    setSupportModal({ isOpen: false, type: 'faqs' });
    document.body.classList.remove("modal-open");
  };

  const openSyncModal = () => {
    setIsSyncModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeSyncModal = () => {
    setIsSyncModalOpen(false);
    document.body.classList.remove("modal-open");
  };

  const toggleLiveSimulation = () => {
    setIsLiveActive(prev => !prev);
    showPlatformToast(!isLiveActive ? "🔴 Live Stream Simulation Active!" : "Live Stream Simulation Band Ho Gaya.");
  };

  // YouTube Data API v3 Real Auto-Sync (Channel: UCEywUZeMwjUzlFvV64IfiSQ)
  const syncYouTubeVideos = async (apiKeyToUse) => {
    const key = apiKeyToUse || localStorage.getItem("AZMI_YT_API_KEY");
    if (!key) {
      showPlatformToast("ℹ️ Apni YouTube Data API Key enter karein.");
      return { success: false, message: "API Key enter karein." };
    }

    try {
      // 1. Fetch 20 latest videos
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCEywUZeMwjUzlFvV64IfiSQ&maxResults=20&order=date&type=video&key=${key}`
      );
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || "YouTube API Error");
      }

      if (data.items && data.items.length > 0) {
        const mapped = data.items.map((item, idx) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          urduTitle: "عظمیٰ مشاعرہ میڈیا آفیشل",
          category: "all",
          categoryLabel: "YouTube Upload",
          duration: "HD",
          date: new Date(item.snippet.publishedAt).toLocaleDateString(),
          location: "Azmi Media Official",
          views: "Latest",
          featured: idx === 0,
          thumbnail: item.snippet.thumbnails?.high?.url || `https://i.ytimg.com/vi/${item.id.videoId}/hqdefault.jpg`
        }));

        setSyncedVideos(mapped);
        localStorage.setItem("AZMI_SYNCED_VIDEOS", JSON.stringify(mapped));
        localStorage.setItem("AZMI_LAST_SYNC", new Date().toISOString());

        // 2. Check for live broadcast
        try {
          const liveRes = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCEywUZeMwjUzlFvV64IfiSQ&eventType=live&type=video&key=${key}`
          );
          const liveData = await liveRes.json();
          if (liveData.items && liveData.items.length > 0) {
            const liveItem = liveData.items[0];
            setIsLiveActive(true);
            setLiveDetails({
              id: liveItem.id.videoId,
              title: "🔴 LIVE: " + liveItem.snippet.title,
              channel: "AZMI MUSHAIRA MEDIA"
            });
          }
        } catch {
          // ignore live error
        }

        showPlatformToast("✅ 20 Latest Videos YouTube se sync ho gayi!");
        return { success: true, count: mapped.length };
      } else {
        return { success: false, message: "Channel se koi video nahi mili." };
      }
    } catch (err) {
      console.error("YouTube auto-sync error:", err);
      showPlatformToast(`⚠️ Sync failed: ${err.message}`);
      return { success: false, message: err.message };
    }
  };

  // Keyboard navigation: Escape key closes modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (activeVideo) closeVideoPlayer();
        if (supportModal.isOpen) closeSupportModal();
        if (isSyncModalOpen) closeSyncModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo, supportModal.isOpen, isSyncModalOpen]);

  return (
    <AppContext.Provider
      value={{
        activeVideo,
        openVideoPlayer,
        closeVideoPlayer,
        supportModal,
        openSupportModal,
        closeSupportModal,
        isSyncModalOpen,
        openSyncModal,
        closeSyncModal,
        isLiveActive,
        liveDetails,
        toggleLiveSimulation,
        toastMessage,
        showPlatformToast,
        syncedVideos,
        syncYouTubeVideos
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
