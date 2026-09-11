import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Video Theater Modal State
  const [activeVideo, setActiveVideo] = useState(null);

  // Support & Legal Modal State
  const [supportModal, setSupportModal] = useState({ isOpen: false, type: 'faqs' });

  // YouTube Sync Modal State
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

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
        showPlatformToast
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
