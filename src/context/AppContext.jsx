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

  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return sessionStorage.getItem("AZMI_ADMIN_AUTH") === "true";
    } catch {
      return false;
    }
  });

  const [adminPassword, setAdminPassword] = useState(() => {
    try {
      return localStorage.getItem("AZMI_ADMIN_PASS") || "Azmi@786";
    } catch {
      return "Azmi@786";
    }
  });

  const loginAdmin = (username, password) => {
    if (username.trim().toLowerCase() === "admin" && password === adminPassword) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem("AZMI_ADMIN_AUTH", "true");
      return { success: true };
    }
    return { success: false, message: "Ghalat Username ya Password! Bara-e-meharbani sahi credentials enter karein." };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem("AZMI_ADMIN_AUTH");
  };

  const changeAdminPassword = (oldPass, newPass) => {
    if (oldPass !== adminPassword) {
      return { success: false, message: "Current password does not match." };
    }
    if (!newPass || newPass.length < 4) {
      return { success: false, message: "New password must be at least 4 characters." };
    }
    setAdminPassword(newPass);
    localStorage.setItem("AZMI_ADMIN_PASS", newPass);
    return { success: true };
  };

  // Grid / Container Video Slot Overrides (Mapping slotKey -> custom video object)
  const [gridOverrides, setGridOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem("AZMI_GRID_OVERRIDES");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const setGridSlotVideo = (slotKey, videoData) => {
    setGridOverrides(prev => {
      const updated = { ...prev, [slotKey]: videoData };
      localStorage.setItem("AZMI_GRID_OVERRIDES", JSON.stringify(updated));
      return updated;
    });
    showPlatformToast(`✅ Slot "${slotKey}" video updated successfully!`);
  };

  const clearGridSlotVideo = (slotKey) => {
    setGridOverrides(prev => {
      const updated = { ...prev };
      delete updated[slotKey];
      localStorage.setItem("AZMI_GRID_OVERRIDES", JSON.stringify(updated));
      return updated;
    });
    showPlatformToast(`ℹ️ Slot "${slotKey}" restored to default.`);
  };

  const resetAllGridSlots = () => {
    setGridOverrides({});
    localStorage.removeItem("AZMI_GRID_OVERRIDES");
    showPlatformToast("🔄 All video containers reset to default feed.");
  };

  // Ads & Sponsorship Config
  const DEFAULT_ADS = {
    topHeader: {
      enabled: false,
      badge: "SPONSORED",
      text: "🎙️ Book Azmi Media 4K Multi-Cam Coverage for All India Mushaira & Jalsa across India!",
      link: "/contact"
    },
    heroBottom: {
      enabled: true,
      title: "Grand All India Mushaira 2026 — Book Official 4K Multi-Cam Coverage",
      subtitle: "Full Stage Multi-Camera Switching & High-Gain Audio Console • Call/WhatsApp: +91 9451329571",
      image: "",
      link: "/contact",
      buttonText: "Book Now (بکنگ)"
    },
    mushairaSponsor: {
      enabled: false,
      title: "Featured Cultural Partner",
      subtitle: "All India Mushaira & Adabi Mehfil Official Broadcast Partner",
      image: "",
      link: "https://youtube.com/@AZMIMUSHAIRAMEDIA"
    },
    playerSponsor: {
      enabled: true,
      sponsorName: "AZMI MUSHAIRA MEDIA",
      promoText: "Official YouTube Channel — 1.49M Subscribers & 6,800+ Mehfils",
      link: "https://youtube.com/@AZMIMUSHAIRAMEDIA"
    }
  };

  const [adsConfig, setAdsConfig] = useState(() => {
    try {
      const saved = localStorage.getItem("AZMI_ADS_CONFIG");
      return saved ? { ...DEFAULT_ADS, ...JSON.parse(saved) } : DEFAULT_ADS;
    } catch {
      return DEFAULT_ADS;
    }
  });

  const updateAdPlacement = (slotKey, newSettings) => {
    setAdsConfig(prev => {
      const updated = {
        ...prev,
        [slotKey]: { ...prev[slotKey], ...newSettings }
      };
      localStorage.setItem("AZMI_ADS_CONFIG", JSON.stringify(updated));
      return updated;
    });
    showPlatformToast(`📢 Ad placement "${slotKey}" updated.`);
  };

  const toggleAdPlacement = (slotKey) => {
    setAdsConfig(prev => {
      const current = prev[slotKey] || {};
      const updated = {
        ...prev,
        [slotKey]: { ...current, enabled: !current.enabled }
      };
      localStorage.setItem("AZMI_ADS_CONFIG", JSON.stringify(updated));
      return updated;
    });
  };

  // Breaking Ticker Text
  const [tickerText, setTickerText] = useState(() => {
    return localStorage.getItem("AZMI_TICKER_TEXT") || "عظمیٰ مشاعرہ میڈیا • 1.49M Subscribers • All India Mushaira, Ground Reality & UP Siyasat 24x7";
  });

  const updateTickerText = (text) => {
    setTickerText(text);
    localStorage.setItem("AZMI_TICKER_TEXT", text);
    showPlatformToast("📢 Breaking Ticker updated!");
  };

  // Event Booking Leads (from Contact form)
  const [bookingLeads, setBookingLeads] = useState(() => {
    try {
      const saved = localStorage.getItem("AZMI_BOOKING_LEADS");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addBookingLead = (lead) => {
    const newLead = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: "New",
      ...lead
    };
    setBookingLeads(prev => {
      const updated = [newLead, ...prev];
      localStorage.setItem("AZMI_BOOKING_LEADS", JSON.stringify(updated));
      return updated;
    });
  };

  const updateBookingLeadStatus = (leadId, status) => {
    setBookingLeads(prev => {
      const updated = prev.map(l => l.id === leadId ? { ...l, status } : l);
      localStorage.setItem("AZMI_BOOKING_LEADS", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteBookingLead = (leadId) => {
    setBookingLeads(prev => {
      const updated = prev.filter(l => l.id !== leadId);
      localStorage.setItem("AZMI_BOOKING_LEADS", JSON.stringify(updated));
      return updated;
    });
    showPlatformToast("Lead deleted.");
  };

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
        const mapped = data.items.map((item, idx) => {
          const rawTitle = item.snippet.title || "";
          const lower = rawTitle.toLowerCase();
          
          let cat = "all";
          let catLabel = "🌟 YouTube Upload";
          
          if (lower.match(/mushaira|mehfil|shayari|ghazal|nazm|shair|kavi|kalam|tarannum/)) {
            cat = "mushaira";
            catLabel = "🎤 Mushaira | مشاعرہ";
          } else if (lower.match(/owaisi|chandrashekhar|azad|bjp|sp|congress|bsp|chunav|election|siyasat|assembly|rally|speech|neta|modi|yogi|akhilesh/)) {
            cat = "politics";
            catLabel = "🗳️ Siyasat | سیاست";
          } else if (lower.match(/interview|guftagu|exclusive|bayan|podcast|khas mulaqat/)) {
            cat = "interviews";
            catLabel = "🎙️ Bayanat | بیانات";
          } else if (lower.match(/ground|protest|dharna|insaaf|police|bulldozer|masjid|zameeni|report|breaking/)) {
            cat = "ground";
            catLabel = "🌍 Ground Zero | گراؤنڈ زیرو";
          } else if (lower.match(/naat|deeni|jalsa|dars|roza|ramzan|quran/)) {
            cat = "islamic";
            catLabel = "🕌 Deeni Mehfil | دینی محفل";
          }

          return {
            id: item.id.videoId,
            title: rawTitle,
            urduTitle: "عظمیٰ مشاعرہ میڈیا آفیشل",
            category: cat,
            categoryLabel: catLabel,
            duration: "⚡ 4K HD",
            date: new Date(item.snippet.publishedAt).toLocaleDateString(),
            location: "Azmi Media Official",
            views: "🔥 Latest Upload",
            featured: idx === 0,
            thumbnail: item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.standard?.url || `https://i.ytimg.com/vi/${item.id.videoId}/maxresdefault.jpg`
          };
        });

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

  // Background Auto-Sync on Mount if API Key exists
  useEffect(() => {
    const savedKey = localStorage.getItem("AZMI_YT_API_KEY");
    if (!savedKey) return;

    const lastSync = localStorage.getItem("AZMI_LAST_SYNC");
    const now = Date.now();
    // If not synced in last 15 minutes, silently fetch latest in background
    if (!lastSync || (now - new Date(lastSync).getTime() > 15 * 60 * 1000)) {
      syncYouTubeVideos(savedKey);
    }
  }, []);

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
        setIsLiveActive,
        liveDetails,
        setLiveDetails,
        toggleLiveSimulation,
        toastMessage,
        showPlatformToast,
        syncedVideos,
        syncYouTubeVideos,
        // Admin & Customizations
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
        addBookingLead,
        updateBookingLeadStatus,
        deleteBookingLead
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
