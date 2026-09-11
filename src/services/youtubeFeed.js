/**
 * AZMI MUSHAIRA MEDIA - Real-time YouTube RSS Feed Engine (Solution 2)
 * Fetches latest video uploads & live stream status 100% free without requiring any API key.
 * Channel: @AZMIMUSHAIRAMEDIA (ID: UCEywUZeMwjUzlFvV64IfiSQ)
 */

export const CHANNEL_ID = "UCEywUZeMwjUzlFvV64IfiSQ";
export const CHANNEL_HANDLE = "@AZMIMUSHAIRAMEDIA";
const FEED_CACHE_KEY = "AZMI_YOUTUBE_FEED_CACHE_V2";
const CACHE_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes fresh cache

/**
 * Format relative time (e.g., "Today", "2 days ago")
 */
function formatTimeAgo(pubDateStr) {
  try {
    const pubDate = new Date(pubDateStr);
    const now = new Date();
    const diffMs = now - pubDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  } catch {
    return "Recently Uploaded";
  }
}

/**
 * Detect smart category and label based on title keywords
 */
function detectCategory(title) {
  const t = title.toLowerCase();
  if (t.includes("live") || t.includes("लाइव") || t.includes("🔴")) {
    return { category: "politics", categoryLabel: "🔴 Live Coverage | براہِ راست" };
  }
  if (t.includes("mushaira") || t.includes("मुशायरा") || t.includes("kavi") || t.includes("shayar")) {
    return { category: "mushaira", categoryLabel: "All India Mushaira | مشاعرہ" };
  }
  if (t.includes("naat") || t.includes("نعت") || t.includes("deeni") || t.includes("kalam") || t.includes("islamic")) {
    return { category: "islamic", categoryLabel: "Naat & Kalam | نعت و منقبت" };
  }
  if (t.includes("interview") || t.includes("बातचीत") || t.includes("exclusive") || t.includes("interviews")) {
    return { category: "interviews", categoryLabel: "Exclusive Interview | انٹرویو" };
  }
  if (t.includes("ground") || t.includes("repot") || t.includes("public") || t.includes("awam")) {
    return { category: "ground", categoryLabel: "Ground Zero | گراؤنڈ زیرو" };
  }
  return { category: "politics", categoryLabel: "Siyasat & Analysis | سیاست" };
}

/**
 * Extract YouTube Video ID from link or guid
 */
function extractVideoId(item) {
  if (item.guid && item.guid.includes("yt:video:")) {
    return item.guid.replace("yt:video:", "").trim();
  }
  if (item.link) {
    const match = item.link.match(/[?&]v=([^&#]+)/);
    if (match) return match[1];
  }
  return null;
}

/**
 * Fetch latest videos from YouTube RSS Feed via high-availability CORS JSON proxy
 */
export async function fetchYouTubeFeed(forceRefresh = false) {
  // Check local cache if not force refreshing
  if (!forceRefresh) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const cached = localStorage.getItem(FEED_CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS && parsed.videos?.length > 0) {
            return {
              ok: true,
              fromCache: true,
              videos: parsed.videos,
              hasLive: parsed.hasLive,
              liveVideo: parsed.liveVideo,
              lastSynced: parsed.timestamp
            };
          }
        }
      }
    } catch (e) {
      console.warn("Error reading YouTube feed cache:", e);
    }
  }

  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&_t=${Date.now()}`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();

    if (data.status !== "ok" || !Array.isArray(data.items)) {
      throw new Error("Invalid RSS feed response");
    }

    let hasLive = false;
    let liveVideo = null;

    const formattedVideos = data.items.map((item, index) => {
      const videoId = extractVideoId(item) || `yt-${index}`;
      const { category, categoryLabel } = detectCategory(item.title);
      const isLiveItem = item.title.includes("🔴LIVE") || item.title.includes("LIVE") || item.title.includes("🔴");

      if (isLiveItem && !liveVideo) {
        hasLive = true;
        liveVideo = {
          id: videoId,
          title: item.title,
          channel: "AZMI MUSHAIRA MEDIA"
        };
      }

      return {
        id: videoId,
        title: item.title,
        urduTitle: "یوٹیوب چینل سے براہِ راست تازہ ترین پیشکش",
        category,
        categoryLabel,
        duration: "HD",
        date: formatTimeAgo(item.pubDate),
        location: "Azmi Media Official",
        views: "Fresh Upload 🔥",
        viewCountNumeric: 1500000 - index * 10000,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        isRealTime: true,
        source: "YouTube Live Sync"
      };
    });

    // Save to localStorage cache
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(
          FEED_CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            videos: formattedVideos,
            hasLive,
            liveVideo
          })
        );
      }
    } catch (e) {
      console.warn("Failed to store feed cache in localStorage:", e);
    }

    return {
      ok: true,
      fromCache: false,
      videos: formattedVideos,
      hasLive,
      liveVideo,
      lastSynced: Date.now()
    };
  } catch (err) {
    console.warn("YouTube Feed Fetch error, falling back to local cached copy:", err);
    // Return cached copy even if expired as fallback
    try {
      const cached = localStorage.getItem(FEED_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return {
          ok: true,
          fromCache: true,
          videos: parsed.videos || [],
          hasLive: parsed.hasLive || false,
          liveVideo: parsed.liveVideo || null,
          lastSynced: parsed.timestamp || Date.now()
        };
      }
    } catch {}

    return {
      ok: false,
      error: err.message,
      videos: [],
      hasLive: false,
      liveVideo: null
    };
  }
}
